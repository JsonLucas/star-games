import { useNavigate } from "react-router-dom";
import {
  Container,
  ImageSection,
  ProductBox,
  ProductInformations,
  RowInformation,
  RowSection,
} from "../Products/styles";
import Loading from "../Loading";
import { IProducts } from "../../types/products";
import { getProductById } from "../../api/services/products";
import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { Box, Image, Text } from "@chakra-ui/react";

export default function HistoryList() {
  const { historyList } = useProducts();
  const navigate = useNavigate();
  return (
    <Box p='10px' w='92%' bgColor='transparent' m='15px auto' position='relative' fontFamily="'Silkscreen', cursive">
      {historyList.isLoading && <Loading />}
      {historyList.data && (
        <>
          {historyList.data.length === 0 && (
            <Box
              position="absolute"
              w="100%"
              h="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text>Nenhuma compra foi feita ainda.</Text>
            </Box>
          )}
          {historyList.data.length !== 0 && (
            <>
              {historyList.data.map((item: any, index: any) => (
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
                >
                  <Box w="95%" h="50%" m="auto" bgColor="grey">
                    <Image w='100%' h='100%' src={item.image} alt="Fail do charge the image" />
                  </Box>
                  <Box w="95%" m="5px auto" bgColor="transparent">
                    <Text fontSize="17px" fontWeight="bold">
                      R$ {item.price}
                    </Text>
                    <Text fontSize="17px" fontWeight="bold">
                      {item.name}
                    </Text>
                    <Text fontSize="17px" fontWeight="bold">
                      R$ {item.shipping}
                    </Text>
                  </Box>
                </Box>
              ))}
            </>
          )}
        </>
      )}
    </Box>
  );
}
