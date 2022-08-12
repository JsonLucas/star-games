import { useForm } from "react-hook-form";
import { BackButton } from "../../SingleProduct/styles";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { SectionPayForm, Container, RowField } from "./styles";
import { useState } from "react";
import { addPayMethodData } from "../../../api/services/purchases";

export default function PayDataForm () {
    const [load, setLoad] = useState<boolean>(false);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const payData = async (data: any) => {
        try{
            const token = localStorage.getItem('token');
            if(token){
                await addPayMethodData(data, { headers: { authorization: JSON.parse(token) } });
                alert('cartão cadastrado com sucesso.');
                //navigate(''); //fazer página de fechar pedido
            }
        }catch(e: any){
            console.log(e);
            alert(e.message);
        }
    }
    return (
        <Container>
            <SectionPayForm>
                <form onSubmit={handleSubmit(payData)}>
                    <RowField fieldType="name">
                        <input type='text' {...register('name')} placeholder='Nome no cartão. . .' 
                        disabled={load} />
                    </RowField>
                    <RowField fieldType="cardNumber">
                        <input type='number' {...register('number')} placeholder='Número' 
                        disabled={load} />
                        <RowField fieldType="cvv">
                            <input type='number' {...register('cvv')} placeholder='CVV' 
                            disabled={load} />
                        </RowField>
                    </RowField>
                    <RowField fieldType="expirationDate">
                        <input type='date' {...register('expirationDate')} disabled={load} />
                    </RowField>
                    <RowField fieldType="button">
                        <button type='submit' disabled={load}>Avançar</button>
                    </RowField>
                </form>
                <BackButton onClick={() => navigate(-1) }>
                    <IoIosArrowBack /> Voltar
                </BackButton>
            </SectionPayForm>
        </Container>
    );
}