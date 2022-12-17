import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import Loading from "../Loading";
import { useProducts } from "../../hooks/useProducts";
import { Box, Image, Text } from "@chakra-ui/react";

interface Features {
  hasFreeShipping: boolean;
  shippingDiscount: number;
  discount: number;
}

export default function Products() {
  const { products } = useProducts();
  const [features, setFeatures] = useState<Features | undefined>();
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Box
      p="10px"
      w="92%"
      bgColor="transparent"
      m="15px auto"
      position="relative"
      fontFamily="'Silkscreen', cursive"
    >
      {products.isLoading && <Loading />}
      {products.data && (
        <Box w="100%">
          {products.data.map((item, index) => (
            <Box
              w="230px"
              h="400px"
              bgColor="white"
              boxShadow="0px 0px 5px 0px rgba(0, 0, 0, 0.3)"
              cursor="pointer"
              position="relative"
              float="left"
              m="0px 14.2px 15px 0px"
              key={index}
              onClick={() => {
                navigate(`/product/${item.id}`);
              }}
            >
              <Text position='absolute' bottom='10px' right='10px' color='black' fontSize='22px' fontWeight='bold'>
                <IoIosHeartEmpty />
              </Text>
              <Box w='95%' h='50%' m='auto' bgColor='grey'>
                <Image w='100%' h='100%' src={item.image} alt="Fail do charge the image" />
              </Box>
              <Box w='95%' margin='5px auto' bgColor='transparent'>
                <Box fontSize='17px' fontWeight='bold'>
                  {features && (
                    <>
                      {features.discount > 0 && (
                        <>R$ {item.price - item.price * features.discount}</>
                      )}
                      {features.discount === 0 && <>R$ {item.price}</>}
                    </>
                  )}
                  {!features && <>R$ {item.price}</>}
                </Box>
                <Box fontSize='17px' fontWeight='bold'>{item.name}</Box>
                <Box fontSize='17px' fontWeight='bold'>
                  {features && (
                    <>
                      {features.hasFreeShipping && (
                        <>
                          Frete: <b>Grátis</b>
                        </>
                      )}
                      {!features.hasFreeShipping && (
                        <>
                          {features.shippingDiscount !== 0 && (
                            <>
                              Frete: R${" "}
                              {item.shipping -
                                item.shipping * features.shippingDiscount}
                            </>
                          )}
                          {features.shippingDiscount === 0 && (
                            <>Frete: R$ {item.shipping}</>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {!features && <>Frete: R$ {item.shipping}</>}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
