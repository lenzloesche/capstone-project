import styled from "styled-components";

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: lightgrey;
  background-image: url("jumpwoman.jpg");
  background-repeat: repeat;
  background-position: center top;
  margin-bottom: 70px;
  opacity: 1;
  min-height: 100vh;
`;

export default function StrengthContainer({children}) {
  return <Container1>{children}</Container1>;
}
