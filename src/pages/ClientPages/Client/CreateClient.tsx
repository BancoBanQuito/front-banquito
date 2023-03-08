import React, { useState, useEffect, ChangeEvent, FocusEvent } from "react";
import { Box, FormLabel, TextField, Typography } from "@mui/material";
import { parse, isValid } from "date-fns";
import EnvManager from "../../../config/EnvManager";
import { useNavigate } from "react-router";
import { ISegment } from "./Types";
import ClientBox from "./ClientBox";
import { Spinner } from "../../../components/atoms/Spinner";
import { SizeButton } from "../../../components/atoms/SizeButton";
import { ButtonStyle } from "../../../style/ButtonStyle";
import { Canton, Province } from "../../../components/organisms/Location/types";
import { Dropdown } from "../../../components/atoms/Dropdown";
import axios from "axios";
import { AlertColor } from "@mui/material";
import SnackBarMolecule from "../../../components/molecules/SnackBarMolecule";

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
  const [openSnack, setopenSnack] = useState<boolean>(false);
    const [titleSnack, settitleSnack] = useState<string | undefined>();
    const [messageSnack, setmessageSnack] = useState<string>("");
    const [colorSnack, setcolorSnack] = useState<AlertColor>('error');
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
    segments.map(segment => {
      if (segment['name'] === value) {
        setCodeSegment(segment['idSegment']);
        setStatusSegment(segment['status']);
      }
    })
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
    if (value === "Movil") {
      setPhoneType("MBL");
    } else if (value === "Convencional") {
      setPhoneType("CON");
    }
  };

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


  const handelSubmit = async () => {
    try {
      setActivateSpinner(true);
      const response = await axios(`${EnvManager.CLIENT_URL}/api/client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: JSON.stringify({
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
      if (response.status !== 200) {
        setActivateSpinner(false);
        throw new Error(response.statusText);
      }
      setActivateSpinner(false);
      settitleSnack("Cliente creado");
      setmessageSnack("Se ha creado al cliente satisfactoriamente!");
      setcolorSnack("success");
      setopenSnack(true);
      alert("Se ha creado al cliente satisfactoriamente!");
    } catch (error) {
      setActivateSpinner(false);
      console.log(error);
      settitleSnack("Error");
      setmessageSnack("No se ha podido crear al cliente");
      setcolorSnack("error");
      setopenSnack(true);
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
    { value: "DNI", name: "DNI" },
    { value: "PAS", name: "Pasaporte" },
    { value: "RUC", name: "RUC" },
  ];

  const optionsClientType = [
    { value: "NAT", name: "Natural" },
    { value: "JUR", name: "Juridico" },
  ];

  const optionsPhoneType = [
    { value: "MBL", name: "Movil" },
    { value: "CON", name: "Convencional" },
  ];

  const optionsStatus = [
    { value: "Activo", name: "Activo" },
    { value: "Inactivo", name: "Inactivo" },
    { value: "Suspendido", name: "Suspendido" },
    { value: "Bloqueado", name: "Bloqueado" },
  ];

  const optionsWorkStatus = [
    { value: "Empleado", name: "Empleado" },
    { value: "Independiente", name: "Independiente" },
    { value: "Desempleado", name: "Desempleado" },
    { value: "Jubilado", name: "Jubilado" },
    { value: "Estudiante", name: "Estudiante" },
    { value: "Otro", name: "Otro" },
  ];

  const optionsCivilStatus = [
    { value: "Soltero", name: "Soltero" },
    { value: "Casado", name: "Casado" },
    { value: "Divorciado", name: "Divorciado" },
    { value: "Viudo", name: "Viudo" },
    { value: "Union Libre", name: "Union Libre" },
  ];

  const optionsGender = [
    { value: "Otro", name: "Otro" },
    { value: "Masculino", name: "Masculino" },
    { value: "Femenino", name: "Femenino" },
  ];

  const segmentOpstions: { value: string; name: string; }[] = [];
  const getSegmentNames = (value: Array<ISegment>) => {
    return value.forEach(element => {
      segmentOpstions.push({
        value: element.name,
        name: element.name
      });
    });
  };

  const fetchSegment = async () => {
    try {
      setActivateSpinner(true);
      const response = await axios(
        segmentUrl
      );
      settitleSnack("Segmentos");
      setmessageSnack("Se han obtenido los segmentos satisfactoriamente!");
      setcolorSnack("success");
      setopenSnack(true);
      const data = await response.data;
      setActivateSpinner(false);
      setSegments(data);
    } catch (error) {
      setActivateSpinner(false);
      console.error(error)
      settitleSnack("Error");
      setmessageSnack("No se han podido obtener los segmentos");
      setcolorSnack("error");
      setopenSnack(true);
    }
  };
  getSegmentNames(segments);

  useEffect(() => {
    fetchSegment();
  }, []);

  const [provincesData, setProvincesData] = useState<Province[]>([])
  const [selectedProvince, setSelectedProvince] = useState<string>('')
  const [isProvinceSelected, setIsProvinceSelected] = useState<boolean>(true);
  const onChangeProvince = (value: string) => {
    setSelectedProvince(value)
    if (value !== '') {
      setIsProvinceSelected(false);
    } else {
      setIsProvinceSelected(true);
    }
  }
  const optionsProvince = provincesData.map(({ provinceName }) => ({
    value: provinceName,
    name: provinceName
  }))
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setActivateSpinner(true)
        const response = await axios(`${EnvManager.SETTINGS_URL}/api/location/provinces`)
        const data = await response.data
        setProvincesData(data)
        setActivateSpinner(false)
        settitleSnack("Provincias");
        setmessageSnack("Se han obtenido las provincias satisfactoriamente!");
        setcolorSnack("success");
        setopenSnack(true);
      } catch (error) {
        console.error(error)
        setActivateSpinner(false)
        settitleSnack("Error");
        setmessageSnack("No se han podido obtener las provincias");
        setcolorSnack("error");
        setopenSnack(true);
      }
    }
    fetchProvinces()
  }, [])

  const [cantonsData, setCantonsData] = useState<Province>()
  const [selectedCanton, setSelectedCanton] = useState<string>('')
  const [isCantonSelected, setIsCantonSelected] = useState<boolean>(true);
  const onChangeCanton = (value: string) => {
    setSelectedCanton(value)
    if (value !== '') {
      setIsCantonSelected(false);
    } else {
      setIsCantonSelected(true);
    }
  }
  const optionsCanton = cantonsData ? cantonsData.cantons.map(({ cantonName }) => ({
    value: cantonName,
    name: cantonName
  })) : []
  useEffect(() => {
    const fetchCantons = async () => {
      try {
        if (selectedProvince) {
          setActivateSpinner(true)
          const response = await axios(`${EnvManager.SETTINGS_URL}/api/location/province/${selectedProvince}`)
          const data = await response.data
          setCantonsData(data)
          setActivateSpinner(false)
          settitleSnack("Cantones");
          setmessageSnack("Se han obtenido los cantones satisfactoriamente!");
          setcolorSnack("success");
          setopenSnack(true);
        }
      } catch (error) {
        setActivateSpinner(false)
        console.error(error)
        settitleSnack("Error");
        setmessageSnack("No se han podido obtener los cantones");
        setcolorSnack("error");
        setopenSnack(true);
      }
    }
    fetchCantons()
  }, [selectedProvince])

  const [parishesData, setParishesData] = useState<Canton>()
  const [selectedParish, setSelectedParish] = useState<string>('')
  const onChangeParish = (value: string) => {
    setSelectedParish(value)
  }
  const optionsParish = parishesData ? parishesData.parishes.map(({ parishName }) => ({
    value: parishName,
    name: parishName
  })) : []
  useEffect(() => {
    const fetchParishes = async () => {
      try {
        if (selectedCanton) {
          setActivateSpinner(true)
          const response = await axios(`${EnvManager.SETTINGS_URL}/api/location/canton/${selectedCanton}`)
          const data = await response.data
          setParishesData(data)
          setActivateSpinner(false)
          settitleSnack("Parroquias");
          setmessageSnack("Se han obtenido las parroquias satisfactoriamente!");
          setcolorSnack("success");
          setopenSnack(true);
        }
      } catch (error) {
        setActivateSpinner(false)
        console.error(error)
        settitleSnack("Error");
        setmessageSnack("No se han podido obtener las parroquias");
        setcolorSnack("error");
        setopenSnack(true);
      }
    }
    fetchParishes()
  }, [selectedCanton])

  return (
    <>
    <SnackBarMolecule
                open={openSnack}
                message={messageSnack}
                title={titleSnack}
                severity={colorSnack}
                onClose={() => setopenSnack(false)} />
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
        flexDirection={{ md: 'row', sm: 'column', xs: 'column' }}
        gap={20}
        width='100%'
        mb={5}
      >
        <Box
          display='flex'
          flexDirection='column'
          width={{
            md: '50%',
            sm: '90%',
            xs: '90%^'
          }}
          gap={1}
          sx={{ ml: 5 }}
        >
          <Typography variant="h5" align="center">Cliente</Typography>
          <Box sx={inputLayout}>
            <Dropdown
              label="Tipo de cliente*"
              value={clientType}
              items={optionsClientType}
              onChange={onChangeClientType}
              width={"100%"}
              height={"auto"} />
          </Box>
          <Box sx={inputLayout} >
            <Dropdown
              label="Tipo de identificación*"
              value={identificationType}
              items={optionsIdentificationType}
              onChange={onChangeIdentificationType}
              width={"100%"}
              height={"auto"} />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>Identificación*</FormLabel>
            <TextField
              value={identification}
              onChange={(event) => setIdentification(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>Nombre*</FormLabel>
            <TextField
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
              variant="outlined"
              fullWidth
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
                fullWidth
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
              fullWidth
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
              fullWidth
            />
          </Box>
          {
            isNatural
            && <Box sx={inputLayout}>
              <Dropdown
                label="Género*"
                value={gender}
                items={optionsGender}
                onChange={onChangeGender}
                width={"100%"}
                height={"auto"} />
            </Box>
          }
          <Box sx={inputLayout}>
            <FormLabel>Nacionalidad*</FormLabel>
            <TextField
              value={nationality}
              onChange={(event) => setNationality(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>Lugar de pago de impuestos*</FormLabel>
            <TextField
              value={taxPaymentPlace}
              onChange={(event) => setTaxPaymentPlace(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>{`${isNatural ? 'Profesion' : 'Sector'}*`}</FormLabel>
            <TextField
              value={career}
              onChange={(event) => setCareer(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>Ingreso promedio mensual*</FormLabel>
            <TextField
              value={monthlyAvgIncome}
              onChange={(event) => setMonthlyAvgIncome(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Box>
          {
            isNatural
              ? <>
                <Box sx={inputLayout}>
                  <Dropdown
                    label="Estado laboral*"
                    value={workStatus}
                    items={optionsWorkStatus}
                    onChange={onChangeWorkStatus}
                    width={"100%"}
                    height={"auto"} />
                </Box>
                <Box sx={inputLayout}>
                  <FormLabel>Nombre de compañia</FormLabel>
                  <TextField
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </Box>
                <Box sx={inputLayout}>
                  <FormLabel>Tipo de compañia</FormLabel>
                  <TextField
                    value={companyType}
                    onChange={(event) => setCompanyType(event.target.value)}
                    variant="outlined"
                    fullWidth
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
                    fullWidth
                  />
                </Box>
                <Box sx={inputLayout}>
                  <Dropdown
                    label="Estado civil*"
                    value={maritalStatus}
                    items={optionsCivilStatus}
                    onChange={onChangeMaritalStatus}
                    width={"100%"}
                    height={"auto"} />
                </Box>
              </>
              : <>
                <Box sx={inputLayout}>
                  <FormLabel>Tipo de compañia*</FormLabel>
                  <TextField
                    value={companyType}
                    onChange={(event) => setCompanyType(event.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </Box>
                <Box sx={inputLayout}>
                  <FormLabel>Representante legal*</FormLabel>
                  <TextField
                    value={appLegalRepresent}
                    onChange={(event) => setAppLegalRepresent(event.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </Box>
                <Box sx={inputLayout}>
                  <FormLabel>Documentos asociados al representante legal*</FormLabel>
                  <TextField
                    value={articlesAssociatedDoc}
                    onChange={(event) => setArticlesAssociatedDoc(event.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </Box>
                <Box sx={inputLayout}>
                  <FormLabel>Documento de servicios básicos*</FormLabel>
                  <TextField
                    value={basicServicesDocument}
                    onChange={(event) => setBasicServicesDocument(event.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </Box>
                <Box sx={inputLayout}>
                  <FormLabel>Documento de impuesto a la renta*</FormLabel>
                  <TextField
                    value={incomeTaxDocument}
                    onChange={(event) => setIncomeTaxDocument(event.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </Box>
                <Box sx={inputLayout}>
                  <FormLabel>Documento de NIT*</FormLabel>
                  <TextField
                    value={tinDocument}
                    onChange={(event) => setTinDocument(event.target.value)}
                    variant="outlined"
                    fullWidth
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
              fullWidth
            />
          </Box>
          <Box sx={inputLayout}>
            <FormLabel>Huella digital*</FormLabel>
            <TextField
              value={fingerPrint}
              onChange={(event) => setFingerPrint(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Box>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          width={{
            md: '50%',
            sm: '90%',
            xs: '90%^'
          }}
          gap={1}
          pr={5}
        >
          <Typography variant="h5" align="center">Telefono</Typography>
          <Box sx={inputLayout}>
            <Dropdown
              label="Tipo de teléfono*"
              value={phoneType}
              items={optionsPhoneType}
              onChange={onChangePhoneType}
              width={"100%"}
              height={"auto"} />
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
              fullWidth
            />
          </Box>
          <Typography variant="h5" align="center" mt={5}>Dirección</Typography>
          <Box sx={inputLayout}>
            <Dropdown
              label="Provincia*"
              value={selectedProvince}
              items={optionsProvince}
              onChange={onChangeProvince}
              width={"100%"}
              height={"auto"}
            />
          </Box >
          <div style={{ display: isProvinceSelected ? 'none' : 'block' }}>
            <Box sx={inputLayout}>
              <Dropdown
                label="Cantón*"
                value={selectedCanton}
                items={optionsCanton}
                onChange={onChangeCanton}
                width={"100%"}
                height={"auto"}
              />
            </Box >
          </div>
          <div style={{ display: isCantonSelected ? 'none' : 'block' }}>
            <Box sx={inputLayout}>
              <Dropdown
                label="Parroquia*"
                value={selectedParish}
                items={optionsParish}
                onChange={onChangeParish}
                width={"100%"}
                height={"auto"}
              />
            </Box >
          </div>
          <Box sx={inputLayout}>
            <FormLabel>Primera línea*</FormLabel>
            <TextField
              value={lineOne}
              onChange={(event) => {
                setLineOne(event.target.value);
                address.lineOne = event.target.value;
              }}
              variant="outlined"
              fullWidth
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
              fullWidth
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
              fullWidth
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
              fullWidth
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
              fullWidth
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
