import React, { useState, useEffect } from "react";
import {
    Button,
    Grid,
    Container,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import MainLogo from "../MainScreen/MainHeader/MainLogo";

export default function TeamMobileApply({ location, history }) {

    //체크박스 유무확인
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    // 오늘날짜
    let today_date = new Date();
    let year = today_date.getFullYear();

    // 내 정보 데이터 불러오기
    const [myinfo, setmyinfo] = useState({
        email: window.sessionStorage.getItem("id"),
        user_name: "",
        age: "",
        position: "",
        team_name: location.state.teamkey,
        introduce: "",
    });

    const myinfomation = () => {
        fetch("http://smartit-16.iptime.org:3001/myinfo", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(myinfo),
        })
            .then((res) => res.json())
            .then((json) => {
                setmyinfo({
                    team_name: myinfo.team_name,
                    user_name: json[0].user_name,
                    age: year - json[0].birthyear + 1,
                    position: json[0].position,
                    email: myinfo.email,
                    introduce: "",
                });

            });
    };


    // 가입신청버튼
    const [applydata, setapplydata] = useState({
        introduce: '',
    });


    const applybutton = () => {
        fetch("http://smartit-16.iptime.org:3001/findteam/applybutton", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(myinfo),
        })
            .then((res) => res.json())
            .then((json) => {
                alert("가입 신청이 완료되었습니다.");
                applymail();
                history.push("/");
            });

    };

    const applymail = () => {
        fetch("http://smartit-16.iptime.org:3001/matchlist/matchapplyalert", {
            method: "POST", // 통신방법
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                send_id: window.sessionStorage.getItem("id"),
                receive_id: location.state.team_manage,
                title: "가입 신청",
                link: "http://smartit-16.iptime.org:3000/teamnot",
                contents:
                    window.sessionStorage.getItem("id") +
                    " 님이 " +
                    myinfo.team_name +
                    "클럽에 가입을 신청하였습니다.",
            }),
        })
            .then((res) => res.json())
            .then((res) => { });
    }

    //자기소개 글 벨류
    const onChange = (e) => {
        setmyinfo({
            ...myinfo,
            introduce: e.target.value,
        });
    };

    useEffect(() => {
        myinfomation();
    }, []);

    return (
        <React.Fragment>
            <MainLogo />
            <Container
                maxWidth="md"
                style={{ minHeight: "100vh", height: "100%", paddingTop: 20 }}
            >
                <Grid container direction="column">
                    <h1>클럽 가입신청서</h1>
                </Grid>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    item
                    xs
                >

                </Grid>
                <Grid container justifyContent="center" alignItems="center" item xs>
                    <Table sx={{ width: "100%" }} aria-label="simple table">
                        <TableBody>
                            <TableRow
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >

                                <TableCell>
                                    <TextField
                                        id="team_name"
                                        name="team_name"
                                        label="클럽명"
                                        variant="outlined"
                                        value={myinfo.team_name}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        style={{ marginTop: 4, width: "100%" }}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >

                                <TableCell>
                                    <TextField
                                        id="user_name"
                                        name="user_name"
                                        label="이름"
                                        variant="outlined"
                                        value={myinfo.user_name}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        style={{ marginTop: 4, width: "100%" }}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >

                                <TableCell>
                                    <TextField
                                        id="age"
                                        name="age"
                                        label="이름"
                                        variant="outlined"
                                        value={myinfo.age}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        style={{ marginTop: 4, width: "100%" }}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >

                                <TableCell>
                                    <TextField
                                        id="position"
                                        name="position"
                                        label="포지션"
                                        variant="outlined"
                                        value={myinfo.position}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        style={{ marginTop: 4, width: "100%" }}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >

                                <TableCell>
                                    <TextField
                                        id="introduce"
                                        name="introduce"
                                        variant="outlined"
                                        label="클럽 소개"
                                        multiline
                                        rows={7}
                                        defaultValue={myinfo.introduce}
                                        onChange={onChange}
                                        style={{ width: "100%", marginTop: 4 }}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChange}
                                    variant="outlined"
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                            }
                            label="내 정보를 클럽장에게 제공하는 것을 동의합니다."
                        />
                    </Grid>
                    <Grid item xs>
                        {checked === true ? (
                            <Button
                                variant="outlined"
                                color="primary"
                                size="large"
                                onClick={applybutton}
                                fullWidth
                            >
                                가입신청하기
                            </Button>
                        ) : (
                            <Button variant="outlined" color="primary" size="large" disabled fullWidth>
                                가입신청하기
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}
