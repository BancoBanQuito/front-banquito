import React, { useState, useEffect } from "react";
import { Container, FormLabel, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import BranchBox from "../Branch/BranchBox";
import TableMolecule from "../../molecules/TableMolecule";

const CreateSegment: React.FC = () => {
  const [idSegment, setIdSegment] = useState<string>("");
  const [nameSegment, setNameSegment] = useState<string>("");
  const [statustSegment, setStatusSegment] = useState<string>("Inactivo");
  const [isStatusSelected, setIsStatusSelected] = useState<boolean>(true);
  const [rows, setRows] = useState<JSX.Element[][]>([
    [<Typography></Typography>, <Typography></Typography>],
  ]);
  const [headers, setHeaders] = useState<JSX.Element[]>([
    <Typography>Nombre</Typography>,
    <Typography>Estado</Typography>,
  ]);
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
              options={optionsStatus}
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

  const optionsStatus = [
    { value: "Activo", label: "Activo" },
    { value: "Inactivo", label: "Inactivo" },
  ];

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
          status: statustSegment,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      fetchSegment();
      alert("Segmento creado con éxito");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container sx={containertTitleStyles}>
        <Typography variant="h4" align="center">
          Crear Segmento
        </Typography>
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Nombre:</FormLabel>
        <TextField
          value={nameSegment}
          onChange={(event) => setNameSegment(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <div style={{ marginRight: "10px" }}>
          <BranchBox
            label="Selecciona el estado:"
            value={statustSegment}
            options={optionsStatus}
            onChange={onChangeStatus}
          />
        </div>
      </Container>
      <Container sx={containerTextFieldStyles}>
        <Button onClick={handleSubmit} sx={buttonStyles}>
          Crear segmento
        </Button>
      </Container>
      <TableMolecule headers={headers} rows={rows} />
    </>
  );
};

export default CreateSegment;

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
  marginBottom: "20px",
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
