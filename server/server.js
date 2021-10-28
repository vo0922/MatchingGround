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
//app.use(form_data.array());

// 로그인 콜백
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

 // 신규유저 등록
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

// 매치리스트 시군구 데이터 불러오기
app.post('/matchlist/locationsearch', function(req, res, next){
  var request = require('request');
  const key = "F88B9F55-4CFE-36C2-A8C5-1A55768CD1F2";
  const addr = 'https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADSIGG_INFO&key='
  const addr2 = '&domain=localhost:3000&columns=sig_kor_nm&geometry=false&attibute=false&format:json&attrfilter=full_nm:like:'
  const requ = req.body.loc;

  var finaladdr = addr + key + addr2 + encodeURI(requ);

  var options = {
    url : finaladdr,
  }

  request.get(options, function(error, response, body){
    if(error){
      console.log(error)
    } else{
      var obj = JSON.parse(body);
      console.log(obj.response.result.featureCollection.features);
      res.send(obj);
    }
  });
 });

 // 경기장 정보 불러와서 리스트화
 app.post("/reservation/list", (req,res)=>{
  var city = '%' + req.body.city + '%';
  var country = '%' + req.body.country + '%';
  var text = '%' + req.body.text + '%';
  connection.query(
      "select *from groundinfo where address like ? and address like ? and ground_name like ?",[city, country, text],
  function(err,rows,fields){
      if(err){
          console.log(err);
      }else{
          res.send(rows);
      };
  });
});

