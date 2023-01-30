import React, { useState, useEffect } from "react";
import { Container, FormLabel, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";

import { Canton, Province } from "../../../components/organisms/Location/types";
//import LoginBox from "./LoginBox";
import Button from "@mui/material/Button";
import EnvManager from "../../../config/EnvManager";
import { Spinner } from "../../../components/atoms/Spinner";

export const GeneralInformation = () => {
  const [identification, setIdentification] = useState<string>("");
  const [identificationType, setIdentificationType] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [career, setCareer] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [companyType, setCompanyType] = useState<string>("");
  const [createDateCompany, setCreateDateCompany] = useState<string>("");
  const [appLegalRepresent, setAppLegalRepresent] = useState<string>("");
  const [articlesAssociatedDoc, setArticlesAssociatedDoc] =
    useState<string>("");
  const [basicServicesDocument, setBasicServicesDocument] =
    useState<string>("");
  const [fingerPrint, setFingerPrint] = useState<string>("");
  const [incomeTaxDocument, setIncomeTaxDocument] = useState<string>("");
  const [lastStatusDate, setLastStatusDate] = useState<string>("");
  const [monthlyAvgIncome, setMonthlyAvgIncome] = useState<string>("");
  const [maritalStatus, setMaritalStatus] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [taxPaymentPlace, setTaxPaymentPlace] = useState<string>("");
  const [tinDocument, setTinDocument] = useState<string>("");
  const [workStatus, setWorkStatus] = useState<string>("");

  const [codeLocation, setCodeLocation] = useState<string>("");
  const [lineOne, setLineOne] = useState<string>("");
  const [lineTwo, setLineTwo] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneType, setPhoneType] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [related, setRelated] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [activateSpinner, setActivateSpinner] = useState(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setActivateSpinner(true);
      const response = await fetch(`${EnvManager.CLIENT_URL}/api/client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          identificationType: identificationType,
          identification: identification,
          lastname: lastname,
          firstname: firstname,
          email: email,
          birthDate: birthDate + "T00:00:00.000+00:00",
          gender: gender,
          career: career,
          companyName: companyName,
          companyType: companyType,
          createDateCompany: createDateCompany,
          appLegalRepresent: appLegalRepresent,
          articlesAssociatedDoc: articlesAssociatedDoc,
          basicServicesDocument: basicServicesDocument,
          fingerPrint: fingerPrint,
          incomeTaxDocument: incomeTaxDocument,
          lastStatusDate: "2001-01-01T00:00:00.000+00:00",
          maritalStatus: maritalStatus,
          monthlyAvgIncome: monthlyAvgIncome,
          nationality: nationality,
          signature: signature,
          taxPaymentPlace: taxPaymentPlace,
          tinDocument: tinDocument,
          workStatus: workStatus,

          address: [
            {
              codeLocation: codeLocation,
              lineOne: lineOne,
              lineTwo: lineTwo,
              latitude: latitude,
              longitude: longitude,
            },
          ],
          phone: [
            {
              phoneNumber: phoneNumber,
              phoneType: phoneType,
            },
          ],
          reference: [
            {
              name: name,
              phone: phone,
              related: related,
            },
          ],
          relationship: [
            {
              name: name,
              startDate: "2001-01-01T00:00:00.000+00:00",
              endDate: "2001-01-01T00:00:00.000+00:00",
            },
          ],
          segment: [
            {
              code: code,
              name: name,
              status: status,
            },
          ],
        }),
      });
      if (!response.ok) {
        setActivateSpinner(false);
        throw new Error(response.statusText);
      }
      setActivateSpinner(false);
      alert("Creado con éxito");
    } catch (error) {
      setActivateSpinner(false);
      console.error(error);
    }
  };

  return (
    <>
      {activateSpinner ? <Spinner /> : null}
      <Container sx={containertTitleStyles}>
        <Typography variant="h5" align="center">
          Crear Usuario
        </Typography>
      </Container>
      <Container sx={containerStyles}></Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Número de identificación:</FormLabel>
        <TextField
          value={identification}
          onChange={(event) => setIdentification(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Tipo de identificación:</FormLabel>
        <TextField
          value={identificationType}
          onChange={(event) => setIdentificationType(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Lastname:</FormLabel>
        <TextField
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>First name</FormLabel>
        <TextField
          value={firstname}
          onChange={(event) => setFirstname(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Email:</FormLabel>
        <TextField
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Birth Date:</FormLabel>
        <TextField
          value={birthDate}
          onChange={(event) => setBirthDate(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Gender:</FormLabel>
        <TextField
          value={gender}
          onChange={(event) => setGender(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Career:</FormLabel>
        <TextField
          value={career}
          onChange={(event) => setCareer(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>companyName:</FormLabel>
        <TextField
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>companyType:</FormLabel>
        <TextField
          value={companyType}
          onChange={(event) => setCompanyType(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>createDateCompany:</FormLabel>
        <TextField
          value={createDateCompany}
          onChange={(event) => setCreateDateCompany(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>appLegalRepresent:</FormLabel>
        <TextField
          value={appLegalRepresent}
          onChange={(event) => setAppLegalRepresent(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>articlesAssociatedDoc:</FormLabel>
        <TextField
          value={articlesAssociatedDoc}
          onChange={(event) => setArticlesAssociatedDoc(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>basicServicesDocument:</FormLabel>
        <TextField
          value={basicServicesDocument}
          onChange={(event) => setBasicServicesDocument(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>fingerPrint</FormLabel>
        <TextField
          value={fingerPrint}
          onChange={(event) => setFingerPrint(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Income Tax Document:</FormLabel>
        <TextField
          value={incomeTaxDocument}
          onChange={(event) => setIncomeTaxDocument(event.target.value)}
          variant="standard"
        />
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Monthly Average Income:</FormLabel>
        <TextField
          value={monthlyAvgIncome}
          onChange={(event) => setMonthlyAvgIncome(event.target.value)}
          variant="standard"
        />
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Marital Status:</FormLabel>
        <TextField
          value={maritalStatus}
          onChange={(event) => setMaritalStatus(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Nationality:</FormLabel>
        <TextField
          value={nationality}
          onChange={(event) => setNationality(event.target.value)}
          variant="standard"
        />
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Signature:</FormLabel>
        <TextField
          value={signature}
          onChange={(event) => setSignature(event.target.value)}
          variant="standard"
        />
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Tax Payment Place:</FormLabel>
        <TextField
          value={taxPaymentPlace}
          onChange={(event) => setTaxPaymentPlace(event.target.value)}
          variant="standard"
        />
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>TIN Document:</FormLabel>
        <TextField
          value={tinDocument}
          onChange={(event) => setTinDocument(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Work Status:</FormLabel>
        <TextField
          value={workStatus}
          onChange={(event) => setWorkStatus(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containertTitleStyles}>
        <Typography variant="h5" align="center">
          Direccion
        </Typography>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Code Location:</FormLabel>
        <TextField
          value={codeLocation}
          onChange={(event) => setCodeLocation(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Line One:</FormLabel>
        <TextField
          value={lineOne}
          onChange={(event) => setLineOne(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Line Two:</FormLabel>
        <TextField
          value={lineTwo}
          onChange={(event) => setLineTwo(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Latitude:</FormLabel>
        <TextField
          value={latitude}
          onChange={(event) => setLatitude(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Longitude:</FormLabel>
        <TextField
          value={longitude}
          onChange={(event) => setLongitude(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containertTitleStyles}>
        <Typography variant="h5" align="center">
          Telefono
        </Typography>
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Phone Number:</FormLabel>
        <TextField
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          variant="standard"
        />
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Phone Type:</FormLabel>
        <TextField
          value={phoneType}
          onChange={(event) => setPhoneType(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containertTitleStyles}>
        <Typography variant="h5" align="center">
          Crear Usuario
        </Typography>
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Name:</FormLabel>
        <TextField
          value={name}
          onChange={(event) => setName(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Phone:</FormLabel>
        <TextField
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          variant="standard"
        />
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Related:</FormLabel>
        <TextField
          value={related}
          onChange={(event) => setRelated(event.target.value)}
          variant="standard"
        />
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Code:</FormLabel>
        <TextField
          value={code}
          onChange={(event) => setCode(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>status:</FormLabel>
        <TextField
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          variant="standard"
        />
      </Container>
      <Container sx={containerTextFieldStyles}>
        <Button onClick={handleSubmit} sx={buttonStyles}>
          Crear usuario
        </Button>
      </Container>
    </>
  );
};

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
});

const containerFormLabelStyles = () => ({
  marginTop: "50px",
  marginLeft: "280px",
});

const formLabelStyles = () => ({
  marginRight: "10px",
});

const buttonStyles = () => ({
  background: "#1D3557",
  color: "white",
  ":hover": {
    background: "#1D3557",
    color: "white",
  },
});
