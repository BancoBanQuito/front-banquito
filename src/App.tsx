import { Code } from "@mui/icons-material";
import ButtonIcon from "./components/atoms/ButtonIcon";
import { ColorPalette } from "./style/ColorPalette";
import { Shape } from "./style/Shape";

function App() {
  return (
    <>
      <ButtonIcon
        icon={Code}
        style={{
          backgroundColor: ColorPalette.PRIMARY,
          maxSize: "50px"
        }}
        onClick={() => console.log("Works!")}
      />
      <ButtonIcon
        icon={Code}
        style={{
          backgroundColor: ColorPalette.SECONDARY,
          maxSize: "50px"
        }}
        onClick={() => console.log("Works!")}
      />
      <ButtonIcon
        icon={Code}
        style={{
          backgroundColor: ColorPalette.TERNARY,
          maxSize: "50px"
        }}
        onClick={() => console.log("Works!")}
      />
      <ButtonIcon
        icon={Code}
        style={{
          backgroundColor: ColorPalette.FOURTH,
          color: ColorPalette.SECONDARY,
          maxSize: "50px"
        }}
        onClick={() => console.log("Works!")}
      />
    </>
  )
}

export default App
