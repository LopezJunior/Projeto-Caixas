import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    body {
        background-color: #fff
    }
    
    html, body, #root {
        height: 50mm;    
    }
    /* @media print {
    html, body {
        width: 80mm;
        height: 50mm;        
    }
    .pagina {
        height: 50mm;
        margin: 0;
        border: initial;
        border-radius: initial;
        width: initial;
        min-height: initial;
        box-shadow: initial;
        background: initial;
        page-break-after: always;
    }} */
`;
