import React from "react";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import TableMolecule from "../../../components/molecules/TableMolecule";
import { IHoliday } from "../../../components/organisms/Holiday/Types";
import EnvManager from "../../../config/EnvManager";
import TextFieldAtom from "../../../components/atoms/TextFieldAtom";
import axios from "axios";
import { ColorPalette } from "../../../style/ColorPalette";
import { SizeButton } from "../../../components/atoms/SizeButton";
import { ButtonStyle } from "../../../style/ButtonStyle";
import styled from "styled-components";
import UpdateHoliday from "../../../components/organisms/Holiday/UpdateHoliday";
// Dayjs
import dayjs from "dayjs";

const Holiday: React.FC = () => {
  const [holidays, setHolidays] = useState<IHoliday[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectHoliday, setSelectHoliday] = useState<IHoliday>({} as IHoliday);
  //   name:'holiday',
  //   code:23,
  //   date: new Date(),
  //   type:'ACT'
  // });
  const filteredHolidays =
    holidays.filter(
      (holiday) => holiday.name.includes(searchText.toUpperCase()),
    );

  useEffect(() => {
    axios(`${EnvManager.SETTINGS_URL}/api/holiday`)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response.data;
      })
      .then((data) => setHolidays(data))
      .catch((error) => console.log(error));
  }, []);
  const StyledButton = styled.span`
  margin-left: 10px;
  `;

  const headers = [<>Fecha</>, <>Codigo</>, <>Nombre</>, <>Tipo</>, <>Acción</>];
  const setHoliday = (holiday: IHoliday) => {
    setSelectHoliday(holiday);
    setIsUpdate(true);
  }
  const deleteHoliday = (holiday: IHoliday) => {
    axios(`${EnvManager.SETTINGS_URL}/api/holiday/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: JSON.stringify({
        name: holiday.name,
        type: holiday.type,
        date: holiday.date,
        code: holiday.code,
      }),
    }).then((response) => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      return response.data;
    }).then((data) => {
      const newHolidays = holidays.filter((holiday) => holiday.code !== data.code);
      setHolidays(newHolidays);
    }).catch((error) => console.log(error));
  }
  const rows = filteredHolidays.map((holiday) => {
    // 2023-01-03T00:00:00.000+00:00
    // 2023-01-03
    let date = new Date(holiday.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let dateAux = `${year}-${month}-${day}`;
    if (month < 10) {
      dateAux = `${year}-0${month}-${day}`;
    }
    if (day < 10) {
      dateAux = `${year}-${month}-0${day}`;
    }
    if (month < 10 && day < 10) {
      dateAux = `${year}-0${month}-0${day}`;
    }

    return [
      <>{dateAux}</>,
      <>{holiday.code}</>,
      <>{holiday.name}</>,
      <>{holiday.type=='NAT'?'Nacional':'Regional'}</>,
      <>
        <SizeButton palette={{ backgroundColor: ColorPalette.SECONDARY }}
          text="Editar"
          onClick={() => { setHoliday(holiday) }}
          style={ButtonStyle.SMALL}
        />
        <StyledButton>
          <SizeButton palette={{ backgroundColor: ColorPalette.PRIMARY }}
            text="Eliminar"
            onClick={() => { deleteHoliday(holiday) }}
            style={ButtonStyle.SMALL}
          />
        </StyledButton>
      </>
    ]
  });

  if (isUpdate) {
    return <>
      <UpdateHoliday
        nameU={selectHoliday?.name}
        codeU={selectHoliday?.code.toString()}
        dateU={dayjs(selectHoliday?.date)}
        typeU={selectHoliday?.type}
        setUpdate={setIsUpdate}
      />
    </>
  }


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: "80%"
      }}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" align="center">
          Feriados
        </Typography>
      </Container>
      <TextFieldAtom
        label="Buscar por fecha, nombre o codigo"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value.toUpperCase())}
        fullWidth
        type={"text"} />
      <Container style={containerTableStyle}>
        <TableMolecule headers={headers} rows={rows} />
      </Container>
    </Box>
  );
};

export default Holiday;


const containerTableStyle = {
  marginTop: "10px",
};
