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
    border:6px solid grey;
    background-color:#d96a3f;
    border-radius:10px;
  }
  .small-border{
    border:2px solid grey;
    background-color:#A3B6E6;
    border-radius:10px;
  }
  .light-border{
    border:1px solid grey;
  }
  .big-text{
    font-weight: bold;
    padding:10px;
    margin:0;
    width:200px;
  }
`;
