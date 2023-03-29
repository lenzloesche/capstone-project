import styled from "styled-components";

const GraphBorders = styled.div`
  z-index: 5;
  top: 0;
  height: 220px;
  position: absolute;
  width: 50px;
  border-radius: 10px;
  background-color: hsla(223, 57%, 77%, 1);
  left: ${(props) => props.left};
`;
export default GraphBorders;
