import styled from "styled-components";

interface IProps{
    isFocused?: boolean | null,
    isButton?: boolean
    signUpCard?: boolean
}

export const Container = styled.div`
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CardForm = styled.form<IProps>`
    box-sizing: border-box;
    box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.5);
    ${({signUpCard}) => signUpCard ? 'padding-top: 10px; padding-bottom: 10px;' : 'height: 350px;' }
    width: 350px;
    background-color: aqua;
    position: relative;
`;

export const WrapperFields = styled.div`
    box-sizing: border-box;
    margin-top: 50px;
    width: 100%;
`;

export const RowField = styled.div<IProps>`
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({isButton}) => isButton ? 'transparent' : 'white'};
    width: 95%;
    margin: auto;
    margin-bottom: 10px;
`;

export const Field = styled.input`
    box-sizing: border-box;
    padding: 8px;
    width: 90%;
    border: none;
    border-radius: 5px;
    &:focus {
        outline: 0;
    }
`;

export const BoxFieldIcon = styled.p`
    box-sizing: border-box;
    padding: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    font-weight: bold;
    font-size: 20px;
`;

export const SubmitButton = styled.button`
    box-sizing: border-box;
    padding: 9px;
    width: 100%;
    border: none;
    border-radius: 5px;
    margin: auto;
    background-color: darkblue;
    color: white;
`;

export const BackButton = styled.p<IProps>`
    box-sizing: border-box;
    padding: 5px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    ${({signUpCard}) => signUpCard ? 'top: 10px;' : 'bottom: 10px;'}
    left: 5px;
    color: white;
    font-weight: bold;
    font-size: 17px;
    cursor: pointer;
`;