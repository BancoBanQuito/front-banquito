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
import { useNavigate } from "react-router-dom";

const urlCloud =
  "https://client-banquito-abigailscl-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/client/";

const local = "https://client-banquito-abigailscl-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/client/";

const isAvailable = true;

const UpdateClientDataForm: React.FC = () => {
  const [idCliente, setIdCliente] = useState<string | null>(
    localStorage.getItem("identification")
  );
  const [typeIdentification, setTypeIdentification] = useState<string | null>(
    localStorage.getItem("typeIdentification")
  );

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

  const [codeSegment, setCodeSegment] = useState<string>("");
  const [nameSegment, setNameSegment] = useState<string>("");
  const [statusSegment, setStatusSegment] = useState<string>("");

  const navigate = useNavigate();
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const fetchClientByIdAndTypeId = async () => {
    try {
      setTypeIdentification(localStorage.getItem("typeIdentification"));
      const response = await fetch(
        // urlCloud + `${idCliente}/${typeIdentification}`
        urlCloud + `${idCliente}`
      );
      const data = await response.json();

      setIdCliente(data.identification);
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
      setIdCliente(data.identification);
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

      setCodeSegment(data.segment.code);
      setNameSegment(data.segment.name);
      setStatusSegment(data.segment.status);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClientByIdAndTypeId();
  }, []);

  return (
    <>
      <Container sx={containertTitleStyles}>
        <Typography variant="h4" align="center">
        </Typography>
        Actualizar la Información del Cliente
      </Container>
      <Grid container>
        <Grid item xs={7}>
          {/* Label Input*/}
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Email:</FormLabel>
            <TextField
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              variant="standard"
              disabled={isAvailable}
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Fecha de Nacimiento:</FormLabel>
            <TextField
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              variant="standard"
              disabled={isAvailable}
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Carrera:</FormLabel>
            <TextField
              value={career}
              onChange={(event) => setCareer(event.target.value)}
              variant="standard"
              disabled={isAvailable}
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Lugar de Trabajo:</FormLabel>
            <TextField
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              variant="standard"
              disabled={isAvailable}
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Referencia:</FormLabel>
            <TextField
              value={name}
              onChange={(event) => setName(event.target.value)}
              variant="standard"
              disabled={isAvailable}
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Telefono:</FormLabel>
            <TextField
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              variant="standard"
              disabled={isAvailable}
            />
          </Container>
        </Grid>

        <Grid item xs={3}>
          <Container>
            <Box sx={boxStile}>
              <p>{fullName}</p>
              <p>Identificación: {idCliente}</p>
              <p>Tipo de Itentificación: {typeIdentification}</p>
              <p>Estado: {status}</p>
            </Box>
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Direccion:</FormLabel>
            <TextField
              value={lineOne}
              onChange={(event) => setLineOne(event.target.value)}
              variant="standard"
              disabled={isAvailable}
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Segmento:</FormLabel>
            <TextField
              value={nameSegment}
              onChange={(event) => setNameSegment(event.target.value)}
              variant="standard"
              disabled={isAvailable}
            />
          </Container>

          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Estado Civil:</FormLabel>
            <TextField
              value={maritalStatus}
              onChange={(event) => setMaritalStatus(event.target.value)}
              variant="standard"
              disabled={isAvailable}
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Genero:</FormLabel>
            <TextField
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              variant="standard"
              disabled={isAvailable}
            />
          </Container>
        </Grid>
        {/* Boton*/}
        <Container sx={containerTextFieldStyles}>
          <Button
            onClick={() => {
              navigate("/usuario");
            }}
            sx={buttonStyles}
          >
            Guardar
          </Button>
        </Container>
      </Grid>
    </>
  );
};

export default UpdateClientDataForm;

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

const formLabelStyles = () => ({
  marginRight: "10px",
});

const buttonStyles = () => ({
  background: "#E63946",
  color: "white",
  ":hover": {
    background: "#E63946",
    color: "white",
  },
});
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
