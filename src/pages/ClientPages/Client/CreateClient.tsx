import React, { useState, useEffect, ChangeEvent, FocusEvent } from "react";
import {
  Box,
  Container,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import Button from "@mui/material/Button";
import BranchBox from "../../../components/organisms/Branch/BranchBox";
import { OptionUnstyled } from "@mui/base";
import { style } from "../../CreateRequestService";
import { parse, isValid } from "date-fns";
import { defineConfig } from "vite";
import EnvManager from "../../../config/EnvManager";
import { useNavigate } from "react-router";
import { ISegment } from "./Types";
import ClientBox from "./ClientBox";

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
  const phone =
    {
      phoneNumber: "",
      phoneType: "Celular",
    };
  const [phoneNumber, setPhoneNumber] = useState(phone.phoneNumber);
  const [phoneType, setPhoneType] = useState(phone.phoneType);
  const address =
    {
      codeLocation: "",
      lineOne: "",
      lineTwo: "",
      latitude: "",
      longitude: "",
    };

  const [codeLocation, setCodeLocation] = useState(address.codeLocation);
  const [lineOne, setLineOne] = useState(address.lineOne);
  const [lineTwo, setLineTwo] = useState(address.lineTwo);
  const [latitude, setLatitude] = useState(address.latitude);
  const [longitude, setLongitude] = useState(address.longitude);
  const relationship =
    {
      nameRelationShip: "",
      startDate: "",
      endDate: "",
    };

  const [nameRelationShip, setNameRelationShip] = useState(
    relationship.nameRelationShip
  );
  const [startDate, setStartDate] = useState(relationship.startDate);
  const [endDate, setEndDate] = useState(relationship.endDate);

  const reference =
    {
      nameReference: "",
      phoneReference: "",
      related: "",
    };

  const [nameReference, setNameReference] = useState(reference.nameReference);
  const [phoneReference, setPhoneReference] = useState(reference.phoneReference);
  const [related, setRelated] = useState(reference.related);

  const [codeSegment, setCodeSegment] = useState<string>();
  const [nameSegment, setNameSegment] = useState<string>("");
  const [statusSegment, setStatusSegment] = useState<string>();
  const [lastLoginDate, setLastLoginDate] = useState<Date>();
  const [isStatusSelected, setIsStatusSelected] = useState<boolean>(true);
  const [segments, setSegments] = useState([]);

  const navigate = useNavigate();
  const segmentUrl = `${EnvManager.SEGMENT_URL}/api/segments`;

  const onChangeSegment = (value: string) => {
    setNameSegment(value);
    setCodeSegment("");
    setStatusSegment("");
    if (value !== "") {
      setIsStatusSelected(false);
    } else {
      setIsStatusSelected(true);
    }
  };

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


  const handelSubmit = async () => {
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
          phone:
            {
              phoneNumber,
              phoneType,
            },
          address:
            {
              codeLocation,
              lineOne,
              lineTwo,
              latitude,
              longitude,
            },
          relationship: 
            {
              nameRelationShip,
              startDate,
              endDate,
            },
          reference: 
            {
              nameReference,
              phoneReference,
              related,
            },
          segment: {
            codeSegment,
            nameSegment,
            statusSegment,
          }
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
    { value: "PAS", label: "Pasaporte" },
    { value: "RUC", label: "RUC" },
  ];

  const optionsPhoneType = [
    { value: "MBL", label: "Móvil" },
    { value: "CON", label: "Convencional" },
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

  const segmentOpstions: { value: string; label: string; }[] = [];
  const getSegmentNames = (value: Array<ISegment>) => {
    return value.forEach(element => {
      segmentOpstions.push({
        value: element.name,
        label: element.name});
    });
  };

  const fetchSegment = async () => {
    try {
      const response = await fetch(
        segmentUrl
      );
      const data = await response.json();
      setSegments(data);
    } catch (error) {
      console.error(error)
    }
  };
  getSegmentNames(segments);

  useEffect(() => {
    fetchSegment();
  }, []);

  return (
    <>
      <Container sx={containertTitleStyles}>
        <Typography variant="h4" align="center">
          Ingresar un nuevo Cliente
        </Typography>
      </Container>
      <Grid container>
        <Grid item xs={7}>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Identificación:</FormLabel>
            <TextField
              value={identification}
              onChange={(event) => setIdentification(event.target.value)}
              variant="standard"
            />
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
        </Grid>
        <Grid item xs={3}>
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
                placeholder="Ejemplo: +593111111111"
                value={phoneNumber}
                onChange={(event) => {
                  setPhoneNumber(event.target.value);
                  phone.phoneNumber = event.target.value;
                }}
                variant="standard"
              />
            </div>
          </Container>
          <Container sx={containertTitleStyles}>
            <Typography variant="h5" align="center">
              Dirección
            </Typography>
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>
              Código de locación:
            </FormLabel>
            <div style={{ marginRight: "10px" }}>
              <TextField
                value={codeLocation}
                onChange={(event) => {
                  setCodeLocation(event.target.value);
                  address.codeLocation = event.target.value;
                }}
                variant="standard"
              />
            </div>
          </Container>

          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Primera línea de dericción:</FormLabel>
            <div style={{ marginRight: "10px" }}>
              <TextField
                value={lineOne}
                onChange={(event) => {
                  setLineOne(event.target.value);
                  address.lineOne = event.target.value;
                }}
                variant="standard"
              />
            </div>
          </Container>

          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Segunda línea de dericción:</FormLabel>
            <div style={{ marginRight: "10px" }}>
              <TextField
                value={lineTwo}
                onChange={(event) => {
                  setLineTwo(event.target.value);
                  address.lineTwo = event.target.value;
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
                  address.latitude = event.target.value;
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
                  address.longitude = event.target.value;
                }}
                variant="standard"
              />
            </div>
          </Container>
          <Container sx={containertTitleStyles}>
            <Typography variant="h5" align="center">
              Referencia
            </Typography>
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Escriba el nombre:</FormLabel>
            <div style={{ marginRight: "10px" }}>
              <TextField
                value={nameReference}
                onChange={(event) => {
                  setNameReference(event.target.value);
                  reference.nameReference = event.target.value;
                }}
                variant="standard"
              />
            </div>
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Escriba el teléfono:</FormLabel>
            <div style={{ marginRight: "10px" }}>
              <TextField
                value={phoneReference}
                onChange={(event) => {
                  setPhoneReference(event.target.value);
                  reference.phoneReference = event.target.value;
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
                  reference.related = event.target.value;
                }}
                variant="standard"
              />
            </div>
          </Container>
          <Container sx={containertTitleStyles}>
            <Typography variant="h5" align="center">
              Segmento
            </Typography>
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}> </FormLabel>
            <div style={{ marginRight: "10px" }}>
              <ClientBox
                label="Segmento:"
                value={nameSegment}
                options={segmentOpstions}
                onChange={onChangeSegment}
              />
            </div>
          </Container>
            <Container sx={containerTextFieldStyles}>
              <Button
                onClick={() => {
                  handelSubmit();
                  navigate("/usuario");
                }}
                sx={buttonStyles}
              >
                Guardar
              </Button>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateClient;

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
