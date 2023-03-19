import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: system-ui;
    font-size:18px;
  }
  .border{
    border:4px solid black;
    background-color:#A3B6E6;
  }
  .small-border{
    border:1px solid black;
    background-color:#A3B6E6;
  }
  .light-border{
    border:1px solid grey;
  }
`;
