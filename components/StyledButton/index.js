import styled from "styled-components";

const StyledButton1 = styled.button`
  height: 30px;
  width: fit-content;
  border: 1px solid black;
  border-radius: 5px;
  background-color: var(--button-color);
  font-size: 18px;
  margin: 10px;
  :hover {
    cursor: pointer;
    background-color: black;
    color: white;
  }
`;

export default function StyledButton({children, onClick, type}) {
  return (
    <StyledButton1 onClick={onClick} type={type}>
      {children}
    </StyledButton1>
  );
}
