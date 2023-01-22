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

export const getProvinces = async () => {
  const url = `http://localhost:8081/api/location/provinces`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
  };
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      return data;
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

export const getCantons = async () => {
  const url = `http://localhost:8081/api/location/cantons`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
  };
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      return data;
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

export const getParishes = async () => {
  const url = `http://localhost:8081/api/location/parishes`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
  };
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      return data;
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

export const updateProvince = async (
  provinceName: string,
  newProvinceName: string
) => {
  const url = `http://localhost:8081/api/location/province/${provinceName}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    body: JSON.stringify({ provinceName: newProvinceName }),
  };
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      alert("Provincia actualizada con éxito");
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

export const updateCanton = async (
  cantonName: string,
  newCantonName: string
) => {
  const url = `http://localhost:8081/api/location/canton/${cantonName}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    body: JSON.stringify({ cantonName: newCantonName }),
  };
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      alert("Cantón actualizado con éxito");
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

export const updateParish = async (
  parishName: string,
  newParishName: string,
  newZipCode: string
) => {
  const url = `http://localhost:8081/api/location/parish/${parishName}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    body: JSON.stringify({ parishName: newParishName, zipCode: newZipCode }),
  };
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      alert("Parroquia actualizada con éxito");
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
