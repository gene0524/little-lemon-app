# Little Lemon 專案結構

## 資料夾結構

```
/src
  App.js                 # 應用程式主元件，包含路由
  App.css                # 應用程式樣式
  index.js               # React 入口點
  /components
    /Nav.js              # 導航欄元件（使用React Router）
    /Header.js           # 頁頭元件
    /Footer.js           # 頁尾元件
    /HomePage.js         # 首頁容器
    /CallToAction.js     # 首頁英雄區域元件
    /Specials.js         # 特色餐點區域元件
    /CustomersSay.js     # 顧客評價區域元件
    /Chicago.js          # 關於我們區域元件
    /BookingPage.js      # 預約頁面元件
  /assets
    /logo.png            # 網站 Logo
    /plate-food.jpg      # 英雄區域圖片
    /greek-salad.jpg     # 希臘沙拉圖片
    /bruchetta.jpg       # 義式烤麵包圖片
    /lemon-dessert.jpg   # 檸檬甜點圖片
    /restaurant.jpg      # 餐廳圖片
    /restaurant-chef.jpg # 餐廳主廚圖片
```

## 元件說明

### App.js
- 位置：`/src/`
- 功能：應用程式的主要入口點，設定React Router路由，渲染Header、Nav、Footer和當前路由對應的頁面

### Nav.js
- 位置：`/src/components/`
- 功能：網站導航欄，使用React Router的Link元件進行導航
- 包含：首頁、關於、菜單、預約、線上訂餐、登入的連結

### Header.js
- 位置：`/src/components/`
- 功能：網站頁頭，顯示Little Lemon Logo

### Footer.js
- 位置：`/src/components/`
- 功能：網站頁尾，包含導航連結、聯絡資訊和社交媒體連結

### HomePage.js
- 位置：`/src/components/`
- 功能：首頁容器，引入並組合所有首頁區域元件
- 引入：CallToAction, Specials, CustomersSay, Chicago元件

### CallToAction.js
- 位置：`/src/components/`
- 功能：首頁英雄區域（Hero Section）
- 包含：餐廳名稱、地點、簡介和預約按鈕

### Specials.js
- 位置：`/src/components/`
- 功能：特色餐點區域
- 顯示：特色菜品卡片，包含圖片、名稱、價格、說明和訂購按鈕

### CustomersSay.js
- 位置：`/src/components/`
- 功能：顧客評價區域
- 顯示：顧客評論卡片，包含評分、顧客名稱和評論內容

### Chicago.js
- 位置：`/src/components/`
- 功能：關於我們區域
- 介紹：Little Lemon餐廳背景故事和芝加哥店面資訊，包含餐廳圖片

### BookingPage.js
- 位置：`/src/components/`
- 功能：預約頁面
- 包含：預約表單（日期、時間、人數、場合、姓名、電子郵件、電話）和提交功能

## 路由結構

使用 React Router 實現的路由：

- `/` - 首頁 (HomePage)
- `/about` - 關於頁面 (尚未完整實現)
- `/menu` - 菜單頁面 (尚未完整實現)
- `/booking` - 預約頁面 (BookingPage)
- `/order-online` - 線上訂餐頁面 (尚未完整實現)
- `/login` - 登入頁面 (尚未完整實現)
