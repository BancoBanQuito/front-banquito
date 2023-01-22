import { TextField, Typography } from "@mui/material";
import React, { FormEvent, useState } from "react";
import TextFieldAtom from "../components/atoms/TextFieldAtom";
import TableMolecule from "../components/molecules/TableMolecule";
import ButtonIcon from "../components/atoms/ButtonIcon";
// search icon
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
// icon keyboar backspace
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { ColorPalette } from "../style/ColorPalette";
// Add icon
import { SizeButton } from "../components/atoms/SizeButton";
import { ButtonStyle } from "../style/ButtonStyle";
//data
//import IdentificationTypes from "../components/organisms/IdentificationType.json";
import { Checkbox } from "../components/atoms/Checkbox";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import SearchProductDialog from "./SearchProductDialog";
// Styles
export const Container = styled.div`
  display: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  padding-top: 50px;
  padding-bottom: 20px;
`;

export const Content = styled.div`
  margin-left: 20%;
`;

// Container for elements in content
export const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: end;
  width: 100%;
  height: 80%;
  padding: 0px;
  max-width: 1000px;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

// content button add position Right
export const ContentButtonAddRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
`;

// returnButton
export const ReturnButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: left;
  position: absolute;
  margin: 1rem;
  left: 0;
  top: 0;
`;

export const Span = styled.span`
  width: 100px;
`;

interface ProductLinkAssociatedService {
  onSubmit: (data: any) => void;
}

const ProductLinkAssociatedService = (props: ProductLinkAssociatedService) => {

  const searchBarProps = {
    // make sure all required component's inputs/Props keys&types match
    label: "",
  };

  const headers = [
    <Typography>Cuenta</Typography>,
    <Typography>Nombre del Producto</Typography>,
    <Typography>Vincular</Typography>,
  ];

  const rows = [
    [
      <Typography>asb001</Typography>,
      <Typography>Cuenta ahorros</Typography>,
      <Checkbox {...searchBarProps}>Cell 3</Checkbox>,
    ],
  ];

  const headersService = [
    <Typography>Id</Typography>,
    <Typography>Nombre del Servicio</Typography>,
    <Typography>Vincular</Typography>,
  ];

  const rowsService = [
    [
      <Typography>asb001</Typography>,
      <Typography>Chequera</Typography>,
      <Checkbox {...searchBarProps}>Cell 3</Checkbox>,
    ],
    [
      <Typography>asb002</Typography>,
      <Typography>Tarjeta debito</Typography>,
      <Checkbox {...searchBarProps}>Cell 3</Checkbox>,
    ]
  ];

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("test0");

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Container>
      <Content>
        <ReturnButton>
          <ButtonIcon
            color={ColorPalette.PRIMARY}
            icon={<KeyboardBackspaceIcon />}
            onClick={()=>{console.log("back")}}
            top={true}
          />
        </ReturnButton>
        <div>
          <h1>Vinculacion de productos con servicios asociados</h1>
        </div>
        <FormContainer>
          <Span>Nombre: </Span>
          <TextFieldAtom
            id="id"
            label="Nombre del producto"
            color="primary"
            type="text"
            placeholder="Nombre del producto"
            variant="standard"
          />
          <pre>     </pre>
          <SizeButton
            palette={{ backgroundColor: ColorPalette.PRIMARY }}
            icon={<SearchIcon />}
            onClick={handleClickOpen}
            text="Buscar"
            style={ButtonStyle.MEDIUM}
          />
        </FormContainer>
        <div>
          <TableMolecule headers={headers} rows={rows} />
        </div>
        <br></br>
        <br></br>
        <div>
          <TableMolecule headers={headersService} rows={rowsService} />
        </div>
        <ContentButtonAddRight>
          <SizeButton
            palette={{ backgroundColor: ColorPalette.TERNARY }}
            icon={<ConfirmationNumberOutlined />}
            onClick={() => console.log("Buscar")}
            text="Confirmar"
            style={ButtonStyle.BIG}
          />
        </ContentButtonAddRight>
        
      </Content>
      <SearchProductDialog open={open} onClose={handleClose} selectedValue={selectedValue}></SearchProductDialog>
    </Container>
  );
};

export default ProductLinkAssociatedService;
