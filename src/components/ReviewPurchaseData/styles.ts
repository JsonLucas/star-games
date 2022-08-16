import styled from "styled-components";

interface Props{
    type?: string,
    elements?: number
}

export const Container = styled.main`
    box-sizing: border-box;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    color: black;
    font-family: 'DynaPuff', cursive;
`;

export const InternalContainer = styled.section`
    box-sizing: border-box;
    padding: 10px;
    width: 90%;
    height: 75%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SectionUserData = styled.section`
    box-sizing: border-box;
    height: 95%;
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

export const UserPaymentData = styled.div<Props>`
    box-sizing: border-box;
    width: 100%;
    height:45%;
    ${({elements}) => ((elements) && (elements >= 2)) 
    ? `overflow-y: scroll;` 
    : ``
    }
`;

export const RowPaymentData = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    margin-bottom: 10px;
`;

export const WrapperPaymentData = styled.div`
    box-sizing: border-box;
    margin-left: 10px;
`;

export const RowData = styled.p`
    box-sizing: border-box;
    padding: 2px;
    span{
        font-weight: bold;
    }
`;

export const UserAddressData = styled.div<Props>`
    box-sizing: border-box;
    width: 100%;
    height:45%;
    ${({elements}) => ((elements) && (elements >= 2)) 
    ? `overflow-y: scroll;` 
    : ``
    }
`;

export const SectionCartData = styled.section`
    box-sizing: border-box;
    height: 95%;
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

export const CartDataReview = styled.div<Props>`
    box-sizing: border-box;
    width: 100%;
    height:55%;
    ${({elements}) => ((elements) && (elements >= 2)) 
    ? `overflow-y: scroll;` 
    : ``
    }
`;

export const WrapperCartData = styled.div`
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 95%;
    display: flex;
    margin-bottom: 10px;
    div{
        height: 100%;
        width: 200px;
        img{
            width: 100%;
            height: 100%;
        }
    }
`;

export const RowCartData = styled.div`
    box-sizing: border-box;
    margin-left: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const RowCartInformation = styled.p<Props>`
    box-sizing: border-box;
    padding-bottom: 5px; 
    ${({type}) => type === 'numeric' 
    ? `font-size: 14px;` 
    : `font-size: 19px;`
    }
`;

export const SectionReward = styled.div`
    box-sizing: border-box;
    width: 100%;
    height:35%;
`;

export const RowActionButtons = styled.div`
    box-sizing: border-box;
    width: 200px;
    height: 70px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    button, input{
        border: 1px solid rgba(0,0,0,0.4);
        padding: 6px;
    }
`;

export const FetlockCode = styled.div``;