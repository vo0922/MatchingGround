import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import { withRouter } from "react-router-dom";
import {
    Container,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Button,
    Modal,
} from "@material-ui/core";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import TeamApplyModal from "./TeamApplyModal";
import { BrowserView, MobileView } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 36,
        textAlign: "center",
    },
    photo: {
        height: 256,
        width: 256,
        alignItems: "center",
    },
    data: {
        fontSize: 20,
    },
    title_introduce: {
        textAlign: "center",
        fontSize: 28,
    },
    introduce: {
        fontSize: 20,
    },
    table: {
        minWidth: 650,
    },
}));

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: 450,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function TeamDetail({ location, history }) {
    const classes = useStyles();

    const [teaminfo, setteaminfo] = useState({
        team_name: location.state.teamkey,
        team_manage_name: '',
        team_image: '',
        team_date: '',
        activity_area: '',
        team_class: '',
        team_age: '',
        team_introduce: '',
    });

    const teamdetail = () => {
        fetch("http://localhost:3001/team/teamdetail", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(teaminfo),
        })
            .then((res) => res.json())
            .then((json) => {
                setteaminfo({
                    team_name: teaminfo.team_name,
                    team_manage_name: json[0].team_manage_name,
                    team_image: '../' + json[0].team_image,
                    team_date: json[0].team_date,
                    activity_area: json[0].activity_area,
                    team_class: json[0].team_class,
                    team_age: json[0].team_age,
                    team_introduce: json[0].team_introduce,
                })
            });
    }
    function createData(name, content) {
        return { name, content };
    }
    const rows = [
        createData("클럽명 ", teaminfo.team_name),
        createData("클럽장 ", teaminfo.team_manage_name),
        createData("클럽 생성일 ", teaminfo.team_date),
        createData("활동지역 ", teaminfo.activity_area),
        createData("클럽 수준 ", teaminfo.team_class),
        createData("클럽 연령대 ", teaminfo.team_age),
    ];

    //가입 신청 버튼
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const mobilebutton = () => {
        history.push({
            pathname: "/findteam/teamdetail/apply",
            state: {
              teamkey: teaminfo.team_name,
              team_manage : teaminfo.team_manage_name,
            },
          });
    }


    useEffect(() => {
        teamdetail();
    }, []);



    return (
        <React.Fragment>
            <MainLogo />
            <Container
                maxWidth="md"
                style={{ height: "100%", minHeight: "100vh", paddingTop: 20 }}
            >
                <Grid container spacing={3}>
                    <Grid
                        item
                        xs
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Avatar src={teaminfo.team_image} className={classes.photo} />
                    </Grid>
                    <Grid item xs>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{row.content}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="div" variant="h5">
                            클럽소개
                        </Typography>
                        <TextField
                            multiline
                            fullWidth
                            rows={4}
                            defaultValue={teaminfo.team_introduce}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Grid item xs={2}>
                            <BrowserView>
                                {window.sessionStorage.getItem("team_name") ===
                                    "none" ?
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        onClick={handleOpen}
                                    >
                                        가입신청하기
                                    </Button>
                                    : null}
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <TeamApplyModal />
                                    </Box>
                                </Modal>
                            </BrowserView>
                            <MobileView>
                                {window.sessionStorage.getItem("team_name") ===
                                    "none" ?
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        onClick={mobilebutton}
                                    >
                                        가입신청하기
                                    </Button>
                                    : null}
                            </MobileView>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default withRouter(TeamDetail);
