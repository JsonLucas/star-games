import { cloneElement, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { addAddressData } from "../../../api/services/purchases";
import { getCityByCep } from "../../../api/services/users";
import { BackButton } from "../../SingleProduct/styles";
import { Container, RowField, SectionPayForm } from "../PayData/styles";

export default function AddressDataForm() {
    const { register, handleSubmit } = useForm();
    const [cep, setCep] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [load, setLoad] = useState<boolean>(false);
    const [loadCep, setLoadCep] = useState<boolean>(false);
    const navigate = useNavigate();
    const getCity = async () => {
        setLoadCep(true);
        try {
            const { data } = await getCityByCep(cep);
            const { localidade, uf } = data;
            setCity(localidade);
            setState(uf);
            setLoadCep(false);
        } catch (e: any) {
            console.log(e);
            alert(e.message);
        }
    }
    const addressData = async (data: any) => {
        const completeData = {...data, cep, city, state};
        try{
            const token = localStorage.getItem('token');
            if(token){
                const { data } = await addAddressData(completeData, { headers: { authorization: JSON.parse(token) } });
            }
        }catch(e: any){
            console.log(e);
            alert(e.message);
        }
    }
    return (
        <Container>
            <SectionPayForm>
                <form onSubmit={handleSubmit(addressData)}>
                    <RowField fieldType="cardNumber">
                        <input type='number' {...register('street')} placeholder='Rua. . .'
                            disabled={load} />
                        <RowField fieldType="cvv">
                            <input type='number' {...register('number')} placeholder='Número'
                                disabled={load} />
                        </RowField>
                    </RowField>
                    <RowField fieldType="cardNumber">
                        <input type='text' {...register('neighborhood')} placeholder='Bairro. . .'
                        disabled={load} />
                    </RowField>
                    <RowField fieldType="expirationDate">
                        <RowField fieldType="cvv">
                            <input type='number' value={cep} 
                            onChange={({target}) => setCep(target.value)} placeholder='Cep. . .'
                            disabled={loadCep} onBlur={() => getCity()} />
                        </RowField>
                        <RowField fieldType="cvv">
                            <input type='text' value={city} placeholder='Cidade. . .'
                            disabled />
                        </RowField>
                        <RowField fieldType="cvv">
                            <input type='text' value={state} placeholder='Estado. . .'
                            disabled />
                        </RowField>
                    </RowField>
                    <RowField fieldType="cardNumber">
                        <input type='text' {...register('complement')} placeholder='Complemento. . .'
                        disabled={load} />
                    </RowField>
                    <RowField fieldType="button">
                        <button type='submit' disabled={load}>Avançar</button>
                    </RowField>
                </form>
                <BackButton onClick={() => navigate(-1)}>
                    <IoIosArrowBack /> Voltar
                </BackButton>
            </SectionPayForm>
        </Container>
    );
}