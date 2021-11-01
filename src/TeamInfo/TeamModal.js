import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid } from "@material-ui/core";

export default function DataTable() {
  const columns = [
    { field: "email", headerName: "email", width: 200 },
    { field: "user_name", headerName: "user_name", width: 150 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 130,
    },
    { field: "position", headerName: "position", width: 150 },
    { field: "introduce", headerName: "introduce", width: 750 },
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
        
        console.log(json);
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
        <Grid item xs={1}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
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
            //onClick={nobutton}
          >
            가입거절
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
