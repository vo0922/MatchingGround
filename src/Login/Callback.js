import { getSuggestedQuery } from '@testing-library/react';
import React, { useState, useEffect } from 'react';

const Callback = () => {

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
                console.log(res);
                window.sessionStorage.setItem('id', res.response.email);
                window.location.replace('/');
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