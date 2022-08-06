import styled from 'styled-components';

interface IProps {
    isFocused: boolean | null
}

export const Container = styled.header`
    width: 100%;
    height: 100px;
    background-color: black;
`;

export const RowTop = styled.div`
    width: 100%;
    box-sizing: border-box;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    position: relative;
`;

export const BoxField = styled.div<IProps>`
    box-sizing: border-box;
    width: 450px;
    display: flex;
    justify-content: space-around;
    background-color: white;
    align-items: center;
    border-radius: 5px;
    ${({isFocused}) => isFocused ? `
    outline-style: solid;
    outline-width: 3px;
    outline-color: green;
    ` 
    : ``}
`;

export const SearchField = styled.input`
    box-sizing: border-box;
    padding: 8px;
    width: 90%;
    border: none;
    border-radius: 5px;
    &:focus{
        outline: 0;
    }
`;

export const RowBottom = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 50%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const RowLinks = styled.nav`
    box-sizing: border-box;
    height: 75%;
    width: 650px;
    display: flex;
    justify-content: space-between;
`;

export const NavbarLink = styled.p`
    box-sizing: border-box;
    text-align: center;
    padding: 5px;
    display: flex;
    align-items: center;
    color: red;
    &:hover{
        cursor: pointer;
        color: green;
    }
`;

export const SignUser = styled.div`
    box-sizing: border-box;
    position: absolute;
    right: 20px;
    top: 20px;
    display: flex;
    width: 90px;
    justify-content: space-around;
    background-color: transparent;
    cursor: pointer;
`;

export const SignUserButtons = styled.p`
    box-sizing: border-box;
    color: white;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
`;

export const UserWelcome = styled.p`
    box-sizing: border-box;
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 18px;
    color: white;
    span {
        font-size: 20px;
        font-weight: bold;
    }
`;