// 경기장 검색시 시군구 데이터 불러오기
 app.post('/reservation/search', function(req, res, next){
  var request = require('request');
  const key = "F88B9F55-4CFE-36C2-A8C5-1A55768CD1F2";
  const addr = 'https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADSIGG_INFO&key='
  const addr2 = '&domain=localhost:3000&columns=sig_kor_nm&geometry=false&attibute=false&size=100&format:json&attrfilter=full_nm:like:'
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

// 경기장 상세정보
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

// 구장별 데이터 불러오기
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

// 예약시 예약정보(시간) 표시 데이터 불러오기
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

// 경기장 예약하기
app.post('/reservation/detail/reservation', form_data.array(),function(req, res, next){
  const ground_name = req.body.ground_name;
  const ground_num = req.body.ground_num;
  const user_email = req.body.user_email;
  const r_date = req.body.r_date;
  const r_time = req.body.r_time;
  const team_name = req.body.team_name;
  //console.log(req.body)

  connection.query(
    "insert into reservation(ground_name, ground_num, user_email, team_name, r_date, r_time) select ?,?,?,?,?,? from dual where not exists(select *from reservation where ground_name=? and ground_num=? and r_time=? and r_date=?)", [ground_name, ground_num, user_email, team_name, r_date, r_time, ground_name, ground_num, r_time, r_date],
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

// 경기장 예약 중복체크
app.post('/reservation/detail/overlap', form_data.array(),function(req, res, next){
  const ground_name = req.body.ground_name;
  const ground_num = req.body.ground_num;
  const r_date = req.body.r_date;
  const r_time = req.body.r_time;
  connection.query(
    "select *from reservation where ground_name = ? and ground_num = ? and r_date = ? and r_time = ?", [ground_name, ground_num, r_date, r_time],
  function(err, rows,fields){
    if(err){
      console.log(err);
    }else{
      res.send(rows);
    }
  }
  )
});

// 경기장 매치 신청하기
app.post('/reservation/detail/matchlist', form_data.array(),function(req, res, next){
  const ground_name = req.body.ground_name;
  const ground_num = req.body.ground_num;
  const user_email = req.body.user_email;
  const r_date = req.body.r_date;
  const r_time = req.body.r_time;
  const team_name = req.body.team_name;
  const address = req.body.address;
  const vs_count = req.body.vs_count;
  
  connection.query(
    "insert into matchlist(user_email, team_name, ground_name, r_date, r_time, ground_num, match_success, address, vs_count) values (?,?,?,?,?,?,?,?,?)", [user_email, team_name, ground_name, r_date, r_time, ground_num, 0, address, vs_count],
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

// 경기장(날짜)별 예약정보 불러오기
app.post("/manage/ground/reservation", (req,res)=>{
  const ground_name = req.body.ground_name;
  const r_date = req.body.r_date;
  const r_time = req.body.r_time;
  console.log(ground_name + r_date + r_time);

  connection.query(
      "select * from reservation where ground_name = ? and r_date = ? and r_time = ?", [ground_name, r_date, r_time],
  function(err,rows,fields){
      if(err){
          console.log("예약정보 불러오기 실패" + err);
      }else{
          console.log("예약정보 불러오기 성공");
          res.send(rows);
      };
  });
});

// 경기장 예약 삭제
app.post("/manage/ground/reservationcancel", (req,res)=>{
  const r_no = req.body.r_no;

  connection.query(
      "delete from reservation where r_no = ?",[r_no],
  function(err,rows,fields){
      if(err){
          console.log("예약코드 : " + r_no + " 예약 삭제 실패" + err);
      }else{
          console.log("예약코드 : " + r_no + " 예약 삭제 완료");
          res.send({msg:"예약코드 : " + r_no + " 예약 삭제 완료"});
      };
  });
});

// 관리자가 직접 예약하기
app.post("/manage/ground/reservationmanager", (req,res)=>{
  const ground_name = req.body.ground_name;
  const r_date = req.body.r_date;
  const r_time = req.body.r_time;
  const ground_num = req.body.ground_num;
  const reservation_name = req.body.reservation_name;
  console.log(ground_name + ", " + r_date + ", " + r_time + ", " + ground_name, + ", " + reservation_name);

  connection.query(
      "insert into reservation(ground_name, ground_num, user_email, r_date, r_time) values(?,?,?,?,?)", [ground_name, ground_num, reservation_name , r_date, r_time],
  function(err,rows,fields){
      if(err){
          console.log("관리자 예약 실패" + err);
      }else{
          res.send({msg: "예약자 이름 : " + reservation_name + " 날짜 : " + r_date + " 시간 : " + r_time + "타임 예약완료"});
      };
  });
});

// 경기장 정보 불러오기
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

// 경기장 정보 등록
const storage_register = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, "../public/groundimage/");
  },
  filename : function(req, file, cb) {
    cb(null, "groundimage" + Date.now() + file.originalname);
  }
});

var upload_register = multer({ storage : storage_register }); 

app.post('/ground/info/register', upload_register.single('photo'), function(req, res, next){
  console.log('/ground/info/register', req.body);
  console.log(req.file);
  console.log(req.file.filename);
  console.log(req.body.ground_name);

  const ground_name = req.body.ground_name;
  const ground_count = req.body.ground_count;
  const address = req.body.address;
  const manager_id = req.body.manager_id;
  const photo = "groundimage/"+req.file.filename;
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

// 경기장 정보 수정(사진이 수정됐을 때)
const storage_modify = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, "../public/groundimage/");    
  },
  filename : function(req, file, cb) {
    cb(null, "groundimage" + Date.now() + file.originalname);
  }
});

var upload_modify = multer({ storage : storage_modify }); 

app.post('/ground/info/modify/photo', upload_modify.single('photo'), function(req, res, next){
  const ground_name = req.body.ground_name;
  const ground_count = req.body.ground_count;
  const address = req.body.address;
  const photo = "groundimage/"+req.file.filename;
  const phonenum = req.body.phonenum;
  const price = req.body.price;
  const parking_lot = req.body.parking_lot;
  const shower_room = req.body.shower_room;
  const foot_rent = req.body.foot_rent;
  const wifi = req.body.wifi;
  const ball_rent = req.body.ball_rent;
  const uniform_rent = req.body.uniform_rent;
  
  connection.query("update groundinfo set ground_count = ?, address = ?, photo = ?, phonenum = ?, price = ?, parking_lot = ?, shower_room = ?, foot_rent = ?, wifi = ?, ball_rent = ?, uniform_rent = ? where ground_name = ?",[ground_count, address, photo, phonenum, price, parking_lot, shower_room, foot_rent, wifi, ball_rent, uniform_rent, ground_name],
  function(err, rows, fields){
    if(err){
      console.log("경기장 정보 수정(사진수정) 실패" + err);
      res.send({msg:"경기장 등록에 실패했습니다. 경기장 이름을 변경해주세요."});
    } else {
      console.log("경기장 정보 수정(사진수정) 성공");
      res.send({msg:"경기장 정보 수정(사진수정)이 완료되었습니다.", success:1});
    }
  });
  
});

// 경기장 정보 수정(사진이 수정되지 않았을 때)
app.post('/ground/info/modify/notphoto', form_data.array(), function(req, res){
  const ground_name = req.body.ground_name;
  const ground_count = req.body.ground_count;
  const address = req.body.address;
  const phonenum = req.body.phonenum;
  const price = req.body.price;
  const parking_lot = req.body.parking_lot;
  const shower_room = req.body.shower_room;
  const foot_rent = req.body.foot_rent;
  const wifi = req.body.wifi;
  const ball_rent = req.body.ball_rent;
  const uniform_rent = req.body.uniform_rent;
  
  connection.query("update groundinfo set ground_count = ?, address = ?, phonenum = ?, price = ?, parking_lot = ?, shower_room = ?, foot_rent = ?, wifi = ?, ball_rent = ?, uniform_rent = ? where ground_name = ?",[ground_count, address, phonenum, price, parking_lot, shower_room, foot_rent, wifi, ball_rent, uniform_rent, ground_name],
  function(err, rows, fields){
    if(err){
      console.log("경기장 수정 실패" + err);
      res.send({msg:"경기장 정보 수정에 실패했습니다. 내용을 다시 확인해주세요."});
    } else {
      console.log("경기장 수정 성공");
      res.send({msg:"경기장 정보 수정이 완료되었습니다.", success:1});
    }
  });
});

// 경기장 정보 불러오기
app.post("/ground/info/modify", (req, res) =>{
  const manager_id = req.body.manager_id;

  connection.query("select * from groundinfo where manager_id = ?", [manager_id],
  function(err, rows, fields){
    if(err){
      console.log("경기장 정보 불러오기 실패" + err);
    } else {
      res.send(rows);
      console.log("경기장 정보 불러오기 성공");
    }
  });
});

// 경기장 삭제
app.post("/ground/info/modify/delete", (req, res) =>{
  const ground_name = req.body.ground_name;
  console.log(ground_name);

  connection.query("delete from groundinfo where ground_name = ?", [ground_name],
  function(err, rows, fields){
    if(err){
      console.log("경기장 정보 삭제하기 실패" + err);
    } else {
      res.send({msg:"경기장이 성공적으로 삭제되었습니다."});
      console.log("경기장 정보 삭제하기 성공");
    }
  });

});


// 내 정보 불러오기
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

// 내 정보 수정하기
const myinfo_storage = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, "../public/profileimage/");    
  },
  filename : function(req, file, cb) {
    cb(null, "profile_image" + Date.now() + file.originalname);
  }
});

