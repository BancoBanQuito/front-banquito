import React, { useState, useEffect, ChangeEvent, FocusEvent } from "react";
import { Container, FormLabel, TextField, Typography } from "@mui/material";
import moment from "moment";
import Button from "@mui/material/Button";
import BranchBox from "../Branch/BranchBox";
import { OptionUnstyled } from "@mui/base";
import { style } from "../../../pages/CreateRequestService";
import { parse, isValid } from "date-fns";
import { defineConfig } from "vite";
import EnvManager from "../../../config/EnvManager";

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
  const [maritalStatus, setMaritalStatus] = useState<string>("Soltero");
  const [monthlyAvgIncome, setMonthlyAvgIncome] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [taxPaymentPlace, setTaxPaymentPlace] = useState<string>("");
  const [tinDocument, setTinDocument] = useState<string>("");
  const [workStatus, setWorkStatus] = useState<string>("Otro");
  const [creationDate, setCreationDate] = useState<Date>(new Date());
  const [user, setUser] = useState<string>("");
  const phone = [
    {
      phoneNumber: "",
      phoneType: "Celular",
    },
  ];
  const [phoneNumber, setPhoneNumber] = useState(phone[0].phoneNumber);
  const [phoneType, setPhoneType] = useState(phone[0].phoneType);
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
  const relationship = [
    {
      nameRelationShip: "",
      startDate: "",
      endDate: "",
    },
  ];

  const [nameRelationShip, setNameRelationShip] = useState(
    relationship[0].nameRelationShip
  );
  const [startDate, setStartDate] = useState(relationship[0].startDate);
  const [endDate, setEndDate] = useState(relationship[0].endDate);

  const reference = [
    {
      nameReference: "",
      phoneReference: "",
      related: "",
    },
  ];

  const [nameReference, setNameReference] = useState(reference[0].nameReference);
  const [phoneReference, setPhoneReference] = useState(reference[0].phoneReference);
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

  const onChangeWorkStatus = (value: string) => {
    setWorkStatus(value);
    if (value === "Empleado") {
      setWorkStatus("Empleado");
    } else if (value === "Independiente") {
      setWorkStatus("Independiente");
    } else if (value === "Desempleado") {
      setWorkStatus("Desempleado");
    } else if (value === "Jubilado") {
      setWorkStatus("Jubilado");
    } else if (value === "Estudiante") {
      setWorkStatus("Estudiante");
    } else if (value === "Otro") {
      setWorkStatus("Otro");
    }
  };


  //para estado civil
  const onChangeMaritalStatus = (value: string) => {
    setMaritalStatus(value);
    if (value === "Soltero") {
      setMaritalStatus("Soltero");
    } else if (value === "Casado") {
      setMaritalStatus("Casado");
    } else if (value === "Divorciado") {
      setMaritalStatus("Divorciado");
    } else if (value === "Viudo") {
      setMaritalStatus("Viudo");
    } else if (value === "Union Libre") {
      setMaritalStatus("Union Libre");
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

  const onChangePhoneType = (value: string) => {
    setPhoneType(value);
    if (value === "Casa") {
      setPhoneType("Casa");
    } else if (value === "Celular") {
      setPhoneType("Celular");
    } else if (value === "Trabajo") {
      setPhoneType("Trabajo");
    } else if (value === "Otro") {
      setPhoneType("Otro");
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
    console.log("submit");
    console.log(
      JSON.stringify({
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
        user: {
          userName,
          password,
          typeUser,
          status,
          creationDate,
          lastLoginDate,
        },
      })
    );
    try {
      const response = await fetch(`${EnvManager.CLIENT_URL}/api/client`, {
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
          // segment: {
          //   codeSegment,
          //   nameSegment,
          //   statusSegment,
          // },
          user: {
            userName,
            password,
            typeUser,
            creationDate,
            lastLoginDate,
          },
        }),
      });
      if (!response.ok) {
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
    const date = event.target.value;
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());
    if (isValid(parsedDate)) {
      setBirthDate(parsedDate);
      setCreateDateError("");
    } else {
      setCreateDateError("Ingrese una fecha válida en el formato yyyy-MM-dd");
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

  const handleCreateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());
    if (isValid(parsedDate)) {
      setCreationDate(parsedDate);
      setCreateDateError("");
    } else {
      setCreateDateError("Ingrese una fecha válida en el formato yyyy-MM-dd");
    }
  };

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());
    if (isValid(parsedDate)) {
      setStartDate(parsedDate.toISOString());
      setCreateDateError("");
    } else {
      setCreateDateError("Ingrese una fecha válida en el formato yyyy-MM-dd");
    }
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());
    if (isValid(parsedDate)) {
      setEndDate(parsedDate.toISOString());
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

  const optionsPhoneType = [
    { value: "Casa", label: "Casa" },
    { value: "Celular", label: "Celular" },
    { value: "Trabajo", label: "Trabajo" },
    { value: "Otro", label: "Otro" },
  ];

  const optionsStatus = [
    { value: "Activo", label: "Activo" },
    { value: "Inactivo", label: "Inactivo" },
    { value: "Suspendido", label: "Suspendido" },
    { value: "Bloqueado", label: "Bloqueado" },
  ];

  const optionsWorkStatus = [
    { value: "Empleado", label: "Empleado" },
    { value: "Independiente", label: "Independiente" },
    { value: "Desempleado", label: "Desempleado" },
    { value: "Jubilado", label: "Jubilado" },
    { value: "Estudiante", label: "Estudiante" },
    { value: "Otro", label: "Otro" },
  ];

  const optionsCivilStatus = [
    { value: "Soltero", label: "Soltero" },
    { value: "Casado", label: "Casado" },
    { value: "Divorciado", label: "Divorciado" },
    { value: "Viudo", label: "Viudo" },
    { value: "Union Libre", label: "Union Libre" },
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
        <FormLabel sx={formLabelStyles}>Email:</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            placeholder="ejemplo@ejemplo.com"
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
        <FormLabel sx={formLabelStyles}>
          Fecha de nacimiento:
        </FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            type="date"
            value={
              birthDate
                ? birthDate.toISOString().substr(0, 10)
                : ""
            }
            onChange={handleBirthDateChange}
            error={createDateError !== ""}
            helperText={createDateError}
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
          Fecha de ingreso a la empresa:
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
        <div style={{ marginRight: "10px" }}>
          <BranchBox
            label="Estado civil: "
            value={maritalStatus}
            options={optionsCivilStatus}
            onChange={onChangeMaritalStatus}
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
        <div style={{ marginRight: "10px" }}>
          <BranchBox
            label="Estado laboral: "
            value={workStatus}
            options={optionsWorkStatus}
            onChange={onChangeWorkStatus}
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
            onChange={handleCreateChange}
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <div style={{ marginRight: "10px" }}>
          <div style={{ marginRight: "10px" }}>
            <BranchBox
              label="Tipo de teléfono: "
              value={phoneType}
              options={optionsPhoneType}
              onChange={onChangePhoneType}
            />
          </div>
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>
          Escriba el número de teléfono:
        </FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            placeholder="Ejemplo: 123456789"
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
        <FormLabel sx={formLabelStyles}>Escriba la primera línea de dericción:</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={lineOne}
            onChange={(event) => {
              setLineOne(event.target.value);
              address[0].lineOne = event.target.value;
            }}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Escriba la segunda línea de dericción:</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={lineTwo}
            onChange={(event) => {
              setLineTwo(event.target.value);
              address[0].lineTwo = event.target.value;
            }}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Ingrese Latitud:</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={latitude}
            onChange={(event) => {
              setLatitude(event.target.value);
              address[0].latitude = event.target.value;
            }}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Ingrese Longitud:</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={longitude}
            onChange={(event) => {
              setLongitude(event.target.value);
              address[0].longitude = event.target.value;
            }}
            variant="standard"
          />
        </div>
      </Container>

      {/* <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Nombre de relationship:</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={nameRelationShip}
            onChange={(event) => {
              setNameRelationShip(event.target.value);
              relationship[0].nameRelationShip = event.target.value;
            }}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>
          Fecha de inicio relationship:
        </FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            type="date"
            value={startDate ? new Date(startDate).toISOString().substr(0, 10) : ""}
            onChange={(event) => {
              handleStartDateChange(event.target.value);
              relationship[0].startDate = event.target.value;
            }}
          />
        </div>
      </Container> */}

      {/* <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>
          Fecha de fin relationship:
        </FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            type="date"
            value={endDate ? new Date(endDate).toISOString().substr(0, 10) : ""}
            onChange={(event) => {
              handleEndDateChange(event.target.value);
              relationship[0].endDate = event.target.value;
            }}
          />
        </div>
      </Container> */}

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Escriba reference:</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={nameReference}
            onChange={(event) => {
              setNameReference(event.target.value);
              reference[0].nameReference = event.target.value;
            }}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Escriba el telefono de reference:</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={phoneReference}
            onChange={(event) => {
              setPhoneReference(event.target.value);
              reference[0].phoneReference = event.target.value;
            }}
            variant="standard"
          />
        </div>
      </Container>

      <Container sx={containerTextFieldStyles}>
        <FormLabel sx={formLabelStyles}>Tipo de relación:</FormLabel>
        <div style={{ marginRight: "10px" }}>
          <TextField
            value={related}
            onChange={(event) => {
              setRelated(event.target.value);
              reference[0].related = event.target.value;
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
