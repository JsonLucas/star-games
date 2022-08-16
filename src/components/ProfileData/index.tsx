import AddressDataForm from "../Form/AddressData";
import {
    Container,
    InternalContainer,
    NothingToShow,
    PreviousRegisteredData,
    RegisteredData,
    RegisterNewData,
    RowAlternateButtons
} from "./styles";
import { useEffect, useState } from 'react';
import PayDataForm from "../Form/PayData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Address, Cards } from "../../types/users";
import { getPayMethod, getAddresses } from "../../api/services/purchases";
import { RowData, RowPaymentData, WrapperPaymentData } from "../ReviewPurchaseData/styles";
import dayjs from 'dayjs';

export default function ProfileData() {
    const [option, setOption] = useState<string>('');
    const [load, setLoad] = useState<boolean>(false);
    const [cards, setCards] = useState<Array<Cards>>([]);
    const [addresses, setAddresses] = useState<Array<Address>>([]);
    const navigate = useNavigate();
    const alternateOption = ({ target }: any) => {
        if (target.value === 'Endereço') { setOption('address'); }
        else if (target.value === 'Pagamento') { setOption('payment'); }
    }
    const formatDate = (date: Date) => {
        return dayjs(date).format('MM-YY');
    }
    useEffect(() => {
        (async () => {
            try {

                (async () => {
                    try {
                        const token = localStorage.getItem('token');
                        if (token) {
                            const headers = { headers: { authorization: JSON.parse(token) } };
                            const cards = await getPayMethod(headers);
                            const addresses = await getAddresses(headers);
                            setCards(cards.data);
                            setAddresses(addresses.data);
                            setLoad(true);
                        }
                    } catch (e: any) {
                        console.log(e);
                        toast(e.message);
                    }
                })();
            } catch (e: any) {
                console.log(e);
                alert(e.message);
            }
        })();
    }, []);
    return (
        <Container>
            <InternalContainer>
                <PreviousRegisteredData>
                    <RegisteredData elements={cards.length}>
                        <p>Dados financeiros</p>
                        {cards.map((item, index) =>
                            <RowPaymentData key={index}>
                                <WrapperPaymentData>
                                    <RowData>nome: <span>{item.name}</span></RowData>
                                    <RowData>número: <span>{item.number}</span></RowData>
                                    <RowData>cvv: <span>{item.cvv}</span></RowData>
                                    <RowData>validade: <span>{formatDate(item.expirationDate)}</span></RowData>
                                </WrapperPaymentData>
                            </RowPaymentData>
                        )}
                    </RegisteredData>
                    <RegisteredData elements={addresses.length}>
                        <p>Dados de entrega</p>
                        {addresses.map((item, index) =>
                            <RowPaymentData key={index}>
                                <WrapperPaymentData>
                                    <RowData>
                                        Endereço: <span>{item.street} - {item.number} - {item.neighborhood}</span>
                                    </RowData>
                                    <RowData>CEP: <span>{item.cep}</span></RowData>
                                    <RowData>Cidade - Estado: <span>{item.city}-{item.state}</span></RowData>
                                    {item.complement !== '' && <RowData>Complemento: <span>{item.complement}</span></RowData>}
                                </WrapperPaymentData>
                            </RowPaymentData>)}
                    </RegisteredData>
                </PreviousRegisteredData>
                <RegisterNewData>
                    <RowAlternateButtons>
                        <div>
                            <input type='button' value='Endereço' onClick={alternateOption} />
                            <input type='button' value='Pagamento' onClick={alternateOption} />
                        </div>
                    </RowAlternateButtons>
                    {option === '' && <NothingToShow><h3>Faz alguma coisa aí 😑</h3></NothingToShow> }
                    {option === 'address' && <AddressDataForm />}
                    {option === 'payment' && <PayDataForm />}
                </RegisterNewData>
            </InternalContainer>
        </Container>
    );
}