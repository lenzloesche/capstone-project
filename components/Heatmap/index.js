import styled from "styled-components";
import { uid } from "uid";
const Div = styled.div`
  background-color: white;
  border: 1px solid black;
  height: 20px;
  width: 20px;
  margin: 1px;
`;

const RedDiv = styled.div`
  background-color: red;
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
const date = new Date();
const heatmap = [];
const lengthOfHeatmap = 140;

for (let day = 0; day < lengthOfHeatmap; day++) {
  const dayInMilliseconds = day * 24 * 60 * 60 * 1000;
  heatmap.unshift(new Date(date - dayInMilliseconds));
}

export default function Heatmap({ data }) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - lengthOfHeatmap);
  const lastXDays = data?.filter((date) => date.date >= startDate);
  return (
    <>
      <SmallContainer>
        <ContainerDiv>
          {heatmap.map((dat) => {
            return (
              <div key={uid()}>
                {lastXDays.some(
                  (lastDay) =>
                    dat.toDateString() === lastDay.date.toDateString()
                ) ? (
                  <RedDiv>{dat.getDate()}</RedDiv>
                ) : (
                  <Div>{dat.getDate()}</Div>
                )}
              </div>
            );
          })}
        </ContainerDiv>

        <RightAlignText>-Today-</RightAlignText>
      </SmallContainer>
    </>
  );
}
