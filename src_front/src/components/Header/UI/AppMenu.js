import logoUrl from '../images/label.svg';
import ButtonLoginSelecter from '../components/ButtonLoginComponents/ButtonLoginSelecter';
import AuthServices from '../../../pages/personal/Auth/AuthServices';
import routes from '../../../routes';
import { AppBar, Box, Toolbar, Button, } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ButtonMenuPolls from '../components/Menu/Polls/ButtonMenuPolls';

const auths = new AuthServices();

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


          <Button sx={{ color: 'black', display: 'block', height: 30, my: 1, }}
            href={routes.home}>Главная</Button>
          <ButtonMenuPolls />
          <Button sx={{ color: 'black', display: 'block', height: 30, my: 1, }}
            href={routes.home}>Шаблоны</Button>
          <Button sx={{ color: 'black', display: 'block', height: 30, my: 1, }}
            href={routes.profile}>Профиль</Button>
          {but_log}

        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default AppMenu;
