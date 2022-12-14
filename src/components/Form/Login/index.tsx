import {
  BackButton,
  BoxFieldIcon,
  CardForm,
  Container,
  RowField,
  SubmitButton,
  WrapperFields,
} from "../styles";
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
      <CardForm>
        <WrapperFields>
          <RowField>
            <BoxFieldIcon>
              <IoIosAt />
            </BoxFieldIcon>
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
            <BoxFieldIcon>
              <IoIosLock />
            </BoxFieldIcon>
            <Field
              register={register}
              placeholder="Senha. . ."
              type="password"
              disabled={loading}
              name="password"
              required={true}
            />
          </RowField>
          <RowField isButton={true}>
            <SubmitButton onClick={handleSubmit(loginSubmit)}>
              {!loading && <>Entrar</>}
              {loading && (
                <ThreeDots
                  height={18}
                  width={40}
                  wrapperStyle={{ display: "flex", justifyContent: "center" }}
                />
              )}
            </SubmitButton>
          </RowField>
        </WrapperFields>
        <Link to="/">
          <BackButton>
            <span>
              <IoIosArrowDropleftCircle />
            </span>
            <span>Voltar</span>
          </BackButton>
        </Link>
      </CardForm>
    </ContainerCardForm>
  );
}
