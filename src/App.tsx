import { Code, Abc } from "@mui/icons-material";
import ButtonIcon from "./components/atoms/ButtonIcon";
import { ColorPalette } from "./style/ColorPalette";

function App() {

  return (
    <>
    <ButtonIcon 
      color={ColorPalette.SECONDARY}
      icon={<Code />}
      onClick={() => console.log("first")}
    />
    </>
  )
}

export default App
