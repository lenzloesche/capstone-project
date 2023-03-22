import styled from "styled-components";

const StyledNavigation = styled.footer`
  background-color: #a3b6e6;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex.direction: column;
  border: 1px solid black;
  margin-bottom: 20px;
  border: 5px solid grey;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
`;

export default function Navigation({ children }) {
  return <StyledNavigation>{children}</StyledNavigation>;
}
