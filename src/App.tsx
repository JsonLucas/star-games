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
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { UserContext } from "./contexts/user";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <UserContext.Provider value={{ isLogged, setIsLogged }}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/history" element={<History />} />
          <Route path="/purchase/payment" element={<Payment />} />
          <Route path="/purchase/address" element={<Address />} />
          <Route path="/purchase/finish" element={<Finish />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
