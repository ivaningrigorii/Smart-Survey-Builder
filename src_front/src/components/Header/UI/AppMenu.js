import logoUrl from '../images/label.svg';
import ButtonLoginSelecter from '../components/ButtonLoginSelecter';
import AuthServices from '../../../pages/personal/Auth/AuthServices';
import routes from '../../../routes';
import { AppBar, Box, Toolbar, Button, } from '@mui/material';
import React, { useState, useEffect } from 'react';

const auths = new AuthServices();

const enters = [
  { href: routes.home, name: "Главная" },
  { href: routes.polls.all, name: "Опросы" },
  { href: routes.profile, name: "Профиль" },
];
let input_enter = "Войти";

function AppMenu() {
  const [setAnchorElNav] = useState(null);
  const [but_log, setButLog] = useState();

  const handleClickImg = () => {
    window.location.replace(routes.home);
  };

  useEffect(() => {
    input_enter = auths.findAuthTokens() ? "Выйти" : "Войти";
    return setButLog(<ButtonLoginSelecter enter={input_enter} />);
  }, [input_enter]);

  return (
    <AppBar sx={{ bgcolor: "white" }}>
      <Toolbar variant='dences'>
        <Box sx={{ cursor: 'pointer' }}>
          <img src={logoUrl} width={130} height={30} onClick={handleClickImg} />
        </Box>
        <Box sx={{ flexGrow: 1, width: 40, height: 30 }}></Box>
        <Box sx={{ height: 50, justifyContent: 'space-between', flexWrap: 'wrap', flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
          {enters.map((res) => {
            return <Button sx={{ color: 'black', display: 'block', height: 30, my: 1, }}
              href={res.href}>{res.name}</Button>
          })}
          {but_log}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default AppMenu;
