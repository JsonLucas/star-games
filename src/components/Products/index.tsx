import { IProducts } from "../../types/products";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../../api/services/products";
import { useEffect, useState } from "react";
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { 
    Container, 
    FavoriteIcon, 
    ImageSection, 
    ProductBox, 
    ProductInformations, 
    RowInformation, 
    RowSection 
} from "./styles";
import Loading from "../Loading";

export default function Products() {
    const [data, setData] = useState<Array<IProducts>>([]);
    const [load, setLoad] = useState<boolean>(true);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                const { data } = await getProducts();
                if(location.pathname === '/'){
                    const formatData = data.sort((a: any, b: any) => { return a-b; });
                    setData(formatData.slice(0, 5));
                }else{
                    setData(data);
                }
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
                            {/*<FavoriteIcon>
                                <IoIosHeartEmpty />
                            </FavoriteIcon>*/}
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
                </RowSection>
            }
        </Container>
    );
}