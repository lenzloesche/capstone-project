import FormContainer from "../FormContainer";
import PointOnGraph from "../GraphComponents/PointOnGraph";
import {uid} from "uid";
import GraphChart from "../GraphComponents/GraphChart";

const date = new Date();
const graph = [];
const lengthOfGraph = 21;

for (let day = 0; day < lengthOfGraph; day++) {
  const dayInMilliseconds = day * 24 * 60 * 60 * 1000;
  graph.unshift(new Date(date - dayInMilliseconds));
}

export default function Graph({data}) {
  let selectedData = null;
  if (data) {
    selectedData = data
      ?.filter((dat) => dat.sportSelected === "running")
      .slice();
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
            const eachKilom = 260 - Number(eachEntry.kiloms) / 3;
            console.log("eachEntry.kiloms", eachEntry.kiloms, eachKilom);

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
