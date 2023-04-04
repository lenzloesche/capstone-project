import styled from "styled-components";

const BarGraphHelper = styled.div`
  position: relative;
  left: -1px;
  top: -1px;
  border: 1px solid black;
  height: ${(props) => {
    return props.height;
  }}px;
  width: ${(props) => {
    return props.width;
  }}px;
  background-color: #${(props) => {
      return props.color;
    }};
`;

const BarGraphBorder = styled.div`
  position: relative;
  border: 1px solid black;
  width: ${(props) => {
    return props.width;
  }}px;
  height: ${(props) => {
    return props.height;
  }}px;
`;

export default function BarGraph({
  value,
  minValue,
  maxValue,
  width,
  height,
  color,
}) {
  let innerWidth = 0;
  const newValue = maxValue < value ? maxValue : value;
  function calcluateMinMaxValue() {
    const percentage = (newValue / (maxValue - minValue)) * 100;
    innerWidth = Math.round((percentage / 100) * width);
  }
  calcluateMinMaxValue();

  return (
    <>
      <BarGraphBorder width={width} height={height}>
        <BarGraphHelper
          value={newValue}
          minValue={minValue}
          maxValue={maxValue}
          width={innerWidth}
          height={height}
          color={color}
        ></BarGraphHelper>
      </BarGraphBorder>
    </>
  );
}
