import styled from "styled-components";
const DivHelper = styled.div`
  background-color: ${(props) => (props.color ? props.color : "#a3b6e6")};
  height: 30px;
  width: 30px;
  margin: 0;
  font-size: 12px;
  color: grey;
`;
const DivHelperSelected = styled.div`
  background-color: ${(props) => (props.color ? props.color : "#a3b6e6")};
  border: 4px solid black;
  height: 30px;
  width: 30px;
  margin: 0;
  font-size: 12px;
  color: grey;
`;

export default function Div({ color, isSelected, children }) {
  if (isSelected) {
    return <DivHelperSelected color={color}>{children}</DivHelperSelected>;
  }
  return <DivHelper color={color}>{children}</DivHelper>;
}
