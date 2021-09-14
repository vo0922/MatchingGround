import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



function createData(date, ground, matchteam, score) {
  return { date, ground, matchteam, score };
}


const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 67),
  createData('Gingerbread', 356, 16.0, 49),
];

export default function BasicTable() {
  const classes = useStyles();

  const [tabledata, settabledata] = useState({
    date: '',
    ground: '',
    matchteam: '',
    score: '',
    email : window.sessionStorage.getItem('id'),
})

// 전적 API




  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>날짜</TableCell>
            <TableCell align="right">경기장</TableCell>
            <TableCell align="right">경기팀</TableCell>
            <TableCell align="right">스코어</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.date}>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.ground}</TableCell>
              <TableCell align="right">{row.matchteam}</TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}