var myinfo_upload = multer({ storage : myinfo_storage });

app.post("/myinfo/modify", myinfo_upload.single("profile_image"), (req,res)=>{
  connection.query(
    "UPDATE users set profile_image = ?, mobile = ?, height = ?, position = ?, introduce = ? where email=?",["profileimage/"+req.file.filename, req.body.mobile, req.body.height, req.body.position, req.body.introduce, req.body.email],
function(err,rows,fields){
    if(err){
        console.log(err);
    }else{
        //console.log("성공");
    };
});
});


// 팀 정보 만들기
const teaminfo_storage = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, "../public/teamlogo/");    
  },
  filename : function(req, file, cb) {
    cb(null, "team_image" + Date.now() + file.originalname);
  }
});

var teaminfo_upload = multer({ storage : teaminfo_storage });

app.post("/team/team_make", teaminfo_upload.single("team_image"), (req,res)=>{
  console.log(req.body);
  connection.query(
    "insert into Team (team_image, team_name, team_date, team_class, team_introduce, team_manage_name, activity_area, team_age) values(?,?,?,?,?,?,?,?)",
    [
      "teamlogo/" + req.file.filename,
      req.body.team_name,
      req.body.team_date,
      req.body.team_class,
      req.body.team_introduce,
      req.body.team_manage_name,
      req.body.activity_area,
      req.body.team_age,
    ],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        res.send({msg:"클럽 생성이 완료되었습니다.", success:1, team_name:req.body.team_name});
        //console.log("성공");
      }
    }
  );
});

// 팀 정보 수정하기
app.post("/team/modify", teaminfo_upload.single("team_image"), (req,res)=>{
  console.log(req.body);
  connection.query(
    "update Team set team_image=?, team_class=?, team_introduce=?, team_age=? where team_name = ?",
    [
      "teamlogo/" + req.file.filename,
      req.body.team_class,
      req.body.team_introduce,
      req.body.team_age,
      req.body.team_name,
    ],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        res.send({msg:"클럽 수정이 완료되었습니다."});
        //console.log("성공");
      }
    }
  );
});

