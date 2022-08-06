import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    a:active, a:visited, a:link{
        text-decoration: none;
        color: red;
    }
    .active-field: {
        outline-style: solid;
        outline-width: 3px;
        outline-color: green;
    }
`;

export default GlobalStyle;