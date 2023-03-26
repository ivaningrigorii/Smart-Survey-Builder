import React from 'react';
import './Footer.css';
import logoUrl from '../../images/label_footer.png';
import  { Component } from 'react';

class  Footer  extends  Component {
  render()
  {
return(
  <div className='footer'>
   
    <div className="footer-block">         
    <div className='footer-img '> <img src={logoUrl} alt="УКМ" /></div>               
                <div className='footer-block-inf'>Команда разработчиков</div> 
                <div className='footer-block-inf-command'>Григорий Иванин, Игорь Бордей, Кол Ирина, Сергей Жуков, Дмитрий Битюков</div>       
                </div>  
  </div> 
);
  }
}
export default Footer;
