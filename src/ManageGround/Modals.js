import React from 'react'
import { useState } from 'react';
import Button from "@material-ui/core/Button"
import Modal from "@material-ui/core/Modal"
import DaumPostcode from 'react-daum-postcode';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root  : {
    display: "flex",
    flexWrap: "wrap",
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  postCodeStyle : {
    display: "block",
    position: "absolute",
    width: "400px",
    height: "500px",
    padding: "7px",
  }

}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function Modals() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  // 주소 modal 열기, 닫기 state
  const [open, setOpen] = useState(false);
  // 주소 modal 열기

  const handleOpen = () => {
    setOpen(true);
  };
  // 주소 modal 닫기
  const handleClose = () => {
    setOpen(false);
  };
  // 다음 도로명 주소 찾기 로직
  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState();
  const [IsPostOpen, setIsPostOpen] = useState(true);
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setIsZoneCode(data.zonecode);
    setIsAddress(fullAddress);
    setIsPostOpen(false);
    handleClose();
  };

  
  // 주소찾기창 스타일적용
  const postCodeStyle = {
    display: "block",
    position: "absolute",
    width: "400px",
    height: "500px",
    padding: "7px",
  };
  

  const modalbody = (
    <div style={modalStyle} className={classes.postCodeStyle}>
      <DaumPostcode onComplete={handleComplete} />
    </div>
  );
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleOpen}>주소</Button>
            <Modal
              open={open}
              onClose={handleClose}
            >
              {modalbody}
            </Modal>
        </div>
    )   
}
