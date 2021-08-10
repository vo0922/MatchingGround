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

app.post("/ground/info/manager", (req, res) =>{
  const manager_id = req.body.manager_id;
  connection.query("select * from groundinfo where manager_id = ?", [manager_id],
  function(err, rows, fields){
    if(err){
      console.log("불러오기 실패" + err);
    } else {
      res.send(rows);
      console.log("경기장 정보 불러오기 성공");
    }
  });
});

app.post("/team/info", (req, res) =>{
  const user_email = req.body.user_email;

  connection.query("select team_name, team_image, team_count, win, lose, date_format(team_date, '%Y-%m-%d') AS 'team_date', team_class, team_introduce from Team where team_name = (select team_name from users where email = ?)", [user_email],
  function(err, rows, fields){
    if(err){
      console.log("불러오기 실패" + err);
    } else {
      res.send(rows);
      console.log("팀 정보 불러오기 성공");
    }
  });
});


app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
});
