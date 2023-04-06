import styled from "styled-components";

const StyledParagraphNormal = styled.p`
  padding: 0;
  margin: 0;
  font-size: 18px;
  padding: 5px;
  ${(props) => (props.bigText ? "font-weight: bold; width:200px;" : "")}
`;
export default StyledParagraphNormal;
