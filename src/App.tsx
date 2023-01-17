import { BrowserRouter, Route, Routes } from "react-router-dom"
import Error404 from "./pages/Error404"
import HomeATM from "./pages/HomeATM"
import HomeClient from "./pages/HomeClient"
import HomeUser from "./pages/HomeUser"
import Login from "./pages/Login"
import Layout from "./templates/Layout"
import { NumberField } from './components/atoms/NumberField';
import { useState } from "react"



const App = () => {

  // set test value
  const [test, setTest] = useState(0);




  return (
    <BrowserRouter>
      <Routes>
        <Route path="" >
          <Route index />
          <Route path="user" element={<HomeUser />} />
          <Route path="client" element={<HomeClient />} />
          <Route path="atm" element={<HomeATM />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
      <NumberField
        label="Interes"
        value={test}
        action={
          (value: any) => {
            setTest(value);
            console.log(test);
          }
        }

      />
    </BrowserRouter>
  )
}

export default App;