// 메인 팀정보 불러오기
app.post("/team/info", (req, res) =>{
  const user_email = req.body.user_email;

  connection.query("select team_name, team_image, team_count, win, lose, date_format(team_date, '%Y-%m-%d') AS 'team_date', team_class, team_introduce, team_manage_name, team_age, activity_area from Team where team_name = (select team_name from users where email = ?)", [user_email],
  function(err, rows, fields){
    if(err){
      console.log("팀 정보 불러오기 실패" + err);
    } else {
      res.send(rows);
      console.log("팀 정보 불러오기 성공");
    }
  });
});

// 팀정보 불러오기
app.post("/team/teaminfo", (req, res) =>{
  const user_email = req.body.user_email;
  const team_name = req.body.team_name;

  connection.query("select *from Team, users where Team.team_manage_name = (select team_manage_name from Team where team_name=?) and users.email = (select team_manage_name from Team where team_name=?)", [team_name, team_name],
  function(err, rows, fields){
    if(err){
      console.log("팀 정보 불러오기 실패" + err);
    } else {
      res.send(rows);
      console.log(rows);
      console.log("팀 정보 불러오기 성공");
    }
  });
});

// 팀리스트 불러오기
app.post("/team/teamlist", (req, res) =>{

  connection.query("select *from Team ", [],
  function(err, rows, fields){
    if(err){
      console.log("팀 정보 불러오기 실패" + err);
    } else {
      res.send(rows);
      console.log(rows);
      console.log("팀 정보 불러오기 성공");
    }
  });
});


// 클럽 가입신청
app.post("/team/teamapply", (req, res) =>{
  const team_name = req.body.team_name;

  connection.query("select *from teamapply where team_name=?",[team_name],
  function(err, rows, fields){
    if(err){
      console.log("클럽 가입신청정보 조회 실패" + err);
    } else {
      res.send(rows);
      console.log(rows);
      console.log("클럽 가입신청정보 조회 성공");
    }
  })
})

// 클럽 탈퇴하기
app.post("/team/delete", (req, res) =>{
  const user_email = req.body.user_email;

  connection.query("update users set team_name = 'none' where email = ?", [user_email],
  function(err, rows, fields){
    if(err){
      console.log("클럽 탈퇴 실패" + err);
    } else {
      res.send({msg:"클럽이 성공적으로 탈퇴되었습니다."});
      console.log("클럽 정보 탈퇴 성공");
    }
  });
});

// 클럽 삭제하기
/*
app.post("/team/modify/delete", (req, res) =>{
  const team_name = req.body.team_name;
  console.log(team_name);

  connection.query("delete from Team where team_name = ?", [team_name],
  function(err, rows, fields){
    if(err){
      console.log("클럽 정보 삭제하기 실패" + err);
    } else {
      res.send({msg:"클럽이 성공적으로 삭제되었습니다."});
      console.log("클럽 정보 삭제하기 성공");
    }
  });
});
*/

// 클럽원 불러오기
app.post("/team/member", (req, res) =>{
  const team_name = req.body.team_name;
  connection.query("select *from users where team_name = ? order by FIELD(position, 'FW', 'MF', 'DF', 'GK'), user_name desc ", [team_name],
  function(err, rows, fields){
    if(err){
      console.log("1성공");
    } else {
      res.send(rows);
    }
  });
});

// 매치리스트 불러오기
app.post("/matchlist", (req, res) =>{
  const r_date = req.body.r_date;
  const r_time = req.body.r_time;
  const address = req.body.address;
  const today = new Date();
  const today_date = today.getFullYear() + "-" +((today.getMonth()+1) < 10 ? "0" + (today.getMonth()+1) : today.getMonth()+1) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());
  
  if(r_date === today_date){
    connection.query("select a.*, b.team_class from matchlist as a, Team as b where r_date like ? and address like ? and r_time > ? and a.team_name = b.team_name order by match_success asc", [r_date, address, r_time],
    function(err, rows, fields){
    if(err){
      console.log("매치리스트 정보 불러오기 실패" + err);
    } else {
      res.send(rows);
      console.log("매치리스트 정보 불러오기 성공");
    }
    });
  }
  else{
    connection.query("select a.*, b.team_class from matchlist as a, Team as b where r_date like ? and address like ? and a.team_name = b.team_name order by match_success asc", [r_date, address],
    function(err, rows, fields){
    if(err){
      console.log("매치리스트 정보 불러오기 실패" + err);
    } else {
      res.send(rows);
      console.log("매치리스트 정보 불러오기 성공");
    }
    });
  }
  
});

