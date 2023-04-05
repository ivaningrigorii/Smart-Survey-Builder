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




const enters = ['Войти'];



function AppMenu() {
  const [setAnchorElNav] = React.useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  return (
    <AppBar sx={{ bgcolor: "#171717" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logoUrl} alt="УКМ" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button

              sx={{ my: 2, color: 'white', display: 'block', marginRight: 15, marginLeft: 35 }}
              href="/"
            >
              Главная
            </Button>
            <Button

              sx={{ my: 2, color: 'white', display: 'block', marginRight: 15 }}
              href="/polls"                                                ////ссылка на опросы
            >
              Опросы
            </Button>
            <Button

              sx={{ my: 2, color: 'white', display: 'block', marginRight: 15 }}
              href="/profile"                                       ////ссылка на профиль
            >
              Профиль
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {enters.map((enter) => (
              <Button
                key={enter}

                sx={{ my: 2, color: 'white', backgroundColor: "#a31545", display: 'block' }}
                variant="contained" href="/auth"                             ////ссылка на вход
              >
                {enter}
              </Button>
            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppMenu;





