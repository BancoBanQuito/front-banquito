import React, { ChangeEvent, FormEvent, useState } from "react";
import TextFieldAtom from "../components/atoms/TextFieldAtom";
import TextAreaAtom from "../components/atoms/TextAreaAtom";
import ButtonIcon from "../components/atoms/ButtonIcon";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, Button, Typography } from "@mui/material";
import { ColorPalette } from "../style/ColorPalette";
import { SizeButton } from "../components/atoms/SizeButton";
import { ButtonStyle } from "../style/ButtonStyle";
import { AccountSignatureService } from "../services/account/AccountSignatureService";
import AccountConfigurationEditForm from "../components/organisms/AccountConfiguration/AccountConfigurationEditForm";
import { AccountSimple } from "../services/account/model/AccountSimple";
import { AccountService } from "../services/account/accountService";

interface FormData {
  accountNumber: string,
  identification: string,
  identificationType: string,
  role: string
}

const CreateSignature = () => {

  const [formData, setformData] = useState<FormData>({
    accountNumber: "",
    identification: "",
    identificationType: "",
    role: ""
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createSignature();
  }

  const createSignature = async () => {
    try {
      const codeInternational: AccountSimple | undefined = (await AccountService.getAccountsSimple(formData.accountNumber)).data.data;
      if (codeInternational) {
        await AccountSignatureService.postAccountSignature({
          codeInternationalAccount: codeInternational.codeInternationalAccount,
          codeLocalAccount: formData.identification,
          identification: formData.identification,
          identificationType: formData.identificationType,
          role: formData.role,
          startDate: new Date()
        })
      } else {
        console.log("No se han encontrado datos")
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setformData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
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
        <div style={{ margin: "2rem", }} >
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
        <div style={{ margin: "1rem", }}>
          <Typography variant="h6"> Número de cuenta:</Typography>
        </div>

        <TextFieldAtom
          id="outlined-basic"
          name="accountNumber"
          label="Ingrese el número de cuenta:"
          variant="standard"
          color="primary"
          type="text"
          action={handleChange}
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
        <div style={{ margin: "1rem", }} >
          <Typography variant="h6"> Identificación:</Typography>
        </div>

        <TextFieldAtom
          id="outlined-basic"
          name="identification"
          label="Ingrese la identificación"
          variant="standard"
          color="primary"
          type="text"
          action={handleChange}
        />
        <ButtonIcon color={ColorPalette.PRIMARY} icon={<SearchRoundedIcon />} />
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
        <div style={{ margin: "1rem", }} >
          <Typography variant="h6"> Tipo Identificación:</Typography>
        </div>

        <TextFieldAtom
          id="outlined-basic"
          name='identificationType'
          label="Tipo Identificación"
          variant="standard"
          color="primary"
          type="text"
          value="DNI"
          action={handleChange}
          disable
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
        <div style={{ margin: "1rem", }} >
          <Typography variant="h6"> Rol:</Typography>
        </div>

        <TextFieldAtom
          id="outlined-basic"
          label="Ingrese el rol"
          name="role"
          variant="standard"
          color="primary"
          type="text"
          value="owner"
          action={handleChange}
          disable
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
        <div style={{ margin: "2rem", }} >
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
  );
};

export default CreateSignature;
