import styled from "styled-components";

//attrs is used to not generate too many css classes and keep it inline
const PointOnGraph = styled.div.attrs((props) => ({
  style: {
    left: `${props.left}px`,
    top: `${props.bottom}px`,
  },
}))`
  width: 12px;
  height: 12px;
  background-color: ${(props) => props.color};
  position: absolute;
  border-radius: 6px;
  ${(props) => (props.color === "grey" ? "" : " border: 1px solid black;")}
`;

export default PointOnGraph;
