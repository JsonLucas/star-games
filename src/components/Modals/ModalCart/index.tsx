import { ProductCartData } from '../../../types/products';
import { useEffect, useState } from 'react';
import { BoxImage, BoxProductInfo, customStyles, RowProductInformation } from './styles';
import { IoIosTrash, IoIosCloseCircle } from 'react-icons/io';
import Modal from 'react-modal';

interface Props {
    open: boolean,
    setOpen: Function
}

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
                    <p>{item.name}</p>
                    <p>{item.price}</p> {/*adicionar um contador do lado pra produto repetido */}
                </BoxProductInfo>
            </RowProductInformation>)}
            <button>Concluir pedido</button>
        </Modal>
    );
}