// 매치 신청 알림 전송
app.post("/matchlist/matchapplyalert", (req, res) =>{
  const send_id = req.body.send_id;
  const receive_id = req.body.receive_id;
  const title = req.body.title
  const contents = req.body.contents;
  const link = req.body.link;
  
  connection.query("insert into mail(send_id, receive_id, send_date, title, contents, link) values (?, ?, sysdate(), ?, ?, ?)", [send_id, receive_id, title, contents, link],
  function(err, rows, fields){
    if(err){
      console.log("매치신청 실패" + err);
    } else {
      res.send({success:1});
      console.log("매치알림이 성공적으로 전송되었습니다.");
    }
  });
});

// 매치 신청
app.post("/matchlist/matchapply", (req, res) =>{
  const match_num = req.body.match_num;
  const send_id = req.body.send_id;
  const send_team = req.body.send_team;

  connection.query("update matchlist set vs_user_email = ?, vs_team_name = ?, match_success = 1 where match_num = ?", [send_id, send_team, match_num],
  function(err, rows, fields){
    if(err){
      console.log("매치신청 실패" + err);
    } else {
      res.send({success:1});
      console.log("매치가 성공적으로 신청되었습니다.");
    }
  });
});

// 쪽지 갯수 받아오기
app.post("/mail/count", (req, res) =>{
  const user_email = req.body.user_email
  
  connection.query("select count(*) as mailcount from mail where receive_id = ? and readed = 0", [user_email],
  function(err, rows, fields){
    if(err){
      console.log("새쪽지 갯수 받아오기 실패" + err);
    } else {
      res.send(rows);
      console.log("새쪽지 갯수 받아오기 성공");
    }
  });
});

// 쪽지 리스트 받아오기
app.post("/mail/list", (req, res) =>{
  const user_email = req.body.user_email
  
  connection.query("select * from mail where receive_id = ? order by mail_no desc", [user_email],
  function(err, rows, fields){
    if(err){
      console.log("쪽지 리스트 받아오기 실패" + err);
    } else {
      res.send(rows);
    }
  });
});

// 알림 읽었을 때 읽음 표시
app.post("/mail/read", (req, res) =>{
  const user_email = req.body.user_email
  
  connection.query("update mail set readed = 1 where receive_id = ?", [user_email],
  function(err, rows, fields){
    if(err){
      console.log(user_email + "님의 메일 확인여부 확인 실패" + err);
    } else {
      console.log(user_email + "님이 메일을 모두 확인함");
    }
  });
});

// 진행중인 매칭
app.post("/matchinfo/matchinglist", (req, res) => {
  const email = req.body.id;
  const r_time = req.body.r_time;
  connection.query("select *from matchlist where (user_email = ? or vs_user_email = ?) and match_success = 1 and (date(r_date) > date_format(now(), '%Y-%m-%d') or (date(r_date) = date_format(now(), '%Y-%m-%d') and r_time > ?));",[email, email,r_time],
  function(err, rows, fields){
    if(err){
    } else {
      res.send(rows);
      console.log("진행중인 매칭 불러오기");
    }
  });
});

// 매칭 취소
app.post("/matchinfo/matchcancel", (req, res) => {
  const match_num = req.body.match_num;
  connection.query("update matchlist set match_success = 0 where match_num = ?",[match_num],
  function(err, rows, fields){
    if(err){
    } else {
      console.log("매치 취소하기");
      res.send({msg:"취소 되었습니다."});
    }
  });
});

// 대기중인 매칭
app.post("/matchinfo/matchwatelist", (req, res) => {
  const email = req.body.id;
  const r_time = req.body.r_time;
  connection.query("select *from matchlist where (user_email = ? or vs_user_email = ?) and match_success = 0 and (date(r_date) > date_format(now(), '%Y-%m-%d') or (date(r_date) = date_format(now(), '%Y-%m-%d') and r_time > ?));",[email, email,r_time],
  function(err, rows, fields){
    if(err){
    } else {
      res.send(rows);
      console.log("대기중인 매칭 불러오기");
    }
  });
});

