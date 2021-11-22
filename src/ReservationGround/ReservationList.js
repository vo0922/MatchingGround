import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import { BrowserView, MobileView } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
    margin: 20,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  pos: {
    marginBottom: 12,
  },
  search: {
    width: "95%",
    margin: "auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
function ReservationCard({ history }) {
  const classes = useStyles();
  const [groundinfo, setgroundinfo] = useState({
    list: "",
  });

  //경기장 리스트 가져오기, 경기장 리스트 UI
  function list(city, country, text) {
    fetch("http://smartit-16.iptime.org:3001/reservation/list", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ city: city, country: country, text: text }),
    })
      .then((res) => res.json())
      .then((res) => {
        setgroundinfo({
          list: res.map((data) => (
            <Card
              className={classes.card}
              key={data.ground_name}
              onClick={() => cardclick(data.ground_name)}
            >
              <BrowserView>
                <CardContent>
                    <img
                      src={data.photo}
                      style={{
                        float: "left",
                        marginRight: 20,
                        marginBottom: 15,
                      }}
                      height="120"
                      width="200"
                    />
                    <Typography
                      className={classes.content}
                      variant="h6"
                      component="h2"
                      gutterBottom
                      style={{float: 'left'}}
                    >
                      {data.ground_name}
                    </Typography>
                    <Typography className={classes.content} component="p" align="right" style={{fontSize:24}} >
                      <img
                        src={process.env.PUBLIC_URL + "/icons/nonelike.svg"}
                      />
                      &nbsp;
                      {data.likes}
                    </Typography>
                    <br/>
                  <Typography className={classes.content} color="textSecondary">
                    {data.address}
                  </Typography>
                  <Typography
                    className={classes.content}
                    variant="body2"
                    component="p"
                  >
                    {data.parking_lot === "true" ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ marginRight: 10 }}
                      >
                        주차장
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        disabled
                        style={{ marginRight: 10 }}
                      >
                        주차장
                      </Button>
                    )}
                    {data.shower_room === "true" ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ marginRight: 10 }}
                      >
                        샤워장
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        disabled
                        style={{ marginRight: 10 }}
                      >
                        샤워장
                      </Button>
                    )}
                    {data.foot_rent === "true" ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ marginRight: 10 }}
                      >
                        풋살화
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        disabled
                        style={{ marginRight: 10 }}
                      >
                        풋살화
                      </Button>
                    )}
                    {data.wifi === "true" ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ marginRight: 10 }}
                      >
                        WIFI
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        disabled
                        style={{ marginRight: 10 }}
                      >
                        WIFI
                      </Button>
                    )}
                    {data.ball_rent === "true" ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ marginRight: 10 }}
                      >
                        볼 대여
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        disabled
                        style={{ marginRight: 10 }}
                      >
                        볼 대여
                      </Button>
                    )}
                    {data.uniform_rent === "true" ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ marginRight: 10 }}
                      >
                        유니폼
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        disabled
                        style={{ marginRight: 10 }}
                      >
                        유니폼
                      </Button>
                    )}
                  </Typography>
                </CardContent>
              </BrowserView>
              <MobileView>
                <CardContent>
                  <img
                    src={data.photo}
                    style={{ float: "left", marginRight: 20, marginBottom: 15 }}
                    height="120"
                    width="100%"
                  />
                  <Typography
                    className={classes.content}
                    variant="h6"
                    component="h2"
                    gutterBottom
                  >
                    {data.ground_name}
                    <img
                        src={process.env.PUBLIC_URL + "/icons/nonelike.svg"}
                      />
                      &nbsp;
                      {data.likes}
                  </Typography>
                  <Typography className={classes.content} color="textSecondary">
                    {data.address}
                  </Typography>
                  <Typography
                    className={classes.content}
                    variant="body2"
                    component="div"
                    align="center"
                    style={{ marginTop: 10 }}
                  >
                    {data.parking_lot === "true" ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ marginRight: 10 }}
                      >
                        주차장
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        disabled
                        style={{ marginRight: 10 }}
                      >
                        주차장
                      </Button>
                    )}
                    {data.shower_room === "true" ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ marginRight: 10 }}
                      >
                        샤워장
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        disabled
                        style={{ marginRight: 10 }}
                      >
                        샤워장
                      </Button>
                    )}
                    {data.foot_rent === "true" ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ marginRight: 10 }}
                      >
                        풋살화
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        disabled
                        style={{ marginRight: 10 }}
                      >
                        풋살화
                      </Button>
                    )}
                    <Typography component="div" style={{ marginTop: 10 }}>
                      {data.wifi === "true" ? (
                        <Button
                          variant="outlined"
                          color="primary"
                          style={{ marginRight: 10 }}
                        >
                          WIFI
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          disabled
                          style={{ marginRight: 10 }}
                        >
                          WIFI
                        </Button>
                      )}
                      {data.ball_rent === "true" ? (
                        <Button
                          variant="outlined"
                          color="primary"
                          style={{ marginRight: 10 }}
                        >
                          볼 대여
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          disabled
                          style={{ marginRight: 10 }}
                        >
                          볼 대여
                        </Button>
                      )}
                      {data.uniform_rent === "true" ? (
                        <Button
                          variant="outlined"
                          color="primary"
                          style={{ marginRight: 10 }}
                        >
                          유니폼
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          disabled
                          style={{ marginRight: 10 }}
                        >
                          유니폼
                        </Button>
                      )}
                    </Typography>
                  </Typography>
                </CardContent>
              </MobileView>
            </Card>
          )),
        });
      });
  }
  //경기장 클릭 이벤트
  const cardclick = (cardkey) => {
    history.push({
      pathname: "/reservation/detail",
      state: {
        cardkey: cardkey,
      },
    });
  };

  const [city, setcity] = useState("");
  const [cityname, setcityname] = useState("");
  const [country, setcountry] = useState("");
  const [countrymenu, setcountrymenu] = useState("");
  const [searchtext, setsearchtext] = useState("");

  const handleSelectcity = (e) => {
    setcity(e.target.value);
    setcountry("");
    var address = "";
    if (e.target.value === "전체") {
      address = "";
      list(address, "", "");
      setcountrymenu("");
    } else {
      if (e.target.value === "경상북도") {
        address = "경북";
      } else if (e.target.value === "경상남도") {
        address = "경남";
      } else if (e.target.value === "충청북도") {
        address = "충북";
      } else if (e.target.value === "충청남도") {
        address = "충남";
      } else if (e.target.value === "경기도") {
        address = "경기";
      } else if (e.target.value === "강원도") {
        address = "강원";
      } else if (e.target.value === "전라남도") {
        address = "전남";
      } else if (e.target.value === "전라북도") {
        address = "전북";
      } else if (e.target.value === "제주특별자치도") {
        address = "제주";
      } else {
        address = e.target.value;
      }
      setcityname(address);
      list(address, "", "");
      //시군구 검색api 요청
      fetch("http://smartit-16.iptime.org:3001/reservation/search", {
        method: "POST", // 통신방법
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ address: e.target.value }),
      })
        .then((res) => res.json())
        .then((res) => {
          setcountrymenu(
            res.map((data) => (
              <MenuItem
                key={data.properties.sig_kor_nm}
                value={data.properties.sig_kor_nm}
              >
                {data.properties.sig_kor_nm}
              </MenuItem>
            ))
          );
        });
    }
  };
  const handleSelectcountry = (e) => {
    setcountry(e.target.value);
    var address = "";
    if (e.target.value === "전체") {
      address = "";
      list(cityname, address, "");
    } else {
      address = e.target.value;
      list(cityname, address, "");
    }
  };

  const handletextSearch = (e) => {
    setsearchtext(e.target.value);
  };

  function submitSearch() {
    if (city === "전체") {
      list("", "", searchtext);
    } else {
      if (country === "전체") {
        list(cityname, "", searchtext);
      } else {
        list(cityname, country, searchtext);
      }
    }
  }

  useEffect(() => {
    list("", "", "");
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="md"
        style={{ marginTop: 25, minHeight: "100vh", height: "100%" }}
      >
        <Typography component="div">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <h1>경기장 예약</h1>
          </Grid>
          <hr />
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ display: "flex" }}
          >
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                시/도 선택
              </InputLabel>
              <Select
                value={city}
                label="시/도"
                style={{ borderRadius: 30 }}
                onChange={handleSelectcity}
              >
                <MenuItem name={"전체"} value="전체">
                  <em>전체</em>
                </MenuItem>
                <MenuItem value={"서울"}>서울</MenuItem>
                <MenuItem value={"부산"}>부산</MenuItem>
                <MenuItem value={"대구"}>대구</MenuItem>
                <MenuItem value={"인천"}>인천</MenuItem>
                <MenuItem value={"광주"}>광주</MenuItem>
                <MenuItem value={"대전"}>대전</MenuItem>
                <MenuItem value={"울산"}>울산</MenuItem>
                <MenuItem value={"경기도"}>경기도</MenuItem>
                <MenuItem value={"강원도"}>강원도</MenuItem>
                <MenuItem value={"충청북도"}>충북</MenuItem>
                <MenuItem value={"충청남도"}>충남</MenuItem>
                <MenuItem value={"전라북도"}>전북</MenuItem>
                <MenuItem value={"전라남도"}>전남</MenuItem>
                <MenuItem value={"경상북도"}>경북</MenuItem>
                <MenuItem value={"경상남도"}>경남</MenuItem>
                <MenuItem value={"제주특별자치도"}>제주도</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                구/군 선택
              </InputLabel>
              <Select
                value={country}
                label="구/군"
                onChange={handleSelectcountry}
                style={{ borderRadius: 30 }}
              >
                {city === "전체" ? (
                  <MenuItem disabled>
                    <em>전체</em>
                  </MenuItem>
                ) : (
                  <MenuItem value="전체">
                    <em>전체</em>
                  </MenuItem>
                )}
                {countrymenu}
              </Select>
            </FormControl>
            <Paper
              component="form"
              style={{
                backgroundColor: "#F3F3F3",
                marginLeft: 10,
                borderRadius: 30,
              }}
            >
              <InputBase
                placeholder="경기장 이름 검색"
                inputProps={{ "aria-label": "search ground" }}
                style={{ marginLeft: 8, felx: 1 }}
                onChange={handletextSearch}
              />
              <IconButton
                type="button"
                onClick={submitSearch}
                aria-label="search"
                style={{ padding: 10 }}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          {groundinfo.list}
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(ReservationCard);
