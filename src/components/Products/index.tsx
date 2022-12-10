import { useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../../api/services/products";
import { useEffect, useState } from "react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import {
  Container,
  FavoriteIcon,
  ImageSection,
  ProductBox,
  ProductInformations,
  RowInformation,
  RowSection,
} from "./styles";
import Loading from "../Loading";
import { useProducts } from "../../hooks/useProducts";

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
    <Container>
      {products.isLoading && <Loading />}
      {products.data && (
        <RowSection>
          {products.data.map((item, index) => (
            <ProductBox
              key={index}
              onClick={() => {
                navigate(`/product/${item.id}`);
              }}
            >
              <FavoriteIcon>
                <IoIosHeartEmpty />
              </FavoriteIcon>
              <ImageSection>
                <img src={item.image} alt="Fail do charge the image" />
              </ImageSection>
              <ProductInformations>
                <RowInformation>
                  {features && (
                    <>
                      {features.discount > 0 && (
                        <>R$ {item.price - item.price * features.discount}</>
                      )}
                      {features.discount === 0 && <>R$ {item.price}</>}
                    </>
                  )}
                  {!features && <>R$ {item.price}</>}
                </RowInformation>
                <RowInformation>{item.name}</RowInformation>
                <RowInformation>
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
                </RowInformation>
              </ProductInformations>
            </ProductBox>
          ))}
        </RowSection>
      )}
    </Container>
  );
}
