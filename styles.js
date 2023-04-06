import {createGlobalStyle} from "styled-components";

export default createGlobalStyle`
:root{
   --button-color: #E05E51;
  --background-color:#a3b6e6;
}
  *,
  *::before,
  *::after {
    box-sizing: border-box;    
  }

  @font-face {
    font-family: 'Roboto';
    src: url('/fonts/Roboto/Roboto-Regular.ttf') format('truetype');
  }

  body {
    margin: 0;
    font-family: system-ui;
    font-size:18px;    
    font-family: 'Roboto', sans-serif;
  }
  
`;
