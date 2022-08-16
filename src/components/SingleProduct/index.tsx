import { IProducts, ProductCartData } from "../../types/products";
import {
    ActionButtons,
    AddCartSection,
    BackButton,
    Container,
    InternalContainer,
    ProductDataBox,
    ProductImageBox,
    PurchaseOptions,
    RowData,
    RowProductInformations
} from "./styles";
import { IoIosArrowBack } from 'react-icons/io';
import { getProductById } from "../../api/services/products";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import 'react-toastify/dist/ReactToastify.css';

export default function SingleProduct() {
    const [product, setProduct] = useState<IProducts>(Object);
    const [load, setLoad] = useState<boolean>(true);
    const [quantity, setQuantity] = useState<number>(1);
    const [payMethod, setPayMethod] = useState<string>('');
    const { productId } = useParams();
    const navigate = useNavigate();
    const addToCart = (product: ProductCartData) => {
        try {
            const cart = localStorage.getItem('cart');
            if (cart) {
                const auxCart = JSON.parse(cart);
                localStorage.setItem('cart', JSON.stringify([...auxCart, product]));
            } else {
                localStorage.setItem('cart', JSON.stringify([product]));
            }
            toast('produto adicionado com sucesso ao carrinho');
            localStorage.setItem('payMethod', payMethod);
        } catch (e: any) {
            console.log(e);
            toast('falha ao adicionar produto ao carrinho');
        }
    }
    useEffect(() => {
        (async () => {
            try {
                if (productId) {
                    const { data } = await getProductById(productId);
                    setProduct(data);
                    setLoad(false);
                } else {
                    toast('invalid param.');
                    navigate('/');
                }
            } catch (e: any) {
                console.log(e);
                toast(e.message);
            }
        })();
    });
    return (
        <Container>
            {load && <Loading />}
            {!load && <InternalContainer>
                <RowProductInformations>
                    <ProductImageBox>
                        <img src={product.image} />
                    </ProductImageBox>
                    <ProductDataBox>
                        <RowData dataType='description'>{product.name}</RowData>
                        <RowData dataType='name'>{product.description}</RowData>
                        <RowData dataType='price'>R$ {product.price}</RowData>
                        <RowData dataType='shipping'>Frete: R$ {product.shipping}</RowData>
                        <PurchaseOptions>
                            Quantidade: 
                            <input type='number' value={quantity} placeholder="Quantidade" 
                            onChange={({target}) => setQuantity(parseInt(target.value))} />
                        </PurchaseOptions>
                        <PurchaseOptions dataType="payMethod">
                            Método de pagamento:
                            <select onChange={({target}) => setPayMethod(target.value)}>
                                <option value=''>--Selecione--</option>
                                <option value='card'>Cartão</option>
                                <option value='fetlock'>Boleto</option>
                            </select>
                        </PurchaseOptions>
                        {payMethod === 'card' && <p>Parcelamento</p>}
                        <AddCartSection>
                            <div>
                                <ActionButtons value='Adicionar aos favoritos.' type='button'
                                    onClick={() => { /* função de adicionar aos favoritos */ }} />
                            </div>
                            <div>
                                <ActionButtons value='Adicionar ao carrinho.' type='button'
                                    onClick={() => {
                                        addToCart({
                                            _id: product._id, name: product.name,
                                            description: product.description, 
                                            price: (product.price + product.shipping), 
                                            image: product.image, quantity
                                        });
                                    }} />
                            </div>
                            <div>
                                <ActionButtons value='Comprar' type='button'
                                    onClick={() => {
                                        if((payMethod !== '') && ((payMethod === 'card') || (payMethod === 'fetlock'))){
                                            addToCart({
                                                _id: product._id, name: product.name,
                                                description: product.description, 
                                                price: (product.price + product.shipping), 
                                                image: product.image, quantity
                                            });
                                            navigate('/purchase/payment');
                                        }else{
                                            toast('escolha um método de pagamento');
                                        }
                                    }} />
                            </div>
                        </AddCartSection>
                        <RowData dataType='shipping'>Em estoque ({product.stock} restantes)</RowData>
                        <ToastContainer />
                    </ProductDataBox>
                    <BackButton onClick={() => navigate(-1)}>
                        <IoIosArrowBack /> Voltar
                    </BackButton>
                </RowProductInformations>
            </InternalContainer>}
        </Container>
    );
}