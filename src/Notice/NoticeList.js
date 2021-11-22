import React, { Component, useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import '../font/font.css';

export default function ControlledAccordions() {
  const [expanded, setExpanded] = useState(false);
  const [getnotice, setgetnotice] = useState({
    list : '',
  })

  const handleChange = (panel) => (event, isExpanded) => {
    if(!expanded){
      setExpanded(panel);
    }else{
      setExpanded(false);
    }
  };

  const deletnotice = (data_id) => {
    fetch("http://smartit-16.iptime.org:3001/notice/delete", {
      method: "post", //통신방법
      headers: {
          "content-type": "application/json",
      },
      body: JSON.stringify({id : data_id}),
  })
      .then((res) => res.json())
      .then((res) => {
        window.location.replace('/notice');
      });
  }

  const noticegetlist = () => {
    fetch("http://smartit-16.iptime.org:3001/notice/list", {
          method: "post", //통신방법
          headers: {
              "content-type": "application/json",
          },
          body: JSON.stringify(),
      })
          .then((res) => res.json())
          .then((res) => {
            if (res.length === 0) {
              setgetnotice({
                list: (
                  <Typography
                    key="no_match"
                    component="h2"
                    variant="h5"
                    style={{ textAlign: "center", marginTop: 20 }}
                  >
                    아직 공지사항이 없어요 ㅠㅠ
                  </Typography>
                ),
              });
              return;
            }
            setgetnotice({
              list : res.map((data) => 
              <Accordion key={data._id} expanded={expanded === data._id} onChange={handleChange(data._id)} style={{margin:5, width:"100%"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '80%', flexShrink: 0 }} style={{fontFamily:'Jua', fontSize:18}}>
                  {data.title}
                </Typography>        
                <Typography sx={{ color: 'text.secondary' }} style={{fontFamily:'Gamja_Flower'}}>{data.author}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{fontFamily:'Gamja_Flower'}}>
                  {data.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
            )
            })
          });
  }

  useEffect(() => {
    noticegetlist();
},[expanded])

  return (
    <div>
      <Grid
        container
        justifyContent="center"
      >
        {getnotice.list}
      </Grid>
    </div>
  );
}