import { useEffect, useState } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import BanQuitoIcon from '../../assets/BanQuito-Logo.svg';
import { Button } from '@mui/material';
import { ColorPalette } from '../../style/ColorPalette';
import EnvManager from '../../config/EnvManager';

interface TopnavProps {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>,
  user: {};
  to: string;
}

const Topnav = ({ isLogged, setIsLogged, user, to }: TopnavProps) => {

  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [bankEntity, setBankEntity] = useState('');

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const getBankEntity = async () => {
    const url = `${EnvManager.SETTINGS_URL}/api/bank-entity`;
    console.log(url);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setBankEntity(data[0].name);
        return data;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error: any) {
      if (error.message === "Bad Request") {
        alert("Error: 400 Bad Request");
      } else if (error.message === "Internal Server Error") {
        alert("Error en el servidor, intente más tarde");
      } else {
        alert("Error desconocido, intente más tarde");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getBankEntity();
  }, []
  );

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar src={BanQuitoIcon} sx={{ 'borderRadius': 0 }} />

            <Typography
              noWrap
              variant='h1'
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
                >{bankEntity}</Typography>
              </Link>
            </Typography>

            {
              isLogged ? <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Configuraciones">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User image" src="/assets/user.png" />
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
                  <MenuItem onClick={() => setIsLogged(false)}>
                    <Typography textAlign="center">Cerrar sesión</Typography>
                  </MenuItem>
                </Menu>
              </Box>
                :
                <Box sx={{ flexGrow: 0 }}>
                  <Button sx={{ color: ColorPalette.ACCENT }} onClick={() => navigate(`/${to}/signup`)}>Crear Usuario</Button>
                  <Button sx={{ color: ColorPalette.ACCENT }} onClick={() => navigate(`/${to}/login`)}>Iniciar Sesion</Button>
                </Box>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Topnav;
