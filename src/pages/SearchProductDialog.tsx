
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
//atomos
import TableMolecule from "@/components/molecules/TableMolecule";
import { Checkbox } from "@/components/atoms/Checkbox";
import TextFieldAtom from "@/components/atoms/TextFieldAtom";
import { SizeButton } from "@/components/atoms/SizeButton";
// search icon
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
// icon keyboar backspace
import { ColorPalette } from "@/style/ColorPalette";
//add icon
import { ButtonStyle } from "@/style/ButtonStyle";


// Container for the search
export const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: end;
  width: 100%;
  height: 60%;
  padding: 0px;
  max-width: 550px;
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

export const Span = styled.span`
  width: 100px;
`;

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const SearchProductDialog = (props: SimpleDialogProps) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };


  const headers = [
    <Typography>Cuenta</Typography>,
    <Typography>Nombre del Producto</Typography>,
    <Typography>Vincular</Typography>,
  ];

  const searchBarProps = {
    // de ser necesario agragar campos al props
    label: "",
  };

  const rows = [
    [
      <Typography>asb001</Typography>,
      <Typography>Cuenta ahorros</Typography>,
      <Checkbox {...searchBarProps}>Cell 3</Checkbox>,
    ],
  ];

  const handleSelectedProducts = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true}>
      <DialogTitle>Seleccionar producto</DialogTitle>
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
        <SizeButton
          palette={{ backgroundColor: ColorPalette.PRIMARY }}
          icon={<SearchIcon />}
          onClick={() => console.log("Buscar")}
          text="Buscar"
          style={ButtonStyle.MEDIUM}
        />
      </FormContainer>
      <TableMolecule headers={headers} rows={rows}></TableMolecule>
      <ContentButtonAddRight>
        <SizeButton
          palette={{ backgroundColor: ColorPalette.TERNARY }}
          icon={<AddIcon />}
          onClick={ () => handleSelectedProducts("TODO send List<Products>")}
          text="Agregar"
          style={ButtonStyle.BIG}
        />
      </ContentButtonAddRight>
    </Dialog>
  );
};

export default SearchProductDialog;

