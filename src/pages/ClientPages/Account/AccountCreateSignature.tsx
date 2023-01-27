import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TextFieldAtom from "/src/components/atoms/TextFieldAtom";
import ButtonIcon from "/src/components/atoms/ButtonIcon";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, Typography } from "@mui/material";
import { ColorPalette } from "/src/style/ColorPalette";
import { SizeButton } from "/src/components/atoms/SizeButton";
import { ButtonStyle } from "/src/style/ButtonStyle";
import { AccountSignatureService } from "/src/services/account/AccountSignatureService";
import { AccountService } from "/src/services/account/AccountService";
import { RSAccount } from "/src/services/account/dto/RSAccount";
import { RQSignature } from "/src/services/account/dto/RQSignature";
import DatePickerAtom from "/src/components/atoms/DatePicker";
import { Dayjs } from "dayjs";
import { RSSignature } from "/src/services/account/dto/RSSignature";
import { Dropdown } from "/src/components/atoms/Dropdown";
import ErrorModalOrganism from "/src/components/organisms/ErrorModalOrganism";
import { useNavigate } from 'react-router-dom'


const AccountCreateSignature = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const navigate = useNavigate();

  const identificationTypesItems = [
    {
      name: "DNI",
      value: "DNI",
    },
    {
      name: "RUC",
      value: "RUC",
    },
    {
      name: "PASAPORTE",
      value: "PAS",
    },
  ];

  useEffect(() => {
    console.log(date?.format("YYYY-MM-DDTHH:mm:SS"));
  }, [date]);

  const [createSignature, setCreateSignature] = useState<RQSignature>({
    codeLocalAccount: "",
    identificationType: "",
    identification: "",
    role: "",
    startDate: new Date(),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateSignature({
      ...createSignature,
      [e.target.name]: e.target.value,
    });
  };

  /* const handleIdentificationType = async () => {
    console.log("entro");
    const auxAccount: RSSignature[] | undefined = (
      await AccountSignatureService.getAccountSignatureByCode(
        createSignature.codeLocalAccount
      )
    ).data.data;
    if (!auxAccount) {
      console.log("No se encontró la cuenta");
      return;
    }
    auxAccount.forEach((element) => {
      if (element.identification === createSignature.identification) {
        console.log("entro if");
        console.log(element.identificationType);
        setCreateSignature({
          ...createSignature,
          identificationType: element.identificationType,
        });
      }
    });
  }; */

  const handleValidation = () => {  
    if(createSignature.identification.length != 10 && createSignature.identificationType == "DNI"){
      setactiveErrorModal(true);
      seterrorMessage("La identificación debe tener 10 dígitos");
    }else if(createSignature.identification.length != 13 && createSignature.identificationType == "RUC"){
      setactiveErrorModal(true);
      seterrorMessage("La identificación debe tener 13 dígitos"); 
    }else if(createSignature.identification.length  < 1 && createSignature.identificationType == "PAS"){
      setactiveErrorModal(true);
      seterrorMessage("Identificación incorrecta");
    }else{
      setactiveErrorModal(true);
      seterrorMessage("Identificación incorrecta");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(createSignature);
    handleValidation();
    console.log("DATE")
    console.log(date)
    setCreateSignature({
      ...createSignature,
      startDate: date?.format("YYYY-MM-DDTHH:mm:SS") || "",
    });
    console.log("SIGNATURE")
    console.log(createSignature);
    await AccountSignatureService.postAccountSignature(createSignature);
  };

  const [activeErrorModal, setactiveErrorModal] = useState<boolean>(false);
    const [errorMessage, seterrorMessage] = useState<string>("");

  return (
    <> 
    <Box component="form" onSubmit={handleSubmit}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5rem",
          verticalAlign: "middle",
          alignText: "center",
        }}
      >
        <div style={{ margin: "2rem" }}>
          <Typography variant="h4">Agregar firma autorizada</Typography>
        </div>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "middle",
          alignText: "center",
        }}
      >
        <div style={{ margin: "1rem" }}>
          <Typography variant="h6"> Número de cuenta:</Typography>
        </div>

        <TextFieldAtom
          id="outlined-basic"
          name="codeLocalAccount"
          label="Ingrese el número de cuenta:"
          variant="standard"
          color="primary"
          type="text"
          placeholder="Ingreso número de cuenta"
          action={handleChange}
          value={createSignature.codeLocalAccount}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "middle",
          alignText: "center",
        }}
      >
        <div style={{ margin: "1rem" }}>
          <Typography variant="h6"> Identificación:</Typography>
        </div>

        <TextFieldAtom
          id="outlined-basic"
          name="identification"
          label="Ingrese la identificación"
          variant="standard"
          color="primary"
          type="text"
          placeholder="Ingreso número de cuenta"
          value={createSignature.identification}
          action={handleChange}
        />
        {/* <ButtonIcon
          color={ColorPalette.PRIMARY}
          icon={<SearchRoundedIcon />}
          onClick={() => {
            handleIdentificationType();
          }}
        /> */}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "middle",
          alignText: "center",
        }}
      >
        <div style={{ margin: "1rem" }}>
          <Typography variant="h6"> Tipo Identificación:</Typography>
        </div>

        <Dropdown
          label="Tipo de identificación"
          items={identificationTypesItems}
          width={300}
          height={50}
          backgroundColor={ColorPalette.SECONDARY}
          onChange={(value) => setCreateSignature({ ...createSignature, identificationType: value })}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "middle",
          alignText: "center",
        }}
      >
        <div style={{ margin: "1rem" }}>
          <Typography variant="h6"> Rol:</Typography>
        </div>

        <TextFieldAtom
          id="outlined-basic"
          label="Ingrese el rol"
          name="role"
          variant="standard"
          color="primary"
          type="text"
          value={createSignature.role}
          action={handleChange}
          placeholder="Ingreso número de cuenta"
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          verticalAlign: "middle",
          alignText: "center",
        }}
      >
        <div style={{ margin: "1rem" }}>
          <Typography variant="h6"> Fecha de activación:</Typography>
        </div>
        <DatePickerAtom
          label="Fecha de activación"
          value={date}
          onChange={setDate}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alingItems: "center",
          verticalAlign: "middle",
          alignText: "center",
        }}
      >
        <div style={{ margin: "2rem" }}>
          <SizeButton
            text={"Agregar"}
            style={ButtonStyle.MEDIUM}
            submit
            palette={{
              backgroundColor: ColorPalette.PRIMARY,
            }}
          ></SizeButton>
        </div>
      </Box>
    </Box>
    <ErrorModalOrganism
                active={activeErrorModal}
                onDeactive={() => { setactiveErrorModal(false); navigate('/usuario/account/signature') }}
                text={`${errorMessage}. ¿Desea volver a intentar?`}
                enableButtonBox
                //aqui intente que regrese a la función de validación de cantidad de digitos dependiendo 
                //del tipo de identificación que se ingrese
                onConfirm={() => handleValidation()}
                onReject={() => navigate('/usuario/account/signature')}
            />
    </>
    
  );
};

export default AccountCreateSignature;
