import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import BanQuitoIcon from '../../assets/BanQuito-Logo.svg';

interface TopnavProps {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>,
  user: {};
}

const Topnav = ({ isLogged, setIsLogged, user }: TopnavProps) => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar src={BanQuitoIcon} sx={{ 'borderRadius': 0 }} />

            <Typography
              noWrap
              sx={{
                ml: 2,
                display: 'block',
                flexGrow: 1,
              }}
            >
              <Link to="/">
                <Typography
                  variant="h5"
                  noWrap
                  sx={{
                    fontWeight: 700,
                    color: '#FFFFFF',
                    textDecoration: 'none',
                  }}
                >BanQuito</Typography>
              </Link>
            </Typography>

            {
              isLogged && <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Configuraciones">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User image" src="@/assets/user.png" />
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
                  <MenuItem onClick={() => navigate('/perfil')}>
                    <Typography textAlign="center">Perfil</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => setIsLogged(false)}>
                    <Typography textAlign="center">Cerrar sesión</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Topnav;
