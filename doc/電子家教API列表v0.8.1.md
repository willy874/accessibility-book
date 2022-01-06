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

### 回應

#### 得到token

```json
{"key":"23f20daaeebdf6ec97810a4d8e623d4224324869"}
```

## 註冊

### API呼叫

#### 請求

```bash
curl -X POST https://api.pastwind.org/dj-rest-auth/registration/ -H 'Content-Type: application/json' -d '{"username":"AAA","password1":"something", "password2":"something", "email":"example@example.com"}'
```

#### 回應

如果不需要驗證，則會立刻得到token

```json
{"key":"3f40ed6dba682d59a81d4ca310fa4f864cdeee04"}
```

如果需要驗證，則會出現提示

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

## Line 註冊登入

Line登入後會直接註冊帳號

### 直接登入

Line登入，前端顯示登入按鈕的URL

<https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id={Line的client_id}&redirect_uri={callback頁面網址}=12345abcde&scope=profile%20openid&nonce=09876xyz>

#### 按鈕範例:

<https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id={client_id}&redirect_uri=https://library.pastwind.org/callback/&state=12345abcde&scope=profile%20openid&nonce=09876xyz>

redirect_uri必須與LINE Login裡設定的一致，否則在後端驗證時會回傳400 error

相關欄位請參考Line Login 文件:
<https://developers.line.biz/zh-hant/docs/line-login/integrate-line-login/#making-an-authorization-request>

在Line註冊完後，同個使用者不可再使用一般註冊API，要再使用 ***PATCH***  /api/v1/user/ 補登其他資料

### API網址
#### 登入

（POST）向LINE請求授權之後，得到的code往後端發送進行驗證，驗證成功會回傳使用者的token，和普通登入取得的一樣。
<https://api.pastwind.org/dj-rest-auth/line/>

##### 請求

```json
{
    "code": "xxxxxxx",
    "return_url":"https://tpwlweb.3anology.info/example/callback.html"
}
```

##### 回應

```json
{
    "key":"41flkavbjr5123jvxckjle"
}
```

##### 參考範例網頁

<https://tpwlweb.3anology.info/example/linelogin.html>

##### 範例碼:

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

---

## 獲得帳號資料

登入後可以利用以下API檢測是否有設定email與密碼登入

若未設定密碼，跳出表單讓使用者填寫

取得使用者個人資料API:
<https://api.pastwind.org/api/v1/user/>

#### 請求

```bash
curl -X GET https://api.pastwind.org/api/v1/user/ -H 'Content-Type: application/json' -H 'Authorization: Token 23f20daaeebdf6ec97810a4d8e623d4224324869'
```

#### 回應

```json
{
    "pk": 7, //帳號序號
    "username": "kent1026@gmail.com", //帳號名稱
    "email": "kent1026@gmail.com", 	  //電子郵件(有可能為空，若為空讓使用者填寫，若有資料讓表格預先填入)
    "first_name": "kent_su",		 //讓使用者填寫，若有資料讓表格預先填入
    "last_name": "",				//讓使用者填寫，若有資料讓表格預先填入
    "is_password_set": false,		  //是否有設定密碼，若無，讓使用者自行設定(英數8位)
    "is_authorized":false			//帳號是否啟用
}
```

## 更新使用者資料:

路徑接口:  ***PATCH***  /api/v1/user/

### 請求

#### Headers:

| 參數名稱      | 參數值           | 是否必須 | 範例                                           | 備註          |
| ------------- | ---------------- | -------- | ---------------------------------------------- | ------------- |
| Content-Type  | application/json | Y        |                                                |               |
| Authorization | string           | Y        | Token 23f20daaeebdf6ec97810a4d8e623d4224324869 | 前面要加Token |

#### body:

| 參數名稱   | 參數值 | 是否必須 | 範例          | 備註                         |
| ---------- | ------ | -------- | ------------- | ---------------------------- |
| username   | string | N        | kent          | 不可修改                     |
| email      | email  | Y        | test@test.com | 若user api有給，顯示但不能改 |
| first_name | string | Y        | kent          | 使用者稱呼，可改             |
| last_name  | string | Y        | su            | 使用者稱呼，可改             |

#### 欄位細項:

