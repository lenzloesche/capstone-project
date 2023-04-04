export default function CalendarYear(heatmap) {
  console.log(heatmap.heatmap[0], heatmap.heatmap[heatmap.heatmap.length - 1]);

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

  return <>{heatmap ? getYears() : ""}</>;
}
