import React from 'react';
import './Footer.css';
import logoUrl from './images/label.svg';
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

                            <div id="footer_social_media">
                                <a href="#" class="footer-link" id="tg">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>

                                <a href="#" class="footer-link" id="vk">
                                    <i class="fa-brands fa-facebook-f"></i>
                                </a>

                                <a href="#" class="footer-link" id="whatsapp">
                                    <i class="fa-brands fa-whatsapp"></i>
                                </a>
                            </div>
                        </div>

                        <ul class="footer-list">
                            <li>
                                <h3>Поддержка</h3>
                            </li>
                            <li>
                                <a href="#" class="footer-link">База знаний</a>
                            </li>
                            <li>
                                <a href="#" class="footer-link">СВязаться с нами</a>
                            </li>
                            <li>
                                <a href="#" class="footer-link">Сравнения</a>
                            </li>
                        </ul>

                        <ul class="footer-list">
                            <li>
                                <h3>Разделы</h3>
                            </li>
                            <li>
                                <a href="#" class="footer-link">УКМ</a>
                            </li>
                            <li>
                                <a href="#" class="footer-link">Цены</a>
                            </li>
                            <li>
                                <a href="#" class="footer-link">Партнерская программа</a>
                            </li>
                        </ul>

                        <div id="footer_subscribe">
                            <h3>Новости</h3>

                            <p>
                                Введите свой e-mail, чтобы получать уведомления
                            </p>

                            <div id="input_group">
                                <input type="email" id="email" />
                                <button>
                                    <i class="fa-regular fa-envelope"></i>
                                </button>
                            </div>

                        </div>
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
