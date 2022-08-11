import styled from "styled-components";

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
    width: 300px;
    display: flex;
    background-color: aqua;
    margin-bottom: 10px;
`;

export const BoxImage = styled.div`
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    img {
        width: 100%;
        height: 100%;
    }
`;

export const BoxProductInfo = styled.div`
    box-sizing: border-box;
    margin-left: 10px;
`;