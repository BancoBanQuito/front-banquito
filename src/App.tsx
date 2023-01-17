import Code from "@mui/icons-material/Code"
import { ColorPalette } from "./style/ColorPalette"
import { ButtonStyle } from "./style/ButtonStyle"
import { SizeButton } from "./components/atoms/SizeButton"


function App() {
  return (
    <>
      <SizeButton
        style={ButtonStyle.SMALL}
        palette={{ backgroundColor: ColorPalette.PRIMARY }}
        text="Click"
        onClick={() => console.log("Works!")}
      />
    </>
  )
}

export default App
