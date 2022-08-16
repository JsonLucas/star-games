import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Silkscreen&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=DynaPuff&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    a:active, a:visited, a:link{
        text-decoration: none;
    }
    .active-field: {
        outline-style: solid;
        outline-width: 3px;
        outline-color: green;
    }
`;

export default GlobalStyle;