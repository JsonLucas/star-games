import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";

const { getAuth, setAuth } = useLocalStorage();
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
    const { response } = e;
	const auth = getAuth();
    if ((response.status === 403) && (auth)) {
      const response = await axiosInstance.post("/auth", { refreshToken: auth.refreshToken });
      setAuth(response.data);
    }
	console.log(e);
  }
);

export default axiosInstance;
