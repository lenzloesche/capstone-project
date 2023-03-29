import styled from "styled-components";

const GraphDate = styled.p.attrs((props) => ({
  style: {
    left: `${props.left}px`,
  },
}))`
  top: 170px;
  position: absolute;
`;

export default GraphDate;
