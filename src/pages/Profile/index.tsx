import Header from "../../components/Header";
import ProfileData from "../../components/ProfileData";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user";
import { useToast } from "../../hooks/useToast";

export default function Profile() {
  const { genericToast } = useToast();
  const { isLogged } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) {
      const props = {
        message: "permission denied.",
        type: "error",
      };
      genericToast(props);
	  navigate('/home');
    }
  }, []);

  return (
    <main>
      <Header />
      <ProfileData />
    </main>
  );
}
