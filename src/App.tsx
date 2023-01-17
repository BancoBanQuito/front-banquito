
import { TextField } from "@mui/material"
import TextFieldAtom from "./components/atoms/TextFieldAtom"

function App() {
  return (
    <>
      <TextFieldAtom 
        color={""}
        id={"standard-basic"}
        label={"Example Text"}
        type={"text"}
        placeholder={"Example Text"} 
        variant={"standard"}      ></TextFieldAtom>
    </>
    
  )
}

export default App
