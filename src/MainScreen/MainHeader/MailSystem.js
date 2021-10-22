import { React, useState, useEffect, Fragment } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import { fontSize } from "@mui/system";

export default function MailSystem() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    getMailList();
    mailread();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    getMailCount();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // 새 쪽지 개수 받아오기
  const [mailcount, setmailcount] = useState(0);
  const [mailList, setmailList] = useState({
    body: "",
  });

  function getMailCount() {
    fetch("http://localhost:3001/mail/count", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user_email: window.sessionStorage.getItem("id") }),
    })
      .then((res) => res.json())
      .then((res) => {
        setmailcount(res[0].mailcount);
      });
  }

  function getMailList() {
    fetch("http://localhost:3001/mail/list", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user_email: window.sessionStorage.getItem("id") }),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.length === 0){
          setmailList({
            body:
            <Typography style={{fontSize:15, textAlign:"center"}}>알림이 없어요 ㅜ_ㅜ</Typography>
          })
          return;
        }
        setmailList({
          body: res.map((res) => (            
            <div key={res.mail_no}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    !res.readed ? 
                    <div>
                      <Typography color="secondary" style={{fontSize:10}}>새 알림!</Typography>
                      <Typography color="primary" style={{ fontSize:12, marginBottom:5, fontWeight:"bold"}}>{res.title}</Typography>
                    </div>
                   : <Typography color="text.secondary" style={{fontStyle:"italic", fontSize:12, marginBottom:5}}>{res.title}</Typography>}
                  secondary={
                    <Fragment>
                      <Typography
                        sx={{ display: "inline", fontSize:12 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        신청자 : {res.send_id}<br/>
                      </Typography>
                      <Typography
                        sx={{ display: "inline", fontSize:12 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {res.contents}
                      </Typography>
                      <Button href={res.link} size="small">바로가기→</Button>
                    </Fragment>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </div>
          )),
        });
      });
  }

  function mailread(){
    fetch("http://localhost:3001/mail/read", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user_email: window.sessionStorage.getItem("id") }),
    })
      .then((res) => res.json())
      .then((res) => {
        
    });
  }

  useEffect(() => {
    getMailCount();
  }, []);

  return (
    <div>
      <Badge
        badgeContent={mailcount}
        onClick={handleClick}
        color="secondary"
        style={{ marginRight: 20 }}
      >
        <NotificationsIcon color="action" />
      </Badge>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        style={{maxHeight:"50%"}}
      >
        <List
          sx={{ width: "100%", minWidth: 300, bgcolor: "background.paper" }}
        >
          {mailList.body}
        </List>
      </Popover>
    </div>
  );
}