```json
"actions": {
        "PATCH": {
            "pk": {
                "type": "integer",
                "required": false,
                "read_only": true,
                "label": "ID"
            },
            "username": {
                "type": "string",
                "required": true,
                "read_only": false,
                "label": "使用者名稱",
                "help_text": "必要的。150 個字或更少，只包含字母、數字和 @/./+/-/_。",
                "max_length": 150
            },
            "email": {
                "type": "email",
                "required": false,
                "read_only": false,
                "label": "電子信箱",
                "max_length": 254
            },
            "first_name": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "名字",
                "max_length": 150
            },
            "last_name": {
                "type": "string",
                "required": false,
                "read_only": false,
                "label": "姓氏",
                "max_length": 150
            },
            "is_password_set": {
                "type": "field",
                "required": false,
                "read_only": true,
                "label": "Is password set"
            },
            "is_authorized": {
                "type": "boolean",
                "required": false,
                "read_only": true,
                "label": "是否授權",
                "help_text": "已授權的使用者才能使用網站服務"
            }
        }
    }
```

### 回應

#### Headers:

| 參數名稱     | 參數值           | 範例 | 備註 |
| ------------ | ---------------- | ---- | ---- |
| Content-Type | application/json |      |      |

#### body:

| 參數名稱 | 參數值 | 範例 | 備註 |
| -------- | ------ | ---- | ---- |
| detail   | string |      |      |

------

## 更新使用者密碼:

路徑接口:  ***POST***  /dj-rest-auth/password/change/

### 請求

#### Headers:

| 參數名稱      | 參數值           | 是否必須 | 範例                                           | 備註          |
| ------------- | ---------------- | -------- | ---------------------------------------------- | ------------- |
| Content-Type  | application/json | Y        |                                                |               |
| Authorization | string           | Y        | Token 23f20daaeebdf6ec97810a4d8e623d4224324869 | 前面要加Token |

#### body:

| 參數名稱      | 參數值 | 是否必須 | 範例     | 備註                         |
| ------------- | ------ | -------- | -------- | ---------------------------- |
| new_password1 | string | Y        | 1qaz2wsx |                              |
| new_password2 | string | Y        | 1qaz2wsx | 後端會驗證密碼是否與上面一致 |

#### 欄位細項:

```json
 "actions": {
        "POST": {
            "new_password1": {
                "type": "string",
                "required": true,
                "read_only": false,
                "label": "New password1",
                "max_length": 128
            },
            "new_password2": {
                "type": "string",
                "required": true,
                "read_only": false,
                "label": "New password2",
                "max_length": 128
            }
        }
    }
```

### 回應

#### Headers:

| 參數名稱     | 參數值           | 範例 | 備註 |
| ------------ | ---------------- | ---- | ---- |
| Content-Type | application/json |      |      |

#### body:

| 參數名稱 | 參數值 | 範例                         | 備註 |
| -------- | ------ | ---------------------------- | ---- |
| detail   | string | New password has been saved. |      |

------

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

## 書籤

### 建立書籤

路徑接口:  ***POST***  /api/v1/bookmark/

#### 請求

##### Headers:

| 參數名稱      | 參數值           | 是否必須 | 範例                                           | 備註          |
| ------------- | ---------------- | -------- | ---------------------------------------------- | ------------- |
| Content-Type  | application/json | Y        |                                                |               |
| Authorization | string           | Y        | Token 23f20daaeebdf6ec97810a4d8e623d4224324869 | 前面要加Token |

##### body:

| 參數名稱 | 參數值  | 是否必須 | 範例               | 備註         |
| -------- | ------- | -------- | ------------------ | ------------ |
| payload  | JSON    | Y        | {"comment":"測試"} | 前端應用資料 |
| chapter  | integer | Y        | 1                  | 章節ID       |

##### 欄位細項:

```json
"actions": {
        "POST": {
            "id": {					//唯讀
                "type": "integer",
                "required": false,
                "read_only": true,
                "label": "ID"
            },
            "payload": {
                "type": "JSON",
                "required": false,
                "read_only": false,
                "label": "前端資料"
            },
            "user": { 				//不需填寫
                "type": "field",
                "required": true,
                "read_only": false,
                "label": "使用者"
            },
            "chapter_name": {
                "type": "field",
                "required": false,
                "read_only": true,
                "label": "章節名稱"
            },
            "chapter": {
                "type": "integer",
                "required": true,
                "read_only": false,
                "label": "章節"
            },
            "last_modified": {
                "type": "datetime",
                "required": false,
                "read_only": true,
                "label": "最近更新時間"
            },
            "tag": {
                "type": "field",
                "required": false,
                "read_only": true,
                "label": "標籤"
            }
        }
    }

```

#### 回應

##### Headers:

| 參數名稱     | 參數值           | 範例 | 備註 |
| ------------ | ---------------- | ---- | ---- |
| Content-Type | application/json |      |      |

##### body:

