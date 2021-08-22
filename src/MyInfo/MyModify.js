import React, { Component, useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import MainLogo from '../MainScreen/MainHeader/MainLogo';
import { Autorenew } from '@material-ui/icons';
import { withRouter,Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';




const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#cfe8fc',
  },

  text: {
    textAlign : 'center',
  },
  image:{    
      width: theme.spacing(15),
      height: theme.spacing(15),
      margin: '0 auto',
  },

  intro: {

  },

  button: {
    background: 'gray',
    borderRadius: 3,
    color: 'white',
    border: '1px solid black',
    height: 48,
    padding: '0 50px',
  },

}));

function SimpleContainer({history}) {
  
  const classes = useStyles();

  const [info, setinfo] = useState({
    profile_image : '',
    user_name : '',
    birthyear : '',
    height : '',
    mobile : '',
    position : '',
    team_name : '',
    id : window.sessionStorage.getItem('id'),
});

//정보 API
const myinfomation = () => {
  fetch("http://localhost:3001/myinfo", {
      method : "post",
      headers : {
          "content-type" : "application/json",
      },
      body : JSON.stringify(info),
  })
  .then((res)=>res.json())
  .then((json)=>{
      setinfo({
          profile_image : json[0].profile_image,
          user_name : json[0].user_name,
          birthyear : json[0].birthyear,
          height : json[0].height,
          mobile : json[0].mobile,
          position : json[0].position,
          team_name : json[0].team_name,
          introduce : json[0].introduce,
          id : info.id,
      });
      console.log(json);            
  })
}

const changeon = (e) => {
  setinfo({
    profile_image : info.profile_image,
    user_name : info.user_name,
    birthyear : info.birthyear,
    height : document.getElementById("height").value,
    mobile : document.getElementById("mobile").value,
    position : info.position,
    team_name : info.team_name,
    introduce : document.getElementById("introduce").value,
    id : info.id,
})
}

useEffect(() => {
  myinfomation();
}, [])


//수정API
const mymodify = () => {
  
  fetch("http://localhost:3001/myinfo/modify", {
        method : "post",
        headers : {
            "content-type" : "application/json",
        },
        body : JSON.stringify(info),
    })
    .then((res)=>res.json())
    .then((json)=>{
      
    });
    history.push("/myinfo");
}

  return (
    <React.Fragment>
      <CssBaseline />      
      <Container>      
        <Typography component="div" className={classes.root}>
        <MainLogo />
        <Container className={classes.root}>
        <div className={classes.image}>
        <Avatar src="{info.profile_image}" className={classes.image} />
        </div>
        </Container>
        <br/>
        <Container className={classes.text}>
        <div>
        이름 : {info.user_name} / 출생년도 : {info.birthyear}<br/>
        팀이름 : {info.team_name}<br/>
        <hr/>
        전화번호 : <input onChange={changeon} id="mobile" defaultValue={info.mobile}/><br/>
        키 : <input onChange={changeon} id="height" defaultValue={info.height}/><br/>
        
        
        </div>
        <hr/>
        <TextField
          id="introduce"
          label="자기소개"
          multiline
          rows={5}
          defaultValue={info.introduce}
          variant="filled"
          fullWidth
          onChange={changeon}
        />
        
        </Container>
        
        <br/>
        </Typography>
        
        
        <button className={classes.button} onClick={()=>{mymodify()}}>수정완료</button>
        
        </Container>
    </React.Fragment>
  );
}


export default withRouter(SimpleContainer);