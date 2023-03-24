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
    border:1px solid grey;   
     background-color:  hsla(223, 57%, 77%, 1);
    border-radius:10px;
  }
  .small-border{     
    border:1px solid grey;   

    background-color:#d96a3f;
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
