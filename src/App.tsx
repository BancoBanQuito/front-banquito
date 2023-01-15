import Code from "@mui/icons-material/Code"
import ButtonBig from "./components/atoms/ButtonBig"
import { ButtonMedium } from "./components/atoms/ButtonMedium"
import ButtonSmall from "./components/atoms/ButtonSmall"
import { ColorPalette } from "./style/ColorPalette"


function App() {
  return (
    <>
      <ButtonBig style={{
        backgroundColor: ColorPalette.PRIMARY,
        size: 100
      }}
        icon={Code}
        text="BigButton"
        onClick={() => console.log("Works!")} />
      <ButtonMedium style={{
        backgroundColor: ColorPalette.SECONDARY,
      }}
        icon={Code}
        text="MediumButton"
        onClick={() => console.log("Works!")} />
      <ButtonSmall
        style={{
          backgroundColor: ColorPalette.TERNARY,

        }}
        text="SmallButton"
        onClick={() => console.log("Works!")}
      />
    </>
  )
}

export default App
