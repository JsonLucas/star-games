import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../api/services/products";
import { IProducts } from "../../types/products";
import Loading from "../Loading";
import { Container, ImageSection, ProductBox, ProductInformations, RowInformation, RowSection } from "./styles";

export default function Products() {
    const [load, setLoad] = useState<boolean>(true);
    const [data, setData] = useState<Array<IProducts>>([]);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                const { data } = await getProducts();
                setData(data);
                setLoad(false);
            } catch (e: any) {
                console.log(e);
            }
        })();
    }, []);
    return (
        <Container>
            {load && <Loading />}
            {!load &&
                <RowSection>
                    {data.map((item, index) =>
                        <ProductBox key={index} onClick={() => { navigate(`/product/${item._id}`) }}>
                            <ImageSection>
                                <img src={item.image} alt='Fail do charge the image' />
                            </ImageSection>
                            <ProductInformations>
                                <RowInformation>
                                    R$ {item.price}
                                </RowInformation>
                                <RowInformation>
                                    {item.name}
                                </RowInformation>
                                <RowInformation>
                                    R$ {item.shipping}
                                </RowInformation> {/* colocar uma row pra decrição do product */}
                            </ProductInformations>
                        </ProductBox>
                    )}
                </RowSection>
            }
        </Container>
    );
}