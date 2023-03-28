import FormContainer from "../FormContainer";
import PointOnGraph from "../GraphComponents/PointOnGraph";
import {uid} from "uid";
import GraphChart from "../GraphComponents/GraphChart";

export default function Graph({data, dateSelected}) {
  let selectedData = null;
  if (data) {
    selectedData = data
      ?.filter((dat) => dat.sportSelected === "running")
      .slice();
  }

  if (dateSelected === undefined) {
    return;
  }

  const date = dateSelected;
  const graph = [];
  const lengthOfGraph = 21;

  for (let day = 0; day < lengthOfGraph; day++) {
    const dayInMilliseconds = day * 24 * 60 * 60 * 1000;
    graph.unshift(new Date(date - dayInMilliseconds));
  }

  const newGraph = graph.map((eachEntry) => {
    return selectedData.find((eachData) => {
      return eachEntry.toDateString() === eachData.date.toDateString();
    });
  });

  if (data.length === 0) return;

  console.log(newGraph);
  return (
    <FormContainer>
      <GraphChart>
        {newGraph.map((eachEntry, index) => {
          if (eachEntry != undefined) {
            if (eachEntry.kiloms > 400) {
              eachEntry.kiloms = 400;
            }
            const eachKilom = 260 - Number(eachEntry.kiloms) / 3;

            return (
              <PointOnGraph
                key={uid()}
                left={index * 10 + 100}
                bottom={eachKilom}
              ></PointOnGraph>
            );
          } else {
            return;
          }
        })}
      </GraphChart>
    </FormContainer>
  );
}
