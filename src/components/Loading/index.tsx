import { ThreeDots } from "react-loader-spinner";
import { Container } from "./style";

export default function Loading(){
    return (
        <Container>
            <ThreeDots height={40} width={40} color='red' />
        </Container>
    );
}