// 예약 취소
app.post("/matchinfo/matchdelete", (req, res) => {
  const match_num = req.body.match_num;
  connection.query("update matchlist set match_success = 0 where match_num = ?",[match_num],
  function(err, rows, fields){
    if(err){
    } else {
      console.log("매치 취소하기");
      res.send({msg:"취소 되었습니다."});
    }
  });
});

// 지난 매칭
app.post("/matchinfo/matchedlist", (req, res) => {
  const email = req.body.id;
  const r_time = req.body.r_time;
  connection.query("select *from matchlist where (user_email = ? or vs_user_email = ?) and match_success = 1 and (date(r_date) < date_format(now(), '%Y-%m-%d') or (date(r_date) = date_format(now(), '%Y-%m-%d') and r_time < ?))",[email, email,r_time],
  function(err, rows, fields){
    if(err){
    } else {
      res.send(rows);
      console.log("지난 매칭 불러오기");
    }
  });
});

// 공지사항 리스트
app.post("/notice/list", (req, res) =>{

  connection.query("select *from notice order by _id desc",
  function(err, rows, fields){
    if(err){
    } else {
      res.send(rows);
    }
  });
});

// 공지사항 글작성
app.post("/notice/write", form_data.array(), function(req, res){
  const title = req.body.title;
  const content = req.body.content;

  connection.query("insert into notice (title, content) values(?, ?)",[title, content],
  function(err, rows, fields){
    if(err){
    } else {
      console.log("글작성 성공");
      res.send({msg:"작성 완료"});
    }
  });
});

// 공지사항 글삭제
app.post("/notice/delete", (req, res)=>{
  console.log(req.body.id);
  connection.query("delete from notice where _id = ?",[req.body.id],
  function(err, rows, fields){
    if(err){
    } else {
      console.log("글삭제 성공");
      res.send({msg:"삭제 완료"});
    }
  });
});


// 진행중인 경기장예약 내역 불러오기
app.post("/pastreservation/current", (req, res)=>{
  var user_email = req.body.user_email;
  var r_time = req.body.r_time;
  
  connection.query("select a.*, b.photo, b.address, b.manager_id from reservation a, groundinfo b where a.user_email = ? and (date(a.r_date) > date_format(now(), '%Y-%m-%d') or (date(a.r_date) = date_format(now(), '%Y-%m-%d') and a.r_time > ?)) and a.ground_name = b.ground_name", [user_email, r_time],
  function(err, rows, fields){
    if(err){
      console.log("현재 경기장 예약 내역 불러오기 실패 " + err)
    } 
    else {
      console.log("현재 경기장 예약 내역 불러오기 성공")
      res.send(rows);
    }
  });
});

// 지난 경기장예약 내역 불러오기
app.post("/pastreservation/past", (req, res)=>{
  var user_email = req.body.user_email;
  var r_time = req.body.r_time;
  
  connection.query("select a.r_no, a.ground_name, a.ground_num, a.user_email, a.r_date, a.r_time, b.photo, b.address from reservation a, groundinfo b where a.user_email = ? and (date(a.r_date) < date_format(now(), '%Y-%m-%d') or (date(a.r_date) = date_format(now(), '%Y-%m-%d') and a.r_time <= ?)) and a.ground_name = b.ground_name order by r_date desc", [user_email, r_time],
  function(err, rows, fields){
    if(err){
      console.log("현재 경기장 예약 내역 불러오기 실패 " + err)
    } 
    else {
      console.log("현재 경기장 예약 내역 불러오기 성공")
      res.send(rows);
    }
  });
});

app.post("/mainscreen/matchlist", (req, res)=>{
  const r_time = req.body.r_time

  connection.query("select * from matchlist where date(r_date) > date_format(now(), '%Y-%m-%d') or (date(r_date) = date_format(now(), '%Y-%m-%d') and r_time > ?) order by r_date Limit 3", [r_time],
  function(err, rows, fields){
    if(err){
      console.log("메인화면 매치리스트 불러오기 실패" + err)
    } 
    else {
      console.log("메인화면 매치리스트 불러오기 성공")
      res.send(rows);
    }
  });
});



app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
});
