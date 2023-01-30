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
import BranchBox from "../../../components/organisms/Branch/BranchBox";
import { ISegment } from "./Type";
import { LabelRounded } from "@mui/icons-material";
import EnvManager from "../../../config/EnvManager";
import { Spinner } from "../../../components/atoms/Spinner";

const urlCloud = `${EnvManager.CLIENT_URL}/api/client/`;
const segmentUrl = `${EnvManager.SEGMENT_URL}/api/segments`;
const isAvailable = true;

const UpdateClientDataForm: React.FC = () => {
  const [isStatusSelected, setIsStatusSelected] = useState<boolean>(true);
  const [idCliente, setIdCliente] = useState<string | null>(
    localStorage.getItem("identification")
  );
  const [typeIdentification, setTypeIdentification] = useState<string | null>(
    localStorage.getItem("typeIdentification")
  );
  const optionTypePhone = [
    { value: "MBL", label: "Móvil" },
    { value: "CON", label: "Convencional" },
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
  const onChangeTypePhone = (value: string) => {
    setTypePhone(value);
    if (value === "Movil") {
      setPhoneType("MBL");
    } else if (value === "Convencional") {
      setPhoneType("CON");
    }
  };
  const onChangeSegment = (value: string) => {
    setNameSegment(value);
    segments.map(segment => {
      if (segment['name'] === value) {
        setCodeSegment(segment['idSegment']);
        setStatusSegment(segment['status']);
      }
    })
  };
  const onChangeGender = (value: string) => {
    setGender(value);
    if (value !== "") {
      setIsStatusSelected(false);
    } else {
      setIsStatusSelected(true);
    }
  };
  const optionsGender = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Femenino" },
  ];
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
  const [activateSpinner, setActivateSpinner] = useState(false);
  const [segments, setSegments] = useState([]);

  const navigate = useNavigate();
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const fetchSegment = async () => {
    try {
      setActivateSpinner(true);
      const response = await fetch(
        segmentUrl
      );
      const data = await response.json();
      setSegments(data);
      setActivateSpinner(false);
    } catch (error) {
      setActivateSpinner(false);
      console.error(error)
    }
  };

  getSegmentNames(segments);

  const fetchClientByIdAndTypeId = async () => {
    try {
      setActivateSpinner(true);
      setTypeIdentification(localStorage.getItem("typeIdentification"));
      const response = await fetch(
        urlCloud + `${idCliente}/${typeIdentification}`
      );
      const data = await response.json();
      setIdCliente(data.identification);
      setTypeIdentification(data.typeIdentification);
      setEmail(data.email);
      setGender(data.gender);
      setCareer(data.career);
      setStatus(data.status);
      setTypePhone(data.phone.phoneType);
      setPhone(data.phone.phoneNumber);
      setFullName(data.fullname);
      setFirstName(data.firstname);
      setLastName(data.lastname);
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
      setActivateSpinner(false);

    } catch (error) {
      setActivateSpinner(false);
      console.error(error)
    }
  };

  const fetchUpdateClient = async () => {
    try {
      setTypeIdentification(localStorage.getItem("typeIdentification"));
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            "identificationType": typeIdentification,
            "identification": idCliente,
            "lastname": lastName,
            "firstname": firstName,
            "email": email,
            "birthDate": birthDate,
            "gender": gender,
            "career": career,
            "companyName": companyName,
            "companyType": companyType,
            "createDateCompany": createDateCompany,
            "appLegalRepresent": appLegalRepresent,
            "articlesAssociatedDoc": articlesAssociatedDoc,
            "basicServicesDocument": basicServicesDocument,
            "fingerPrint": fingerPrint,
            "incomeTaxDocument": incomeTaxDocument,
            "lastStatusDate": lastStatusDate,
            "maritalStatus": maritalStatus,
            "monthlyAvgIncome": monthlyAvgIncome,
            "nationality": nationality,
            "signature": signature,
            "taxPaymentPlace": taxPaymentPlace,
            "tinDocument": tinDocument,
            "workStatus": workStatus,
            "address": {
              "codeLocation": codeLocation,
              "lineOne": lineOne,
              "lineTwo": lineTwo,
              "latitude": latitude,
              "longitude": latitude
            },
            "phone": {
              "phoneNumber": phone,
              "phoneType": phoneType
            },
            "reference": {
              "name": name,
              "phone": phoneReference,
              "related": related
            },
            "relationship": {
              "name": nameRelation,
              "startDate": startDateRelation,
              "endDate": endDate
            },
            "segment": {
              "code": codeSegment,
              "name": nameSegment,
              "status": statusSegment
            }
          }
        )
      };
      setActivateSpinner(true);
      const response = await fetch(
        urlCloud + `user/${idCliente}`,
        requestOptions
      );
      const data = await response.json();
      setActivateSpinner(false);
    } catch (error) {
      setActivateSpinner(false);
      console.error(error)
    }
  };

  useEffect(() => {
    fetchClientByIdAndTypeId();
    fetchSegment();
  }, []);
  return (
    <>
      {activateSpinner ? <Spinner /> : null}
      <Container sx={containertTitleStyles}>
        <Typography variant="h4" align="center">
          Actualizar la Información del Cliente
        </Typography>
      </Container>
      <Grid container>
        <Grid item xs={7}>
          {/* Label Input*/}
          <Container sx={containertTitleStyles}>
            <Typography variant="h5" align="center">
              Datos Personales
            </Typography>
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Nombre:</FormLabel>
            <TextField
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              variant="standard"
              disabled={isAvailable}
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Apellido:</FormLabel>
            <TextField
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
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
            <div style={{ marginRight: "10px" }}>
              <BranchBox
                label="Género:"
                value={gender}
                options={optionsGender}
                onChange={onChangeGender}
              />
            </div>
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Nacionalidad:</FormLabel>
            <TextField
              value={nationality}
              onChange={(event) => setNationality(event.target.value)}
              variant="standard"
            />
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
            <FormLabel sx={formLabelStyles}>Carrera:</FormLabel>
            <TextField
              value={career}
              onChange={(event) => setCareer(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Estado de empleo:</FormLabel>
            <TextField
              value={workStatus}
              onChange={(event) => setWorkStatus(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Trabaja en:</FormLabel>
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
            <FormLabel sx={formLabelStyles}>Representante Legal:</FormLabel>
            <TextField
              value={appLegalRepresent}
              onChange={(event) => setAppLegalRepresent(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Artículos asociados :</FormLabel>
            <TextField
              value={articlesAssociatedDoc}
              onChange={(event) => setArticlesAssociatedDoc(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Documentación de servicios básicos :</FormLabel>
            <TextField
              value={basicServicesDocument}
              onChange={(event) => setBasicServicesDocument(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Huella digital :</FormLabel>
            <TextField
              value={fingerPrint}
              onChange={(event) => setFingerPrint(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Documento de impuesto a la renta :</FormLabel>
            <TextField
              value={incomeTaxDocument}
              onChange={(event) => setIncomeTaxDocument(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Estado civil :</FormLabel>
            <TextField
              value={maritalStatus}
              onChange={(event) => setMaritalStatus(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Ingreso medio mensual:</FormLabel>
            <TextField
              value={monthlyAvgIncome}
              onChange={(event) => setMonthlyAvgIncome(event.target.value)}
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
            <FormLabel sx={formLabelStyles}>Lugar de pago de impuestos:</FormLabel>
            <TextField
              value={taxPaymentPlace}
              onChange={(event) => setTaxPaymentPlace(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Documento TIN:</FormLabel>
            <TextField
              value={tinDocument}
              onChange={(event) => setTinDocument(event.target.value)}
              variant="standard"
            />
          </Container>
        </Grid>

        <Grid item xs={3}>
          <Container>
            <Box sx={boxStile}>
              <p>Nombre completo: {fullName}</p>
              <p>{fullName}</p>
              <p>Identificación: {idCliente}</p>
              <p>Tipo de Itentificación: {typeIdentification}</p>
            </Box>
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

          <Container sx={containertTitleStyles}>
            <Typography variant="h5" align="center">
              Dirección
            </Typography>
          </Container>

          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Linea uno:</FormLabel>
            <TextField
              value={lineOne}
              onChange={(event) => setLineOne(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Linea dos:</FormLabel>
            <TextField
              value={lineTwo}
              onChange={(event) => setLineTwo(event.target.value)}
              variant="standard"
            />
          </Container>

          <Container sx={containertTitleStyles}>
            <Typography variant="h5" align="center">
              Segmento
            </Typography>
          </Container>

          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}> </FormLabel>
            <div style={{ marginRight: "10px" }}>
              <BranchBox
                label="Segmento:"
                value={nameSegment}
                options={segmentOpstions}
                onChange={onChangeSegment}
              />
            </div>
          </Container>

          <Container sx={containertTitleStyles}>
            <Typography variant="h5" align="center">
              Referencia
            </Typography>
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Nombre referencia:</FormLabel>
            <TextField
              value={name}
              onChange={(event) => setName(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Teléfono referencia:</FormLabel>
            <TextField
              value={phoneReference}
              onChange={(event) => setPhoneReference(event.target.value)}
              variant="standard"
            />
          </Container>
          <Container sx={containerTextFieldStyles}>
            <FormLabel sx={formLabelStyles}>Relación:</FormLabel>
            <TextField
              value={related}
              onChange={(event) => setRelated(event.target.value)}
              variant="standard"
            />
          </Container>
        </Grid>
        {/* Boton*/}
        <Container sx={containerTextFieldStyles}>
          <Button
            onClick={() => {
              fetchUpdateClient();
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
