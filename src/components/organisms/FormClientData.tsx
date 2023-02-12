import React, { useState } from "react";
import TextFieldAtom from "../atoms/TextFieldAtom";

const FormClientData = () => {
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [carrera, setCarrera] = useState("");
  const [lugarTrabajo, setLugarTrabajo] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [referencia, setReferencia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [segmento, setSegmento] = useState("");

  return (
    <form>
      <div className="left-side">
        <TextFieldAtom
          fullWidth
          label="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disable
          type={"text"}
          name={"email"} />
        <TextFieldAtom
          fullWidth
          label="Fecha de Nacimiento"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          disable
          type={"date"}
          name={"text"} />
        <TextFieldAtom
          fullWidth
          label="Género"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          disable
          type={"text"}
          name={"gender"} />
        <TextFieldAtom
          fullWidth
          label="Carrera"
          value={carrera}
          onChange={(e) => setCarrera(e.target.value)}
          disable
          type={"text"}
          name={"career"} />
        <TextFieldAtom
          fullWidth
          label="Lugar de Trabajo"
          value={lugarTrabajo}
          onChange={(e) => setLugarTrabajo(e.target.value)}
          disable
          type={"text"}
          name={"work-place"} />
        <TextFieldAtom
          fullWidth
          label="Estado Civil"
          value={estadoCivil}
          onChange={(e) => setEstadoCivil(e.target.value)}
          disable
          type={"text"}
          name={"civil-state"} />
        <TextFieldAtom
          fullWidth
          label="Referencia"
          value={referencia}
          onChange={(e) => setReferencia(e.target.value)}
          disable
          type={"text"}
          name={"reference"} />
      </div>
      <div className="right-side">
        <TextFieldAtom
          fullWidth
          label="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          disable
          type={"text"}
          name={"phone"} />
        <TextFieldAtom
          fullWidth
          label="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          disable
          type={"text"}
          name={"address"} />
        <TextFieldAtom
          fullWidth
          label="Segmento"
          value={segmento}
          onChange={(e) => setSegmento(e.target.value)}
          disable
          type={"text"}
          name={"segment"} />
      </div>
    </form>
  );
};

export default FormClientData;
