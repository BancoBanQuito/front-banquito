import React, { useState, useEffect } from "react";
import { Container, FormLabel, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import EnvManager from "../../../config/EnvManager";
import { useNavigate } from "react-router-dom";

interface userProps {
  username: string;
  password: string;
}
interface Props {
  setUser: React.Dispatch<React.SetStateAction<userProps | null>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  redirect: string;
}

const Login = ({ setUser, setIsLogged, redirect }: Props) => {
  const navigate = useNavigate();

  const [userName, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // const response = await fetch(`${EnvManager.CLIENT_URL}/api/client/login`, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      //     body: JSON.stringify({
      //         userName: userName,
      //         password: password
      //     })
      // })
      // if (!response.ok) {
      //     throw new Error(response.statusText)
      // }
      alert("Ingresa con éxito");

      // set general states
      setUser({ username: userName, password: password });
      setIsLogged(true);

      navigate(redirect);
      localStorage.setItem("email", userName);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container sx={containertTitleStyles}>
        <Typography variant="h4" align="center">
          Iniciar Sesion
        </Typography>
      </Container>
      <Container sx={containerStyles}></Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Email:</FormLabel>
        <TextField
          value={userName}
          onChange={(event) => setUsername(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Contraseña:</FormLabel>
        <TextField
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <Button onClick={handleSubmit} sx={buttonStyles}>
          Ingresar
        </Button>
      </Container>
    </>
  );
};

export default Login;

const containerStyles = () => ({
  display: "flex",
  justifyContent: "flex-start",
});

const containertTitleStyles = () => ({
  textAlign: "center",
  marginTop: "70px",
  marginBottom: "20px",
});

const containerTextFieldStyles = () => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  marginTop: "50px",
});

const containerFormLabelStyles = () => ({
  marginTop: "50px",
  marginLeft: "280px",
});

const formLabelStyles = () => ({
  marginRight: "10px",
});

const buttonStyles = () => ({
  background: "#1D3557",
  color: "white",
  ":hover": {
    background: "#1D3557",
    color: "white",
  },
});
