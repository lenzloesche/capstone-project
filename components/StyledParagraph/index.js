import styled from "styled-components";

const StyledParagraph = styled.p`
  padding: 0;
  margin: 0;
  color: ${(props) => (props.isError ? "red" : "black")};
  font-size: 12px;
  padding-left: 20px;
  padding-right: 20px;
`;
export default StyledParagraph;
