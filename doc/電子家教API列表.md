# 電子家教API列表

## 管理後台

<https://library.pastwind.org/dashboard/>
帳號：gt
密碼：!qaZ@wsX

---

## 一般登入

### 登入請求

```bash
curl -X POST https://library.pastwind.org/dj-rest-auth/login/ -H 'Content-Type: application/json' -d '{"username":"ryan","password":"123456"}'
```

### 得到token

```json
{"key":"23f20daaeebdf6ec97880c4d8e623d4224324869"}
```

---

## 呼叫API

### 請求

token是放在Header中做認證

```bash
curl -X GET https://library.pastwind.org/api/v1/book/ -H 'Content-Type: application/json' -H 'Authorization: Token 23f20daaeebdf6ec97880c4d8e623d4224324869'
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
curl -X POST https://library.pastwind.org/dj-rest-auth/logout/ -H 'Content-Type: application/json' -H 'Authorization: Token 23f20daaeebdf6ec97880c4d8e623d4224324869'
```

### 登出回應

```json
{"detail":"Successfully logged out."}
```

---

## Line 登入

Line登入，前端顯示登入按鈕的URL
<https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653988460&redirect_uri=https://library.pastwind.org/callback/&state=12345abcde&scope=profile%20openid&nonce=09876xyz>

redirect_uri必須與LINE Login裡設定的一致，否則在後端驗證時會回傳400 error

### Line驗證完後，往後端認證的範例

```html
<script>
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())

    fetch('https://library.pastwind.org/api/login/social/token/', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'provider': 'line',
            'code': params.code
        })
    })
    .then((res)=>{
        return res.text()
    })
    .then((res)=>{
        document.querySelector("#callback").innerHTML = res
        console.log(res)
    })

</script>
```

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
    <https://library.pastwind.org/api/v1/chapter/1/>
    ```

5. 取得Tag List
<https://library.pastwind.org/api/v1/tag/>
6. 篩選標籤
<https://library.pastwind.org/api/v1/book/>

    範例:

    ```http
    https://library.pastwind.org/api/v1/book/?name__icontains=&publisher__name__icontains=&author__name__icontains=&tag=2&tag=3&tag__name__icontains=
    ```
