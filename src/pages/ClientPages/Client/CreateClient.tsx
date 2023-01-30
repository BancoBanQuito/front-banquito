import React, { useState, useEffect, ChangeEvent, FocusEvent } from "react";
import {
  Box,
  Container,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import BranchBox from "../../../components/organisms/Branch/BranchBox";
import { parse, isValid } from "date-fns";
import EnvManager from "../../../config/EnvManager";
import { useNavigate } from "react-router";
import { ISegment } from "./Types";
import ClientBox from "./ClientBox";
import { Spinner } from "../../../components/atoms/Spinner";
import { SizeButton } from "../../../components/atoms/SizeButton";
import { ButtonStyle } from "../../../style/ButtonStyle";

const CreateClient: React.FC = () => {
  const [isNatural, setIsNatural] = useState<boolean>(true);
  const [clientType, setClientType] = useState<string>("NAT");
  const [identificationType, setIdentificationType] = useState<string>("DNI");
  const [identification, setIdentification] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [status, setStatus] = useState<string>("ACT");
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
  const [basicServicesDocument, setBasicServicesDocument] = useState<string>("");
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
  const [activateSpinner, setActivateSpinner] = useState(false);
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

  const onChangeClientType = (value: string) => {
    setClientType(value === "NAT" ? "NAT" : "JUR");
    setIsNatural(value === "NAT");
  };

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

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


  const handelSubmit = async () => {
    try {
      setActivateSpinner(true);
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
        setActivateSpinner(false);
        throw new Error(response.statusText);
      }
      setActivateSpinner(false);
      alert("Se ha creado al cliente satisfactoriamente!");
    } catch (error) {
      setActivateSpinner(false);
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

  const optionsIdentificationType = [
    { value: "DNI", label: "DNI" },
    { value: "PAS", label: "Pasaporte" },
    { value: "RUC", label: "RUC" },
  ];

  const optionsClientType = [
    { value: "NAT", label: "Natural" },
    { value: "JUR", label: "Juridico" },
  ];

  const optionsPhoneType = [
    { value: "MBL", label: "Movil" },
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
        label: element.name
      });
    });
  };

  const fetchSegment = async () => {
    try {
      setActivateSpinner(true);
      const response = await fetch(
        segmentUrl
      );
      const data = await response.json();
      setActivateSpinner(false);
      setSegments(data);
    } catch (error) {
      setActivateSpinner(false);
      console.error(error)
    }
  };
  getSegmentNames(segments);

  useEffect(() => {
    fetchSegment();
  }, []);

  return (
    <>
      {activateSpinner ? <Spinner /> : null}
      <Typography
        variant="h3"
        align="center"
        sx={{ mt: 10, mb: 5 }}
      >
        Ingresar un nuevo Cliente
      </Typography>
      <Box
        display='flex'
        flexDirection='row'
        gap={20}
        width='100%'
        mb={5}
      >
        <Box
          display='flex'
          flexDirection='column'
          width='45%'
          gap={1}
          sx={{ ml: 5 }}
        >
          <Typography variant="h5" align="center">Cliente</Typography>
          <Box sx={inputLayout}>
            <BranchBox
              label="Tipo de cliente*"
              value={clientType}
              options={optionsClientType}
              onChange={onChangeClientType}
            />
          </Box>
          <Box sx={inputLayout} >
            <BranchBox
              label="Tipo de identificación*"
              value={identificationType}
              options={optionsIdentificationType}
              onChange={onChangeIdentificationType}
            />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>Identificación*</FormLabel>
            <TextField
              value={identification}
              onChange={(event) => setIdentification(event.target.value)}
              variant="outlined"
              sx={{ width: '300px' }}
            />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>Nombre*</FormLabel>
            <TextField
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
              variant="outlined"
              sx={{ width: '300px' }}
            />
          </Box>
          {
            isNatural
            && <Box sx={inputLayout}>
              <FormLabel>Apellido*</FormLabel>
              <TextField
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
                variant="outlined"
                sx={{ width: '300px' }}
              />
            </Box>
          }
          <Box sx={inputLayout}>
            <FormLabel>Email*</FormLabel>
            <TextField
              placeholder="ejemplo@ejemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={handleBlur}
              error={!!emailError}
              helperText={emailError}
              variant="outlined"
              sx={{ width: '300px' }}
            />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>{`Fecha de ${isNatural ? 'nacimiento' : 'creacion'}*`}</FormLabel>
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
              sx={{ width: '300px' }}
            />
          </Box>
          {
            isNatural
            && <Box sx={inputLayout}>
              <BranchBox
                label="Género*"
                value={gender}
                options={optionsGender}
                onChange={onChangeGender}
              />
            </Box>
          }
          <Box sx={inputLayout}>
            <FormLabel>Nacionalidad*</FormLabel>
            <TextField
              value={nationality}
              onChange={(event) => setNationality(event.target.value)}
              variant="outlined"
              sx={{ width: '300px' }}
            />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>Lugar de pago de impuestos*</FormLabel>
            <TextField
              value={taxPaymentPlace}
              onChange={(event) => setTaxPaymentPlace(event.target.value)}
              variant="outlined"
              sx={{ width: '300px' }}
            />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>{`${isNatural ? 'Profesion' : 'Sector'}*`}</FormLabel>
            <TextField
              value={career}
              onChange={(event) => setCareer(event.target.value)}
              variant="outlined"
              sx={{ width: '300px' }}
            />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>Ingreso promedio mensual*</FormLabel>
            <TextField
              value={monthlyAvgIncome}
              onChange={(event) => setMonthlyAvgIncome(event.target.value)}
              variant="outlined"
              sx={{ width: '300px' }}
            />
          </Box>
          {
            isNatural
              ? <>
                <Box sx={inputLayout}>
                  <BranchBox
                    label="Estado laboral*"
                    value={workStatus}
                    options={optionsWorkStatus}
                    onChange={onChangeWorkStatus}
                  />
                </Box>
                <Box sx={inputLayout}>
                  <FormLabel>Nombre de compañia</FormLabel>
                  <TextField
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    variant="outlined"
                    sx={{ width: '300px' }}
                  />
                </Box>
                <Box sx={inputLayout}>
                  <FormLabel>Tipo de compañia</FormLabel>
                  <TextField
                    value={companyType}
                    onChange={(event) => setCompanyType(event.target.value)}
                    variant="outlined"
                    sx={{ width: '300px' }}
                  />
                </Box>
                <Box sx={inputLayout}>
                  <FormLabel>Fecha de ingreso a la empresa</FormLabel>
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
                    sx={{ width: '300px' }}
                  />
                </Box>
                <Box sx={inputLayout}>
                  <BranchBox
                    label="Estado civil*"
                    value={maritalStatus}
                    options={optionsCivilStatus}
                    onChange={onChangeMaritalStatus}
                  />
                </Box>
              </>
              : <>
                <Box sx={inputLayout}>
                  <FormLabel>Tipo de compañia*</FormLabel>
                  <TextField
                    value={companyType}
                    onChange={(event) => setCompanyType(event.target.value)}
                    variant="outlined"
                    sx={{ width: '300px' }}
                  />
                </Box>
                <Box sx={inputLayout}>
                  <FormLabel>Representante legal*</FormLabel>
                  <TextField
                    value={appLegalRepresent}
                    onChange={(event) => setAppLegalRepresent(event.target.value)}
                    variant="outlined"
                    sx={{ width: '300px' }}
                  />
                </Box>
                <Box sx={inputLayout}>
                  <FormLabel>Documentos asociados al representante legal*</FormLabel>
                  <TextField
                    value={articlesAssociatedDoc}
                    onChange={(event) => setArticlesAssociatedDoc(event.target.value)}
                    variant="outlined"
                    sx={{ width: '300px' }}
                  />
                </Box>
                <Box sx={inputLayout}>
                  <FormLabel>Documento de servicios básicos*</FormLabel>
                  <TextField
                    value={basicServicesDocument}
                    onChange={(event) => setBasicServicesDocument(event.target.value)}
                    variant="outlined"
                    sx={{ width: '300px' }}
                  />
                </Box>
                <Box sx={inputLayout}>
                  <FormLabel>Documento de impuesto a la renta*</FormLabel>
                  <TextField
                    value={incomeTaxDocument}
                    onChange={(event) => setIncomeTaxDocument(event.target.value)}
                    variant="outlined"
                    sx={{ width: '300px' }}
                  />
                </Box>
                <Box sx={inputLayout}>
                  <FormLabel>Documento de NIT*</FormLabel>
                  <TextField
                    value={tinDocument}
                    onChange={(event) => setTinDocument(event.target.value)}
                    variant="outlined"
                    sx={{ width: '300px' }}
                  />
                </Box>
              </>
          }
          <Box sx={inputLayout}>
            <FormLabel>Firma*</FormLabel>
            <TextField
              value={signature}
              onChange={(event) => setSignature(event.target.value)}
              variant="outlined"
              sx={{ width: '300px' }}
            />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>Huella digital*</FormLabel>
            <TextField
              value={fingerPrint}
              onChange={(event) => setFingerPrint(event.target.value)}
              variant="outlined"
              sx={{ width: '300px' }}
            />
          </Box>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          width='45%'
          gap={1}
          pr={5}
        >
          <Typography variant="h5" align="center">Telefono</Typography>
          <Box sx={inputLayout}>
            <BranchBox
              label="Tipo de teléfono*"
              value={phoneType}
              options={optionsPhoneType}
              onChange={onChangePhoneType}
            />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>Número de teléfono*</FormLabel>
            <TextField
              placeholder="+593 9999 999"
              value={phoneNumber}
              onChange={(event) => {
                setPhoneNumber(event.target.value);
                phone.phoneNumber = event.target.value;
              }}
              variant="outlined"
              sx={{ width: '300px' }}
            />
          </Box>
          <Typography variant="h5" align="center" mt={5}>Dirección</Typography>
          <Box sx={inputLayout}>
            <FormLabel>Código de locación*</FormLabel>
            <TextField
              value={codeLocation}
              onChange={(event) => {
                setCodeLocation(event.target.value);
                address.codeLocation = event.target.value;
              }}
              variant="outlined"
              sx={{ width: '300px' }}
            />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>Primera línea*</FormLabel>
            <TextField
              value={lineOne}
              onChange={(event) => {
                setLineOne(event.target.value);
                address.lineOne = event.target.value;
              }}
              variant="outlined"
              sx={{ width: '300px' }}
            />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>Segunda línea*</FormLabel>
            <TextField
              value={lineTwo}
              onChange={(event) => {
                setLineTwo(event.target.value);
                address.lineTwo = event.target.value;
              }}
              variant="outlined"
              sx={{ width: '300px' }}
            />
          </Box>
          <Typography variant="h5" align="center" mt={5}>Referencia</Typography>
          <Box sx={inputLayout}>
            <FormLabel>Nombre completo*</FormLabel>
            <TextField
              value={nameReference}
              onChange={(event) => {
                setNameReference(event.target.value);
                reference.nameReference = event.target.value;
              }}
              variant="outlined"
              sx={{ width: '300px' }}
            />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>Teléfono*</FormLabel>
            <TextField
              value={phoneReference}
              onChange={(event) => {
                setPhoneReference(event.target.value);
                reference.phoneReference = event.target.value;
              }}
              variant="outlined"
              sx={{ width: '300px' }}
            />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>Relación*</FormLabel>
            <TextField
              value={related}
              onChange={(event) => {
                setRelated(event.target.value);
                reference.related = event.target.value;
              }}
              variant="outlined"
              sx={{ width: '300px' }}
            />
          </Box>
          <Typography variant="h5" align="center" mt={5}>Segmento</Typography>
          <Box sx={inputLayout}>
            <ClientBox
              label="Segmento*"
              value={nameSegment}
              options={segmentOpstions}
              onChange={onChangeSegment}
            />
          </Box>
          <Box
            mt={10}>
            <SizeButton
              text="Guardar"
              style={ButtonStyle.BIG}
              palette={{ backgroundColor: 'red' }}
              size={{ width: '100%', height: '80px' }}
              onClick={() => {
                handelSubmit();
                navigate("/usuario");
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateClient;

const inputLayout = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 5
}
