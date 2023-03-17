import styled from "styled-components";
import { uid } from "uid";
const Div = styled.div`
  background-color: white;
  border: 1px solid black;
  height: 20px;
  width: 20px;
  margin: 1px;
`;

const ContainerDiv = styled.div`
  display: grid;
  justify-content: center;
  grid-template-rows: repeat(7, 1fr);
  grid-auto-flow: column;
`;

const RightAlignText = styled.p`
  text-align: right;
`;

const SmallContainer = styled.div`
  width: 240px;
`;

const heatmap = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
export default function Heatmap({ data }) {
  return (
    <>
      <SmallContainer>
        <ContainerDiv>
          {heatmap.map((dat, index) => {
            return (
              <div key={uid()}>
                <Div className="red">{index}</Div>
              </div>
            );
          })}
        </ContainerDiv>

        <RightAlignText>-Today-</RightAlignText>
      </SmallContainer>
    </>
  );
}
