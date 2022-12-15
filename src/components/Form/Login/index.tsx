import { useForm } from "react-hook-form";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { loginRequest } from "../../../api/services/users";
import { Link, useNavigate } from "react-router-dom";
import { IoIosAt, IoIosLock, IoIosArrowDropleftCircle } from "react-icons/io";
import { useToast } from "../../../hooks/useToast";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { Field } from "../../Field";
import { ContainerCardForm } from "../../ContainerCardForm";
import { Box, Text, Button } from "@chakra-ui/react";
import { FormIconBox } from "../../FormIconBox";
import { RowField } from "../../RowField";

export default function FormLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const { genericToast } = useToast();
  const { setAuth } = useLocalStorage();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const loginSubmit = async (login: any) => {
    setLoading(true);
    try {
      const data = await loginRequest(login);
      setAuth(data);
      genericToast({ message: "Login efetuado com sucesso!", type: "success" });
      navigate("/");
    } catch (e: any) {
      console.log(e);
      genericToast({ message: e.message, type: "error" });
    }
    setLoading(false);
  };
  return (
    <ContainerCardForm>
      <Box
        boxShadow="0px 1px 10px 0px rgba(0, 0, 0, 0.5)"
        w="350px"
        bgColor="darkblue"
        position="relative"
      >
        <Box mt="50px" w="100%">
          <RowField>
            <FormIconBox>
              <IoIosAt />
            </FormIconBox>
            <Field
              register={register}
              placeholder="Nickname ou email. . ."
              type="text"
              disabled={loading}
              name="login"
              required={true}
            />
          </RowField>
          <RowField>
            <FormIconBox>
              <IoIosLock />
            </FormIconBox>
            <Field
              register={register}
              placeholder="Senha. . ."
              type="password"
              disabled={loading}
              name="password"
              required={true}
            />
          </RowField>
          <RowField>
            <Button
              p="9px"
              w="100%"
              border="none"
              borderRadius="5px"
              m="auto"
              bgColor="darkblue"
              color="white"
              onClick={handleSubmit(loginSubmit)}
            >
              {!loading && <>Entrar</>}
              {loading && (
                <ThreeDots
                  height={18}
                  width={40}
                  wrapperStyle={{ display: "flex", justifyContent: "center" }}
                />
              )}
            </Button>
          </RowField>
        </Box>
        <Link to="/">
          <Box
            p="5px"
            w="80px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            position="absolute"
            left="5px"
            color="white"
            fontWeight="bold"
            fontSize="17px"
            cursor="pointer"
          >
            <span>
              <IoIosArrowDropleftCircle />
            </span>
            <span>Voltar</span>
          </Box>
        </Link>
      </Box>
    </ContainerCardForm>
  );
}
