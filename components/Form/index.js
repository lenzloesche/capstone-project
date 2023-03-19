import styled from "styled-components";

const StyledForm = styled.form`
  width: 100%;
  diplay: flex;
  justify-content: center;
  align-items: center;
`;

export default function Form({ onSubmit, children }) {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
}
