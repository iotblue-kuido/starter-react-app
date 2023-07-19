import * as React from 'react';
import { useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import AdbIcon from '@mui/icons-material/Adb';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useTranslation } from 'react-i18next';
import {
  NovuProvider,
  PopoverNotificationCenter,
  IMessage,
} from '@novu/notification-center';

import { user_prefered_language, user_prefered_theme_mode } from '../../shared/constants';
import useUserData from '../../shared/hooks/useUserData';
import { UserPreferedContext } from '../../shared/Contexts/UserPreferedContext';

const languages = ['en', 'ar',];
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const { t, i18n } = useTranslation();
  const { user } = useUserData()
  const { palette: { mode, secondary } } = useTheme()
  const colorMode = React.useContext(UserPreferedContext);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget);
  };
  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };


  function handleLanguageChange(lang: string) {
    colorMode.changeLanguage(lang);
    localStorage.setItem(user_prefered_language, lang);
    handleCloseLangMenu();
  }

  function onNotificationClick(message: IMessage) {
    // your logic to handle the notification click
    if (message?.cta?.data?.url) {
      window.location.href = message.cta.data.url;
    }
  }


  return (
    <AppBar position="static" color='primary'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'cairo',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
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
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" fontFamily='cairo'>{t(`NAV.${page}`)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'cairo',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'inherit', display: 'block' }}
              >
                {t(`NAV.${page}`)}
              </Button>
            ))}
          </Box>
          <Box gap={2} display='flex'>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <NovuProvider
              // subscriberId={`${projectId}_${user?.sub}`}
              subscriberId={`${user?.sub}`}
              applicationIdentifier={import.meta.env.VITE_NOVU_IDENTIFIER}
              backendUrl={import.meta.env.VITE_NOVU_URL}
              socketUrl={import.meta.env.VITE_NOVU_SOCKET_URL}
            >
              <PopoverNotificationCenter
                colorScheme={'light'}
                // colorScheme={mode || 'light'}
                onNotificationClick={onNotificationClick}
              >
                {({ unseenCount }) =>

                  <Tooltip title={`${unseenCount} ${t('NOTIFICATION.TOOLTIP')} `}>
                    <IconButton color="inherit">
                      {unseenCount && unseenCount > 0 ?
                        <Badge badgeContent={unseenCount} color="secondary">
                          <NotificationsActiveIcon />
                        </Badge>
                        :
                        <NotificationsNoneIcon />
                      }
                    </IconButton>
                  </Tooltip>
                  // <NotificationBell unseenCount={unseenCount} />
                }
              </PopoverNotificationCenter>
            </NovuProvider>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={t('NAV.TOOLTIPS.LANGUAGES')}>
                <IconButton color="inherit" onClick={handleOpenLangMenu} sx={{ gap: 2 }}>
                  <GTranslateIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-Languages"
                anchorEl={anchorElLang}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElLang)}
                onClose={handleCloseLangMenu}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang}
                    selected={lang === i18n.language}
                    onClick={() => handleLanguageChange(lang)}>
                    <Typography textAlign="center" >{t(`LANGUAGES.${lang}`)}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={t('NAV.TOOLTIPS.SETTINGS')}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
                  <Avatar alt={user?.name} title={user?.name} variant='circular' color='secondary'
                    sx={{ bgcolor: secondary.main }}>
                    {user?.name[0].toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* <MenuItem key={'theme_mode'} onClick={handleChangeTheme}>
                  <Typography textAlign="center">Change Theme</Typography>
                </MenuItem> */}
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{t(`SETTINGS.${setting}`)}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;