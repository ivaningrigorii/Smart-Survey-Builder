import React, { Component } from 'react';
import ProfileServices from '../ProfileServices';
import './Profile.css';
const ps = new ProfileServices();

const ProfileShow = () => {
    const data_profile = ps.getProfileData();
    console.log(data_profile);
    return (
        <div className='profile_show_test'>
            <p>Тестовые данные: {data_profile.username}</p>
            <div className='profile_show_enter_footer'/>
        </div>
    );
}
export default ProfileShow;