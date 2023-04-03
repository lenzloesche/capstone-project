import StrengthContainer from "../components/StrengthContainer";
import Navigation from "../components/Navigation";
import Heading from "../components/Heading";
import Header from "../components/Header";
import StyledParagraphNormal from "../components/StyledParagraphNormal";
import Form from "../components/Form";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import StyledButton from "../components/StyledButton";
import {useState} from "react";
import fetchDiet from "../apiServices/fetchDiet";
import BarGraph from "../components/Diagrams/BarGraph";

const showResultsStart = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

export default function Diet({userName, setFetchingStatus}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(showResultsStart);

  function handleSubmit(event) {
    event.preventDefault();
    fetchDiet(searchInput, setFetchingStatus, setSearchResults);
  }
  console.log(searchResults, showResults);

  function handleDetailClick(index) {
    const newShowResults = showResults.slice();
    newShowResults[index] = !newShowResults[index];
    setShowResults(newShowResults);
  }

  return (
    <>
      <main>
        <StrengthContainer>
          <Header>
            <Heading>Fitness App</Heading>
          </Header>

          <FormContainer>
            <StyledParagraphNormal>Diet Search</StyledParagraphNormal>
            <Form
              onSubmit={(event) => {
                handleSubmit(event);
              }}
            >
              {" "}
              <Input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              ></Input>
              <StyledButton>Search</StyledButton>
            </Form>
          </FormContainer>
          {searchResults.length === 0
            ? "No Results"
            : searchResults.map((oneResult, index) => {
                return (
                  <FormContainer key={oneResult.name}>
                    <StyledParagraphNormal>
                      Name: {oneResult.name}
                    </StyledParagraphNormal>
                    <StyledButton
                      onClick={() => {
                        handleDetailClick(index);
                      }}
                    >
                      Toggle Details
                    </StyledButton>
                    {showResults[index] === true ? (
                      <>
                        <StyledParagraphNormal>
                          Calories: {oneResult.calories}
                        </StyledParagraphNormal>
                        <BarGraph
                          value={oneResult.calories}
                          minValue={"0"}
                          maxValue={"100"}
                          width={"100"}
                          height={"10"}
                          color={"ff0000"}
                        ></BarGraph>
                      </>
                    ) : (
                      ""
                    )}
                  </FormContainer>
                );
              })}
        </StrengthContainer>
      </main>

      <Navigation selected={"diet"} userName={userName}></Navigation>
    </>
  );
}
