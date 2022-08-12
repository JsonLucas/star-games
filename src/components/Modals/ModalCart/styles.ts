import styled from "styled-components";

interface Props{
    isName?: boolean
};

export const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
};

export const RowProductInformation = styled.div`
    box-sizing: border-box;
    width: 400px;
    display: flex;
    background-color: aqua;
    margin-bottom: 10px;
`;

export const BoxImage = styled.div`
    box-sizing: border-box;
    width: 85px;
    height: 90px;
    img {
        width: 100%;
        height: 100%;
    }
`;

export const BoxProductInfo = styled.div`
    box-sizing: border-box;
    margin-left: 10px;
`;

export const ProductInfo = styled.p<Props>`
    box-sizing: border-box;
    ${({isName}) => isName ? `font-size: 20px; font-weight: bold;` : `font-size: 16px;`}
`;