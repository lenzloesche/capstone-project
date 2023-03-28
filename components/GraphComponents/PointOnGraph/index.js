import styled from "styled-components";

const PointOnGraph = styled.div`
  width: 6px;
  height: 6px;
  background-color: green;
  position: absolute;
  left: ${(props) => (props.left ? props.left : "")}px;
  top: ${(props) => (props.bottom ? props.bottom : "")}px;
`;
export default PointOnGraph;
