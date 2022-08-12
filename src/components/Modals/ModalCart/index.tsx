import { ProductCartData } from '../../../types/products';
import { useEffect, useState } from 'react';
import { BoxImage, BoxProductInfo, customStyles, ProductInfo, RowProductInformation } from './styles';
import { IoIosTrash, IoIosCloseCircle } from 'react-icons/io';
import Modal from 'react-modal';

interface Props {
    open: boolean,
    setOpen: Function
}

type CartData = ProductCartData & {qtde: number};

export default function ModalCart({ open, setOpen }: Props) {
    const [cartData, setCartData] = useState<Array<ProductCartData>>([]);
    const closeModal = () => {
        setOpen(false);
    }
    useEffect(() => {
        (() => {
            try {
                const cartData = localStorage.getItem('cart');
                if (cartData) {
                    setCartData(JSON.parse(cartData));
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
            {cartData.map((item, index) => <RowProductInformation key={index}>
                <BoxImage>
                    <img src={item.image} />
                </BoxImage>
                <BoxProductInfo>
                    <ProductInfo isName={true}>{item.name}</ProductInfo>
                    <ProductInfo isName={false}>R$ {item.price}</ProductInfo> {/*adicionar um contador do lado pra produto repetido */}
                </BoxProductInfo>
            </RowProductInformation>)}
            <button>Concluir pedido</button>
        </Modal>
    );
}