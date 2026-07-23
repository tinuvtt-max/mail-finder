# 查詢我的電子信箱

手機版網頁，讓使用者透過 Google Identity Services 選擇帳號，顯示信箱並一鍵複製。

## Google OAuth 設定

1. 到 Google Cloud Console 建立或選擇專案。
2. 在「API 和服務 → 憑證」建立「OAuth 2.0 用戶端 ID」，應用程式類型選「Web application」。
3. 將正式 HTTPS 網址加入「已授權的 JavaScript 來源」。本機測試可加入 `http://localhost:3000`。
4. 將 Client ID 填入部署環境變數 `NEXT_PUBLIC_GOOGLE_CLIENT_ID`，格式如 `123...apps.googleusercontent.com`。

## 本機測試與部署

複製 `.env.example` 為 `.env.local` 並填入 Client ID，執行 `npm run dev` 後用手機或瀏覽器開啟本機網址。

正式部署必須使用 HTTPS，並在 Google OAuth 憑證中加入完全相同的網域來源。若使用多個網域，請逐一加入。

本頁使用 Google Identity Services 的登入憑證在瀏覽器顯示信箱，適合查詢用途。若要把登入結果儲存為會員資料，應再由後端驗證 Google 憑證，不應只信任瀏覽器內容。
Deployment update
