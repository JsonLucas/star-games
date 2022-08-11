import { getHistory } from "../../api/services/purchases";
import { useNavigate } from "react-router-dom";
import {
    Container,
    ImageSection,
    ProductBox,
    ProductInformations,
    RowInformation,
    RowSection
} from "../Products/styles";
import { useEffect, useState, Fragment } from "react";
import Loading from "../Loading";
import { Empty } from "./styles";
import { IPurchases } from "../../types/purchases";

export default function HistoryList() {
    const [data, setData] = useState<Array<IPurchases>>([]); //ajustar
    const [load, setLoad] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                const auth = localStorage.getItem('token');
                if (auth) {
                    const headers = { headers: { authorization: JSON.parse(auth) } };
                    const { data } = await getHistory(headers);
                    setData(data);
                    setLoad(true);
                } else {
                    const logar = confirm('não autorizado. Deseja fazer login?');
                    if (logar) navigate('/login');
                    else navigate('/')
                }
            } catch (e: any) {
                console.log(e);
                alert(e.message);
                navigate('/');
            }
        })();
    }, []);
    return (
        <Container>
            {!load && <Loading />}
            {load && <RowSection>
                {data.length === 0 && <Empty><p>Nenhuma compra foi feita ainda.</p></Empty>}
                {data.length !== 0 && <Fragment>
                    {data.map((item, index) =>
                        <ProductBox key={index} onClick={() => { navigate(`/product/${item._id}`) }}>
                            <ImageSection>
                                <img src={item.productData.image} alt='Fail do charge the image' />
                            </ImageSection>
                            <ProductInformations>
                                <RowInformation>
                                    R$ {item.productData.price}
                                </RowInformation>
                                <RowInformation>
                                    {item.productData.name}
                                </RowInformation>
                                <RowInformation>
                                    R$ {item.productData.shipping}
                                </RowInformation>
                            </ProductInformations>
                        </ProductBox>
                    )}
                </Fragment>}
            </RowSection>
            }
        </Container>
    );
}