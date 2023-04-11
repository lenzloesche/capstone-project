import styled from "styled-components";

const StyledSelect = styled.select`
  background-color: var(--background-color);
  font-size: 18px;
  border-radius: 10px;
  border: 1px solid grey;
  padding: 8px;
  width: 200px;
  position: relative;
  :hover {
    cursor: pointer;
  }
`;
export default StyledSelect;
