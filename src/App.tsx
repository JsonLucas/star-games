import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import SignUp from "./pages/SignUp";
import Catalogue from "./pages/Catalogue";
import History from "./pages/History";
import Payment from "./pages/Payment";
import Address from "./pages/Address";
import Finish from "./pages/Finish";
import Profile from "./pages/Profile";

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
        <Route path='/purchase/payment' element={<Payment />} />
        <Route path='/purchase/address' element={<Address />} />
        <Route path='/purchase/finish' element={<Finish />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
