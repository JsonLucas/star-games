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
import Loading from "../Loading";
import { Empty } from "./styles";
import { IProducts } from "../../types/products";
import { getProductById } from "../../api/services/products";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState, Fragment } from "react";
import 'react-toastify/dist/ReactToastify.css';

export default function HistoryList() {
    const [data, setData] = useState<Array<IProducts>>([]);
    const [load, setLoad] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        async function getProducts(productsIds: Array<any>) {
            let prods = [];
            for(let i = 0; i < productsIds.length; i++){
                const { data } = await getProductById(productsIds[i].productId);
                prods.push(data);
            }
            return prods;
        }
        (async () => {
            try {
                const auth = localStorage.getItem('token');
                if (auth) {
                    const headers = { headers: { authorization: JSON.parse(auth) } };
                    const { data } = await getHistory(headers);
                    setData(await getProducts(data));
                    setLoad(true);
                } else {
                    const logar = confirm('não autorizado. Deseja fazer login?');
                    if (logar) navigate('/login');
                    else navigate('/')
                }
            } catch (e: any) {
                console.log(e);
                toast(e.message);
                setTimeout(() => navigate('/'), 3000);
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
                        <ProductBox key={index}>
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
                                </RowInformation>
                            </ProductInformations>
                        </ProductBox>
                    )}
                </Fragment>}
                <ToastContainer />
            </RowSection>
            }
        </Container>
    );
}
