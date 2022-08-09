import styled from 'styled-components';

export const Container = styled.main`
    box-sizing: border-box;
    padding: 10px;
    width: 92%;
    background-color: transparent;
    margin: 15px auto;
    position: relative;
`; 

export const RowSection = styled.div`
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
`;

export const ProductBox = styled.div`
    box-sizing: border-box;
    width: 230px;
    height: 400px;
    background-color: white;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
    cursor: pointer;
`;

export const ImageSection = styled.div`
    box-sizing: border-box;
    width: 95%;
    height: 50%;
    margin: auto;
    background-color: grey;
    img {
        height: 100%;
        width: 100%;
    }
`;

export const ProductInformations = styled.div`
    box-sizing: border-box;
    width: 95%;
    margin: 5px auto;
    background-color: transparent;
`;

export const RowInformation = styled.p`
    box-sizing: border-box;
    font-size: 17px;
    font-weight: bold;
`;