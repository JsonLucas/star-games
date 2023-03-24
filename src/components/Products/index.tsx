import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { useProducts } from "../../hooks/useProducts";
import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useToast } from "../../hooks/useToast";
import { Products } from "../../types/products";

interface Props {
  products: Array<Products>;
}

interface Features {
  hasFreeShipping: boolean;
  shippingDiscount: number;
  discount: number;
}

export default function ProductList({ products }: Props) {
  const { favoriteProduct } = useProducts();
  const [features, setFeatures] = useState<Features>();
  const { genericToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const favoriteAction = async ({target}: any) => {
	const { id } = target;
	console.log(target);
    // try {
    //   await favoriteProduct(Number(id));
    //   genericToast({
    //     type: "success",
    //     message: "produto adicionado aos favoritos com sucesso.",
    //   });
    // } catch (e: any) {
    //   console.log(e);
    //   genericToast({ type: "error", message: e.message });
    // }
  };
  return (
    <Stack
      p="10px"
      w="95%"
      bgColor="transparent"
      m="15px auto"
      position="relative"
      fontFamily="'Silkscreen', cursive"
    >
      <Flex w="100%" flexWrap='wrap'>
        {products.map((item, index) => (
          <Stack
            w="230px"
            h="400px"
            bgColor="white"
            boxShadow="0px 0px 5px 0px rgba(0, 0, 0, 0.3)"
            cursor="pointer"
            position="relative"
            key={index}
			direction='column'
			alignItems='center'
          >
            <Text
              position="absolute"
              bottom="10px"
              right="10px"
              color="black"
              fontSize="22px"
              fontWeight="bold"
			  id={item.id.toString()}
              onClick={favoriteAction}
              zIndex={99}
            >
              {item.favorite && <IoIosHeart />}
              {!item.favorite && <IoIosHeartEmpty />}
            </Text>
            <Box
              w="95%"
              h="50%"
              m="auto"
              bgColor="grey"
              onClick={() => {
                navigate(`/product/${item.id}`);
              }}
            >
              <Image
                w="100%"
                h="100%"
                src={item.image}
                alt="Fail do charge the image"
              />
            </Box>
            <Box w="95%" margin="5px auto" bgColor="transparent">
              <Box fontSize="17px" fontWeight="bold">
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
              <Box fontSize="17px" fontWeight="bold">
                {item.name}
              </Box>
              <Box fontSize="17px" fontWeight="bold">
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
          </Stack>
        ))}
      </Flex>
    </Stack>
  );
}
