import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";

const { getAuth, setAuth, removeAuth } = useLocalStorage();
const axiosInstance = axios.create({ baseURL: "http://localhost:5000" });
//const axiosInstance = axios.create({baseURL: 'https://star-games-jsonlucas.herokuapp.com'});

axiosInstance.interceptors.request.use(async (request) => {
  const auth = getAuth();
  if (auth) {
    request.headers = { authorization: `Bearer ${auth.accessToken}` };
  }
  return request;
});

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (e) => {
	const auth = getAuth();
    if (auth) {
	  const { refreshToken } = auth;
      const { data } = await axiosInstance.post("/auth", { refreshToken });
      setAuth(data);
    }else{
		removeAuth();
	}
  }
);

export default axiosInstance;
