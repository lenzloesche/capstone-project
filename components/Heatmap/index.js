import styled from "styled-components";
import { uid } from "uid";
const Div = styled.div`
  background-color: red;
  height: 20px;
  width: 20px;
`;

export default function Heatmap({ data }) {
  return (
    <>
      {data.map((dat) => {
        return <Div key={uid()} class="red"></Div>;
      })}
    </>
  );
}
