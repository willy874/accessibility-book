# 電子家教API列表

## 管理後台

<https://library.pastwind.org/dashboard/>
帳號：gt
密碼：!qaZ@wsX

---

## 一般登入

cors已經關閉

### 登入請求

**範例頁面** :
<https://tpwlweb.3anology.info/example/userlogin.html>

```bash
curl -X POST https://api.pastwind.org/dj-rest-auth/login/ -H 'Content-Type: application/json' -d '{"username":"user","password":"zY7bSBgk"}'
```

### 得到token

```json
{"key":"23f20daaeebdf6ec97810a4d8e623d4224324869"}
```

## 註冊

### API呼叫

```bash
curl -X POST https://api.pastwind.org/dj-rest-auth/registration/ -H 'Content-Type: application/json' -d '{"username":"AAA","password1":"something", "password2":"something", "email":"example@example.com"}'
```

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
curl -X GET https://api.pastwind.org/api/v1/book/ -H 'Content-Type: application/json' -H 'Authorization: Token 23f20daaeebdf6ec97810a4d8e623d4224324869'
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
curl -X POST https://api.pastwind.org/dj-rest-auth/logout/ -H 'Content-Type: application/json' -H 'Authorization: Token 23f20daaeebdf6ec97810a4d8e623d4224324869'
```

### 登出回應

```json
{"detail":"Successfully logged out."}
```

---

## Line 登入

### 直接登入

Line登入，前端顯示登入按鈕的URL

<https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id={Line的client_id}&redirect_uri={callback頁面網址}=12345abcde&scope=profile%20openid&nonce=09876xyz>

#### 範例:

<https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id={client_id}&redirect_uri=https://library.pastwind.org/callback/&state=12345abcde&scope=profile%20openid&nonce=09876xyz>

redirect_uri必須與LINE Login裡設定的一致，否則在後端驗證時會回傳400 error

相關欄位請參考Line Login 文件:
<https://developers.line.biz/zh-hant/docs/line-login/integrate-line-login/#making-an-authorization-request>

### API網址
（POST）向LINE請求授權之後，得到的code往後端發送進行驗證，驗證成功會回傳使用者的token，和普通登入取得的一樣。
<https://api.pastwind.org/dj-rest-auth/line/>

(request) post Data: 
```json
{
    "code": "xxxxxxx",
    "return_url":"https://tpwlweb.3anology.info/example/callback.html"
}
```

response Data

```json
{
    "key":"41flkavbjr5123jvxckjle"
}
```

#### 參考範例網頁

<https://tpwlweb.3anology.info/example/linelogin.html>

### 範例碼:

Callback頁面Javascript:

```javascript
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())

    fetch('https://api.pastwind.org/dj-rest-auth/line/', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'code': params.code,
            'return_url':'https://tpwlweb.3anology.info/example/linecallback.html' //callback頁面網址，需到Line後台登記            
        })
    })
    .then((res)=>{
        return res.text()
    })
    .then((res)=>{
        document.querySelector("#callback").innerHTML = res
        console.log(res)
    })
```

登入後可以利用以下API檢測是否有設定email與密碼登入

若未設定密碼，跳出表單讓使用者填寫

取得使用者個人資料API:
<https://api.pastwind.org/api/v1/user/>

#### request data:

```bash
curl -X GET https://api.pastwind.org/api/v1/user/ -H 'Content-Type: application/json' -H 'Authorization: Token 23f20daaeebdf6ec97810a4d8e623d4224324869'
```

#### response data

```json
{
    "pk": 7, //帳號序號
    "username": "kent1026@gmail.com", //帳號名稱
    "email": "kent1026@gmail.com", 	  //電子郵件(有可能為空，若為空讓使用者填寫，若有資料讓表格預先填入)
    "first_name": "kent_su",		 //讓使用者填寫，若有資料讓表格預先填入
    "last_name": "",				//讓使用者填寫，若有資料讓表格預先填入
    "is_password_set": false		  //是否有設定密碼，若無，讓使用者自行設定(英數8位)
}
```



### 連結帳號

（POST）以普通帳號登入後，如果要連結LINE帳號，先向LINE請求授權之後，得到的code往後端發送進行連結
<https://api.pastwind.org/dj-rest-auth/line/connect/>

(request) post data: 
```json
{"code": "xxxxxxx"}

```

（GET）中斷與LINE帳號的綁定，在登入狀態呼叫以下網址取得目前已連結的社交網站帳號清單
<https://api.pastwind.org/socialaccounts/>

（POST）確認要中斷綁定的社交網站帳號id，發送請求到以下網址
<https://api.pastwind.org/socialaccounts/{id}/disconnect/>

---

## 其他API

1. 書籍列表API
<https://api.pastwind.org/api/v1/book/>

2. 取得特定書籍內容
<https://api.pastwind.org/api/v1/book/UUID/>

    範例:

    ```http
    https://api.pastwind.org/api/v1/book/fe7ab8b3-692d-4653-8433-9e35146f048c/
    ```

3. 章節列表API
<https://api.pastwind.org/api/v1/chapter/>
4. 取得特定章節內容
<https://api.pastwind.org/api/v1/chapter/id/>

     範例:

    ```http
    https://api.pastwind.org/api/v1/chapter/1/
    ```

5. 取得Tag List
<https://api.pastwind.org/api/v1/tag/>
6. 篩選標籤
   <https://api.pastwind.org/api/v1/book/>

    範例:

    ```http
    https://api.pastwind.org/api/v1/book/?name__icontains=&publisher__name__icontains=&author__name__icontains=&tag=2&tag=3
    ```
   
    ```http
    https://api.pastwind.org/api/v1/book/?&tag__name__icontains=%E5%9C%8B%E6%96%87&tag__name__icontains=%E6%95%B8%E5%AD%B8
    ```


> Written with [StackEdit](https://stackedit.io/).
