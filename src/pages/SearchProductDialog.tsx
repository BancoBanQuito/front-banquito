
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { Checkbox as MuiCheckbox } from "@mui/material";
//atomos
import TableMolecule from "../components/molecules/TableMolecule";
import { Checkbox } from "../components/atoms/Checkbox";
import TextFieldAtom from "../components/atoms/TextFieldAtom";
import { SizeButton } from "../components/atoms/SizeButton";
// search icon
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
// icon keyboar backspace
import { ColorPalette } from "../style/ColorPalette";
//add icon
import { ButtonStyle } from "../style/ButtonStyle";
import { useEffect, useState } from "react";
import EnvManager from "../config/EnvManager";
import { Spinner } from "../components/atoms/Spinner";
import axios from "axios";
import { AlertColor } from "@mui/material";
import SnackBarMolecule from "../components/molecules/SnackBarMolecule";


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
  setProducts: Function;
  onClose: () => void;
}

const SearchProductDialog = (props: SimpleDialogProps) => {
  const { onClose, setProducts, open } = props;
  const [rowProduct, setRowProduct] = useState<any>([]);
  const [productsArray, setProductsArray] = useState<any>([]);
  const [productName, setProductName] = useState<string>("");
  const [activateSpinner, setActivateSpinner] = useState(false);
  const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');
  const handleClose = () => {
    onClose();
  };

  const headers = [
    <Typography>Nombre del Producto</Typography>,
    <Typography>Tipo</Typography>,
    <Typography>Vincular</Typography>,
  ];

  const getProductByName = async () => {
    try {
      setActivateSpinner(true);
      const response = await axios(
        `${EnvManager.PRODUCT_URL}/api/products/name-product?name=${productName}`,
        {
          method: "GET",
        }
      );
      settitleSnack("Producto encontrado");
      setmessageSnack("El producto se ha encontrado correctamente");
      setcolorSnack("success");
      setopenSnack(true);

      const data = await response.data;
      setActivateSpinner(false);
      const product = {
        name: <Typography>{data.name}</Typography>,
        type: <Typography>{data.productType.name}</Typography>,
        //link: <Checkbox {...searchBarProps}>{service.name}</Checkbox>
        link: (
          <MuiCheckbox
            size={"medium"}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement>,
              value: boolean
            ) => setProductList(data, value)}
            color="primary"
            name={data.name}
          />
        ),
      };

      const rowsProduct: any = [];
      rowsProduct.push([product.name, product.type, product.link]);
      setRowProduct(rowsProduct);
    } catch (error) {
      setActivateSpinner(false);
      console.log(error);
      settitleSnack("Producto no encontrado");
      setmessageSnack("El producto no se ha encontrado");
      setcolorSnack("error");
      setopenSnack(true);
    }
  }

  const getProducts = async () => {
    try {
      setActivateSpinner(true);
      const response = await axios(
        `${EnvManager.PRODUCT_URL}/api/products/products`,
        {
          method: "GET",
        }
      );
      settitleSnack("Productos encontrados");
      setmessageSnack("Los productos se han encontrado correctamente");
      setcolorSnack("success");
      setopenSnack(true);
      const data = await response.data;
      setActivateSpinner(false);
      const products = data.map((prod: any) => {
        return {
          name: <Typography>{prod.name}</Typography>,
          type: <Typography>{prod.productType.name}</Typography>,
          //link: <Checkbox {...searchBarProps}>{service.name}</Checkbox>
          link: (
            <MuiCheckbox
              size={"medium"}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement>,
                value: boolean
              ) => setProductList(prod, value)}
              color="primary"
              name={prod.name}
            />
          ),
        };
      });

      const rowsProduct: any = [];
      products.forEach((product: any) => {
        rowsProduct.push([product.name, product.type, product.link]);
      });
      setRowProduct(rowsProduct);
    } catch (error) {
      setActivateSpinner(false);
      console.log(error);
      settitleSnack("Productos no encontrados");
      setmessageSnack("Los productos no se han encontrado");
      setcolorSnack("error");
      setopenSnack(true);
    }
  };

  const setProductList = (product: any, value: Boolean) => {
    let productsAux = productsArray;
    if (value) {
      productsAux.push(product);
    } else {
      let index: number = productsAux.findIndex(
        (prod: { name: any; }) => prod.name == product.name
      );
      productsAux.splice(index, 1);
    }
    setProducts(productsAux);
  };

  const setProductsFromDialog = async () => {
    onClose();
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true}>
      <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                onClose={() => setopenSnack(false)} />
      {activateSpinner ? <Spinner /> : null}
      <DialogTitle>Seleccionar producto</DialogTitle>
      <FormContainer>
        <Span>Nombre: </Span>
        <TextFieldAtom
          id="id"
          label="Nombre del producto"
          color="primary"
          type="text"
          placeholder="Nombre del producto"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
          name={"id"} />
        <SizeButton
          palette={{ backgroundColor: ColorPalette.PRIMARY }}
          icon={<SearchIcon />}
          onClick={() => getProductByName()}
          text="Buscar"
          style={ButtonStyle.MEDIUM}
        />
      </FormContainer>
      <TableMolecule headers={headers} rows={rowProduct}></TableMolecule>
      <ContentButtonAddRight>
        <SizeButton
          palette={{ backgroundColor: ColorPalette.TERNARY }}
          icon={<AddIcon />}
          onClick={() => setProductsFromDialog()}
          text="Agregar"
          style={ButtonStyle.BIG}
        />
      </ContentButtonAddRight>
    </Dialog>
  );
};

export default SearchProductDialog;

