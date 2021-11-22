import { getSuggestedQuery } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress'

const Callback = () => {
    //유저 정보 state
    const submitId = (email,profile_image,user_name,birthyear,gender,mobile)=>{
        const post ={
          email : email,
          profile_image : profile_image,
          user_name : user_name,
          birthyear : birthyear,
          gender : gender,
          mobile : mobile
        };
        fetch("http://smartit-16.iptime.org:3001/callback/adduser" , {
            method : "post", // 통신방법
            headers : {
                "content-type" : "application/json",
            },
            body : JSON.stringify(post),
        })
        .then((res)=>res.json())
        .then((res)=>{

        });
    }
    //유저 프로필 가져오기
    function GetProfile() {
        window.location.href.includes('access_token') && GetUser();
        
        function GetUser() {
            const location = window.location.href.split('=')[1];
            const loca = location.split('&')[0];
            const token = {
                token : loca,
            }
            fetch("http://smartit-16.iptime.org:3001/callback", {
                method : "post", // 통신방법
                headers : {
                    "content-type" : "application/json",
                },
                body : JSON.stringify(token),
            })
            .then((res)=>res.json())
            .then((res)=>{
                window.sessionStorage.setItem('id', res.response.email);
                submitId(res.response.email, res.response.profile_image, res.response.name, res.response.birthyear, res.response.gender, res.response.mobile_e164);
                const email = {
                    email : res.response.email,
                }
                fetch("http://smartit-16.iptime.org:3001/myinfo" , {
                    method : "post", // 통신방법
                    headers : {
                        "content-type" : "application/json",
                    },
                    body : JSON.stringify(email),
                })
                .then((res)=>res.json())
                .then((res)=>{
                    window.sessionStorage.setItem('ground_manager', res[0].ground_manager);
                    window.sessionStorage.setItem('team_manager', res[0].team_manager);
                    window.sessionStorage.setItem('team_name', res[0].team_name);

                    window.location.replace('/');
                });
            });
        }
    }


    useEffect(() => {
        GetProfile();
      });

    return(
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
      </div>
    );
}

export default Callback;