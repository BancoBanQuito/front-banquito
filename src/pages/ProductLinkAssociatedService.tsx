import { TextField, Typography } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import TextFieldAtom from "/src/components/atoms/TextFieldAtom";
import TableMolecule from "/src/components/molecules/TableMolecule";
import ButtonIcon from "/src/components/atoms/ButtonIcon";
// search icon
import SearchIcon from "@mui/icons-material/Search";
import { Checkbox as MuiCheckbox } from "@mui/material";
import styled from "styled-components";
// icon keyboar backspace
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { ColorPalette } from "/src/style/ColorPalette";
// Add icon
import { SizeButton } from "/src/components/atoms/SizeButton";
import { ButtonStyle } from "/src/style/ButtonStyle";
//data
//import IdentificationTypes from "/src/components/organisms/IdentificationType.json";
import { Checkbox } from "/src/components/atoms/Checkbox";
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

interface AssociatedService {
  id: String;
  name: String;
  allowPayment: String;
  paymentMethod: String;
  chargeVat: String;
  fee: Number;
  params: [];
}

interface CheckBoxList {
  name: String;
  checked: Boolean;
}

const ProductLinkAssociatedService = (props: ProductLinkAssociatedService) => {
  const [rowAssociatedServices, setRowAssociatedServices] = useState<any>([]);
  const [rowProduct, setRowProduct] = useState<any>([]);
  const [associatedServices, setAssociatedServices] = useState<
    AssociatedService[]
  >([]);
  const [products, setProducts] = useState<any>([]);
  //const [checkBoxList, setCheckBoxList] = useState<CheckBoxList[]>([]);

  const searchBarProps = {
    // make sure all required component's inputs/Props keys&types match
    label: "",
    onchange: (service: AssociatedService, value: Boolean) =>
      setServiceList(service, value),
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

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("test0");

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const getAssociatedServices = async () => {
    try {
      const response = await fetch(
        `http://localhost:8087/api/associatedServices`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      const services = data.map((service: any) => {
        delete service.params;
        delete service._id;
        return {
          id: <Typography>{service.name}</Typography>,
          payment: <Typography>{service.allowPayment}</Typography>,
          //link: <Checkbox {...searchBarProps}>{service.name}</Checkbox>
          link: (
            <MuiCheckbox
              size={"medium"}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement>,
                value: boolean
              ) => setServiceList(service, value)}
              color="primary"
              name={service.name}
              dir={"onn"}
            />
          ),
        };
      });

      const rowsService: any = [];
      services.forEach((service: any) => {
        rowsService.push([service.id, service.payment, service.link]);
      });
      setRowAssociatedServices(rowsService);
    } catch (error) {
      console.log(error);
    }
  };

  const setServiceList = (service: AssociatedService, value: Boolean) => {
    if (value) {
      setAssociatedServices(associatedServices.concat(service));
    }
    /* console.log("entra");
    console.log(checkBoxList);
    const checkBoxUpdated = checkBoxList.map(element => {
      if(element.name == name){
        console.log("entra al if");
        element.checked = value;
        return element;
      } else {
        console.log("entra al else");
        return element;
      } 
    });
    setCheckBoxList(checkBoxUpdated); */
  };

  const getProducts = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8087/api/products/products`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      const products = data.map((prod: any) => {
        return {
          id: <Typography>{prod.id}</Typography>,
          name: <Typography>{prod.name}</Typography>,
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
        rowsProduct.push([product.id, product.name, product.link]);
      });
      setRowProduct(rowsProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const setProductList = (product: any, value: Boolean) => {
    if (value) {
      setProducts(products.concat(product));
    }
  };

  useEffect(() => {
    getAssociatedServices();
    getProducts();
  }, []);

  const setServices = async () => {
    console.log("el array de servicios>");
    console.log(products);
    console.log(JSON.stringify(products));
    console.log('{"products":' + JSON.stringify(products) + ',"associatedServices":' + JSON.stringify(associatedServices) + '}');
    try {
      const response = await fetch(`http://localhost:8087/api/products/product-link-service`,
        {
          method: "PUT",
          headers: {
              'Content-Type': 'application/json'
          },
          body: '{"products":' + JSON.stringify(products) + ',"associatedServices":' + JSON.stringify(associatedServices) + '}'
        }
      );
        
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Content>
        <ReturnButton>
          <ButtonIcon
            color={ColorPalette.PRIMARY}
            icon={<KeyboardBackspaceIcon />}
            onClick={() => {
              console.log("back");
            }}
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
            action={(event) => console.log(event.target.value)}
            value={""}
          />
          <pre> </pre>
          <SizeButton
            palette={{ backgroundColor: ColorPalette.PRIMARY }}
            icon={<SearchIcon />}
            onClick={handleClickOpen}
            text="Buscar"
            style={ButtonStyle.MEDIUM}
          />
        </FormContainer>
        <div>
          <TableMolecule headers={headers} rows={rowProduct} />
        </div>
        <br></br>
        <br></br>
        <div>
          <TableMolecule
            headers={headersService}
            rows={rowAssociatedServices}
          />
        </div>
        <ContentButtonAddRight>
          <SizeButton
            palette={{ backgroundColor: ColorPalette.TERNARY }}
            icon={<ConfirmationNumberOutlined />}
            onClick={() => {
              setServices();
            }}
            text="Confirmar"
            style={ButtonStyle.BIG}
          />
        </ContentButtonAddRight>
      </Content>
      <SearchProductDialog
        open={open}
        onClose={handleClose}
        selectedValue={selectedValue}
      ></SearchProductDialog>
    </Container>
  );
};

export default ProductLinkAssociatedService;
