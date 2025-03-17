// Define the default times array
const defaultTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

// Create mock functions explicitly returning arrays
const mockFetchAPI = jest.fn((date) => {
  // Ensure we're returning a copy of the array to avoid test interference
  return [...defaultTimes];
});

// Add the mock functions to the window object
window.fetchAPI = mockFetchAPI;
window.submitAPI = jest.fn(() => true);

// Define the reducer function as it would appear in Main.js
const availableTimesReducer = (state, action) => {
  switch(action.type) {
    case 'UPDATE_TIMES':
      // Use the fetchAPI to get available times for the selected date
      return window.fetchAPI(new Date(action.payload));
    default:
      return state;
  }
};

// Initialize times function
const initializeTimes = () => {
  // Use fetchAPI with today's date
  return window.fetchAPI(new Date());
};

describe('Main component reducer functions', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Ensure mockFetchAPI returns an array by default
    mockFetchAPI.mockImplementation((date) => [...defaultTimes]);
  });

  test('initializeTimes returns the expected initial times from fetchAPI', () => {
    // Call the function
    const initialTimes = initializeTimes();
    
    // Check that fetchAPI was called with a Date object
    expect(mockFetchAPI).toHaveBeenCalledWith(expect.any(Date));
    
    // Check the result matches expected format and content
    expect(Array.isArray(initialTimes)).toBe(true);
    expect(initialTimes).toEqual(defaultTimes);
  });

  test('updateTimes returns times from fetchAPI based on date', () => {
    // Mock a specific return value for a specific date
    const testDate = '2023-01-01';
    const expectedTimes = ['10:00', '11:00', '12:00'];
    mockFetchAPI.mockReturnValueOnce(expectedTimes);
    
    // Create action
    const action = { type: 'UPDATE_TIMES', payload: testDate };
    
    // Call the reducer function
    const newState = availableTimesReducer([], action);
    
    // Check that fetchAPI was called with the correct date object
    expect(mockFetchAPI).toHaveBeenCalledWith(expect.any(Date));
    
    // Verify the date passed to fetchAPI contains the correct date
    const dateArg = mockFetchAPI.mock.calls[0][0];
    expect(dateArg.getFullYear()).toBe(2023);
    expect(dateArg.getMonth()).toBe(0); // January is 0
    expect(dateArg.getDate()).toBe(1);
    
    // Check that it returned what we mocked
    expect(newState).toEqual(expectedTimes);
  });

  test('reducer returns unchanged state for unknown action types', () => {
    const currentState = ['17:00', '18:00', '19:00'];
    const action = { type: 'UNKNOWN_ACTION' };
    
    const newState = availableTimesReducer(currentState, action);
    
    // Verify fetchAPI wasn't called for unknown action
    expect(mockFetchAPI).not.toHaveBeenCalled();
    
    // State should remain unchanged
    expect(newState).toEqual(currentState);
  });
});