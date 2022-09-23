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
import { useState } from "react";
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
import { toast } from "react-toastify";

export default function FormSignUp() {
    const [disabled, setDisabled] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const signUp = async (userData: any) => {
        try{
            setDisabled(true);
            setLoading(true);
            const { data } = await signUpRequest(userData);
            localStorage.setItem('token', JSON.stringify(data.token));
			localStorage.setItem('level', JSON.stringify(data.level));
            alert('conta criada com sucesso!');
            navigate('/');
        }catch(e: any){
            console.log(e);
            toast(e.message);
        }
    }
    return (
        <Container>
            <CardForm signUpCard={true} onSubmit={handleSubmit(signUp)}>
                <WrapperFields>
                    <RowField>
                        <BoxFieldIcon>
                            <IoIosPerson />
                        </BoxFieldIcon>
                        <Field placeholder='* Nome completo. . .' disabled={disabled} type='text' 
                        {...register('name')} required />
                    </RowField>
                    <RowField>
                        <BoxFieldIcon>
                            <IoLogoGameControllerB />
                        </BoxFieldIcon>
                        <Field placeholder='Nickname. . .' type='text' disabled={disabled} 
                        {...register('nickname')} />
                    </RowField>
                    <RowField>
                        <BoxFieldIcon>
                            <IoIosAt />
                        </BoxFieldIcon>
                        <Field placeholder='* Email. . .' type='email' disabled={disabled} 
                        {...register('email')} required />
                    </RowField>
                    <RowField>
                        <BoxFieldIcon>
                            <IoIosContact />
                        </BoxFieldIcon>
                        <Field placeholder='* Cpf. . .' type='text' disabled={disabled} 
                        {...register('cpf')} required />
                    </RowField>
                    {/* {<RowField>
                        <BoxFieldIcon>
                            <IoIosPhonePortrait />
                        </BoxFieldIcon>
                        <Field placeholder='Telefone. . .' type='tel' maxLength={11} 
                        disabled={disabled} {...register('phone')} />
                    </RowField>} */}
                    <RowField>
                        <BoxFieldIcon>
                            <IoIosLock />
                        </BoxFieldIcon>
                        <Field placeholder='* Senha. . .' type='password' disabled={disabled} 
                        {...register('password')} required />
                    </RowField>
                    <RowField>
                        <BoxFieldIcon>
                            <IoIosKey />
                        </BoxFieldIcon>
                        <Field placeholder='* Confirmar Senha. . .' type='password' disabled={disabled} 
                        {...register('confirmPassword')} required />
                    </RowField>
                    <RowField isButton={true}>
                        <SubmitButton type='submit' disabled={disabled}>
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