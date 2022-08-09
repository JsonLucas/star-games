import { IProducts } from "../../types/products";
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

export default function SingleProduct () {
    const [product, setProduct] = useState<IProducts>(Object);
    const [load, setLoad] = useState<boolean>(true);
    const { productId } = useParams();
    const navigate = useNavigate();
    const addToCart = (productId: string) => {
        try{
            const cart = localStorage.getItem('cart');
            if(cart){
                const auxCart = JSON.parse(cart);
                localStorage.setItem('cart', JSON.stringify([...auxCart, productId]));
            }else{
                localStorage.setItem('cart', JSON.stringify([productId]));
            }
            toast('produto adicionado com sucesso ao carrinho');
        }catch(e: any){
            console.log(e);
            toast('falha ao adicionar produto ao carrinho');
        }
    }
    useEffect(() => {
        (async () => {
            try{
                if(productId) { 
                    const { data }= await getProductById(productId);
                    setProduct(data);
                    setLoad(false);
                }else{
                    alert('invalid param.');
                    navigate('/');
                }
            }catch(e: any){
                console.log(e.message);
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
                    </ProductDataBox>
                    <AddCartSection>
                        <ActionButtons value='Comprar' type='button' />
                        <ActionButtons value='Adicionar ao carrinho.' type='button' 
                        onClick={() => { addToCart(product._id); }} />
                        <ToastContainer />
                    </AddCartSection>
                    <BackButton onClick={() => { navigate(-1); }}>
                        <IoIosArrowBack /> Voltar
                    </BackButton>
                </RowProductInformations>}
        </Container>
    );
}