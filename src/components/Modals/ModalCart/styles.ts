import styled from "styled-components";

interface Props{
    isName?: boolean,
    elements?: number
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

export const ContainerModal = styled.div<Props>`
    height: 200px;
    width: 300px;
    ${({elements}) => (elements && elements >= 2) ? `overflow-y: scroll;` : ``}
    background-color: transparent;
    position: relative;
    font-family: 'Permanent Marker', cursive;
`;

export const RowProductInformation = styled.div`
    box-sizing: border-box;
    width: 100%px;
    display: flex;
    background-color: transparent;
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
    ${({isName}) => isName 
    ? `font-size: 17px; font-weight: bold;` 
    : `font-size: 15px;`}
`;

export const FinishPurchaseBlock = styled.div`
    box-sizing: border-box;
    font-family: 'Silkscreen', cursive;
    width: 100%;
    height: 50px;
    p{
        font-size: 15px;
        span{
            font-weight: bold;
        }
    }
`;

export const FinishPurchaseButton = styled.button`
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    padding: 6px;
    margin: 10px 0px 10px 0px;
    cursor: pointer;
    &:hover{
        background-color: lightgreen;
    }
`;

export const Empty = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;