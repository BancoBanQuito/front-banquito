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
import { Button } from '@mui/material';
import { ColorPalette } from '../../style/ColorPalette';
import EnvManager from '../../config/EnvManager';
import { Spinner } from '../atoms/Spinner';
import UserIcon from '../../assets/user.png';
import { useUser } from '../../context/UserContext';
import { logout } from '../../utils/LoginUtils';
import BanQuitoIcon from '../atoms/BanQuitoIcon';
import { AccountCircle } from '@mui/icons-material';

interface TopnavProps {
  to: string;
}

const Topnav = ({ to }: TopnavProps) => {

  const navigate = useNavigate();
  const user = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [bankEntity, setBankEntity] = useState('');
  const [activateSpinner, setActivateSpinner] = useState(false);

  useEffect(() => {
    return () => { }
  }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  /* const getBankEntity = async () => {
    const url = `${EnvManager.SETTINGS_URL}/api/bank-entity`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      setActivateSpinner(true);
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setBankEntity(data[0].name);
        setActivateSpinner(false);
        return data;
      } else {
        setActivateSpinner(false);
        throw new Error(response.statusText);
      }
    } catch (error: any) {
      setActivateSpinner(false);
      if (error.message === "Bad Request") {
        alert("Error: 400 Bad Request");
      } else if (error.message === "Internal Server Error") {
        alert("Error en el servidor, intente más tarde");
      } else {
        alert("Error desconocido, intente más tarde");
      }
    }
  }; */

  const handleLogout = () => {
    logout();
    user.identification = '';
    user.identificationType = '';
    user.username = '';
    user.isLogged = false;
    window.location.reload();
  };

  /* useEffect(() => {
    getBankEntity();
  }, []
  ); */

  return (
    <>
      {activateSpinner ? <Spinner /> : null}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            sx={{ mr: 0 }}>
            <BanQuitoIcon />
          </IconButton>
          <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>BanQuito</Typography>
          {user.isLogged && <div>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              onClick={handleOpenUserMenu}
              sx={{ mr: 0 }}>
              <AccountCircle />
            </IconButton>
            <Menu
              open={!!anchorEl}
              onClose={handleCloseUserMenu}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              keepMounted>
              <MenuItem onClick={() => handleLogout()}>Cerrar sesión</MenuItem>
            </Menu>
          </div>}
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Topnav;
