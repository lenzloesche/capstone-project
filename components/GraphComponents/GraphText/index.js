import styled from "styled-components";
const GraphText = styled.button`
position relative;
top:10px;
left:0px;
display: flex;
flex-direction: column;
align-items: center;
width: 300px;
border-radius: 10px;
margin: 0;
background: hsla(223, 57%, 77%, 0.75);
background-color:var(--button-color2);

font-size:20px;
:hover{cursor:pointer;
background-color:black;
color:white;
}
`;

export default GraphText;
