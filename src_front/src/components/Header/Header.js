import React from 'react';
import './Header.css';
import logoUrl from '../../images/label.svg';
import  { Component } from 'react';

class  Header  extends  Component {
  render()
  {
return(
  <div className='header'>
  <img src={logoUrl} alt="УКМ" />
  <a href="/">Главное</a>
  <a href="/polls">Опросы</a>
 <a href="/profile">Профиль</a>
 <a href ="/enter" class="btn">Войти</a>
  </div> 
);
  }
}
export default Header;

