import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import logoUrl from '../images/label.svg';
import './style.css';
import ButtonLoginSelecter from '../components/ButtonLoginSelecter';
import AuthServices from '../../../pages/Auth/AuthServices';

const auths = new AuthServices();

const enters = [
  { href: "/", name: "Главная" },
  { href: "/polls/", name: "Опросы" },
  { href: "/profile/", name: "Профиль" },
];

let input_enter = "Войти";

function AppMenu() {
  const [setAnchorElNav] = React.useState(null);
  const [but_log, setButLog] = React.useState();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  React.useEffect(()=>{
    input_enter = auths.findAuthTokens()?"Выйти":"Войти";
    return setButLog(<ButtonLoginSelecter enter={input_enter} />);
  }, [input_enter]);

  return (
    <AppBar sx={{ bgcolor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className='ImageLogo'>
            <img src={logoUrl} alt="УКМ" />
          </div>
          <Typography variant="h6" noWrap component="a" href="/"
            sx={{
              mr: 2, display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem',
              color: 'inherit', textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="account of current user"
              aria-controls="menu-appbar" aria-haspopup="true"
              onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography variant="h5" noWrap component="a"
            href="" sx={{
              mr: 2, display: { xs: 'flex', md: 'none' },
              flexGrow: 1, fontFamily: 'monospace',
              fontWeight: 700, letterSpacing: '.3rem',
              color: 'inherit', textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{ justifyContent: 'space-between', flexWrap: 'wrap', flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <Button sx={{ my: 2, color: 'black', display: 'block' }} href={enters[0].href}>{enters[0].name}</Button>
            <Button sx={{ my: 2, color: 'black', display: 'block' }} href={enters[1].href}>{enters[1].name}</Button>
            <Button sx={{ my: 2, color: 'black', display: 'block' }} href={enters[2].href}>{enters[2].name}</Button>
            {but_log}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

  );
}
export default AppMenu;
