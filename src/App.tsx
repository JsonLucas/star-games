import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Catalogue from "./pages/Catalogue";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/catalogue' element={<Catalogue />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
