import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: 18px;
  margin: 5px;
  padding-left: 20px;
  padding-right: 20px;
`;

export default function Label({children, htmlFor}) {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
}
