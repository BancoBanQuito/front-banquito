import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import BranchBox from "../Branch/BranchBox";
import TableMolecule from "../../molecules/TableMolecule";

export const UpdateClientLikeBankUser: React.FC = () => {

  const [identification, setIdentification] = useState<string>("");
  const [typeIdentification, setTypeIdentification] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [career, setCareer] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [companyType, setCompanyType] = useState<string>("");
  const [createDateCompany, setCreateDateCompany] = useState<string>("");
  const [appLegalRepresent, setAppLegalRepresent] = useState<string>("");
  const [articlesAssociatedDoc, setArticlesAssociatedDoc] = useState<string>("");
  const [basicServicesDocument, setBasicServicesDocument] = useState<string>("");
  const [fingerPrint, setFingerPrint] = useState<string>("");
  const [incomeTaxDocument, setIncomeTaxDocument] = useState<string>("");
  const [lastStatusDate, setLastStatusDate] = useState<string>("");
  const [maritalStatus, setMaritalStatus] = useState<string>("");
  const [monthlyAvgIncome, setMonthlyAvgIncome] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [taxPaymentPlace, setTaxPaymentPlace] = useState<string>("");
  const [tinDocument, setTinDocument] = useState<string>("");
  const [workStatus, setWorkStatus] = useState<string>("");
  const [creationDate, setCreationDate] = useState<string>("");

  const [phone, setPhone] = useState<string>("");
  const [phoneType, setTypePhone] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [phoneReference, setPhoneReference] = useState<string>("");
  const [related, setRelated] = useState<string>("");

  const [nameRelation, setNameRelation] = useState<string>("");
  const [startDateRelation, setStartDateRelation] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [codeLocation, setCodeLocation] = useState<string>("");
  const [lineOne, setLineOne] = useState<string>("");
  const [lineTwo, setLineTwo] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");


  const [isStatusSelected, setIsStatusSelected] = useState<boolean>(true);

  useEffect(() => {
    fetch(`https://client-banquito-abigailscl-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/client/1750343210`)
      .then((response) => response.json())
      .then((data) => {
        setIdentification(data.identification);
        setTypeIdentification(data.typeIdentification);
        setEmail(data.email);
        setGender(data.gender);
        setCareer(data.career);
        setTypePhone(data.phone.phoneType);
        setPhone(data.phone.phoneNumber);
        setFullName(data.fullname);
        setLineOne(data.address.lineOne);
        setLineTwo(data.address.lineTwo);
        setTypeIdentification(data.identificationType);
        setIdentification(data.identification);
        setBirthDate(data.birthDate);
        setGender(data.gender);
        setCareer(data.career);
        setCompanyName(data.companyName);
        setCompanyType(data.companyType);
        setCreateDateCompany(data.createDateCompany);
        setAppLegalRepresent(data.appLegalRepresent);
        setArticlesAssociatedDoc(data.articlesAssociatedDoc);
        setBasicServicesDocument(data.basicServicesDocument);
        setFingerPrint(data.fingerPrint);
        setIncomeTaxDocument(data.incomeTaxDocument);
        setLastStatusDate(data.lastStatusDate);
        setMaritalStatus(data.maritalStatus);
        setMonthlyAvgIncome(data.monthlyAvgIncome);
        setNationality(data.nationality);
        setSignature(data.signature);
        setTaxPaymentPlace(data.taxPaymentPlace);
        setTinDocument(data.tinDocument);
        setWorkStatus(data.workStatus);
        setCreationDate(data.creationDate);
        
        setPhone(data.phone.phoneNumber);
        setTypePhone(data.phoneType);

        setPhoneReference(data.reference.phone);
        setName(data.reference.name);
        setRelated(data.reference.related);

        setNameRelation(data.relationship.name);
        setStartDateRelation(data.relationship.startDate);
        setEndDate(data.relationship.endDate);

        setCodeLocation(data.adrdress.codeLocation);
        setLineOne(data.address.lineOne);
        setLineTwo(data.address.lineTwo);
        setLatitude(data.address.longitude);
        setLongitude(data.address.longitude);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const onChangeStatus = (value: string) => {
    setGender(value);
    if (value !== "") {
      setIsStatusSelected(false);
    } else {
      setIsStatusSelected(true);
    }
  };

  const onChangeTypePhone = (value: string) => {
    setTypePhone(value);
    if (value !== "") {
      setIsStatusSelected(false);
    } else {
      setIsStatusSelected(true);
    }
  };

  const optionsStatus = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Femenino" },
  ];

  const optionTypePhone = [
    { value: "MBL", label: "Móvil" },
    { value: "CON", label: "Convencional" },
  ];

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Container sx={containertTitleStyles}>
            <Typography variant="h4" align="center">
              Actualizar datos de Cliente
            </Typography>
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Correo:</FormLabel>
            <TextField
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <div style={{ marginRight: "10px" }}>
              <BranchBox
                label="Genero:"
                value={gender}
                options={optionsStatus}
                onChange={onChangeStatus}
              />
            </div>
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Carrera:</FormLabel>
            <TextField
              value={career}
              onChange={(event) => setCareer(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Empresa de trabajo:</FormLabel>
            <TextField
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Tipo de empresa:</FormLabel>
            <TextField
              value={companyType}
              onChange={(event) => setCompanyType(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Representante legal:</FormLabel>
            <TextField
              value={appLegalRepresent}
              onChange={(event) => setAppLegalRepresent(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Estado civil:</FormLabel>
            <TextField
              value={maritalStatus}
              onChange={(event) => setMaritalStatus(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Firma:</FormLabel>
            <TextField
              value={signature}
              onChange={(event) => setSignature(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <div style={{ marginRight: "10px" }}>
              <BranchBox
                label="Tipo Teléfono:"
                value={phoneType}
                options={optionTypePhone}
                onChange={onChangeTypePhone}
              />
            </div>
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Teléfono:</FormLabel>
            <TextField
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              variant="standard"
            />
          </Container>
        </Grid>
        <Grid item xs={0}>
          <Container>
            <Box sx={boxStile}>
              <p>{fullName}</p>
              <p>Identificación: {identification}</p>
              <p>Tipo de Itentificación: {typeIdentification}</p>
            </Box>
          </Container>
          <Container sx={containertTitleStyles}>
            <Typography variant="h5" align="center">
              Direccion
            </Typography>
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Linea 1:</FormLabel>
            <TextField
              value={lineOne}
              onChange={(event) => setLineOne(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Linea 2:</FormLabel>
            <TextField
              value={lineTwo}
              onChange={(event) => setLineTwo(event.target.value)}
              variant="standard"
            />
          </Container>
        </Grid>
        <Container sx={containerTextFieldStyles}>
          <Button sx={buttonStyles}>Guardar</Button>
        </Container>
      </Grid>
    </>
  );
};

const boxStile = () => ({
  textAlign: "left",
  color: "#F1FAEE",
  marginTop: "70px",
  marginBottom: "20px",
  background: "#1D3557",
  padding: "20px",
  borderRadius: "10px",
  fontSize: "20px",
});

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
  background: "#E63946",
  color: "white",
  width: "150px",
  height: "30px",
  padding: "25px",
  borderRadius: "10px",
  fontSize: "18px",
  ":hover": {
    background: "#F26d77",
    color: "white",
  },
});
