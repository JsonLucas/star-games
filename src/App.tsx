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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { UserContext } from "./contexts/user";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useUserInformation } from "./hooks/useUserInformation";
import { UserLevel } from "./types/levels";
import { Favorites } from "./pages/Favorites";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { getAuth } = useLocalStorage();
  const { profile } = useUserInformation();
  const [isLogged, setIsLogged] = useState(false);
  const [userLevel, setUserLevel] = useState<UserLevel>();
  useEffect(() => {
    (async () => {
      const auth = getAuth();
      if (auth) {
        if (profile.data) {
          const { data } = profile;
          const { level } = data;
          const features = JSON.parse(level.features);
          setUserLevel({
            ...level,
            totalScore: data.currentLevelPoints,
            features,
          });
          setIsLogged(true);
        }
      }
    })();
  }, [isLogged, profile.isLoading]);
  return (
    <UserContext.Provider
      value={{ isLogged, userLevel, setIsLogged, setUserLevel }}
    >
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/catalogue" element={<Catalogue />} />
          {!isLogged && (
            <>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
          {isLogged && (
            <>
              <Route path="/history" element={<History />} />
              <Route path="/purchase/payment" element={<Payment />} />
              <Route path="/purchase/address" element={<Address />} />
              <Route path="/purchase/finish" element={<Finish />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/favorites" element={<Favorites />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
