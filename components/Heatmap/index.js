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
const monthLength = [30, 27, 30, 29, 30, 29, 30, 29, 30, 30, 29, 30];
const lengthOfHeatmap = 70;
export default function Heatmap({ data }) {
  const date = new Date();
  getAllVisibleData();

  function subDate(count, newDate) {
    count -= newDate.minDate;
    console.log(count);
    if (count < 0) {
      newDate.minDate = -count;
      count = 0;
    } else {
      newDate.minDate = monthLength[newDate.minMonth];
      newDate.minMonth--;
      if (newDate.minMonth === -1) {
        newDate.minMonth = 11;
        newDate.minYear--;
      }
    }
    return { count, newDate };
  }

  function getNewDate(maxYear, maxMonth, maxDate) {
    let count = lengthOfHeatmap;
    let newDate = { minYear: maxYear, minMonth: maxMonth, minDate: maxDate };
    let newObject = {};
    for (let i = 0; i < lengthOfHeatmap; i++) {
      newObject = subDate(count, newDate);
      count = newObject.count;
      newDate = newObject.newDate;
      console.log(count, maxYear, maxMonth, maxDate, newDate);
      if (count <= 0) {
        return newDate;
      }
    }
  }
  function getAllVisibleData() {
    const visibleData = [];
    const maxYear = date.getFullYear();
    const maxMonth = date.getMonth();
    const maxDate = date.getDate();
    const newDate = getNewDate(maxYear, maxMonth, maxDate);

    const minYear = newDate.minYear;
    const minMonth = newDate.minMonth;
    const minDate = newDate.minDate;
    for (let i = 0; i < data.length; i++) {
      if (data[i].year >= minYear && data[i].year <= maxYear) {
        visibleData.push(data[i]);
      }
    }
    console.log(visibleData);
  }
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
