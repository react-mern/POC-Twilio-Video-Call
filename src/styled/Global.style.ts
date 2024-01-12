import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    html {
        height: 100%;
      }
    
      body {
        font-family: Helvetica, Arial, sans-serif;
        color: #333e5a;
        min-height: 100%;
      }
`;

export default GlobalStyle;