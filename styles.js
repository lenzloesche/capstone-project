import {createGlobalStyle} from "styled-components";

export default createGlobalStyle`
:root{
  --button-color2: #d96a3f;
  --button-color: #D6694D;
  --background-color:#a3b6e6;
}
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
    background-color: var(--button-color);
    border-radius:10px;
  }
  .light-border{
    border:1px solid grey;
  }
  .big-text{
    font-weight: bold;

    margin:0;
    width:200px;
  }

.bookmark{
  position:relative;
  right:-120px;
}
.bookmark:hover{
  cursor pointer;
}

`;