| 參數名稱 | 參數值  | 範例               | 備註         |
| -------- | ------- | ------------------ | ------------ |
| id       | integer | 2                  | 書籤序號     |
| payload  | JSON    | {"comment":"測試"} | 前端應用資料 |
| user     | integer | 9                  |              |
| chapter  | integer | 2                  | 章節ID       |

------

### 取得使用者書籤列表

路徑接口:  ***GET***  /api/v1/bookmark/

#### 請求

##### Headers:

| 參數名稱      | 參數值           | 是否必須 | 範例                                           | 備註          |
| ------------- | ---------------- | -------- | ---------------------------------------------- | ------------- |
| Content-Type  | application/json | Y        |                                                |               |
| Authorization | string           | Y        | Token 23f20daaeebdf6ec97810a4d8e623d4224324869 | 前面要加Token |

#### 回應

##### Headers:

| 參數名稱     | 參數值           | 範例 | 備註 |
| ------------ | ---------------- | ---- | ---- |
| Content-Type | application/json |      |      |

##### body(Array):

| 參數名稱      | 參數值  | 範例                                              | 備註         |
| ------------- | ------- | ------------------------------------------------- | ------------ |
| id            | integer | 2                                                 | 書籤序號     |
| payload       | JSON    | {"comment":"測試"}                                | 前端應用資料 |
| user          | integer | 9                                                 | 使用者id     |
| chapter       | integer | 2                                                 | 章節ID       |
| chapter_name  | string  | 代數                                              | 章節名稱     |
| tag           | array   | [{"id":1,"name":"數學"},{"id":2,"name":"七年級"}] | 標籤         |
| last_modified | string  | 2021-12-22T20:56:38.915996+08:00                  | 最近更新時間 |

### 刪除書籤

路徑接口:  ***DELETE***  /api/v1/bookmark/{bookmark_Id}/

#### 請求

##### Headers:

| 參數名稱      | 參數值           | 是否必須 | 範例                                           | 備註          |
| ------------- | ---------------- | -------- | ---------------------------------------------- | ------------- |
| Content-Type  | application/json | Y        |                                                |               |
| Authorization | string           | Y        | Token 23f20daaeebdf6ec97810a4d8e623d4224324869 | 前面要加Token |

##### body:

不須內容



#### 回應

status code : **204**

##### Headers:

| 參數名稱 | 參數值 | 範例 | 備註 |
| -------- | ------ | ---- | ---- |
|          |        |      |      |

##### body:

沒有內容

----

## 歷史紀錄

### 建立紀錄

路徑接口:  ***POST***  /api/v1/history/

#### 請求

##### Headers:

| 參數名稱      | 參數值           | 是否必須 | 範例                                           | 備註          |
| ------------- | ---------------- | -------- | ---------------------------------------------- | ------------- |
| Content-Type  | application/json | Y        |                                                |               |
| Authorization | string           | Y        | Token 23f20daaeebdf6ec97810a4d8e623d4224324869 | 前面要加Token |

##### body:

| 參數名稱 | 參數值  | 是否必須 | 範例               | 備註         |
| -------- | ------- | -------- | ------------------ | ------------ |
| payload  | JSON    | Y        | {"comment":"測試"} | 前端應用資料 |
| chapter  | integer | Y        | 1                  | 章節ID       |

##### 欄位細項:

```json
"actions": {
        "POST": {
            "id": {					//唯讀
                "type": "integer",
                "required": false,
                "read_only": true,
                "label": "ID"
            },
            "payload": {
                "type": "JSON",
                "required": false,
                "read_only": false,
                "label": "前端資料"
            },
            "user": { 				//不需填寫
                "type": "field",
                "required": true,
                "read_only": false,
                "label": "使用者"
            },
            "chapter_name": {
                "type": "field",
                "required": false,
                "read_only": true,
                "label": "章節名稱"
            },
            "chapter": {
                "type": "integer",
                "required": true,
                "read_only": false,
                "label": "章節"
            },
            "last_modified": {
                "type": "datetime",
                "required": false,
                "read_only": true,
                "label": "最近更新時間"
            },
            "tag": {
                "type": "field",
                "required": false,
                "read_only": true,
                "label": "標籤"
            }
        }
    }

```

#### 回應

##### Headers:

| 參數名稱     | 參數值           | 範例 | 備註 |
| ------------ | ---------------- | ---- | ---- |
| Content-Type | application/json |      |      |

##### body:

| 參數名稱 | 參數值  | 範例               | 備註         |
| -------- | ------- | ------------------ | ------------ |
| id       | integer | 2                  | 紀錄序號     |
| payload  | JSON    | {"comment":"測試"} | 前端應用資料 |
| user     | integer | 9                  |              |
| chapter  | integer | 2                  | 章節ID       |

