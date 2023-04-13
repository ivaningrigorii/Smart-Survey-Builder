import React from 'react';
import './Footer.css';
import logoUrl from './images/label_footer.png';
import { Component } from 'react';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
class Footer extends Component {
    render() {
        return (
            <div className='footer'>
                <footer>
                    <div id="footer_content">
                        <div id="footer_contacts">
                            <img src={logoUrl} alt="УКМ" />
                            <p>Умный конструктор опросов</p>  
                                           
                        </div>
         
                        <ul className="footer-list">
                            <li>
                                <h3>Разделы</h3>
                            </li>
                            <li>
                                <a href="#" className="footer-link">УКМ</a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">Цены</a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">Партнерская программа</a>
                            </li>
                        </ul>    

                        <ul className="footer-list">
                            <li>
                                <h3>Поддержка</h3>
                            </li>
                            <li>
                                <a href="#" className="footer-link">Связаться с нами</a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">О команде</a>
                            </li>
                        </ul>
                  
                    </div>

                    <div id="footer_copyright">
                        2023
                    </div>
                </footer>
            </div>
        );
    }
}
export default Footer;

