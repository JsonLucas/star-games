import Header from "../../components/Header";
import Products from "../../components/Products";
import { UserContext } from "../../contexts/user";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useUserInformation } from "../../hooks/useUserInformation";
import { useContext, useEffect, useState } from "react";
import { UserLevel } from "../../types/levels";

export default function Home() {
  const { profile } = useUserInformation();
  const { getAuth } = useLocalStorage();
  const { setIsLogged } = useContext(UserContext);
  const [userLevel, setUserLevel] = useState<UserLevel>();
  useEffect(() => {
    (async () => {
		if(profile.data){
			const { data } = profile;
			const { level } = data;
			const features = JSON.parse(level.features);
	 	 	setUserLevel({...level, totalScore: data.currentLevelPoints, features});
		}
      const auth = getAuth();
      if (auth) {
        setIsLogged(true);
      }
    })();
  }, [profile.isLoading]);

  return (
    <main>
      <Header levelData={userLevel} />
      <Products />
    </main>
  );
}
