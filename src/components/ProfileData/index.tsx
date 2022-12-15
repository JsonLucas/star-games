import AddressDataForm from "../Form/AddressData";
import {
  Container,
  InternalContainer,
  NothingToShow,
  PreviousRegisteredData,
  RegisteredData,
  RegisterNewData,
  RowAlternateButtons,
} from "./styles";
import { useEffect, useState } from "react";
import PayDataForm from "../Form/PayData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IAddress, ICards } from "../../types/users";
import { getPayMethod, getAddresses } from "../../api/services/purchases";
import {
  RowData,
  RowPaymentData,
  WrapperPaymentData,
} from "../ReviewPurchaseData/styles";
import dayjs from "dayjs";
import { Box, Button, Text, Input } from "@chakra-ui/react";

export default function ProfileData() {
  const [option, setOption] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [cards, setCards] = useState<Array<ICards>>([]);
  const [addresses, setAddresses] = useState<Array<IAddress>>([]);
  const navigate = useNavigate();
  const alternateOption = ({ target }: any) => {
    if (target.value === "Endereço") {
      setOption("address");
    } else if (target.value === "Pagamento") {
      setOption("payment");
    }
  };
  const formatDate = (date: Date) => {
    return dayjs(date).format("MM-YY");
  };
  return (
    <Box
      position="absolute"
      w="100%"
      h="82%"
      display="flex"
      bgColor="transparent"
      fontFamily="'DynaPuff', cursive"
    >
      <Box
        w="95%"
        h="100%"
        m="auto"
        display="flex"
        justifyContent="space-between"
        bgColor="transparent"
        position="relative"
      >
        <Box
          w="40%"
          bgColor="transparent"
          display="flex"
          flexDir="column"
          justifyContent="space-around"
        >
          <Box
            w="100%"
            h="47%"
            bgColor="transparent"
            overflowY={cards.length >= 2 ? "scroll" : "hidden"}
          >
            <Text>Dados financeiros</Text>
            {cards.map((item, index) => (
              <Box w="100%" display="flex" mb="10px" key={index}>
                <Box ml="10px">
                  <Box p="2px">
                    nome: <Text fontWeight="bold">{item.name}</Text>
                  </Box>
                  <Box p="2px">
                    número: <Text fontWeight="bold">{item.number}</Text>
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
          <Box
            w="100%"
            h="47%"
            bgColor="transparent"
            overflowY={cards.length >= 2 ? "scroll" : "hidden"}
          >
            <Text>Dados de entrega</Text>
            {addresses.map((item, index) => (
              <Box w="100%" display="flex" mb="10px" key={index}>
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
        <Box w="55%" h="100%" bgColor="transparent" position="relative">
          <Box p="5px" w="100%" position="absolute" zIndex={1}>
            <Box
              m="auto"
              w="160px"
              display="flex"
              justifyContent="space-between"
            >
              <Input
                type="button"
                value="Endereço"
                onClick={alternateOption}
                p="5px"
                border="1px solid rgba(0, 0, 0, 0.3)"
                borderRadius="7px"
                cursor="pointer"
              />
              <Input
                type="button"
                value="Pagamento"
                onClick={alternateOption}
                p="5px"
                border="1px solid rgba(0, 0, 0, 0.3)"
                borderRadius="7px"
                cursor="pointer"
              />
            </Box>
          </Box>
          {option === "" && (
            <Box
              w="100%"
              h="100%"
              position="absolute"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <h3>Faz alguma coisa aí 😑</h3>
            </Box>
          )}
          {option === "address" && <AddressDataForm />}
          {option === "payment" && <PayDataForm />}
        </Box>
      </Box>
    </Box>
  );
}
