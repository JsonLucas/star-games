import { ProductCartData } from '../../../types/products';
import { Fragment, useEffect, useState } from 'react';
import { BoxImage, BoxProductInfo, customStyles, ProductInfo, RowProductInformation } from './styles';
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
            {cartData.length > 0 && 
            <Fragment>
                {cartData.map((item, index) => <RowProductInformation key={index}>
                    <BoxImage>
                        <img src={item.image} />
                    </BoxImage>
                    <BoxProductInfo>
                        <ProductInfo isName={true}>{item.name}</ProductInfo>
                        <ProductInfo isName={false}>R$ {item.price}</ProductInfo>
                    </BoxProductInfo>
                </RowProductInformation>)}
                <button>Concluir pedido</button>
                <p><span>Você ganhará <span>{scorePoints}</span> pontos com essa compra!!</span>😆</p>
            </Fragment>
            }
            {cartData.length === 0 && <>Vazio. . . 🥺</>}
        </Modal>
    );
}