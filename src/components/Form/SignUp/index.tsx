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
    IoIosPhonePortrait
} from 'react-icons/io';
import { useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";
import { signUpRequest } from "../../../api/services/users";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useToast } from "../../../hooks/useToast";
import { UserContext } from "../../../contexts/user";

export default function FormSignUp() {
	const { setAuth } = useLocalStorage();
	const { genericToast } = useToast();
	const { setIsLogged } = useContext(UserContext);
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const signUp = async (userData: any) => {
		setLoading(true);
        try{
            const data = await signUpRequest(userData);
			setAuth(data);
			setIsLogged(true);
            genericToast({ message: 'conta criada com sucesso!', type: 'success' });
            navigate('/');
        }catch(e: any){
            console.log(e);
			genericToast({ message: e.message, type: 'error' });
        }
		setLoading(false);
    }
    return (
        <Container>
            <CardForm signUpCard={true} onSubmit={handleSubmit(signUp)}>
                <WrapperFields>
                    <RowField>
                        <BoxFieldIcon>
                            <IoIosPerson />
                        </BoxFieldIcon>
                        <Field placeholder='* Nome completo. . .' disabled={loading} type='text' 
                        {...register('name')} required />
                    </RowField>
                    <RowField>
                        <BoxFieldIcon>
                            <IoLogoGameControllerB />
                        </BoxFieldIcon>
                        <Field placeholder='Nickname. . .' type='text' disabled={loading} 
                        {...register('nickname')} />
                    </RowField>
                    <RowField>
                        <BoxFieldIcon>
                            <IoIosAt />
                        </BoxFieldIcon>
                        <Field placeholder='* Email. . .' type='email' disabled={loading} 
                        {...register('email')} required />
                    </RowField>
                    <RowField>
                        <BoxFieldIcon>
                            <IoIosContact />
                        </BoxFieldIcon>
                        <Field placeholder='* Cpf. . .' type='text' disabled={loading} 
                        {...register('cpf')} required />
                    </RowField>
                    {/* {<RowField>
                        <BoxFieldIcon>
                            <IoIosPhonePortrait />
                        </BoxFieldIcon>
                        <Field placeholder='Telefone. . .' type='tel' maxLength={11} 
                        disabled={loading} {...register('phone')} />
                    </RowField>} */}
                    <RowField>
                        <BoxFieldIcon>
                            <IoIosLock />
                        </BoxFieldIcon>
                        <Field placeholder='* Senha. . .' type='password' disabled={loading} 
                        {...register('password')} required />
                    </RowField>
                    <RowField>
                        <BoxFieldIcon>
                            <IoIosKey />
                        </BoxFieldIcon>
                        <Field placeholder='* Confirmar Senha. . .' type='password' disabled={loading} 
                        {...register('confirmPassword')} required />
                    </RowField>
                    <RowField isButton={true}>
                        <SubmitButton type='submit' disabled={loading}>
                            {!loading && <>Cadastrar</>}
                            {loading && <ThreeDots height={19} width={40} 
                            wrapperStyle={{display: 'flex', justifyContent: 'center'}} />}
                        </SubmitButton>
                    </RowField>
                </WrapperFields>
                <Link to='/'>
                    <BackButton signUpCard={true}>
                        <span><IoIosArrowDropleftCircle /></span>
                        <span>Voltar</span>
                    </BackButton>
                </Link>
            </CardForm>
        </Container>
    );
}