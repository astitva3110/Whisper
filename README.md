
# Whisper(Social-media)

A api for Social Media web application .It is a website designed to address the reluctance of young people to share their thoughts openly and receive unfiltered feedback and suggestions. On this platform, all users are anonymous, with the option to use unique names suggested by the website. Users can share text-based content while ensuring the security of their information and preventing bullying.




## Installation

Install Authentication Application with npm

1.First clone the Repository by pasting the command given below in the terminal.
```bash
  git clone https://github.com/astitva3110/Social-media.git
```
 2.Set-up mongodb in pc 

## Running Tests

1.Register (POST)

```bash
  http://localhost:8080/signup
```
```bash
  {
  "name": "abc",
  "email": "abc@gmail.com",
  "password": "123"
}

```
Output
```bash
  {
  "name": "abc",
  "email": "abc@gmail.com",
  "password": "123"
   "profile_picture": "",
    "follower": [],
    "following": [],
    "isAdmin": false,
    "_id": "_id",
}

```
2.Login(post)
```bash
http://localhost:8080/login
```
```bash
  {
  "email":"abc@gmail.com",
     "password": "123"git
}
```
3.Follow(post)
```bash
http://localhost:8080/follow/:user_id
```
```bash
  {"_id":"user_id"}
```

4.Post(post)
```bash
 http://localhost:8080/post/:user_id
```
```bash 
{
 "text":"my new post"
 }
```
Output
```bash
 {
    "name": "user_id",
    "text": "my new post",
    "_id": "user_id",
    "createdAt": "2024-03-09T07:33:25.353Z",
    "updatedAt": "2024-03-09T07:33:25.353Z",
    "__v": 0
}
```
## Features

- The password is protected using bcrypt.
- User can upload there profile picture
- User deletion functionality is implemented.
- User search capability is available.
- Users can retrieve recent posts from accounts they follow.
- Docker containerization is implemented.



