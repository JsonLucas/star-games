import { IProducts, ProductCartData } from "../../types/products";
import { IoIosArrowBack } from "react-icons/io";
import { getProductById } from "../../api/services/products";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { Box, Text, Image, Input, Button } from "@chakra-ui/react";
import Loading from "../Loading";

export default function SingleProduct() {
  const { genericToast } = useToast();
  const [product, setProduct] = useState<IProducts>(Object);
  const [load, setLoad] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const { productId } = useParams();
  const navigate = useNavigate();
  const addToCart = (product: ProductCartData) => {
    try {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const auxCart = JSON.parse(cart);
        localStorage.setItem("star-games-cart", JSON.stringify([...auxCart, product]));
      } else {
        localStorage.setItem("star-games-cart", JSON.stringify([product]));
      }
      genericToast({
        message: "produto adicionado com sucesso ao carrinho",
        type: "success",
      });
    } catch (e: any) {
      console.log(e);
      genericToast({
        message: "falha ao adicionar produto ao carrinho",
        type: "error",
      });
    }
  };
//   useEffect(() => {
//     (async () => {
//       try {
//         if (productId) {
//           const data = await getProductById(Number(productId));
//           setProduct(data);
//         } else {
//           toast("invalid param.");
//           navigate("/");
//         }
//       } catch (e: any) {
//         console.log(e);
//         toast(e.message);
//       }
//       setLoad(false);
//     })();
//   }, []);
  return (
    <Box
      w="100%"
      h="82vh"
      position="absolute"
      display="flex"
      fontFamily="'Permanent Marker', cursive"
    >
      {load && <Loading />}
      {!load && (
        <Box w="90%" m="10px auto">
          <Box
            w="100%"
            display="flex"
            justifyContent="space-around"
            position="relative"
          >
            <Box p="5px" w="30%">
              <Image h="100%" w="100%" src={product.image} />
            </Box>
            <Box p="5px" w="31%" display="flex" flexDir="column">
              <Text fontSize="20px" fontWeight="bold">
                {product.name}
              </Text>
              <Text fontSize="20px" fontWeight="bold">
                {product.description}
              </Text>
              <Text fontSize="23px">R$ {product.price}</Text>
              <Text fontSize="15px">Frete: R$ {product.shipping}</Text>
              <Box w="200px">
                Quantidade:
                <Input
                  p="3px"
                  border="1px solid rgba(0, 0, 0, 0.7)"
                  w="100%"
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  placeholder="Quantidade"
                  onChange={({ target }) => setQuantity(parseInt(target.value))}
                />
              </Box>
              <Box w="100%" mt="25px">
                <Box w="100%">
                  <Button
                    p="10px"
                    w="100%"
                    border="none"
                    borderRadius="5px"
                    m="auto auto 8px"
                    type="button"
                    onClick={() => {
                      /* função de adicionar aos favoritos */
                    }}
                  >
                    Adicionar aos favoritos.
                  </Button>
                </Box>
                <Box w="100%">
                  <Button
                    p="10px"
                    w="100%"
                    border="none"
                    borderRadius="5px"
                    m="auto auto 8px"
                    type="button"
                    onClick={() => {
                      addToCart({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price + product.shipping,
                        image: product.image,
                        updatedStock: product.stock - quantity,
                        quantity,
                      });
                    }}
                  >
                    Adicionar ao carrinho
                  </Button>
                </Box>
                <Box w="100%">
                  <Button
                    p="10px"
                    w="100%"
                    border="none"
                    borderRadius="5px"
                    m="auto auto 8px"
                    value="Comprar"
                    type="button"
                    onClick={() => {
                      addToCart({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price + product.shipping,
                        image: product.image,
                        quantity,
                        updatedStock: product.stock - quantity,
                      });
                      navigate("/purchase/address");
                    }}
                  >
                    Comprar
                  </Button>
                </Box>
              </Box>
              <Text p="5px" fontSize="15px">
                Em estoque ({product.stock} restantes)
              </Text>
              <ToastContainer />
            </Box>
            <Box
              position="absolute"
              top="105%"
              left="0px"
              border="1px solid lightgrey"
              p="10px"
              fontWeight="bold"
              cursor="pointer"
              onClick={() => navigate(-1)}
            >
              <IoIosArrowBack /> Voltar
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
