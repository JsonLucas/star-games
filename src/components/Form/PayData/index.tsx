import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import {
  addPayMethodData,
  getPayMethod,
} from "../../../api/services/purchases";
import { Field } from "../../Field";
import { Box, Text, Button } from "@chakra-ui/react";
import { RowField } from "../../RowField";
import { useToast } from "../../../hooks/useToast";
import { ContainerCardForm } from "../../ContainerCardForm";

export default function PayDataForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const { genericToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const payData = async (data: any) => {
    setLoading(true);
    try {
      await addPayMethodData(data);
      genericToast({
        message: "cartão cadastrado com sucesso.",
        type: "success",
      });
      navigate("/purchase/address");
    } catch (e: any) {
      console.log(e);
      genericToast({ message: e.message, type: "error" });
      navigate(-1);
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
            name="name"
            register={register}
            placeholder="Nome no cartão. . ."
            disabled={loading}
          />
        </RowField>
        <RowField>
          <Field
            type="number"
            name="number"
            register={register}
            placeholder="Número"
            disabled={loading}
          />
          <RowField>
            <Field
              type="number"
              name="cvv"
              register={register}
              placeholder="CVV"
              disabled={loading}
            />
          </RowField>
        </RowField>
        <RowField>
          <Field
            type="date"
            name="expirationDate"
            register={register}
            placeholder=""
            disabled={loading}
          />
        </RowField>
        <RowField>
          <Button
            onSubmit={handleSubmit(payData)}
            disabled={loading}
            mt="10px"
            w="30%"
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
