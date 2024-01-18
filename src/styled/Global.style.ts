// Import the 'createGlobalStyle' function from 'styled-components'
import { createGlobalStyle } from "styled-components";

// Define the global styles using 'createGlobalStyle'
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

// Export the GlobalStyle component for use in the application
export default GlobalStyle;
