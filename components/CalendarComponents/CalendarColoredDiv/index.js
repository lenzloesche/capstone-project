import Div from "../Div";

export default function CalendarColoredDiv(
  dat,
  heatmapPosition,
  lastXDays,
  dateSelected,
  heatmap
) {
  const allEntries = lastXDays.filter(
    (lastDay) =>
      heatmap[heatmapPosition].toDateString() === lastDay.date.toDateString()
  );
  if (allEntries.length === 0) {
    if (dateSelected === dat) {
      return (
        <Div color="#a3b6e6" isItSelected>
          {dat.getMonth() + 1 + "/" + dat.getDate()}
        </Div>
      );
    }
    return (
      <Div color="#a3b6e6">{dat.getMonth() + 1 + "/" + dat.getDate()}</Div>
    );
  }

  const filterRunning = allEntries.find((entry) => {
    return entry.sportSelected === "running";
  });
  const filterStrength = allEntries.find((entry) => {
    return entry.sportSelected === "strength";
  });

  if (filterRunning && filterStrength) {
    if (dateSelected === dat) {
      return (
        <Div color="#d93f45" isItSelected>
          {dat.getMonth() + 1 + "/" + dat.getDate()}
        </Div>
      );
    }
    return (
      <Div color="#d93f45">{dat.getMonth() + 1 + "/" + dat.getDate()}</Div>
    );
  }
  if (filterRunning) {
    if (dateSelected === dat) {
      return (
        <Div color="#f89348" isItSelected>
          {dat.getMonth() + 1 + "/" + dat.getDate()}
        </Div>
      );
    }
    return (
      <Div color="#f89348">{dat.getMonth() + 1 + "/" + dat.getDate()}</Div>
    );
  }
  if (filterStrength) {
    if (dateSelected === dat) {
      return (
        <Div color="var(--button-color)" isItSelected>
          {dat.getMonth() + 1 + "/" + dat.getDate()}
        </Div>
      );
    }
    return (
      <Div color="var(--button-color)">
        {dat.getMonth() + 1 + "/" + dat.getDate()}
      </Div>
    );
  }
  if (dateSelected === dat) {
    return (
      <Div color="#a3b6e6" isItSelected>
        {dat.getMonth() + 1 + "/" + dat.getDate()}
      </Div>
    );
  }
  return <Div color="#a3b6e6">{dat.getMonth() + 1 + "/" + dat.getDate()}</Div>;
}
