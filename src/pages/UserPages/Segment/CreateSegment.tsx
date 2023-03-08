import React, { useState, useEffect } from "react";
import { Container, FormLabel, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TableMolecule from "../../../components/molecules/TableMolecule";
import EnvManager from "../../../config/EnvManager";
import { Spinner } from "../../../components/atoms/Spinner";
import { Dropdown } from "../../../components/atoms/Dropdown";
import axios from "axios";
import { AlertColor } from "@mui/material";
import SnackBarMolecule from "../../../components/molecules/SnackBarMolecule";

const CreateSegment: React.FC = () => {
  const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');
  const [idSegment, setIdSegment] = useState<string>("");
  const [nameSegment, setNameSegment] = useState<string>("");
  const [statustSegment, setStatusSegment] = useState<string>("Inactivo");
  const [isStatusSelected, setIsStatusSelected] = useState<boolean>(true);
  const [rows, setRows] = useState<JSX.Element[][]>([
    [<Typography></Typography>, <Typography></Typography>],
  ]);
  const [activateSpinner, setActivateSpinner] = useState(false);
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
      setActivateSpinner(true);
      const response = await axios(
        `${EnvManager.SEGMENT_URL}/api/segments/updates/${idSegment}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          data: JSON.stringify({
            name: name,
            status: value,
          }),
        }
      );
      if (response.status !== 200) {
        setActivateSpinner(false);
        throw new Error(response.statusText);
      }
      setActivateSpinner(false);
      alert("Segmento actualizado");
      fetchSegment();
      settitleSnack("Segmento actualizado");
      setmessageSnack("El segmento se actualizó correctamente");
      setcolorSnack("success");
      setopenSnack(true);

    } catch (error) {
      setActivateSpinner(false);
      console.error(error);
      settitleSnack("Error al actualizar el segmento");
      setmessageSnack("El segmento no se actualizó correctamente");
      setcolorSnack("error");
      setopenSnack(true);
    }
  };

  const fetchSegment = async () => {
    try {
      setActivateSpinner(true);
      const response = await axios(`${EnvManager.SEGMENT_URL}/api/segments`);
      const data = await response.data;
      const rows = data.map((segment: any) => {
        return [
          <Typography>{segment.name}</Typography>,
          <Typography>
            <Dropdown
              label=""
              value={segment.status}
              items={optionsStatus}
              onChange={(value: string) =>
                setStatus(value, segment.idSegment, segment.name)
              }
              width={"100%"}
              height={"auto"}
            />
          </Typography>,
        ];
      });
      setActivateSpinner(false);
      setRows(rows);
      settitleSnack("Segmentos obtenidos");
      setmessageSnack("Los segmentos se obtuvieron correctamente");
      setcolorSnack("success");
      setopenSnack(true);

    } catch (error) {
      setActivateSpinner(false);
      console.error(error);
      settitleSnack("Error al obtener los segmentos");
      setmessageSnack("Los segmentos no se obtuvieron correctamente");
      setcolorSnack("error");
      setopenSnack(true);

    }
  };
  useEffect(() => {
    fetchSegment();
  }, []);

  const optionsStatus = [
    { value: "Activo", name: "Activo" },
    { value: "Inactivo", name: "Inactivo" },
    { value: "Bloqueado", name: "Bloqueado" },
    { value: "Eliminado", name: "Eliminado" },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setActivateSpinner(true);
      const response = await axios(`${EnvManager.SEGMENT_URL}/api/segments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data
          : JSON.stringify({
            idSegment: idSegment,
            name: nameSegment,
            status: statustSegment,
          }),
      });
      if (response.status !== 200) {
        setActivateSpinner(false);
        throw new Error(response.statusText);
      }
      setActivateSpinner(false);
      fetchSegment();
      alert("Segmento creado con éxito");
      settitleSnack("Segmento creado");
      setmessageSnack("El segmento se creó correctamente");
      setcolorSnack("success");
      setopenSnack(true);

    } catch (error) {
      setActivateSpinner(false);
      console.error(error);
      settitleSnack("Error al crear el segmento");
      setmessageSnack("El segmento no se creó correctamente");
      setcolorSnack("error");
      setopenSnack(true);
    }
  };

  return (
    <>
    <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                onClose={() => setopenSnack(false)} />
      {activateSpinner ? <Spinner /> : null}
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
          <Dropdown
            label="Selecciona el estado:"
            value={statustSegment}
            items={optionsStatus}
            onChange={onChangeStatus}
            width={"100%"}
            height={"auto"} />
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
