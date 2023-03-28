import FormContainer from "../FormContainer";
import PointOnGraph from "../GraphComponents/PointOnGraph";
import {uid} from "uid";
import GraphChart from "../GraphComponents/GraphChart";
import GraphParagraph from "../GraphComponents/GraphParagraph";
import {useState, useEffect} from "react";

export default function Graph({data}) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer >= 70) {
          return -20;
        } else {
          return prevTimer + 1;
        }
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  let selectedData = null;
  if (data) {
    selectedData = data
      ?.filter((dat) => dat.sportSelected === "running")
      .slice();
  }

  const dateSelected = new Date();
  let checkTimer = timer < 0 ? 0 : timer;
  checkTimer = checkTimer > 55 ? 55 : checkTimer;

  const dayInMilliseconds = checkTimer * 24 * 60 * 60 * 1000;
  const date = new Date(dateSelected - dayInMilliseconds);
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

  if (data.length === 0) {
    return;
  }
  const offset = 270;
  return (
    <FormContainer>
      <GraphChart>
        {newGraph.map((eachEntry, index) => {
          if (eachEntry != undefined) {
            const newkiloms = eachEntry.kiloms > 300 ? 300 : eachEntry.kiloms;
            const eachKilom = offset - Number(newkiloms) / 2;
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
        <GraphParagraph>____________________________</GraphParagraph>
      </GraphChart>
    </FormContainer>
  );
}
