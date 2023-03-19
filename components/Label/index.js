import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: 18px;
  margin: 5px;
`;

export default function Label({ children, htmlFor }) {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
}
