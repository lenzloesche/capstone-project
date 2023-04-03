import Div from "../Div";
import React from "react";

export default function CalendarColoredDiv({
  dat,
  heatmapPosition,
  lastXDays,
  dateSelected,
  heatmap,
}) {
  const isSelected =
    dateSelected.toDateString() === dat.toDateString() ? true : false;

  const allEntries = lastXDays.filter(
    (lastDay) =>
      heatmap[heatmapPosition].toDateString() === lastDay.date.toDateString()
  );
  if (allEntries.length === 0) {
    return (
      <Div color="#a3b6e6" isItSelected={isSelected}>
        {dat.getMonth() + 1 + "/" + dat.getDate()}
      </Div>
    );
  }

  const filterRunning = allEntries.find((entry) => {
    return entry.sportSelected === "running";
  });
  const filterStrength = allEntries.find((entry) => {
    return entry.sportSelected === "strength";
  });

  if (filterRunning && filterStrength) {
    return (
      <Div color="#d93f45" isItSelected={isSelected}>
        {dat.getMonth() + 1 + "/" + dat.getDate()}
      </Div>
    );
  }
  if (filterRunning) {
    return (
      <Div color="#f89348" isItSelected={isSelected}>
        {dat.getMonth() + 1 + "/" + dat.getDate()}
      </Div>
    );
  }
  if (filterStrength) {
    return (
      <Div color="#d96a3f" isItSelected={isSelected}>
        {dat.getMonth() + 1 + "/" + dat.getDate()}
      </Div>
    );
  }

  return (
    <Div color="#a3b6e6" isItSelected={isSelected}>
      {dat.getMonth() + 1 + "/" + dat.getDate()}
    </Div>
  );
}
