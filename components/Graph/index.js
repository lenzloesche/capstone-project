import FormContainer from "../FormContainer";
import PointOnGraph from "../GraphComponents/PointOnGraph";
import {uid} from "uid";
import GraphChart from "../GraphComponents/GraphChart";
import GraphParagraph from "../GraphComponents/GraphParagraph";

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
  const offset = 270;
  return (
    <FormContainer>
      <GraphChart>
        {newGraph.map((eachEntry, index) => {
          if (eachEntry != undefined) {
            if (eachEntry.kiloms > 300) {
              eachEntry.kiloms = 300;
            }
            const eachKilom = offset - Number(eachEntry.kiloms) / 2;

            return (
              <PointOnGraph
                key={uid()}
                left={index * 10 + 100}
                bottom={eachKilom}
                color="green"
              ></PointOnGraph>
            );
          } else {
            return (
              <PointOnGraph
                key={uid()}
                left={index * 10 + 100}
                color="grey"
                bottom={offset}
              ></PointOnGraph>
            );
          }
        })}
        <GraphParagraph>
          ____________________________
          <br />3 weeks
        </GraphParagraph>
      </GraphChart>
    </FormContainer>
  );
}
