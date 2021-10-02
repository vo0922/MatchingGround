import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog({history}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onnotice = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", e.target.title.value)
    formData.append("content", e.target.content.value)

    fetch("http://localhost:3001/notice/write", {
        method: "post",
        body: formData,
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            setOpen(false);
            window.location.replace("/notice")
        });
  }

  return (
    <div>
    {window.sessionStorage.getItem('id') === "vo0922@naver.com"? <Button variant="outlined" onClick={handleClickOpen}> 글쓰기 </Button> : null}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
    <form onSubmit={onnotice}   
      noValidate
      autoComplete="off"
      encType="multipart/form-data">
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              글쓰기
            </Typography>
            <Button autoFocus color="inherit" type="submit">
              저장
            </Button>
          </Toolbar>
        </AppBar>
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        >
        <TextField
        label="제목"
        focused
        style={{width:'100ch', marginTop:50}}
        name="title"
        />
        <TextField
          id="outlined-multiline-static"
          label="내용"
          multiline
          rows={10}
          focused
          style={{width:'100ch', marginTop:50}}          
          name="content"
        />
        </Grid>
        </form>
      </Dialog>
    </div>
  );
}

export default withRouter(FullScreenDialog)