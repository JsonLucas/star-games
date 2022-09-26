import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useState, useEffect, Fragment } from 'react';
import {
    CartDataReview,
    Container,
    InternalContainer,
    SectionCartData,
    SectionReward,
    SectionUserData,
    UserAddressData,
    UserPaymentData,
    WrapperPaymentData,
    RowPaymentData,
    RowData,
    WrapperCartData,
    RowCartData,
    RowCartInformation,
    RowActionButtons
} from './styles';
import 'react-toastify/dist/ReactToastify.css';
import { faker } from '@faker-js/faker';
import { ThreeDots } from 'react-loader-spinner';
import { Address, Cards } from '../../types/users';
import { ProductCartData } from '../../types/products';
import { getAddresses, getPayMethod, purchase } from '../../api/services/purchases';
import Loading from '../Loading';
import dayjs from 'dayjs';

export default function ReviewPurchaseData() {
    const [load, setLoad] = useState<boolean>(false);
    const [loadCard, setLoadCard] = useState<boolean>(false);
    const [cards, setCards] = useState<Array<Cards>>([]);
    const [addresses, setAddresses] = useState<Array<Address>>([]);
    const [cart, setCart] = useState<Array<ProductCartData>>([]);
    const [selectCard, setSelectCard] = useState<string>('');
    const [selectAddress, setSelectAddress] = useState<string>('');
    const [scorePoints, setScorePoints] = useState<number>(0);
    const [payMethod, setPayMethod] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(true);
    const navigate = useNavigate();
    const formatDate = (date: Date) => {
        return dayjs(date).format('MM-YY');
    }
    const formatCartInformation = (data: Array<ProductCartData>) => {
        let ids = [];
        for (let i = 0; i < data.length; i++) {
            ids.push({ productId: data[i].id, quantity: data[i].quantity });
        }
        return ids;
    }
    const confirmPurchase = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                let body;
                payMethod === 'card' ? body = {
                    products: formatCartInformation(cart), cardId: selectCard,
                    addressId: selectAddress, scorePoints, payMethod
                } : body = {
                    products: formatCartInformation(cart), addressId: selectAddress,
                    scorePoints, payMethod
                };
                if ((selectCard !== '') || (selectAddress !== '')) {
                    setLoad(false);
                    await purchase(body, { headers: { authorization: JSON.parse(token) } });
                    alert('compra concluída com sucesso.');
                    localStorage.removeItem('cart');
                    navigate('/');
                } else { toast('Selecione uma das opções de cartão e endereço'); }
            }
        } catch (e: any) {
            console.log(e);
            alert(e.message);
            navigate('/');
        }
    }
    useEffect(() => {
        function calculatePoints(prices: Array<ProductCartData>) {
            let aux = 0;
            for (let i = 0; i < prices.length; i++) {
                aux += Math.ceil(prices[i].price * 0.15);
            }
            return (aux + 10);
        }
        (async () => {
            try {
                const cartData = localStorage.getItem('cart');
                const token = localStorage.getItem('token');
                if (cartData) {
                    const cart = JSON.parse(cartData);
                    setCart(cart);
                    setScorePoints(calculatePoints(cart));
                    if (token) {
                        const headers = { headers: { authorization: JSON.parse(token) } };
                        const addresses = await getAddresses(headers);
                        setAddresses(addresses.data);
                        setLoad(true);
                    }
                } else {
                    alert('carrinho vazio');
                    navigate('/');
                }
            } catch (e: any) {
                console.log(e);
                toast(e.message);
            }
        })();
    }, []);
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');
            try{
                if(token){
                    const headers = { headers: { authorization: JSON.parse(token) } };
                    const cards = await getPayMethod(headers);
                    setCards(cards.data);
                    setLoadCard(true);
                }
            }catch(e: any){
                console.log(e);
                toast(e.message);
            }
        })();
    }, [payMethod]);
    useEffect(() => {
        if (payMethod === 'card') {
            if ((selectAddress !== '') && (selectCard !== '')) {
                setDisabled(false);
            }
        } else {
            if (selectAddress !== '') {
                setDisabled(false);
            }
        }
    }, [selectAddress, selectCard]);
    return (
        <Container>
            {!load && <Loading />}
            {load && <Fragment>
                <InternalContainer>
                    <SectionUserData>
                        <div>
                            <p>Dados de pagamento</p>
                            Selecione o método: <select onChange={({ target }) => setPayMethod(target.value)}>
                                <option value=''>--Selecione--</option>
                                <option value='card'>Cartão</option>
                                <option value='fetlock'>Boleto</option>
                            </select>
                        </div>
                        {payMethod === 'fetlock' && <UserPaymentData>
                            Código de barras do boleto:
                            {`${faker.finance.creditCardNumber()}${faker.finance.creditCardNumber()}`}
                        </UserPaymentData>}
                        {payMethod === 'card' &&
                            <Fragment>
                                {!loadCard && <ThreeDots />}
                                {loadCard &&
                                    <UserPaymentData elements={cards.length}>
                                        {cards.map((item, index) =>
                                            <RowPaymentData key={index}>
                                                <input type='radio' value={item.id}
                                                    onChange={({ target }) => setSelectCard(target.value)} />
                                                <WrapperPaymentData>
                                                    <RowData>nome: <span>{item.name}</span></RowData>
                                                    <RowData>número: <span>{item.number}</span></RowData>
                                                    <RowData>cvv: <span>{item.cvv}</span></RowData>
                                                    <RowData>validade: <span>{formatDate(item.expirationDate)}</span></RowData>
                                                </WrapperPaymentData>
                                            </RowPaymentData>)}
                                    </UserPaymentData>
                                }
                            </Fragment>
                        }
                        <UserAddressData elements={addresses.length}>
                            <p>Dados de endereço de entrega</p>
                            {addresses.map((item, index) =>
                                <RowPaymentData key={index}>
                                    <input type='radio' value={item.id}
                                        onChange={({ target }) => setSelectAddress(target.value)} />
                                    <WrapperPaymentData>
                                        <RowData>
                                            Endereço: <span>{item.street} - {item.number} - {item.neighborhood}</span>
                                        </RowData>
                                        <RowData>CEP: <span>{item.cep}</span></RowData>
                                        <RowData>Cidade - Estado: <span>{item.city}-{item.state}</span></RowData>
                                        {item.complement !== '' && <RowData>Complemento: <span>{item.complement}</span></RowData>}
                                    </WrapperPaymentData>
                                </RowPaymentData>)}
                        </UserAddressData>
                    </SectionUserData>
                    <SectionCartData>
                        <CartDataReview elements={cart.length}>
                            {cart.map((item, index) =>
                                <WrapperCartData key={index}>
                                    <div>
                                        <img src={item.image} alt='Imagem não carregada' />
                                    </div>
                                    <RowCartData>
                                        <RowCartInformation type='text'>{item.name}</RowCartInformation>
                                        <RowCartInformation type='text'>{item.description}</RowCartInformation>
                                        <RowCartInformation type='numeric'>R$ {item.price}</RowCartInformation>
                                        <RowCartInformation type='numeric'>x{item.quantity}</RowCartInformation>
                                    </RowCartData>
                                </WrapperCartData>
                            )}
                        </CartDataReview>
                        <SectionReward>
                            <p><span>Você ganhará <span>{scorePoints}</span> pontos com essa compra!!</span>🥳</p>
                            <RowActionButtons>
                                <button onClick={confirmPurchase} disabled={disabled}>
                                    {!load && <ThreeDots height={20} width={20} />}
                                    {load && <>Fechar pedido</>}
                                </button>
                                <input type='button' value='Continuar comprando.' onClick={() => navigate('/')} />
                            </RowActionButtons>
                        </SectionReward>
                    </SectionCartData>
                </InternalContainer>
                <ToastContainer />
            </Fragment>}
        </Container>
    );
}
