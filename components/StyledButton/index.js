import styled from "styled-components";

const StyledButton1 = styled.button`
  height: 30px;
  width: 70px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #d96a3f;
  box-shadow: 5px 5px 5px grey;
  font-size: 18px;
  margin: 10px;
`;

export default function StyledButton({ children, onClick, type }) {
  return (
    <StyledButton1 onClick={onClick} type={type}>
      {children}
    </StyledButton1>
  );
}
