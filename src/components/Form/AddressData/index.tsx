import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { addAddressData } from "../../../api/services/purchases";
import { getCityByCep } from "../../../api/services/users";
import { useAddress } from "../../../hooks/useAddress";
import { useToast } from "../../../hooks/useToast";
import { Box, Text, Button } from "@chakra-ui/react";
import { Field } from "../../Field";
import { RowField } from "../../RowField";
import { ContainerCardForm } from "../../ContainerCardForm";

export default function AddressDataForm() {
  const { addresses } = useAddress();
  const { register, handleSubmit } = useForm();
  const { genericToast } = useToast();
  const [cep, setCep] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadCep, setLoadCep] = useState<boolean>(false);
  const navigate = useNavigate();
  const getCity = async () => {
    setLoadCep(true);
    try {
      const { data } = await getCityByCep(cep);
      const { localidade, uf } = data;
      setCity(localidade);
      setState(uf);
      setLoadCep(false);
    } catch (e: any) {
      console.log(e);
      genericToast({ message: e.message, type: "error" });
    }
  };

  const addressData = async (data: any) => {
    const completeData = { ...data, cep, city, state };
    setLoading(true);
    try {
      await addAddressData(completeData);
      genericToast({ message: "endereço cadastrado.", type: "success" });
      navigate("/purchase/finish");
    } catch (e: any) {
      console.log(e);
      genericToast({ message: e.message, type: "error" });
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <ContainerCardForm>
      <Box
        p="10px"
        w="500px"
        h="400px"
        bgColor="black"
        borderRadius="5px"
        position="relative"
      >
        <RowField>
          <Field
            type="text"
            register={register}
            name="street"
            placeholder="Rua. . ."
            disabled={loading}
          />
          <Box>
            <Field
              type="number"
              name="number"
              register={register}
              placeholder="Número"
              disabled={loading}
            />
          </Box>
        </RowField>
        <RowField>
          <Field
            type="text"
            name="neighborhood"
            register={register}
            placeholder="Bairro. . ."
            disabled={loading}
          />
        </RowField>
        <RowField>
          <RowField>
            <input
              type="number"
              value={cep}
              min={0}
              onChange={({ target }) => setCep(target.value)}
              placeholder="Cep. . ."
              disabled={loadCep}
              onBlur={() => getCity()}
            />
          </RowField>
          <RowField>
            <Field
              type="text"
              register={register}
              name="city"
              value={city}
              placeholder="Cidade. . ."
              disabled={loadCep}
            />
          </RowField>
          <RowField>
            <Field
              type="text"
              name="state"
              register={register}
              value={state}
              placeholder="Estado. . ."
              disabled
            />
          </RowField>
        </RowField>
        <RowField>
          <Field
            type="text"
            name="complement"
            register={register}
            placeholder="Complemento. . ."
            disabled={loading}
          />
        </RowField>
        <RowField>
          <Button
            onClick={handleSubmit(addressData)}
            disabled={loading}
            mt="10px"
            w="30%"
			p='5px'
            cursor="pointer"
          >
            Avançar
          </Button>
        </RowField>
        <Box
          onClick={() => navigate(-1)}
          p="5px"
          w="80px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          position="absolute"
          left="5px"
          color="white"
          fontWeight="bold"
          fontSize="17px"
          cursor="pointer"
        >
          <IoIosArrowBack /> Voltar
        </Box>
      </Box>
    </ContainerCardForm>
  );
}
