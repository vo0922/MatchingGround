const express = require("express"); 
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용
const multer = require('multer');
const form_data = multer();

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

 app.post('/reservation/search', function(req, res, next){
  var request = require('request');
  const key = "F88B9F55-4CFE-36C2-A8C5-1A55768CD1F2";
  const addr = 'https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADSIGG_INFO&key='
  const addr2 = '&domain=localhost:3000&columns=sig_kor_nm&geometry=false&attibute=false&format:json&attrfilter=full_nm:like:'
  var search = req.body.address;
  var finaladdr = addr + key + addr2 + encodeURI(search);
  var options = {
    url : finaladdr,
  }
  request.get(options, function(error, response, body){
    if(error){
      console.log(error)
    } else{
      var obj = JSON.parse(body);
      var data = obj.response.result.featureCollection.features;
      res.send(data);
    }
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

app.post("/reservation/detail/list", (req,res)=>{
  const key = req.body.cardkey;
  connection.query(
      "select *from groundlist where ground_name = ?", [key],
  function(err,rows,fields){
      if(err){
          console.log(err);
      }else{
          res.send(rows);
      };
  });
});


app.post("/reservation/detail/book", (req,res)=>{
  const ground_name = req.body.ground_name;
  const r_date = req.body.r_date;
  const ground_num = req.body.ground_num;
  connection.query(
      "select *from reservation where ground_name = ? and r_date = ? and ground_num = ? order by r_time asc", [ground_name, r_date, ground_num],
  function(err,rows,fields){
      if(err){
          console.log(err);
      }else{
          res.send(rows);
      };
  });
});

app.post('/reservation/detail/reservation', form_data.array(),function(req, res, next){
  const ground_name = req.body.ground_name;
  const ground_num = req.body.ground_num;
  const user_email = req.body.user_email;
  const r_date = req.body.r_date;
  const r_time = req.body.r_time;
  const team_name = req.body.team_name;
  connection.query(
    "insert into reservation(ground_name, ground_num, user_email, team_name, r_date, r_time) select ?,?,?,?,?,? from dual where not exists(select *from reservation where ground_name=? and r_time=? and r_date=?)", [ground_name, ground_num, user_email, team_name, r_date, r_time, ground_name, r_time, r_date],
  function(err, rows,fields){
    if(err){
      console.log(err);
    }else{
      res.send({alert_text : "예약 완료"});
      console.log("예약 성공");
    }
  }
  )
});

app.post('/reservation/detail/matchlist', form_data.array(),function(req, res, next){
  const ground_name = req.body.ground_name;
  const ground_num = req.body.ground_num;
  const user_email = req.body.user_email;
  const r_date = req.body.r_date;
  const r_time = req.body.r_time;
  const team_name = req.body.team_name;
  const reservation_success = req.body.reservation_success;
  const address = req.body.address;
  connection.query(
    "insert into matchlist(user_email, team_name, ground_name, r_date, r_time, ground_num, match_success, reservation_success, address) values (?,?,?,?,?,?,?,?,?)", [user_email, team_name, ground_name, r_date, r_time, ground_num, 0, reservation_success, address],
  function(err, rows,fields){
    if(err){
      console.log(err);
    }else{
      res.send({alert_text : "매치신청 완료"});
      console.log("매치신청 성공");
    }
  }
  )
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


const storage = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, "../public/uploads/");    
  },
  filename : function(req, file, cb) {
    cb(null, "photo" + Date.now() + file.originalname);
  }
});

var upload = multer({ storage : storage });

app.post('/ground/info/register',form_data.array() ,upload.single('photo'), function(req, res, next){
  
  console.log('/ground/info/register', req.body);
  console.log(req.file);
  console.log(req.file.filename);
  console.log(req.body.ground_name);

  const ground_name = req.body.ground_name;
  const ground_count = req.body.ground_count;
  const address = req.body.address;
  const manager_id = req.body.manager_id;
  const photo = "uploads/"+req.file.filename;
  const phonenum = req.body.phonenum;
  const price = req.body.price;
  const parking_lot = req.body.parking_lot;
  const shower_room = req.body.shower_room;
  const foot_rent = req.body.foot_rent;
  const wifi = req.body.wifi;
  const ball_rent = req.body.ball_rent;
  const uniform_rent = req.body.uniform_rent;
  
  connection.query("insert into groundinfo(ground_name, ground_count, address, manager_id, photo, phonenum, price, parking_lot, shower_room, foot_rent, wifi, ball_rent, uniform_rent) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[ground_name, ground_count, address, manager_id, photo, phonenum, price, parking_lot, shower_room, foot_rent, wifi, ball_rent, uniform_rent],
  function(err, rows, fields){
    if(err){
      console.log("경기장 등록 실패" + err);
      res.send({msg:"경기장 등록에 실패했습니다. 경기장 이름을 변경해주세요."});
    } else {
      console.log("경기장 등록 성공");
      res.send({msg:"경기장 등록이 완료되었습니다.", success:1});
    }
  });
  
});


app.post("/myinfo", (req, res) =>{
  const email = req.body.email;
  connection.query("select * from users where email = ?", [email],
  function(err, rows, fields){
    if(err){
      console.log("불러오기 실패" + err);
    } else {
      res.send(rows);
      console.log("내정보 불러오기 성공");
    }
  });
});

app.post("/router/groundmanager", (req, res) =>{
  const id = req.body.email;

  connection.query("select ground_manager from users where email = ?", [id],
  function(err, rows, fields){
    if(err){
      console.log("경기장 관리자 정보 불러오기 실패" + err);
    } else {
      res.send(rows);
      console.log("경기장 관리자 정보 불러오기 성공");
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
