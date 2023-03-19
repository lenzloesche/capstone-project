import styled from "styled-components";

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightgrey;
`;

export default function StrengthContainer({ children }) {
  return <Container1>{children}</Container1>;
}
