import { cloneElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addAddressData, getAddresses } from "../../../api/services/purchases";
import { getCityByCep } from "../../../api/services/users";
import Loading from "../../Loading";
import { BackButton } from "../../SingleProduct/styles";
import { Container, RowField, SectionPayForm } from "../PayData/styles";

export default function AddressDataForm() {
    const { register, handleSubmit } = useForm();
    const [effectLoad, setEffectLoad] = useState<boolean>(false);
    const [cep, setCep] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [load, setLoad] = useState<boolean>(false);
    const [loadCep, setLoadCep] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
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
            toast(e.message);
        }
    }
    const addressData = async (data: any) => {
        const completeData = { ...data, cep, city, state };
        try {
            setLoad(true);
            const token = localStorage.getItem('token');
            if (token) {
                await addAddressData(completeData, { headers: { authorization: JSON.parse(token) } });
                alert('endereço cadastrado.');
                navigate('/purchase/finish');
            }
        } catch (e: any) {
            console.log(e);
            toast(e.message);
            navigate('/');
        }
    }
    useEffect(() => {
        (async () => {
            if(location.pathname !== '/profile'){
                try {
                    const token = localStorage.getItem('token');
                    if (token) {
                        const { data } = await getAddresses({ headers: { authorization: JSON.parse(token) } });
                        if (data.length > 0) {
                            navigate('/purchase/finish');
                        }
                        setEffectLoad(true);
                    }
                } catch (e: any) {
                    console.log(e);
                    toast(e.message);
                    navigate('/');
                }
            }else { setEffectLoad(true); }
        })();
    }, []);
    return (
        <Container>
            {!effectLoad && <Loading />}
            {effectLoad &&
                <SectionPayForm>
                    <form onSubmit={handleSubmit(addressData)}>
                        <RowField fieldType="street">
                            <input type='text' {...register('street')} placeholder='Rua. . .'
                                disabled={load} />
                            <RowField fieldType="number">
                                <input type='number' {...register('number')} min='0' placeholder='Número'
                                    disabled={load} />
                            </RowField>
                        </RowField>
                        <RowField>
                            <input type='text' {...register('neighborhood')} placeholder='Bairro. . .'
                                disabled={load} />
                        </RowField>
                        <RowField>
                            <RowField fieldType="cvv">
                                <input type='number' value={cep} min={0}
                                    onChange={({ target }) => setCep(target.value)} placeholder='Cep. . .'
                                    disabled={loadCep} onBlur={() => getCity()} />
                            </RowField>
                            <RowField>
                                <input type='text' value={city} placeholder='Cidade. . .'
                                    disabled />
                            </RowField>
                            <RowField>
                                <input type='text' value={state} placeholder='Estado. . .'
                                    disabled />
                            </RowField>
                        </RowField>
                        <RowField fieldType="complement">
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
            }
        </Container>
    );
}