import { ProductCartData } from '../../../types/products';
import { Fragment, useEffect, useState } from 'react';
import { 
    BoxImage, 
    BoxProductInfo, 
    ContainerModal, 
    customStyles, 
    Empty, 
    FinishPurchaseBlock, 
    FinishPurchaseButton, 
    ProductInfo, 
    RowProductInformation 
} from './styles';
import { Link } from 'react-router-dom';
import { IoIosTrash, IoIosCloseCircle } from 'react-icons/io';
import Modal from 'react-modal';

interface Props {
    open: boolean,
    setOpen: Function
}

export default function ModalCart({ open, setOpen }: Props) {
    const [cartData, setCartData] = useState<Array<ProductCartData>>([]);
    const [scorePoints, setScorePoints] = useState<number>(0);
    const closeModal = () => {
        setOpen(false);
    }
    const removeCartItem = (productId: string) => {
        let cart = [];
        for (let i = 0; i < cartData.length; i++) {
            if (cartData[i]._id !== productId) {
                cart.push(cartData[i]);
            }
        }
        setCartData(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    useEffect(() => {
        function calculatePoints(prices: Array<ProductCartData>) {
            let aux = 0;
            for (let i = 0; i < prices.length; i++) {
                aux += Math.ceil(prices[i].price * 0.15);
            }
            return (aux + 10);
        }
        (() => {
            try {
                const cartData = localStorage.getItem('cart');
                if (cartData) {
                    const cart = JSON.parse(cartData)
                    setCartData(cart);
                    setScorePoints(calculatePoints(cart));
                }
            } catch (e: any) {
                console.log(e);
                alert(e.message);
            }
        })();
    }, [open]);
    return (
        <Modal
            isOpen={open}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <ContainerModal elements={cartData.length}>
                {cartData.length > 0 &&
                    <Fragment>
                        {cartData.map((item, index) => <RowProductInformation key={index}>
                            <BoxImage>
                                <img src={item.image} />
                            </BoxImage>
                            <BoxProductInfo>
                                <ProductInfo isName={true}>{item.name}</ProductInfo>
                                <ProductInfo isName={false}>R$ {item.price}</ProductInfo>
                                <IoIosTrash color='darkred' fontSize={20} style={{ cursor: 'pointer' }}
                                    onClick={() => removeCartItem(item._id)} />
                            </BoxProductInfo>
                        </RowProductInformation>)}
                        <FinishPurchaseBlock>
                            <FinishPurchaseButton>
                                <Link to='/purchase/finish'>
                                    Concluir pedido
                                </Link>
                            </FinishPurchaseButton>
                            <p>Você ganhará <span>{scorePoints} pontos</span> com essa compra!!😆</p>
                        </FinishPurchaseBlock>
                    </Fragment>
                }
                {cartData.length === 0 && <Empty><p>Vazio. . . 🥺</p></Empty>}
            </ContainerModal>
        </Modal>
    );
}