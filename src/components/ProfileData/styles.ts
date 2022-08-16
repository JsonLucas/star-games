import styled from "styled-components";

interface Props{
    elements?: number
}

export const Container = styled.main`
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 82%;
    display: flex;
    background-color: transparent;
    font-family: 'DynaPuff', cursive;
`;

export const InternalContainer = styled.section`
    box-sizing: border-box;
    width: 95%;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    position: relative;
`;

export const PreviousRegisteredData = styled.div`
    box-sizing: border-box;
    width: 40%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

export const RegisteredData = styled.div<Props>`
    box-sizing: border-box;
    width: 100%;
    height: 47%;
    background-color: transparent;
    ${({elements}) => ((elements) && (elements >= 2)) 
    ? `overflow-y: scroll;` 
    : ``
    }
`;

export const RegisterNewData = styled.section`
    box-sizing: border-box;
    width: 55%;
    height: 100%;
    background-color: transparent;
    position: relative;
`;

export const RowAlternateButtons = styled.div`
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
    position: absolute;
    z-index: 1;
    div{
        margin: auto;
        width: 160px;
        display: flex;
        justify-content: space-between;
        input{
            padding: 5px;
            border: 1px solid rgba(0, 0, 0, 0.3);
            border-radius: 7px;
            cursor: pointer;
        }
    }
`;

export const NothingToShow = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`;