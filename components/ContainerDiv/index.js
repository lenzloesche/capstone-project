import styled from "styled-components";
const ContainerDiv = styled.div`
  display: grid;
  justify-content: center;
  grid-template-rows: repeat(7, 1fr);
  grid-auto-flow: column;
  border: 5px solid grey;
  border-radius: 10px;
  margin: 16px;
  width: fit-content;
  box-shadow: 0px 0px 10px black;
`;

export default ContainerDiv;
