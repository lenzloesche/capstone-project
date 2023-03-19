import styled from "styled-components";

const StyledInput = styled.input`
  font-size: 18px;
  border: 1px solid lightgrey;
`;

export default function Input({ id, type, value, onChange, required }) {
  return (
    <StyledInput
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
    ></StyledInput>
  );
}
