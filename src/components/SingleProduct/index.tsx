import { IProducts, ProductCartData } from "../../types/products";
import {
    ActionButtons,
    AddCartSection,
    BackButton,
    Container,
    ProductDataBox,
    ProductImageBox,
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
    const { productId } = useParams();
    const navigate = useNavigate();
    const addToCart = (product: ProductCartData) => {
        localStorage.removeItem('cart');
        try {
            const cart = localStorage.getItem('cart');
            if (cart) {
                const auxCart = JSON.parse(cart);
                localStorage.setItem('cart', JSON.stringify([...auxCart, product]));
            } else {
                localStorage.setItem('cart', JSON.stringify([product]));
            }
            toast('produto adicionado com sucesso ao carrinho');
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
                    alert('invalid param.');
                    navigate('/');
                }
            } catch (e: any) {
                console.log(e);
                alert(e.message);
            }
        })();
    });
    return (
        <Container>
            {load && <Loading />}
            {!load && <RowProductInformations>
                <ProductImageBox>
                    <img src={product.image} />
                </ProductImageBox>
                <ProductDataBox>
                    <RowData dataType='description'>{product.name}</RowData>
                    <RowData dataType='name'>{product.description}</RowData>
                    <RowData dataType='price'>R$ {product.price}</RowData>
                    <RowData dataType='shipping'>Frete: R$ {product.shipping}</RowData>
                    <AddCartSection>
                        <div>
                            <ActionButtons value='Comprar' type='button' 
                            onClick={() => { addToCart({ _id: product._id, name: product.name, price: (product.price+product.shipping), image: product.image }); navigate('/purchase/payment'); } } />
                        </div>
                        <div>
                            <ActionButtons value='Adicionar ao carrinho.' type='button'
                                onClick={() => { addToCart({ _id: product._id, name: product.name, price: (product.price+product.shipping), image: product.image }); }} />
                        </div>
                    </AddCartSection>
                    <ToastContainer />
                </ProductDataBox>
                <BackButton onClick={() => navigate(-1) }>
                    <IoIosArrowBack /> Voltar
                </BackButton>
            </RowProductInformations>}
        </Container>
    );
}