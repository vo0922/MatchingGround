import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid, Modal, Box } from "@material-ui/core";


export default function TeamApplyModal() {

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: '60%',
    height: 550,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  

  const columns = [
    { field: "email", headerName: "email", width: 200 },
    { field: "user_name", headerName: "user_name", width: 150 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 100,
    },
    { field: "position", headerName: "position", width: 150 },
    { field: "introduce", headerName: "introduce", width: 400 },
  ];

  const rows = [];

  const [applyrows, setapplyrows] = useState({
    list: '',
  })

  const [teamapply, setteamapply] = useState({
    apply_no: "",
    team_name: window.sessionStorage.getItem("team_name"),
    user_name: "",
    state: "",
    email: "",
    age: "",
    position: "",
    introduce: "",
  });

  const [selectionModel, setselectionModel] = useState();

  const applymanager = () => {
    fetch("http://localhost:3001/team/teamapply", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(teamapply),
    })
      .then((res) => res.json())
      .then((json) => {
        json.map((data) =>
        rows.push({
            id: data.apply_no,
            email: data.email,
            user_name: data.user_name,
            age: data.age,
            position: data.position,
            introduce: data.introduce,
          }),          
        );
        setapplyrows({
        list:<DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          setselectionModel(newSelectionModel);
        }}          
      />    
        })
        
      });
  };


  // 승인 버튼
  const applybutton = () => {    
    fetch("http://localhost:3001/team/apply", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(selectionModel),
    })    
      .then((res) => res.json())
      .then((json) => {        
      });
      alert('클럽원 가입신청이 승인되었습니다.');    
      window.location.replace('/team');
    }

  // 거절 버튼
  const leavebutton = () => {
    fetch("http://localhost:3001/team/leave", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(selectionModel),
    })
      .then((res) => res.json())
      .then((json) => {
      });
      alert('클럽원 가입신청이 거절되었습니다.'); 
      window.location.replace('/team');
  }


  useEffect(()=>{
  }, [selectionModel])

  useEffect(() => {
    applymanager();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      {applyrows.list}
      <br />
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Grid>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            style={{ margin: 10 }}
            onClick={applybutton}
          >
            가입승인
          </Button>          
        </Grid>
        <Grid>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={leavebutton}
          >
            가입거절
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
