import { useForm } from "react-hook-form";
import { BackButton } from "../../SingleProduct/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { addPayMethodData, getPayMethod } from "../../../api/services/purchases";
import { SectionPayForm, Container, RowField } from "./styles";
import Loading from "../../Loading";

export default function PayDataForm() {
    const [load, setLoad] = useState<boolean>(false);
    const [effectLoad, setEffectLoad] = useState<boolean>(false);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const payData = async (data: any) => {
        try {
            setLoad(true);
            const token = localStorage.getItem('token');
            if (token) {
                await addPayMethodData(data, { headers: { authorization: JSON.parse(token) } });
                alert('cartão cadastrado com sucesso.');
                navigate('/purchase/address');
            }
        } catch (e: any) {
            console.log(e);
            alert(e.message);
            navigate(-1);
        }
    }
    useEffect(() => {
        (async () => {
            try {
                if (location.pathname !== '/profile') {
                    const token = localStorage.getItem('token');
                    if (token) {
                        const data = await getPayMethod({ headers: { authorization: JSON.parse(token) } });
                        if (data.length > 0) {
                            navigate('/purchase/address');
                        }
                        setEffectLoad(true);
                    }
                }else{ setEffectLoad(true); }
            } catch (e: any) {
                console.log(e);
                alert(e.message);
                navigate(-1);
            }
        })();
    }, []);
    return (
        <Container>
            {!effectLoad && <Loading />}
            {effectLoad &&
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
                    <BackButton onClick={() => navigate(-1)}>
                        <IoIosArrowBack /> Voltar
                    </BackButton>
                </SectionPayForm>}
        </Container>
    );
}