import { ProductCartData } from "../../../types/products";
import { Fragment, useEffect, useState } from "react";
import {
  BoxImage,
  BoxProductInfo,
  ContainerModal,
  customStyles,
  Empty,
  FinishPurchaseBlock,
  FinishPurchaseButton,
  ProductInfo,
  RowProductInformation,
} from "./styles";
import { Link } from "react-router-dom";
import { IoIosTrash, IoIosCloseCircle } from "react-icons/io";
import Modal from "react-modal";
import { Box, Button, Image, Text } from "@chakra-ui/react";

interface Props {
  open: boolean;
  setOpen: Function;
}

export default function ModalCart({ open, setOpen }: Props) {
  const [cartData, setCartData] = useState<Array<ProductCartData>>([]);
  const [scorePoints, setScorePoints] = useState<number>(0);
  const closeModal = () => {
    setOpen(false);
  };
  const removeCartItem = (productId: number) => {
    let cart = [];
    for (let i = 0; i < cartData.length; i++) {
      if (cartData[i].id !== productId) {
        cart.push(cartData[i]);
      }
    }
    setCartData(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  useEffect(() => {
    function calculatePoints(prices: Array<ProductCartData>) {
      let aux = 0;
      for (let i = 0; i < prices.length; i++) {
        aux += Math.ceil(prices[i].price * 0.15);
      }
      return aux + 10;
    }
    (() => {
      try {
        const cartData = localStorage.getItem("cart");
        if (cartData) {
          const cart = JSON.parse(cartData);
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
      <Box
        h="200px"
        w="300px"
        overflowY={
          cartData && cartData.length >= 2 ? `scroll` : `hidden`
        }
        bgColor="transparent"
        position="relative"
        fontFamily="'Permanent Marker', cursive"
      >
        {cartData.length > 0 && (
          <>
            {cartData.map((item, index) => (
              <Box w='100px' display='flex' bgColor='transparent' mb='10px' key={index}>
                <Box w='85px' h='90px'>
                  <Image h='100%' w='100%' src={item.image} />
                </Box>
                <Box ml='20px'>
                  <Text fontSize='17px' fontWeight='bold'>{item.name}</Text>
                  <Text fontSize='15px'>R$ {item.price}</Text>
                  <IoIosTrash
                    color="darkred"
                    fontSize={20}
                    style={{ cursor: "pointer" }}
                    onClick={() => removeCartItem(item.id)}
                  />
                </Box>
              </Box>
            ))}
            <Box fontFamily="'Silkscreen', cursive" w='100%' h='50px'>
              <Button border='none' borderRadius='5px' p='6px' m='10px 0px 10px 0px' cursor='pointer' 
			  _hover={{ bgColor: 'lightgreen' }}>
                <Link to="/purchase/finish">Concluir pedido</Link>
              </Button>
              <Box fontSize='15px'>
                Você ganhará <Text fontWeight='bold'>{scorePoints} pontos</Text> com essa
                compra!!😆
              </Box>
            </Box>
          </>
        )}
        {cartData.length === 0 && (
          <Box w='100%' h='100%' display='flex' justifyContent='center' alignItems='center'>
            <Text>Vazio. . . 🥺</Text>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
