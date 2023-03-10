import axios from "axios";
import EnvManager from "../../../config/EnvManager";

export const saveBankEntity = async (
  internacionBankCode: string,
  name: string,
) => {
  const url = `${EnvManager.SETTINGS_URL}/api/bank-entity`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    body: JSON.stringify({ internacionBankCode, name }),
  };
  try {
    const response = await axios(url, options);
    if (response.status === 200) {
      // alert("Entidad Bancaria creada con éxito");
    } else {
      throw new Error(response.statusText);
    }
  } catch (error: any) {
    if (error.message === "Bad Request") {
      // alert("Error: 400 Bad Request");
    } else if (error.message === "Internal Server Error") {
      // alert("Error en el servidor, intente más tarde");
    } else {
      // alert("Error desconocido, intente más tarde");
      console.log(error);
    }
  }
};

export const updateBankEntity = async (
  internacionBankCode: string,
  name: string,
) => {
  const url = `${EnvManager.SETTINGS_URL}/api/bank-entity`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    body: JSON.stringify({ internacionBankCode, name }),
  };
  try {
    const response = await axios(url, options);
    if (response.status === 200) {
      // alert("Entidad Bancaria actualizada con éxito");
    } else {
      throw new Error(response.statusText);
    }
  } catch (error: any) {
    if (error.message === "Bad Request") {
      // alert("Error: 400 Bad Request");
    } else if (error.message === "Internal Server Error") {
      // alert("Error en el servidor, intente más tarde");
    } else {
      // alert("Error desconocido, intente más tarde");
      console.log(error);
    }
  }
};
export const getBankEntity = async () => {
  const url = `${EnvManager.SETTINGS_URL}/api/bank-entity`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
  };
  try {
    const response = await axios(url, options);
    if (response.status === 200) {
      const data = await response.data;
      return data;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error: any) {
    if (error.message === "Bad Request") {
      // alert("Error: 400 Bad Request");
    } else if (error.message === "Internal Server Error") {
      // alert("Error en el servidor, intente más tarde");
    } else {
      // alert("Error desconocido, intente más tarde");
      console.log(error);
    }
  }
};
