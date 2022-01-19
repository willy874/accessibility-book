# 無障礙電子書 **AccessibilityBook**


## 專案環境

### 環境套件

* Nodejs v16.12.0  
* NPM v8.1.0  
* Yarn 1.22.10  
* Vue-Cli v4.5.11  


### 開發環境啟動
```bash
$ yarn sh:create
```

### 本機發布
```bash
$ yarn sh:push
```

### 佈署
```bash
$ yarn sh:deploy
```
修改 .env

### 核心

* Vue ^2.6.11
* line-liff ^2.16.1
* sass ^1.26.5

### 專案管理

* eslint
* stylelint
* prettier
* postcss
* sass-loader
* babel
* vue-cli

### 伺服器

* express ^4.17.1

### 其他

* axios ^0.21.1
* lodash 4.17.21
* dayjs ^1.10.7
* markdown-it ^12.2.0
* vue-router ^3.2.0
* vuex ^3.4.0
* JSDoc ^3.6.7

## 專案目錄結構

```
root
└───src                      // 原始碼
    └───api                  // 對後端 API 相關
        └───index            // API 列表
        └───request          // HTTP 請求相關
        └───interceptors     // 攔截器
    └───assets               // 資源
        └───fonts            // 自型檔
        └───images           // 圖片檔
    └───components           // 組件
        └───
    └───consts               // 常數
    └───layouts              // 大版畫面
    └───mixins               // 混合共用函式
    └───plugins              // 套件
    └───router               // 路由管理
    └───store                // 狀態管理
    └───style                // 全域樣式管理
    └───types                // 全域共用型別
    └───utils                // 共用函式
    └───views                // 頁面
```

## 專案注意事項

1. 該專案支援 IE11，要特別注意使用語法，或是加裝相關 polyfill。
2. 該專案設計對型別的要求較細緻，interface 相關的定義均在 types 資料夾中。
3. 所有專案使用的固定字串均開成常數，包含 Getters、Mutations、Actions、RouterName ... 等參數。
4. 因為 liff 的路由重寫問題，要在 `"/"` 頁面掛載所有有可能導向的頁面，否則會發生路由失效的問題。
5. 當需要使用 `this.$route` 時，請使用 `this.route` 該變數，會內部處理 liff 的路由問題。
6. 該專案 storage 使用 localStorage，採用 vuex 進行資料驅動綁定，可使用 `mixins/app.js` 內的方法。
7. 內部有 `effectComponent` 和 `effectRoute`，兩大方法可以寫在 methods 來共用生命週期與路由替換帶來的影響。
8. 本專案不需要寫 rem ，透過 postcss 的套件會將 px 以 1:16 的比例轉換。