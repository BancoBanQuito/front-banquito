import { useState, useEffect } from "react";
import { SizeButton } from "../../atoms/SizeButton";
import TextFieldAtom from "../../atoms/TextFieldAtom";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { ColorPalette } from "../../../style/ColorPalette";
import { Button, Typography } from "@mui/material";
import { Dropdown } from "../../atoms/Dropdown";
import TableMolecule from "../../molecules/TableMolecule";
import ButtonIcon from "../../atoms/ButtonIcon";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { associatedServiceParamService } from "../../../services/product/AssociatedServiceParamService";
import { AssociatedService } from "../../../services/product/Model/AssociatedService";
import Modal from "@mui/material/Modal";
import React from "react";
import Box from "@mui/material/Box";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 20px;
  max-width: 500px;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 60px;
`;

interface Props {
  openDialog: boolean;
}

export const AssociatedServiceParam = () => {
  const [first, setfirst] = useState<any>(null);
  const [item, setItem] = useState<any>([
    [
        <Typography>
        </Typography>,
        <Typography>
        </Typography>,
        <Typography>
        </Typography>,
             ]
]);
  
  useEffect(() => {
    const callFun = async () => {
      let fun = await associatedServiceParamService()
      let value = fun.map((items: any) =>{
        console.log(items.params)
        return items.params;
        })
        console.log(value)
      setfirst(value);
      setItem(mapFirst(value));
      console.log(item)
      let row=value.map((data:any)=>{
        return[
          <Typography>{data.name}</Typography>,
          <Typography>{data.valueType}</Typography>,
          <Typography>h</Typography>,
        ];
      })
      console.log(row)
      setItem(row)
      
      //setfirst(fun.data.map((data) =>{
      //return data.params;
      //}));
      //setItem(mapFirst());
      //console.log(mapFirst());
    };
    callFun();
    
  }, []);

  const mapFirst = (value: any) => {
    return value.map((data: any) => {
      return [
        <Typography>{data.name}</Typography>,
        <Typography>{data.valueType}</Typography>,
      ];
    });
  };

  const headersMock = [
    <Typography>Parametro ID</Typography>,
    <Typography>Nombre</Typography>,
    <Typography>Tipo de Dato</Typography>,
  ];

  const rowsMock = [
    [
      <Typography>Parametro ID</Typography>,
      <Typography>Nombre</Typography>,
      <Dropdown
        label="Tipo de Dato"
        items={[
          { name: "TEX", value: "string" },
          { name: "DAT", value: "date" },
          { name: "NUM", value: "number" },
          { name: "DEC", value: "float" },
        ]}
        width={200}
        height={50}
        selectedTextColor={ColorPalette.BLACK}
      />,
    ],
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <SearchContainer>
        <span>Nombre: </span>
        <TextFieldAtom
          id="id"
          label="Parametro Asociado"
          color="primary"
          type="text"
          placeholder="id"
          variant="standard"
        />
        <SizeButton
          palette={{ backgroundColor: ColorPalette.PRIMARY }}
          icon={<SearchIcon />}
          onClick={() => console.log("Buscar")}
          text="Buscar"
          style={ButtonStyle.MEDIUM}
        />
      </SearchContainer>
      <Container>
        <TableMolecule headers={headersMock} rows={item} />
        <ButtonIcon
          color={ColorPalette.PRIMARY}
          icon={<ControlPointIcon />}
          onClick={() => handleOpen()}
          top={true}
        />
        <SizeButton
          palette={{ backgroundColor: ColorPalette.PRIMARY }}
          onClick={() => console.log("Guardar")}
          text="Guardar"
          style={ButtonStyle.MEDIUM}
        />
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Agregar Parametro de Servicio Asociado
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Container>
            <div>
              <SearchContainer>
              <span>Nombre:</span>
              <TextFieldAtom
                id="id"
                label="Parametro Asociado"
                color="primary"
                type="text"
                placeholder="nombre"
                variant="standard"
              />
              </SearchContainer>
            </div>
            <div>
              <span>Tipo de Dato: </span>
              <Dropdown
                label="Tipo de Dato"
                items={[
                  { name: "TEX", value: "string" },
                  { name: "DAT", value: "date" },
                  { name: "NUM", value: "number" },
                  { name: "DEC", value: "float" },
                ]}
                width={200}
                height={50}
                selectedTextColor={ColorPalette.BLACK}
              />
            </div>
            <Container>
              <SizeButton
                palette={{ backgroundColor: ColorPalette.PRIMARY }}
                onClick={() => console.log("Guardar")}
                text="Guardar"
                style={ButtonStyle.MEDIUM}
              />
            </Container>
            </Container>
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};
