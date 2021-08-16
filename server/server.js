const express = require("express"); 
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용

var connection = mysql.createConnection({
    host : "smartit-16.iptime.org",
    user : "root", //mysql의 id
    password : "smartit16", //mysql의 password
    database : "matchingground", //사용할 데이터베이스
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/callback', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/nid/me';
   var token = req.body.token;
   console.log(token);
   var header = "Bearer " + token; // Bearer 다음에 공백 추가
   var request = require('request');
   var options = {
       url: api_url,
       headers: {'Authorization': header}
    };
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       console.log('error');
       if(response != null) {
         res.status(response.statusCode).end();
         console.log('error = ' + response.statusCode);
       }
     }
   });
 });

 app.post("/callback/adduser", (req,res)=>{
  const email = req.body.email;
  const profile_image = req.body.profile_image;
  const user_name = req.body.user_name;
  const birthyear = req.body.birthyear;
  const gender = req.body.gender;
  const mobile = req.body.mobile;

  connection.query(
      "INSERT INTO users (email, profile_image, user_name, birthyear, gender, mobile) select ?,?,?,?,?,? from dual where not exists(select *from users where email=?)",[email,profile_image,user_name,birthyear,gender,mobile,email],
  function(err,rows,fields){
      if(err){
          console.log(err);
      }else{
          res.send(rows);
          console.log("성공");
      };
  });
});

app.post("/reservation/list", (req,res)=>{

  connection.query(
      "select *from groundinfo",
  function(err,rows,fields){
      if(err){
          console.log(err);
      }else{
          res.send(rows);
      };
  });
});

app.post("/reservation/detail", (req,res)=>{
  const key = req.body.cardkey;
  connection.query(
      "select *from groundinfo where ground_name = ?", [key],
  function(err,rows,fields){
      if(err){
          console.log(err);
      }else{
          res.send(rows);
      };
  });
});

app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
});
