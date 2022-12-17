import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import { ThreeDots } from "react-loader-spinner";
import { IAddress, ICards } from "../../types/users";
import { ProductCartData } from "../../types/products";
import {
  getAddresses,
  getPayMethod,
  purchase,
} from "../../api/services/purchases";
import Loading from "../Loading";
import dayjs from "dayjs";
import { Box, Text, Image, Button, Input, Select } from "@chakra-ui/react";
import { useToast } from "../../hooks/useToast";

export default function ReviewPurchaseData() {
  const { genericToast } = useToast();
  const [load, setLoad] = useState<boolean>(false);
  const [loadCard, setLoadCard] = useState<boolean>(false);
  const [cards, setCards] = useState<Array<ICards>>([]);
  const [addresses, setAddresses] = useState<Array<IAddress>>([]);
  const [cart, setCart] = useState<Array<ProductCartData>>([]);
  const [selectCard, setSelectCard] = useState<string>("");
  const [selectAddress, setSelectAddress] = useState<string>("");
  const [scorePoints, setScorePoints] = useState<number>(0);
  const [payMethod, setPayMethod] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const navigate = useNavigate();
  const formatDate = (date: Date) => {
    return dayjs(date).format("MM-YY");
  };
  const formatCartInformation = (data: Array<ProductCartData>) => {
    let ids = [];
    for (let i = 0; i < data.length; i++) {
      ids.push({
        productId: data[i].id,
        stock: data[i].updatedStock - data[i].quantity,
      });
    }
    return ids;
  };
  const confirmPurchase = async () => {
    try {
      let body;
      payMethod === "card"
        ? (body = {
            products: formatCartInformation(cart),
            cardId: selectCard,
            addressId: selectAddress,
            scorePoints,
            payMethod,
          })
        : (body = {
            products: formatCartInformation(cart),
            addressId: selectAddress,
            scorePoints,
            payMethod,
          });
      if (selectCard !== "" || selectAddress !== "") {
        setLoad(false);
        await purchase(body);
        genericToast({
          message: "compra concluída com sucesso.",
          type: "success",
        });
        //localStorage.removeItem('cart');
        //navigate('/');
      } else {
        genericToast({
          message: "Selecione uma das opções de cartão e endereço",
          type: "warning",
        });
      }
    } catch (e: any) {
      console.log(e);
      genericToast({ message: e.message, type: "error" });
      navigate("/");
    }
    setLoad(true);
  };
  useEffect(() => {
    function calculatePoints(prices: Array<ProductCartData>) {
      let aux = 0;
      for (let i = 0; i < prices.length; i++) {
        aux += Math.ceil(prices[i].price * 0.15);
      }
      return aux + 10;
    }
    (async () => {
      try {
        const cartData = localStorage.getItem("star-games-cart");
        if (cartData) {
          const cart = JSON.parse(cartData);
          setCart(cart);
          setScorePoints(calculatePoints(cart));
          const addresses = await getAddresses();
          setAddresses(addresses);
          setLoad(true);
        } else {
          genericToast({ message: "carrinho vazio", type: "warning" });
          navigate("/");
        }
      } catch (e: any) {
        console.log(e);
        genericToast({ message: e.message, type: "error" });
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const cards = await getPayMethod();
        setCards(cards);
        setLoadCard(true);
      } catch (e: any) {
        console.log(e);
        genericToast({ message: e.message, type: "error" });
      }
    })();
  }, [payMethod]);
  useEffect(() => {
    if (payMethod === "card") {
      if (selectAddress !== "" && selectCard !== "") {
        setDisabled(false);
      }
    } else {
      if (selectAddress !== "") {
        setDisabled(false);
      }
    }
  }, [selectAddress, selectCard]);
  return (
    <Box
      position="absolute"
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="100vw"
      h="100vh"
      color="black"
      fontFamily="'DynaPuff', cursive"
    >
      {!load && <Loading />}
      {load && (
        <>
          <Box
            p="10px"
            w="90%"
            h="75%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              h="95%"
              w="45%"
              display="flex"
              flexDir="column"
              justifyContent="space-around"
            >
              <Box>
                <Text>Dados de pagamento</Text>
                Selecione o método:{" "}
                <Select onChange={({ target }) => setPayMethod(target.value)}>
                  <option value="">--Selecione--</option>
                  <option value="card">Cartão</option>
                  <option value="fetlock">Boleto</option>
                </Select>
              </Box>
              {payMethod === "fetlock" && (
                <Box
                  w="100%"
                  h="45%"
                  overflowY={cards && cards.length >= 2 ? `scroll` : "hidden"}
                >
                  Código de barras do boleto:
                  {`${faker.finance.creditCardNumber()}${faker.finance.creditCardNumber()}`}
                </Box>
              )}
              {payMethod === "card" && (
                <>
                  {!loadCard && <ThreeDots />}
                  {loadCard && (
                    <Box
                      w="100%"
                      h="45%"
                      overflowY={
                        cards && cards.length >= 2 ? `scroll` : "hidden"
                      }
                    >
                      {cards.map((item, index) => (
                        <Box w="100%" display="flex" mb="10px" key={index}>
                          <Input
                            type="radio"
                            value={item.id}
                            onChange={({ target }) =>
                              setSelectCard(target.value)
                            }
                          />
                          <Box ml="10px">
                            <Box p="2px">
                              nome: <Text fontWeight="bold">{item.name}</Text>
                            </Box>
                            <Box p="2px">
                              número:{" "}
                              <Text fontWeight="bold">{item.number}</Text>
                            </Box>
                            <Box p="2px">
                              cvv: <Text fontWeight="bold">{item.cvv}</Text>
                            </Box>
                            <Box p="2px">
                              validade:{" "}
                              <Text fontWeight="bold">
                                {formatDate(item.expirationDate)}
                              </Text>
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  )}
                </>
              )}
              <Box
                w="100%"
                h="45%"
                overflowY={cards && cards.length >= 2 ? `scroll` : "hidden"}
              >
                <Text>Dados de endereço de entrega</Text>
                {addresses.map((item, index) => (
                  <Box w="100%" display="flex" mb="10px" key={index}>
                    <Input
                      type="radio"
                      value={item.id}
                      onChange={({ target }) => setSelectAddress(target.value)}
                    />
                    <Box ml="10px">
                      <Box p="2px">
                        Endereço:{" "}
                        <Text fontWeight="bold">
                          {item.street} - {item.number} - {item.neighborhood}
                        </Text>
                      </Box>
                      <Box p="2px">
                        CEP: <Text fontWeight="bold">{item.cep}</Text>
                      </Box>
                      <Box p="2px">
                        Cidade - Estado:{" "}
                        <Text fontWeight="bold">
                          {item.city}-{item.state}
                        </Text>
                      </Box>
                      {item.complement !== "" && (
                        <Box p="2px">
                          Complemento:{" "}
                          <Text fontWeight="bold">{item.complement}</Text>
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              h="95%"
              w="45%"
              display="flex"
              flexDir="column"
              justifyContent="space-around"
            >
              <Box
                w="100%"
                h="55%"
                overflowY={cards && cards.length >= 2 ? `scroll` : "hidden"}
              >
                {cart.map((item, index) => (
                  <Box
                    padding="10px"
                    w="100%"
                    h="95%"
                    display="flex"
                    mb="10px"
                    key={index}
                  >
                    <Box h="100%" w="200px">
                      <Image
                        h="100%"
                        w="100%"
                        src={item.image}
                        alt="Imagem não carregada"
                      />
                    </Box>
                    <Box ml="10px" w="100%" display="flex" flexDir="column">
                      <Box pb="5px" fontSize="14px">
                        {item.name}
                      </Box>
                      <Box pb="5px" fontSize="14px">
                        {item.description}
                      </Box>
                      <Box pb="5px" fontSize="19px">
                        R$ {item.price}
                      </Box>
                      <Box pb="5px" fontSize="19px">
                        x{item.quantity}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box w="100%" h="35%">
                <Box>
                  <Box>
                    Você ganhará <Text>{scorePoints}</Text> pontos com essa
                    compra!!
                  </Box>
                  🥳
                </Box>
                <Box
                  w="200px"
                  h="70px"
                  mt="10px"
                  display="flex"
                  flexDir="column"
                  justifyContent="space-around"
                >
                  <Button
                    border="1px solid rgba(0,0,0,0.4)"
                    p="6px"
                    cursor="pointer"
                    _hover={{ bgColor: "lightgreen" }}
                    onClick={confirmPurchase}
                    disabled={disabled}
                  >
                    {!load && <ThreeDots height={20} width={20} />}
                    {load && <>Fechar pedido</>}
                  </Button>
                  <Input
                    border="1px solid rgba(0,0,0,0.4)"
                    p="6px"
                    cursor="pointer"
                    _hover={{ bgColor: "lightgreen" }}
                    type="button"
                    value="Continuar comprando."
                    onClick={() => navigate("/")}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
