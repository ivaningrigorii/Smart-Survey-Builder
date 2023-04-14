import React, { Component, useEffect, useState } from 'react';
import ProfileServices from '../ProfileServices';
import './Profile.css';
const ps = new ProfileServices();

const ProfileShow = () => {
    const [data_profile, setData] = useState({});
    const refresh = false;
    useEffect(()=>{
        ps.getProfileData().then((data) => {
            if (data) {
                setData(data);
            } else {
                alert("Данные не были получены,\n"+
                    "проверьте подключение к интернету.");
            }
        });
    }, [refresh, ]);

    console.log(data_profile);
    return (
        <div className='profile_show_test'>
            <h3>Профиль</h3>
            <p>Ваше имя: {data_profile.first_name}</p>
            <p>Ваш логин: {data_profile.username}</p>
            <div className='profile_show_enter_footer' />
        </div>
    );
}
export default ProfileShow;