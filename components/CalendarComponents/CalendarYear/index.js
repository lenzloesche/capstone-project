import styled from "styled-components";

const ClaendarYearHelper = styled.div`
  width: 200px;
  text-align: center;
  font-size: 16px;
`;

export default function CalendarYear(heatmap) {
  function getFirstYear() {
    return heatmap.heatmap[0].getFullYear();
  }
  function getLastYear() {
    return heatmap.heatmap[heatmap.heatmap.length - 1].getFullYear();
  }
  function getYears() {
    if (getFirstYear() === getLastYear()) {
      return getFirstYear();
    } else {
      return getFirstYear() + "/" + getLastYear();
    }
  }
  return <ClaendarYearHelper>{heatmap ? getYears() : ""}</ClaendarYearHelper>;
}
