import styled from "styled-components";
const DivHelper = styled.div`
  background-color: ${(props) =>
    props.color ? props.color : "var(--background-color)"};
  height: 30px;
  width: 30px;
  margin: 0;
  font-size: 10px;
  color: grey;
  :hover {
    cursor: pointer;
    background-color: black;
    color: white;
    font-size: 14px;
  }
`;
const DivHelperSelected = styled.div`
  background-color: ${(props) =>
    props.color ? props.color : "var(--background-color)"};
  border: 4px solid black;
  height: 30px;
  width: 30px;
  margin: 0;
  font-size: 10px;
  color: grey;
  :hover {
    cursor: pointer;
    background-color: black;
    color: white;
    color: white;
    font-size: 14px;
  }
`;

export default function Div({color, isItSelected, children}) {
  if (isItSelected) {
    return <DivHelperSelected color={color}>{children}</DivHelperSelected>;
  }
  return <DivHelper color={color}>{children}</DivHelper>;
}
