import React, { Component, useEffect, useState } from 'react';
import ProfileServices from '../ProfileServices';
import './Profile.css';
//import IoTrashBin from 'react-icons/io5'
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
    //надо не забыть загрузить значок мусорки рядом с
    //кнопкой выберите файл
    return (
        <div className='profile_show_test'>
            <div className='container'>
                <div className='profile_show_test__content'>
                <h2 className='profile_show_test_title'>Фото профиля</h2>
                    <div className='profile_show_test_img'>
                        <img src="https://chess-center.ru/wp-content/uploads/2022/09/2_4yls8wlami9frintdrgsya.jpeg" alt=""/>
                       <div>
  <button className='profile_show_test_btn'>Выберите файл</button>
                </div>
                        </div>


                    <span className='profile_show_test_info'>Максимальный размер фото 5 МБ</span>
                     <p className='profile_show_test_shiftenter'> </p>
                    <h3 className='profile_show_test_title'>Личная информация</h3>
                      <p className='profile_show_test_shiftenter'> </p>
                    <p className='profile_show_test_title'>Имя</p>
                    <input className='profile_show_test_input' placeholder='Введите имя' type="text"/>
                      <p className='profile_show_test_shiftenter'> </p>
                    <p className='profile_show_test_title'>Фамилия</p>
                     <input className='profile_show_test_input' placeholder='Введите фамилию' type="text"/>
                      <p className='profile_show_test_shiftenter'> </p>
                    <p className='profile_show_test_title'>Электронная почта</p>
                     <input className='profile_show_test_input' placeholder='Введите почту' type="text"/>
                      <p className='profile_show_test_shiftenter'> </p>
                    <p className='profile_show_test_title'>Пароль</p>
                     <input className='profile_show_test_input' placeholder='Введите текущий пароль' type="password"/>
                </div>
                  <p className='profile_show_test_shiftenter'> </p>
                 <button className='profile_show_test_btn2'>Сохранить</button>
            </div>

            <div className='profile_show_enter_footer' />
               </div>

    );
          //<p>Ваше имя: {data_profile.first_name}</p>
          //  <p>Ваш логин: {data_profile.username}</p>
 const ShowNameUserName= () => {
     document.getElementById("Введите почту").placeholder = "Type name here..";
 }
  }
export default ProfileShow;