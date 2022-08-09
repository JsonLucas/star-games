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
    justify-content: space-between;
    position: relative;
`;

export const ProductImageBox = styled.div`
    box-sizing: border-box;
    padding: 5px;
    width: 30%;
    background-color: darkred;
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
    width: 30%;
    background-color: darkred;
`;

export const ActionButtons = styled.input`
    box-sizing: border-box;
    padding: 10px;
    width: 80%;
    border: none;
    border-radius: 5px;
    margin: auto;
    margin-bottom: 5px;
`;

export const BackButton = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 105%;
    border: 1px solid lightgrey;
    padding: 10px;
    font-weight: bold;
    cursor: pointer;
`;