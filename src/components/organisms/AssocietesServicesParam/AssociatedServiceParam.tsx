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
import { string } from 'prop-types';
import Branch from '../../../pages/ClientPages/Branches/Branch';
import UpgradeIcon from '@mui/icons-material/Upgrade';

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


export const AssociatedServiceParam = () => {

  const [selectBranch,setSelectBranch] = useState<any>("")
  const [selectParam,setSelectParam] = useState<any>("")
  const [open, setOpen] = React.useState(false);
  const [openNew, setOpenNew] = React.useState(false);
  const handleOpen = (branch: any ) => {
    setOpen(true)
    setSelectBranch(branch);
  
  };
  const handleOpenNew = (branch: any , param: any) => {
    setOpenNew(true)
    setSelectBranch(branch)
    setSelectParam(param)

  };
  const handleClose = () => setOpen(false);
  const handleCloseNew = () => setOpenNew(false);
  const [value, setValue] = useState("");
  const [addName, setAddName]=useState("");
  const [addValue, setAddValue]=useState("");
  const [branches, setBranches] = useState<AssociatedService[]>([]);



  const getData = async () => {
    fetch("http://localhost:8081/api/product/associatedServices")
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => setBranches(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

  const headers = [<>ID</>, <>Nombre del Parametro</>, <>Valor</>, <>Acciones</>];

  const rows = branches.flatMap((branch) =>
    branch.params.map((param) => [
      <>{branch.id}</>,
      <>{param.name}</>,
      <>{param.valueType}</>,
      <>
       <ButtonIcon
          color={ColorPalette.PRIMARY}
          icon={<ControlPointIcon />}
          onClick={() => handleOpen(branch)}
          top={true}
        />
         <ButtonIcon
          color={ColorPalette.PRIMARY}
          icon={<UpgradeIcon />}
          onClick={() => handleOpenNew(branch,param)}
          top={true}
        />
      </>
    ])
  );

  const filterByValue = () => {
    if (value === "") return getData();
    else {
      const filtered = branches.filter((branch) => {
        return branch.id.includes(value);
      });
      return setBranches(filtered);
    }
  };

  useEffect(() => {
    filterByValue();
  }, [value]);

    const postData = async (branch :any ) => {
      fetch(`http://localhost:8081/api/associatedServiceParam/addparam/${branch.id}`,
      {
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            valueType:addValue,
            name:addName
        })
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          getData();
          return response.json();

        })
        .catch((error) => console.log(error));
    };

    const handleSubmit = async (branch: any , param:any ) => {
      try {
          console.log(branch.id)
          console.log(param.name)
          const response = await fetch(`http://localhost:8081/api/associatedServiceParam/updateparam/${branch.id}/${param.name}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
              body: JSON.stringify({
                valueType:addValue,
                name:addName
              })
          })
          if (!response.ok) {
              throw new Error(response.statusText)
          }
          alert("Actualizada con éxito")
          getData();
      } catch (error) {
          console.error(error)
      }
  }


  return (
    <Container>
      <SearchContainer>
        <span>Nombre: </span>
        <TextFieldAtom
          id="id"
          label="Parametro Asociado"
          color="primary"
          type="text"
          placeholder="id del servicio asociado"
          variant="standard"
          action={(event) => {
            setValue(event.target.value);
          }}
          value={value}
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
        <TableMolecule headers={headers} rows={rows} />
      </Container>
{/* Modal para crear un nuevo parametro */}
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
                    action={(event) => {
                      setAddName(event.target.value);
                     
                    }}
                    value={addName}
                  />
                </SearchContainer>
              </div>
              <div>
                <span>Tipo de Dato: </span>
                <TextFieldAtom
                    id="id"
                    label="Tipo valor"
                    color="primary"
                    type="text"
                    placeholder="nombre"
                    variant="standard"
                    action={(event) => {
                      setAddValue(event.target.value)
                    }}
                    value={addValue}
                  />
              </div>
              <Container>
                <SizeButton
                  palette={{ backgroundColor: ColorPalette.PRIMARY }}
                  onClick={() => postData(selectBranch)}
                  text="Guardar"
                  style={ButtonStyle.MEDIUM}
                />
              </Container>
            </Container>
          </Typography>
        </Box>
      </Modal>

{/* Modal para actualizar un parametro */}
      <Modal
        open={openNew}
        onClose={handleCloseNew}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Actualizar Parametro de Servicio Asociado
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
                    action={(event) => {
                      setAddName(event.target.value);
                    }}
                    value={addName}
                  />
                </SearchContainer>
              </div>
              <div>
                <span>Tipo de Dato: </span>
                <TextFieldAtom
                    id="id"
                    label="Tipo valor"
                    color="primary"
                    type="text"
                    placeholder="nombre"
                    variant="standard"
                    action={(event) => {
                      setAddValue(event.target.value)
                    }}
                    value={addValue}
                  />
              </div>
              <Container>
                <SizeButton
                  palette={{ backgroundColor: ColorPalette.PRIMARY }}
                  onClick={() => handleSubmit(selectBranch,selectParam)}
                  text="Actualizar"
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
