import styled from "styled-components";

interface IProps {
    dataType?: string;
}

export const Container = styled.main`
    box-sizing: border-box;
    width: 90%;
    margin: 10px auto;
`;

export const RowProductInformations = styled.section`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-around;
    position: relative;
`;

export const ProductImageBox = styled.div`
    box-sizing: border-box;
    padding: 5px;
    width: 30%;
    img{
        width: 100%;
        height: 100%;
    }
`;

export const ProductDataBox = styled.div`
    box-sizing: border-box;
    padding: 5px;
    width: 31%;
    display: flex;
    flex-direction: column;
`;

export const RowData = styled.p<IProps>`
    box-sizing: border-box;
    padding: 2px;
    ${({dataType}) => (dataType === 'description' || dataType === 'name') 
    ? `font-size: 20px; font-weight: bold;`
    : `${dataType === 'price' ? 'font-size: 23px;' : 'font-size: 15px;' }` 
    }
`;

export const AddCartSection = styled.div`
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
    margin-top: 20px;
    div{
        margin: auto;
        width: 90%;
    }
`;

export const ActionButtons = styled.input`
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    border: none;
    border-radius: 5px;
    margin: auto;
    margin-bottom: 5px;
`;

export const BackButton = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 105%;
    left: 0px;
    border: 1px solid lightgrey;
    padding: 10px;
    font-weight: bold;
    cursor: pointer;
`;