------

### 取得使用者紀錄列表

路徑接口:  ***GET***  /api/v1/history/

#### 請求

##### Headers:

| 參數名稱      | 參數值           | 是否必須 | 範例                                           | 備註          |
| ------------- | ---------------- | -------- | ---------------------------------------------- | ------------- |
| Content-Type  | application/json | Y        |                                                |               |
| Authorization | string           | Y        | Token 23f20daaeebdf6ec97810a4d8e623d4224324869 | 前面要加Token |

#### 回應

##### Headers:

| 參數名稱     | 參數值           | 範例 | 備註 |
| ------------ | ---------------- | ---- | ---- |
| Content-Type | application/json |      |      |

##### body(Array):

| 參數名稱      | 參數值  | 範例                                              | 備註         |
| ------------- | ------- | ------------------------------------------------- | ------------ |
| id            | integer | 2                                                 | 紀錄序號     |
| payload       | JSON    | {"comment":"測試"}                                | 前端應用資料 |
| user          | integer | 9                                                 | 使用者id     |
| chapter       | integer | 2                                                 | 章節ID       |
| chapter_name  | string  | 代數                                              | 章節名稱     |
| tag           | array   | [{"id":1,"name":"數學"},{"id":2,"name":"七年級"}] | 標籤         |
| last_modified | string  | 2021-12-22T20:56:38.915996+08:00                  | 最近更新時間 |

----

### 刪除紀錄

路徑接口:  ***DELETE***  /api/v1/history/{history_Id}/

#### 請求

##### Headers:

| 參數名稱      | 參數值           | 是否必須 | 範例                                           | 備註          |
| ------------- | ---------------- | -------- | ---------------------------------------------- | ------------- |
| Content-Type  | application/json | Y        |                                                |               |
| Authorization | string           | Y        | Token 23f20daaeebdf6ec97810a4d8e623d4224324869 | 前面要加Token |

##### body:

不須內容

#### 回應

status code : **204**

##### Headers:

| 參數名稱 | 參數值 | 範例 | 備註 |
| -------- | ------ | ---- | ---- |
|          |        |      |      |

##### body:

沒有內容

----

## 書籍

### 書籍列表API

路徑接口:  ***GET***  /api/v1/book/

#### 請求

##### Headers:

| 參數名稱      | 參數值           | 是否必須 | 範例                                           | 備註          |
| ------------- | ---------------- | -------- | ---------------------------------------------- | ------------- |
| Content-Type  | application/json | Y        |                                                |               |
| Authorization | string           | Y        | Token 23f20daaeebdf6ec97810a4d8e623d4224324869 | 前面要加Token |

##### Query:

| 參數名稱 | 參數值     | 是否必須 | 範例                                                    | 備註                       |
| -------- | ---------- | -------- | ------------------------------------------------------- | -------------------------- |
| ordering | created,id | N        | https://api.pastwind.org/api/v1/book/?ordering=-created | 排序，參數前面加上負號反序 |

------

### 取得特定書籍內容

<https://api.pastwind.org/api/v1/book/UUID/>

 範例:

```http
https://api.pastwind.org/api/v1/book/fe7ab8b3-692d-4653-8433-9e35146f048c/
```

----



## 其他API

### 章節列表API

<https://api.pastwind.org/api/v1/chapter/>

### 取得特定章節內容

<https://api.pastwind.org/api/v1/chapter/id/>

  範例:

```http
 https://api.pastwind.org/api/v1/chapter/1/
```

### 取得Tag List

<https://api.pastwind.org/api/v1/tag/>

```http
https://api.pastwind.org/api/v1/tag/
```



### 篩選標籤

<https://api.pastwind.org/api/v1/book/>

 範例:

```http
 https://api.pastwind.org/api/v1/book/?name__icontains=&publisher__name__icontains=&author__name__icontains=&tag=2&tag=3
```

```http
 https://api.pastwind.org/api/v1/book/?tag__name=%E5%9C%8B%E6%96%87&tag__name=%E5%9C%8B%E4%B8%AD%E7%B8%BD%E8%A4%87%E7%BF%92
```

### 最新消息

路徑接口:  ***GET***  /api/v1/news/

#### 請求

##### Headers:

| 參數名稱      | 參數值           | 是否必須 | 範例                                           | 備註          |
| ------------- | ---------------- | -------- | ---------------------------------------------- | ------------- |
| Content-Type  | application/json | Y        |                                                |               |
| Authorization | string           | Y        | Token 23f20daaeebdf6ec97810a4d8e623d4224324869 | 前面要加Token |

