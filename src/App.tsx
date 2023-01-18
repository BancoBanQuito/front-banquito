import { BrowserRouter, Route, Routes } from "react-router-dom"
import TextAreaAtom from "./components/atoms/TextArea"
import Error404 from "./pages/Error404"
import HomeATM from "./pages/HomeATM"
import HomeClient from "./pages/HomeClient"
import HomeUser from "./pages/HomeUser"
import Login from "./pages/Login"
import Layout from "./templates/Layout"

const App = () => {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="" element={<Layout />}>
    //       <Route index element={<Login />} />
    //       <Route path="user" element={<HomeUser />} />
    //       <Route path="client" element={<HomeClient />} />
    //       <Route path="atm" element={<HomeATM />} />
    //     </Route>
    //     <Route path="*" element={<Error404 />} />
    //   </Routes>

    // </BrowserRouter>
    <TextAreaAtom
      id="standard-multiline-static"
      label="Multiline"
      multiline
      rows={4}
      defaultValue="Default Value"
      variant="standard"
    />
  )
}

export default App;
