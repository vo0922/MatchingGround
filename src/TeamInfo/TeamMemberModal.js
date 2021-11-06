import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from "@material-ui/core";

const useStyles = makeStyles({
    
});

export default function TeamMember({history}) {
    const classes = useStyles();

    const [info, setinfo] = useState({
        team_name: window.sessionStorage.getItem("team_name"),
        email: window.sessionStorage.getItem("id"),
    });

    const [tablelist, settablelist] = useState({
        list: <TableRow>
            <TableCell component="th"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
        </TableRow>,
    });

    let today_date = new Date();
    let year = today_date.getFullYear();

    const assignclick = (data) => {
        fetch("http://localhost:3001/team/member/assign", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                user_no : data.user_no,
                email : window.sessionStorage.getItem('id'),
            }),
        })
            .then((res)=> res.json())
            .then((json) =>{
                alert(data.user_name + "클럽장 위임이 완료되었습니다.")
                window.location.replace('/team');
            })            
    }

    const deleteclick = (data) => {
        fetch("http://localhost:3001/team/member/delete", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ user_no : data.user_no }),
        })
            .then((res)=> res.json())
            .then((json) =>{
                alert(data.user_name + "클럽원 제명이 완료되었습니다.")
                window.location.replace('/team');
            })
    }


    // 클럽원 불러오기
    const Member = () => {
        fetch("http://localhost:3001/team/member", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(info),
        })
            .then((res) => res.json())
            .then((json) => {
                settablelist({
                    list: json.map((data) => (
                        <TableRow key={data.user_no}>
                            <TableCell component="th">{data.user_name}</TableCell>
                            <TableCell align="right">{year - data.birthyear + 1}</TableCell>
                            <TableCell align="right">{data.height}</TableCell>
                            <TableCell align="right">{data.position}</TableCell>
                            <TableCell align="right"><Button style={{ margin:10 }} onClick={()=>assignclick(data)} variant="contained" color="primary">위임</Button><Button style={{ margin:10 }} onClick={()=>deleteclick(data)} variant="contained" color="primary">제명</Button></TableCell>
                        </TableRow>
                    )),
                });
            });
    };

    useEffect(() => {
        Member();
    }, []);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell align="right">나이</TableCell>
                            <TableCell align="right">키</TableCell>
                            <TableCell align="right">포지션</TableCell>
                            <TableCell align="right">위임하기 or 제명하기</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{tablelist.list}</TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}