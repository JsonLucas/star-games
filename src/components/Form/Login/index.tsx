import { 
    BackButton,
    BoxFieldIcon, 
    CardForm, 
    Container, 
    Field, 
    RowField, 
    SubmitButton, 
    WrapperFields 
} from "../styles";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { loginRequest } from "../../../api/services/users";
import { Link, useNavigate } from "react-router-dom";
import { IoIosAt, IoIosLock, IoIosArrowDropleftCircle } from 'react-icons/io';
import { toast } from "react-toastify";
import { useToast } from "../../../hooks/useToast";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export default function FormLogin (){
    const [loading, setLoading] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
	const { genericToast } = useToast();
	const { setAuth } = useLocalStorage();
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const loginSubmit = async (login: any) => {
        try{
            setLoading(true);
            setDisabled(true);
            const data = await loginRequest(login);
			setAuth(data);
			genericToast({message: 'Login efetuado com sucesso!', type: 'success'});
            navigate('/');
        }catch(e: any){
            console.log(e);
			genericToast({message: e.message, type: 'error'});
        }
    }
    return (
        <Container>
            <CardForm onSubmit={handleSubmit(loginSubmit)}>
                <WrapperFields>
                    <RowField>
                        <BoxFieldIcon>
                            <IoIosAt />
                        </BoxFieldIcon>
                        <Field placeholder='Nickname ou email. . .' disabled={disabled} 
                        {...register('login')} required />
                    </RowField>
                    <RowField>
                        <BoxFieldIcon>
                            <IoIosLock />
                        </BoxFieldIcon>
                        <Field placeholder='Senha. . .' type='password' disabled={disabled} 
                        {...register('password')} required />
                    </RowField>
                    <RowField isButton={true}>
                        <SubmitButton type='submit'>
                            {!loading && <>Entrar</>}
                            {loading && <ThreeDots height={18} width={40} 
                            wrapperStyle={{display: 'flex', justifyContent: 'center'}} />}
                        </SubmitButton>
                    </RowField>
                </WrapperFields>
                <Link to='/'>
                    <BackButton>
                        <span><IoIosArrowDropleftCircle /></span>
                        <span>Voltar</span>
                    </BackButton>
                </Link>
            </CardForm>
        </Container>
    );
}