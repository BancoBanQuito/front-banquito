import { Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BanQuitoIcon from '../../components/atoms/BanQuitoIcon'
import BgAtom from '../../components/atoms/BgAtom'
import LoginForm from '../../components/organisms/Login/LoginForm'
import LoadOrganism from '../../components/organisms/LoadOrganism'
import { login } from '../../utils/LoginUtils'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const LoginClient = () => {

  const [isLoading, setisLoading] = useState<boolean>(false);
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLogged) {
      navigate('/cliente/inicio');
    }
    return () => { }
  }, []);


  const handleSubmit = async (submitUser: { username: string, password: string }) => {
    setisLoading(true);
    try {
      const data = await login(submitUser.username, submitUser.password);
      user.identification = data.identification;
      user.identificationType = data.identificationType;
      user.username = data.email;
      user.isLogged = true;
      navigate('/cliente/inicio');
    } catch (error) {

    } finally {
      setisLoading(false);
    }
  }

  return (
    <>
      <BgAtom />
      <div
        style={{ width: '100%', height: '100%', margin: '0.1rem' }}>
        <Paper
          sx={{
            width: '45rem',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>
          <div style={{
            position: 'absolute',
            top: 0,
            margin: '1rem',
            display: 'flex',
            fontWeight: 'bold'
          }}>
            <BanQuitoIcon />
            <div style={{ width: '5px' }} />
            <Typography variant='body1' >Banco BanQuito</Typography>
          </div>
          <LoginForm
            onSubmit={handleSubmit}
            commonSubmit
            title='Ingrese a su Banca Virtual' />
        </Paper>
      </div>
      <LoadOrganism
        active={isLoading} />
    </>
  )
}

export default LoginClient