import { useContext, useEffect } from "react";
import Header from "../../components/Header";
import Products from "../../components/Products";
import { UserContext } from "../../contexts/user";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useUserInformation } from "../../hooks/useUserInformation";

export default function Home() {
  const { profile } = useUserInformation();
  const { getAuth } = useLocalStorage();
  const { setIsLogged } = useContext(UserContext);
  useEffect(() => {
    (async () => {
	  console.log(profile.data);
      const auth = getAuth();
      if (auth) {
        setIsLogged(true);
      }
    })();
  }, [profile.isLoading]);

  return (
    <main>
      <Header />
      <Products />
    </main>
  );
}
