import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoIosAt,
  IoIosLock,
  IoIosArrowDropleftCircle,
  IoIosContact,
  IoIosKey,
  IoIosPerson,
  IoLogoGameControllerB,
  IoIosPhonePortrait,
} from "react-icons/io";
import { useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";
import { signUpRequest } from "../../../api/services/users";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useToast } from "../../../hooks/useToast";
import { UserContext } from "../../../contexts/user";
import { Field } from "../../Field";
import { Box, Text, Button } from "@chakra-ui/react";
import { RowField } from "../../RowField";
import { FormIconBox } from "../../FormIconBox";
import { ContainerCardForm } from "../../ContainerCardForm";

export default function FormSignUp() {
  const { setAuth } = useLocalStorage();
  const { genericToast } = useToast();
  const { setIsLogged } = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const signUp = async (userData: any) => {
    setLoading(true);
    try {
      const data = await signUpRequest(userData);
      setAuth(data);
      setIsLogged(true);
      genericToast({ message: "conta criada com sucesso!", type: "success" });
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
        p="10px"
        w="500px"
        h="400px"
        bgColor="black"
        borderRadius="5px"
        position="relative"
      >
        <RowField>
          <FormIconBox>
            <IoIosPerson />
          </FormIconBox>
          <Field
            placeholder="* Nome completo. . ."
            disabled={loading}
            type="text"
            name="name"
            required={true}
            register={register}
          />
        </RowField>
        <RowField>
          <FormIconBox>
            <IoLogoGameControllerB />
          </FormIconBox>
          <Field
            placeholder="Nickname. . ."
            type="text"
            disabled={loading}
            name="nickname"
            register={register}
          />
        </RowField>
        <RowField>
          <FormIconBox>
            <IoIosAt />
          </FormIconBox>
          <Field
            placeholder="* Email. . ."
            type="email"
            disabled={loading}
            name="email"
            required={true}
            register={register}
          />
        </RowField>
        <RowField>
          <FormIconBox>
            <IoIosContact />
          </FormIconBox>
          <Field
            placeholder="* Cpf. . ."
            type="text"
            disabled={loading}
            name="cpf"
            required={true}
            register={register}
          />
        </RowField>
        {/* {<RowField>
                        <BoxFieldIcon>
                            <IoIosPhonePortrait />
                        </BoxFieldIcon>
                        <Field placeholder='Telefone. . .' type='tel' maxLength={11} 
                        disabled={loading} name='phone' />
                    </RowField>} */}
        <RowField>
          <FormIconBox>
            <IoIosLock />
          </FormIconBox>
          <Field
            placeholder="* Senha. . ."
            type="password"
            disabled={loading}
            name="password"
            required={true}
            register={register}
          />
        </RowField>
        <RowField>
          <FormIconBox>
            <IoIosKey />
          </FormIconBox>
          <Field
            placeholder="* Confirmar Senha. . ."
            type="password"
            disabled={loading}
            name="confirmPassword"
            required={true}
            register={register}
          />
        </RowField>
        <RowField>
          <Button onSubmit={handleSubmit(signUp)} disabled={loading}>
            {!loading && <>Cadastrar</>}
            {loading && (
              <ThreeDots
                height={19}
                width={40}
                wrapperStyle={{ display: "flex", justifyContent: "center" }}
              />
            )}
          </Button>
        </RowField>
      </Box>
      <Link to="/">
        <Box>
          <span>
            <IoIosArrowDropleftCircle />
          </span>
          <span>Voltar</span>
        </Box>
      </Link>
    </ContainerCardForm>
  );
}
