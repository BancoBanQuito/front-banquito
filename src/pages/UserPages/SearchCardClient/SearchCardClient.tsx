import React, { useState, useEffect } from "react";
import { Container, FormLabel, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import BranchBox from "../../../components/organisms/Branch/BranchBox";

const SearchCardClient: React.FC = () => {
  const [idSegment, setIdSegment] = useState<string>("");
  const [nameSegment, setNameSegment] = useState<string>("");

  const [identification, setIdentification] = useState("");

  const [statusSegment, setStatusSegment] = useState<string>("");
  const [isStatusSelected, setIsStatusSelected] = useState<boolean>(true);
  const [rows, setRows] = useState<JSX.Element[][]>([
    [<Typography></Typography>, <Typography></Typography>],
  ]);

  const identificationOptions = [
    { value: "DNI", label: "Cedula" },
    { value: "RUC", label: "RUC" },
    { value: "PAS", label: "Pasaporte" },
  ];

  const onChangeStatus = (value: string) => {
    setStatusSegment(value);
    if (value !== "") {
      setIsStatusSelected(false);
    } else {
      setIsStatusSelected(true);
    }
  };

  const setStatus = async (value: string, idSegment: string, name: string) => {
    try {
      const response = await fetch(
        `http://localhost:8083/api/segments/updates/${idSegment}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            name: name,
            status: value,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      alert("Segmento actualizado");
      fetchSegment();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSegment = async () => {
    try {
      const response = await fetch("http://localhost:8083/api/segments");
      const data = await response.json();
      const rows = data.map((segment: any) => {
        return [
          <Typography>{segment.name}</Typography>,
          <Typography>
            <BranchBox
              label=""
              value={segment.status}
              options={identificationOptions}
              onChange={(value: string) =>
                setStatus(value, segment.idSegment, segment.name)
              }
            />
          </Typography>,
        ];
      });
      setRows(rows);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSegment();
  }, []);

  /* Funcion Boton*/
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8083/api/segments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          idSegment: idSegment,
          name: nameSegment,
          status: statusSegment,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      fetchSegment();
      alert("Volviendo");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container sx={containertTitleStyles}>
        <Typography variant="h4" align="center">
          Buscar Cliente
        </Typography>
      </Container>
      {/* Label Input*/}
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Identificación:</FormLabel>
        <TextField
          value={identification}
          onChange={(event) => setIdentification(event.target.value)}
          variant="standard"
        />
      </Container>

      {/* Dropbox*/}
      <Container sx={containerTextFieldStyles}>
        <div style={{ marginRight: "10px" }}>
          <BranchBox
            label="Tipo Identificación:"
            value={statusSegment}
            options={identificationOptions}
            onChange={onChangeStatus}
          />
        </div>
      </Container>
      {/* Boton*/}
      <Container sx={containerTextFieldStyles}>
        <Button onClick={handleSubmit} sx={buttonStyles}>
          Ver Información
        </Button>
      </Container>
      <Container sx={containerTextFieldStyles}>
        <Button onClick={handleSubmit} sx={buttonStyles}>
          Editar
        </Button>
      </Container>
    </>
  );
};

export default SearchCardClient;

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
  marginBottom: "20px",
});

const formLabelStyles = () => ({
  marginRight: "10px",
});

const buttonStyles = () => ({
  background: "#E63946",
  color: "white",
  ":hover": {
    background: "#E63946",
    color: "white",
  },
});
