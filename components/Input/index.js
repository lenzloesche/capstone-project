import styled from "styled-components";

const StyledInput = styled.input`
width:200px;
  font-size: 18px;
  border: 1px solid black;
  border-radius: 8px;
  margin: 5px;
  background: hsla(226, 79%, 91%, 0.9);
  padding 5px;
`;

export default function Input({id, type, value, onChange, required}) {
  return (
    <StyledInput
      id={id}
      type={type}
      min={type === "number" ? "0" : ""}
      max={type === "number" ? "1440" : ""}
      maxLength={type === "number" ? "" : "30"}
      value={value}
      onChange={onChange}
      required={required}
    ></StyledInput>
  );
}
