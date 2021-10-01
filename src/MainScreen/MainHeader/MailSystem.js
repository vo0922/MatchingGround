import { React, useState, useEffect, Fragment } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function MailSystem() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    getMailList();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        setmailList({
          body: res.map((res) => (
            <div key={res.mail_no}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={<Typography style={{fontSize:14, fontWeight:"bold", marginBottom:5}}>{res.title}</Typography>}
                  secondary={
                    <Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        신청자 : {res.send_id}<br/>
                      </Typography>
                      {res.contents}
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
          sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}
        >
          {mailList.body}
        </List>
      </Popover>
    </div>
  );
}
