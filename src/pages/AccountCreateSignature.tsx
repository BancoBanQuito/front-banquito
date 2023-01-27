import React, { ChangeEvent, FormEvent, useState } from "react";
import TextFieldAtom from "../components/atoms/TextFieldAtom";
import ButtonIcon from "../components/atoms/ButtonIcon";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, Typography } from "@mui/material";
import { ColorPalette } from "../style/ColorPalette";
import { SizeButton } from "../components/atoms/SizeButton";
import { ButtonStyle } from "../style/ButtonStyle";
import { AccountSignatureService } from "../services/account/AccountSignatureService";
// import { AccountSimple } from "../services/account/model/AccountSimple";
// import { AccountService } from "../services/account/accountService";

interface FormData {
  accountNumber: string,
  identification: string,
  identificationType: string,
  role: string
}

const CreateSignature = () => {

  /* const [formData, setformData] = useState<FormData>({
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
  } */

  return (
    <>
    </>
  );
};

export default CreateSignature;
