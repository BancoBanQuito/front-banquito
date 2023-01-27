import React, { useState, useEffect, ChangeEvent, FocusEvent } from "react";
import { Container, FormLabel, TextField, Typography } from "@mui/material";
import moment from "moment";
import Button from "@mui/material/Button";
import BranchBox from "../Branch/BranchBox";
import { OptionUnstyled } from "@mui/base";
import { style } from "../../../pages/CreateRequestService";
import { parse, isValid } from "date-fns";
import { defineConfig } from "vite";

const CreateClient: React.FC = () => {
  const [identificationType, setIdentificationType] = useState<string>("DNI");
  const [identification, setIdentification] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [status, setStatus] = useState<string>("Activo");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthDateState, setBirthDateState] = useState<{
    date: Date | null;
    error: boolean;
  }>({ date: null, error: false });
  const [error, setError] = useState(false);
  const [gender, setGender] = useState<string>("Otro");
  const [career, setCareer] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [companyType, setCompanyType] = useState<string>("");
  const [createDateCompany, setCreateDateCompany] = useState<Date | null>(null);
  const [createDateError, setCreateDateError] = useState<string>("");
  const [appLegalRepresent, setAppLegalRepresent] = useState<string>("");
  const [articlesAssociatedDoc, setArticlesAssociatedDoc] =
    useState<string>("");
  const [basicServicesDocument, setBasicServicesDocument] =
    useState<string>("");
  const [fingerPrint, setFingerPrint] = useState<string>("");
  const [incomeTaxDocument, setIncomeTaxDocument] = useState<string>("");
  const [lastStatusDate, setLastStatusDate] = useState<Date>(new Date());
  const [maritalStatus, setMaritalStatus] = useState<string>("");
  const [monthlyAvgIncome, setMonthlyAvgIncome] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [taxPaymentPlace, setTaxPaymentPlace] = useState<string>("");
  const [tinDocument, setTinDocument] = useState<string>("");
  const [workStatus, setWorkStatus] = useState<string>("");
  const [creationDate, setCreationDate] = useState<Date>(new Date());
  // const [phone, setPhone] = useState<string>("");
  // const [address, setAddress] = useState<string>("");
  // const [relationship, setRelationship] = useState<string>("");
  // const [reference, setReference] = useState<string>("");
  const [segment, setSegment] = useState<string>("");
  const [user, setUser] = useState<string>("");
  // const [phoneNumber, setPhoneNumber] = useState<string[]>([]);
  // const [phoneType, setPhoneType] = useState<string[]>([]);
  const phone = [
    {
      phoneNumber: "",
      phoneType: "",
    },
  ];
  const [phoneNumber, setPhoneNumber] = useState(phone[0].phoneNumber);
  const [phoneType, setPhoneType] = useState(phone[0].phoneType);

  // const [codeLocation, setCodeLocation] = useState<string[]>([]);

  const address = [
    {
      codeLocation: "",
      lineOne: "",
      lineTwo: "",
      latitude: "",
      longitude: "",
    },
  ];
  const [codeLocation, setCodeLocation] = useState(address[0].codeLocation);
  const [lineOne, setLineOne] = useState(address[0].lineOne);
  const [lineTwo, setLineTwo] = useState(address[0].lineTwo);
  const [latitude, setLatitude] = useState(address[0].latitude);
  const [longitude, setLongitude] = useState(address[0].longitude);

  // const [lineOne, setLineOne] = useState<string[]>([]);
  // const [lineTwo, setLineTwo] = useState<string[]>([]);
  // const [latitude, setLatitude] = useState<string[]>([]);
  // const [longitude, setLongitude] = useState<string[]>([]);

  const relationship = [
    {
      nameRelationShip: "",
      startDate: "",
      endDate: ""
    },
  ];

  const [nameRelationShip, setNameRelationShip] = useState(
    relationship[0].nameRelationShip
  );
  const [startDate, setStartDate] = useState(relationship[0].startDate);
  const [endDate, setEndDate] = useState(relationship[0].endDate);


  // const [nameRelationShip, setNameRelationShip] = useState<string[]>([]);
  // const [startDate, setStartDate] = useState<Date[]>([]);
  // const [endDate, setEndDate] = useState<Date[]>([]);
  // const [nameReference, setNameReference] = useState<string[]>([]);
  // const [phoneReference, setPhoneReference] = useState<string[]>([]);
  // const [related, setRelated] = useState<string[]>([]);

  const reference = [
    {
      nameReference: "",
      phoneReference: "",
      related: "",
    },
  ];

  const [nameReference, setNameReference] = useState(
    reference[0].nameReference
  );
  const [phoneReference, setPhoneReference] = useState(
    reference[0].phoneReference
  );
  const [related, setRelated] = useState(reference[0].related);

  const [codeSegment, setCodeSegment] = useState<string>();
  const [nameSegment, setNameSegment] = useState<string>();
  const [statusSegment, setStatusSegment] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [typeUser, setTypeUser] = useState<string>();
  const [creationDateUser, setCreationDateUser] = useState<Date>();
  const [lastLoginDate, setLastLoginDate] = useState<Date>();

  const onChangeIdentificationType = (value: string) => {
    setIdentificationType(value);
    if (value === "DNI") {
      setIdentificationType("DNI");
    } else if (value === "Pasaporte") {
      setIdentificationType("Pasaporte");
    } else if (value === "RUC") {
      setIdentificationType("RUC");
    }
  };

  const date = parse("2022-01-01", "yyyy-MM-dd", new Date());

  const onChangeStatus = (value: string) => {
    setStatus(value);
    if (value === "Activo") {
      setStatus("Activo");
    } else if (value === "Inactivo") {
      setStatus("Inactivo");
    } else if (value === "Suspendido") {
      setStatus("Suspendido");
    } else if (value === "Bloqueado") {
      setStatus("Bloqueado");
    }
  };

  const onChangeGender = (value: string) => {
    setGender(value);
    if (value === "Masculino") {
      setGender("Masculino");
    } else if (value === "Femenino") {
      setGender("Femenino");
    } else if (value === "Otro") {
      setGender("Otro");
    }
  };

  const containerTextFieldStyles = {
    display: "flex",
    alignItems: "center",
  };

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const handelSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8083/api/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          identificationType,
          identification,
          lastname,
          firstname,
          status,
          email,
          birthDate,
          gender,
          career,
          companyName,
          companyType,
          createDateCompany,
          appLegalRepresent,
          articlesAssociatedDoc,
          basicServicesDocument,
          fingerPrint,
          incomeTaxDocument,
          lastStatusDate,
          maritalStatus,
          monthlyAvgIncome,
          nationality,
          signature,
          taxPaymentPlace,
          tinDocument,
          workStatus,
          creationDate,
          phone: [
            {
              phoneNumber,
              phoneType,
            },
          ],
          address: [
            {
              codeLocation,
              lineOne,
              lineTwo,
              latitude,
              longitude,
            },
          ],
          relationship: [
            {
              nameRelationShip,
              startDate,
              endDate,
            },
          ],
          reference: [
            {
              nameReference,
              phoneReference,
              related,
            },
          ],
          segment: {
            codeSegment,
            nameSegment,
            statusSegment,
          },
          user: {
            userName,
            password,
            typeUser,
            creationDate,
            lastLoginDate,
          },
        }),
      });
      if (response.ok) {
        throw new Error(response.statusText);
      }
      alert("Client created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (!emailRegex.test(event.target.value)) {
      setEmailError("Ingrese un correo electrónico válido");
    } else {
      setEmailError("");
    }
  };

  const handleBirthDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const dateString = event.target.value;
    if (moment(dateString, "YYYY-MM-DD", true).isValid()) {
      setBirthDateState({ date: new Date(dateString), error: false });
    } else {
      setBirthDateState({ date: null, error: true });
    }
  };

  const handleError = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.value) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleCreateDateCompanyChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const date = event.target.value;
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());
    if (isValid(parsedDate)) {
      setCreateDateCompany(parsedDate);
      setCreateDateError("");
    } else {
      setCreateDateError("Ingrese una fecha válida en el formato yyyy-MM-dd");
    }
  };

  const optionsIdentificationType = [
    { value: "DNI", label: "DNI" },
    { value: "Pasaporte", label: "Pasaporte" },
    { value: "RUC", label: "RUC" },
  ];

  const optionsStatus = [
    { value: "Activo", label: "Activo" },
    { value: "Inactivo", label: "Inactivo" },
    { value: "Suspendido", label: "Suspendido" },
    { value: "Bloqueado", label: "Bloqueado" },
  ];

  const optionsGender = [
    { value: "Otro", label: "Otro" },
    { value: "Masculino", label: "Masculino" },
    { value: "Femenino", label: "Femenino" },
  ];

  return (
    <>
      <Container sx={containerTextFieldStyles}>
        <Typography variant="h4">Create Client</Typography>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <div style={{ marginRight: "10px" }}>
          <BranchBox
            label="Tipo de identificación: "
            value={identificationType}
            options={optionsIdentificationType}
            onChange={onChangeIdentificationType}
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Identificación:</FormLabel>
        <TextField
          value={identification}
          onChange={(event) => setIdentification(event.target.value)}
          variant="standard"
        />
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Apellido:</FormLabel>
        <TextField
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
          variant="standard"
        />
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Nombre:</FormLabel>
        <TextField
          value={firstname}
          onChange={(event) => setFirstname(event.target.value)}
          variant="standard"
        />
      </Container>

      <Container sx={containerTextFieldStyles}>
        <div style={{ marginRight: "10px" }}>
          <BranchBox
            label="Estado: "
            value={status}
            options={optionsStatus}
            onChange={onChangeStatus}
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <div style={{ marginRight: "10px" }}>
          <TextField
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={handleBlur}
            error={!!emailError}
            helperText={emailError}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Fecha de Nacimiento:</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            type="date"
            value={birthDate}
            onChange={handleBirthDateChange}
            error={error}
            helperText={error ? "Ingresa una fecha válida" : ""}
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <div style={{ marginRight: "10px" }}>
          <BranchBox
            label="Género: "
            value={gender}
            options={optionsGender}
            onChange={onChangeGender}
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
        <FormLabel sx={formLabelStyles}>Nombre de compañia:</FormLabel>
        <TextField
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
          variant="standard"
        />
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Tipo de compañia:</FormLabel>
        <TextField
          value={companyType}
          onChange={(event) => setCompanyType(event.target.value)}
          variant="standard"
        />
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>
          Fecha de creación de la empresa:
        </FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            type="date"
            value={
              createDateCompany
                ? createDateCompany.toISOString().substr(0, 10)
                : ""
            }
            onChange={handleCreateDateCompanyChange}
            error={createDateError !== ""}
            helperText={createDateError}
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>
          Nombre del Representante legal
        </FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={appLegalRepresent}
            onChange={(event) => setAppLegalRepresent(event.target.value)}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>
          Documentos asociados al representante legal
        </FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={articlesAssociatedDoc}
            onChange={(event) => setArticlesAssociatedDoc(event.target.value)}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>
          Documento de servicios básicos
        </FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={basicServicesDocument}
            onChange={(event) => setBasicServicesDocument(event.target.value)}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Huella digital</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={fingerPrint}
            onChange={(event) => setFingerPrint(event.target.value)}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>
          Documento de impuesto sobre la renta
        </FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={incomeTaxDocument}
            onChange={(event) => setIncomeTaxDocument(event.target.value)}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>
          Número de impuesto sobre la renta
        </FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={incomeTaxDocument}
            onChange={(event) => setIncomeTaxDocument(event.target.value)}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Estado civil</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={maritalStatus}
            onChange={(event) => setMaritalStatus(event.target.value)}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Ingreso promedio mensual</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={monthlyAvgIncome}
            onChange={(event) => setMonthlyAvgIncome(event.target.value)}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Nacionalidad</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={nationality}
            onChange={(event) => setNationality(event.target.value)}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Firma</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={signature}
            onChange={(event) => setSignature(event.target.value)}
            variant="standard"
          />
        </div>
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Lugar de pago de impuestos</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={taxPaymentPlace}
            onChange={(event) => setTaxPaymentPlace(event.target.value)}
            variant="standard"
          />
        </div>
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Documento de NIT</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={tinDocument}
            onChange={(event) => setTinDocument(event.target.value)}
            variant="standard"
          />
        </div>
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Estado laboral</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={workStatus}
            onChange={(event) => setWorkStatus(event.target.value)}
            variant="standard"
          />
        </div>
      </Container>
      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>
          Fecha de agregación de la empresa:
        </FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            type="date"
            value={creationDate ? creationDate.toISOString().substr(0, 10) : ""}
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>
          Escriba el número de teléfono:
        </FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={phoneNumber}
            onChange={(event) => {
              setPhoneNumber(event.target.value);
              phone[0].phoneNumber = event.target.value;
            }}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>
          Escriba el código de locación:
        </FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={codeLocation}
            onChange={(event) => {
              setCodeLocation(event.target.value);
              address[0].codeLocation = event.target.value;
            }}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <Button onClick={handelSubmit} sx={buttonStyles}>
          Crear segmento
        </Button>
      </Container>
    </>
  );
};

export default CreateClient;

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
  background: "#1D3557",
  color: "white",
  ":hover": {
    background: "#1D3557",
    color: "white",
  },
});
