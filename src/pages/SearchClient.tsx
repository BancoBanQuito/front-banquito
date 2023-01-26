import { useState } from "react";
import LabelInputMolecule from "../components/molecules/InputLabelMolecule";
import FormClientData from "../components/organisms/FormClientData";

const SearchClient = () => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <h1>Informacion de Cliente</h1>
      <FormClientData />
    </div>
  );
};

export default SearchClient;
