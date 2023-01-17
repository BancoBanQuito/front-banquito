import Code from "@mui/icons-material/Code"
import ButtonBig from "./components/atoms/ButtonBig"
import { ButtonMedium } from "./components/atoms/ButtonMedium"
import ButtonSmall from "./components/atoms/ButtonSmall"
import { ColorPalette } from "./style/ColorPalette"
import { Box } from "@mui/material"


function App() {
  return (
    <>
      <Box display='flex' flexDirection='row'>
        <Box display='flex' flexDirection='column' sx={{ margin: '10px' }} >
          <ButtonBig sx={{
            backgroundColor: ColorPalette.PRIMARY,
            size: 100
          }}
            icon={<Code />}
            text="Click"
            onClick={() => console.log("Works!")} />
          <ButtonBig sx={{
            backgroundColor: ColorPalette.SECONDARY,
            size: 100
          }}
            icon={<Code />}
            text="Click"
            onClick={() => console.log("Works!")} />
          <ButtonBig sx={{
            backgroundColor: ColorPalette.TERNARY,
            size: 100
          }}
            icon={<Code />}
            text="Click"
            onClick={() => console.log("Works!")} />
          <ButtonBig sx={{
            backgroundColor: ColorPalette.ACCENT,
            color: ColorPalette.PRIMARY,
            size: 100
          }}
            icon={<Code />}
            text="Click"
            onClick={() => console.log("Works!")} />
        </Box>
        <Box display='flex' flexDirection='column' sx={{ margin: '10px' }} >
          <ButtonMedium sx={{
            backgroundColor: ColorPalette.PRIMARY,
          }}
            icon={<Code />}
            text="Click"
            onClick={() => console.log("Works!")} />
          <ButtonMedium sx={{
            backgroundColor: ColorPalette.SECONDARY,
          }}
            icon={<Code />}
            text="Click"
            onClick={() => console.log("Works!")} />
          <ButtonMedium sx={{
            backgroundColor: ColorPalette.TERNARY,
          }}
            icon={<Code />}
            text="Click"
            onClick={() => console.log("Works!")} />
          <ButtonMedium sx={{
            backgroundColor: ColorPalette.ACCENT,
            color: ColorPalette.PRIMARY
          }}
            icon={<Code />}
            text="Click"
            onClick={() => console.log("Works!")} />
        </Box>
        <Box display='flex' flexDirection='column' sx={{ margin: '10px' }} >
          <ButtonSmall
            sx={{
              backgroundColor: ColorPalette.PRIMARY,
            }}
            text="Click"
            onClick={() => console.log("Works!")} />
          <ButtonSmall
            sx={{
              backgroundColor: ColorPalette.SECONDARY,
            }}
            text="Click"
            onClick={() => console.log("Works!")} />
          <ButtonSmall
            sx={{
              backgroundColor: ColorPalette.TERNARY,
            }}
            text="Click"
            onClick={() => console.log("Works!")}
          />
          <ButtonSmall
            sx={{
              backgroundColor: ColorPalette.ACCENT,
              color: ColorPalette.PRIMARY
            }}
            text="Click"
            onClick={() => console.log("Works!")}
          />
        </Box>
      </Box>

    </>
  )
}

export default App
