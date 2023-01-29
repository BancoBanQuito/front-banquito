import React, { useEffect, useState } from "react";
import { ConfirmationNumberOutlined, KeyboardBackspace, Search } from "@mui/icons-material";
import ButtonIcon from "../components/atoms/ButtonIcon";
import { SizeButton } from "../components/atoms/SizeButton";
import TextFieldAtom from "../components/atoms/TextFieldAtom";
import TableMolecule from "../components/molecules/TableMolecule";
import { ButtonStyle } from "../style/ButtonStyle";
import { ColorPalette } from "../style/ColorPalette";
import SearchProductDialog from "./SearchProductDialog";
import { Typography, Checkbox as MuiCheckbox } from "@mui/material";
import styled from "styled-components";
import { Checkbox } from "../components/atoms/Checkbox";
import { ConfirmationNumberOutlined, South } from "@mui/icons-material";
import SearchProductDialog from "./SearchProductDialog";
import { Route } from "react-router-dom";
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
  align-items: flex-end;
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
  width: 220px;
  padding-bottom: 10px;
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

const ProductLinkAssociatedService = (props: ProductLinkAssociatedService) => {
  const [rowAssociatedServices, setRowAssociatedServices] = useState<any>([]);
  const [rowProduct, setRowProduct] = useState<any>([]);
  const [associatedServices, setAssociatedServices] = useState<
    AssociatedService[]
  >([]);
  const [products, setProducts] = useState<any>([]);
  const [dialog, setDialog] = useState(false);

  const headers = [
    <Typography>Nombre del Producto</Typography>,
    <Typography>Tipo</Typography>,
    <Typography>Vincular</Typography>,
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
    let asociateServices: AssociatedService[] = associatedServices;
    if (value) {
      asociateServices.push(service);
    } else {
      let index: number = associatedServices.findIndex(
        (serv) => serv.name == service.name
      );
      asociateServices.splice(index, 1);
    }
    setAssociatedServices(asociateServices);
  };

  const getProducts = async () => {
    const productsList = products.map((prod: any) => {
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
            defaultChecked={true}
          />
        ),
      };
    });

    const rowsProduct: any = [];
    productsList.forEach((product: any) => {
      rowsProduct.push([product.name, product.type, product.link]);
    });
    setRowProduct(rowsProduct);

  };

  const setProductList = (product: any, value: Boolean) => {
    let productsAux = products;
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

  useEffect(() => {
    getAssociatedServices();
    getProducts();
  }, [dialog]);

  const setServices = async () => {
    //console.log('{"products":' + JSON.stringify(products) + ',"associatedServices":' + JSON.stringify(associatedServices) + '}');
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
        <SearchProductDialog
          open={dialog}
          setProducts={setProducts}
          onClose={function (): void {
            setDialog(false);
          }}
        ></SearchProductDialog>
        <ReturnButton>
          <ButtonIcon
            color={ColorPalette.PRIMARY}
            icon={<KeyboardBackspace />}
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
          <Span>Busca productos para vincular: </Span>
          {/* <TextFieldAtom
            id="id"
            label="Nombre del producto"
            color="primary"
            type="text"
            placeholder="Nombre del producto"
            variant="standard"
            action={(event) => console.log(event.target.value)}
          /> */}
          <pre> </pre>
          <SizeButton
            palette={{ backgroundColor: ColorPalette.PRIMARY }}
            icon={<SearchIcon />}
            onClick={() => {
              setDialog(true);
            }}
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
    </Container>
  );
};

export default ProductLinkAssociatedService;
