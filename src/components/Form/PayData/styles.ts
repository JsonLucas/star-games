import styled from "styled-components";

interface Props{
    fieldType?: string
}

export const Container = styled.main`
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SectionPayForm = styled.section`
    box-sizing: border-box;
    padding: 10px;
    width: 500px;
    height: 400px;
    background-color: black;
	border-radius: 5px;
    position: relative;
`;

export const RowField = styled.div<Props>`
    box-sizing: border-box;
    display: flex;
    ${({fieldType}) => fieldType === 'button' 
    ? `margin-top: 10px; width: 30%; cursor: pointer;` 
    : `${fieldType === 'cvv' 
        ? 'width: 30%;' 
        : 'width: 100%;'}
    `}
    input{
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
        border: none;
		${({fieldType}) => fieldType === 'name' 
		? 'border-radius: 5px 5px 0px 0px;' 
		: `${fieldType === 'expirationDate' ? 'border-radius: 0px 0px 5px 5px;' : ''}`}
		&:focus{
			outline: none;
		}
    }
    button{
        border: none;
        padding: 10px;
        width: 100%;
        border-radius: 10px;
    }
`;