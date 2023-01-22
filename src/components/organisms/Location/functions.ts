export const createProvince = async (provinceName: string) => {
  const url = `http://localhost:8081/api/location/province`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    body: JSON.stringify({ provinceName }),
  };
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      alert("Provincia creada con éxito");
    } else {
      throw new Error(response.statusText);
    }
  } catch (error: any) {
    if (error.message === "Bad Request") {
      alert("Error: 400 Bad Request");
    } else if (error.message === "Internal Server Error") {
      alert("Error en el servidor, intente más tarde");
    } else {
      alert("Error desconocido, intente más tarde");
      console.log(error);
    }
  }
};

export const createCanton = async (
  provinceName: string,
  cantonName: string
) => {
  const url = `http://localhost:8081/api/location/canton`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    body: JSON.stringify({ provinceName, cantonName }),
  };
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      alert("Cantón creado con éxito");
    } else {
      throw new Error(response.statusText);
    }
  } catch (error: any) {
    if (error.message === "Bad Request") {
      alert("Error: 400 Bad Request");
    } else if (error.message === "Internal Server Error") {
      alert("Error en el servidor, intente más tarde");
    } else {
      alert("Error desconocido, intente más tarde");
      console.log(error);
    }
  }
};

export const createParish = async (
  provinceName: string,
  cantonName: string,
  parishName: string,
  zipCode: string
) => {
  const url = `http://localhost:8081/api/location/parish`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    body: JSON.stringify({ provinceName, cantonName, parishName, zipCode }),
  };
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      alert("Parroquia creada con éxito");
    } else {
      throw new Error(response.statusText);
    }
  } catch (error: any) {
    if (error.message === "Bad Request") {
      alert("Error: 400 Bad Request");
    } else if (error.message === "Internal Server Error") {
      alert("Error en el servidor, intente más tarde");
    } else {
      alert("Error desconocido, intente más tarde");
      console.log(error);
    }
  }
};
