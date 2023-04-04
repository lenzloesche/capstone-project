import Div from "../Div";
import React from "react";

const calendarColors = {
  color0: "#a3b6e6",
  color1: "#d93f45",
  color2: "#f89348",
  color3: "#d96a3f",
};

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
      <Div color={calendarColors.color0} isItSelected={isSelected}>
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
      <Div color={calendarColors.color1} isItSelected={isSelected}>
        {dat.getMonth() + 1 + "/" + dat.getDate()}
      </Div>
    );
  }
  if (filterRunning) {
    return (
      <Div color={calendarColors.color2} isItSelected={isSelected}>
        {dat.getMonth() + 1 + "/" + dat.getDate()}
      </Div>
    );
  }
  if (filterStrength) {
    return (
      <Div color={calendarColors.color3} isItSelected={isSelected}>
        {dat.getMonth() + 1 + "/" + dat.getDate()}
      </Div>
    );
  }

  return (
    <Div color={calendarColors.color0} isItSelected={isSelected}>
      {dat.getMonth() + 1 + "/" + dat.getDate()}
    </Div>
  );
}
