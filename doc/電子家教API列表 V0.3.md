# 電子家教API列表

## 管理後台

<https://library.pastwind.org/dashboard/>
帳號：gt
密碼：!qaZ@wsX

---

## 一般登入

### 登入請求

```bash
curl -X POST https://library.pastwind.org/dj-rest-auth/login/ -H 'Content-Type: application/json' -d '{"username":"gt","password":"!qaZ@wsX"}'
```

### 得到token

```json
{"key":"23f20daaeebdf6ec97810a4d8e623d4224324869"}
```

## 註冊

### API呼叫

```bash
curl -X POST https://library.pastwind.org/dj-rest-auth/registration/ -H 'Content-Type: application/json' -d '{"username":"AAA","password1":"something", "password2":"something", "email":"example@example.com"}'
```
帳號: 英文 長度不限， 密碼: 8位以上 英數
### 如果不需要驗證，則會立刻得到token
```json
{"key":"3f40ed6dba682d59a81d4ca310fa4f864cdeee04"}
```

### 如果需要驗證，則會出現提示
```json
{"detail":"Verification e-mail sent."}
```

---

## 呼叫API

### 請求

token是放在Header中做認證

```bash
curl -X GET https://library.pastwind.org/api/v1/book/ -H 'Content-Type: application/json' -H 'Authorization: Token 23f20daaeebdf6ec97810a4d8e623d4224324869'
```

### 回應

```json
[
    {
        "id": "259ddd22-476a-4d44-9f16-64a4b694e1ba",
        "name": "數學七",
        "cover": null,
        "is_hide": false,
        "publication_date": null,
        "isbn": "",
        "eisbn": "",
        "store_url": "",
        "created": "2021-10-09T08:55:28.968062+08:00",
        "publisher": {
            "id": 1,
            "name": "文華",
            "is_hide": false
        },
        "a": {
            "id": 1,
            "name": "安麗",
            "is_hide": false
        },
        "tag": [
            {
                "id": 1,
                "name": "七年級"
            },
            {
                "id": 3,
                "name": "數學"
            }
        ]
    }
]
```

---

## 登出

會刪除user的token，下次登入會產生新的

### 登出請求

```bash
curl -X POST https://library.pastwind.org/dj-rest-auth/logout/ -H 'Content-Type: application/json' -H 'Authorization: Token 23f20daaeebdf6ec97810a4d8e623d4224324869'
```

### 登出回應

```json
{"detail":"Successfully logged out."}
```

---

## Line 登入

Line登入，前端顯示登入按鈕的URL
<https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id={client_id}&redirect_uri=https://library.pastwind.org/callback/&state=12345abcde&scope=profile%20openid&nonce=09876xyz>

redirect_uri必須與LINE Login裡設定的一致，否則在後端驗證時會回傳400 error

### API網址
（POST）向LINE請求授權之後，得到的code往後端發送進行驗證，驗證成功會回傳使用者的token，和普通登入取得的一樣。
<https://library.pastwind.org/dj-rest-auth/line/>

post data: 
```json
{"code": "xxxxxxx"}
```

參考範例網頁
<https://library.pastwind.org/line/>
如果要測試此網頁，務必要清除瀏覽器中關於library.pastwind.org的cookie資料。

（POST）以普通帳號登入後，如果要連結LINE帳號，先向LINE請求授權之後，得到的code往後端發送進行連結
<https://library.pastwind.org/dj-rest-auth/line/connect/>

post data: 
```json
{"code": "xxxxxxx"}
```

（GET）中斷與LINE帳號的綁定，在登入狀態呼叫以下網址取得目前已連結的社交網站帳號清單
<https://library.pastwind.org/socialaccounts/>

（POST）確認要中斷綁定的社交網站帳號id，發送請求到以下網址
<https://library.pastwind.org/socialaccounts/{id}/disconnect/>

---

## 其他API

1. 書籍列表API
<https://library.pastwind.org/api/v1/book/>

2. 取得特定書籍內容
<https://library.pastwind.org/api/v1/book/UUID/>

    範例:

    ```http
    https://library.pastwind.org/api/v1/book/fe7ab8b3-692d-4653-8433-9e35146f048c/
    ```

3. 章節列表API
<https://library.pastwind.org/api/v1/chapter/>
4. 取得特定章節內容
<https://library.pastwind.org/api/v1/chapter/id/>

     範例:

    ```http
    https://library.pastwind.org/api/v1/chapter/1/
    ```

5. 取得Tag List
<https://library.pastwind.org/api/v1/tag/>
6. 篩選標籤
   <https://library.pastwind.org/api/v1/book/>

    範例:

    ```http
    https://library.pastwind.org/api/v1/book/?name__icontains=&publisher__name__icontains=&author__name__icontains=&tag=2&tag=3
    ```
    
    ```http
    https://library.pastwind.org/api/v1/book/?&tag__name__icontains=%E5%9C%8B%E6%96%87&tag__name__icontains=%E6%95%B8%E5%AD%B8
    ```


> Written with [StackEdit](https://stackedit.io/).
