import FormContainer from "../FormContainer";
import PointOnGraph from "../GraphComponents/PointOnGraph";
import {uid} from "uid";
import GraphChart from "../GraphComponents/GraphChart";
import GraphParagraph from "../GraphComponents/GraphParagraph";
import {useState, useEffect} from "react";
import GraphDate from "../GraphComponents/GraphDate";
import GraphBorders from "../GraphComponents/GraphBorders";

export default function Graph({data, graphIsVisible}) {
  const [timer, setTimer] = useState(0.0);

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
  let checkTimer = timer <= 0 ? 0 : timer;
  checkTimer = checkTimer >= 55 ? 55 : checkTimer;

  const dayInMilliseconds = checkTimer * 24 * 60 * 60 * 1000;
  const date = new Date(dateSelected - dayInMilliseconds);
  const graph = [];
  const lengthOfGraph = 21;

  for (let day = 0; day < lengthOfGraph; day++) {
    const dayInMilliseconds = day * 24 * 60 * 60 * 1000;
    graph.unshift(new Date(date - dayInMilliseconds));
  }

  const newGraph = graph.map((eachEntry) => {
    const foundDate = selectedData.find((eachData) => {
      return eachEntry.toDateString() === eachData.date.toDateString();
    });
    if (foundDate === undefined) {
      return {date: eachEntry};
    } else {
      return foundDate;
    }
  });

  if (data.length === 0) {
    return <FormContainer></FormContainer>;
  }
  if (!graphIsVisible) return <FormContainer></FormContainer>;
  const offset = 176;
  const stretchFactor = 10;
  //const xValue = checkTimer - Math.round(checkTimer);
  const xValue = 0;
  const leftOffset = 46;
  return (
    <FormContainer>
      <GraphBorders left="0px" />
      <GraphBorders left="250px" />

      <GraphChart>
        {newGraph.map((eachEntry, index) => {
          if (eachEntry.kiloms != undefined) {
            const furthestAnyoneCanRunInOneDay = 320;
            const newkiloms =
              eachEntry.kiloms > furthestAnyoneCanRunInOneDay
                ? furthestAnyoneCanRunInOneDay
                : eachEntry.kiloms;
            const eachKilom = offset - Number(newkiloms) / 2;
            return (
              <div key={uid()}>
                <PointOnGraph
                  left={(index + xValue) * stretchFactor + leftOffset}
                  bottom={eachKilom}
                  color="green"
                ></PointOnGraph>
                {eachEntry.date.getDay() === 0 ? (
                  <GraphDate
                    left={(index + xValue) * stretchFactor + leftOffset}
                  >
                    {eachEntry.date.getMonth() +
                      1 +
                      "/" +
                      eachEntry.date.getDate()}
                  </GraphDate>
                ) : (
                  ""
                )}
              </div>
            );
          } else {
            return (
              <div key={uid()}>
                <PointOnGraph
                  key={uid()}
                  left={(index + xValue) * stretchFactor + leftOffset}
                  color="grey"
                  bottom={offset}
                ></PointOnGraph>
                {eachEntry.date.getDay() === 0 ? (
                  <GraphDate
                    left={(index + xValue) * stretchFactor + leftOffset}
                  >
                    {eachEntry.date.getMonth() +
                      1 +
                      "/" +
                      eachEntry.date.getDate()}
                  </GraphDate>
                ) : (
                  ""
                )}
              </div>
            );
          }
        })}
        <GraphParagraph>____________________________</GraphParagraph>
      </GraphChart>
    </FormContainer>
  );
}
