const express = require("express");     // 서버생성
const mongoose = require("mongoose");   // 연결할 디비
require('dotenv').config();     // 환경변수 사용
const cors = require("cors");    // 테스트 위해 접근 허용
const app = express();  // express로 앱을 만들것이다.
app.use(cors());                // 앱은 cors를 사용한다.


// 몽구스를 통해서 연결을 할 것이다 ("데이터베이스 주소")
mongoose.connect(process.env.DB, { // .env 데이터베이스 주소
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(()=> console.log("connected to database"));
// then()연결이 됐다면은 => 콘솔로그 찍어준다.


module.exports = app;