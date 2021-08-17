import { getSuggestedQuery } from '@testing-library/react';
import React, { useState, useEffect } from 'react';

const Callback = () => {

    const submitId = (email,profile_image,user_name,birthyear,gender,mobile)=>{
        const post ={
          email : email,
          profile_image : profile_image,
          user_name : user_name,
          birthyear : birthyear,
          gender : gender,
          mobile : mobile
        };
        fetch("http://localhost:3001/callback/adduser" , {
            method : "post", // 통신방법
            headers : {
                "content-type" : "application/json",
            },
            body : JSON.stringify(post),
        })
        .then((res)=>res.json())
        .then((res)=>{
            window.location.replace('/');
        });
    }
    function GetProfile() {
        window.location.href.includes('access_token') && GetUser();
        
        function GetUser() {
            const location = window.location.href.split('=')[1];
            const loca = location.split('&')[0];
            const token = {
                token : loca,
            }

            fetch("http://localhost:3001/callback", {
                method : "post", // 통신방법
                headers : {
                    "content-type" : "application/json",
                },
                body : JSON.stringify(token),
            })
            .then((res)=>res.json())
            .then((res)=>{
                console.log(res.response);
                window.sessionStorage.setItem('id', res.response.email);
                submitId(res.response.email, res.response.profile_image, res.response.name, res.response.birthyear, res.response.gender, res.response.mobile_e164);
            });
        }
    }


    useEffect(() => {
        GetProfile();
      });

    return(
        <div>콜백</div>
    );
}

export default Callback;