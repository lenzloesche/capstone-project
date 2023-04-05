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
import Image from "next/image";
import NavigationLink from "../components/NavigationLink";
import StyledParagraph from "../components/StyledParagraph";

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
const maxValues = {
  calories: 900,
  fat: 100,
  protein: 75,
  sodium: 38000,
  potassium: 2500,
  cholesterol: 1000,
  carbohydrates: 100,
  fiber: 40,
  sugar: 100,
};

export default function Diet({userName}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(showResultsStart);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = await fetchDiet(searchInput);
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
  }
  function handleDetailClick(index) {
    const newShowResults = showResults.slice();
    newShowResults[index] = !newShowResults[index];
    setShowResults(newShowResults);
  }
  if (userName === "DontRender") {
    return (
      <>
        <StrengthContainer>
          <Header>
            <Heading>Fitness App</Heading>
          </Header>
          <NavigationLink selected={false} href="/">
            {"Change User "}
          </NavigationLink>
        </StrengthContainer>
      </>
    );
  }
  return (
    <>
      <main>
        <StrengthContainer>
          <Header>
            <Heading>Fitness App</Heading>
          </Header>

          <FormContainer>
            <Image
              priority
              src="/food.svg"
              alt="food image of vegetables"
              width="100"
              height="100"
            ></Image>
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
              <StyledParagraph>
                try &quot;carrot&quot; or &quot;meat&quot;
              </StyledParagraph>
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
                          maxValue={maxValues.calories}
                          width={"260"}
                          height={"16"}
                          color={"21a325"}
                        ></BarGraph>

                        <StyledParagraphNormal>
                          Carbohydrates: {oneResult.carbohydrates_total_g}
                        </StyledParagraphNormal>
                        <BarGraph
                          value={oneResult.carbohydrates_total_g}
                          g
                          minValue={"0"}
                          maxValue={maxValues.carbohydrates}
                          width={"260"}
                          height={"16"}
                          color={"21a325"}
                        ></BarGraph>
                        <StyledParagraphNormal>
                          Fat Total: {oneResult.fat_total_g}g
                        </StyledParagraphNormal>
                        <BarGraph
                          value={oneResult.fat_total_g}
                          minValue={"0"}
                          maxValue={maxValues.fat}
                          width={"260"}
                          height={"16"}
                          color={"21a325"}
                        ></BarGraph>
                        <StyledParagraphNormal>
                          Fat Saturated: {oneResult.fat_saturated_g}g
                        </StyledParagraphNormal>
                        <BarGraph
                          value={oneResult.fat_saturated_g}
                          minValue={"0"}
                          maxValue={maxValues.fat}
                          width={"260"}
                          height={"16"}
                          color={"21a325"}
                        ></BarGraph>
                        <StyledParagraphNormal>
                          Protein: {oneResult.protein_g}g
                        </StyledParagraphNormal>
                        <BarGraph
                          value={oneResult.protein_g}
                          minValue={"0"}
                          maxValue={maxValues.protein}
                          width={"260"}
                          height={"16"}
                          color={"21a325"}
                        ></BarGraph>
                        <StyledParagraphNormal>
                          Sodium: {oneResult.sodium_mg}mg
                        </StyledParagraphNormal>
                        <BarGraph
                          value={oneResult.sodium_mg}
                          minValue={"0"}
                          maxValue={maxValues.sodium}
                          width={"260"}
                          height={"16"}
                          color={"21a325"}
                        ></BarGraph>
                        <StyledParagraphNormal>
                          Potassium: {oneResult.potassium_mg}mg
                        </StyledParagraphNormal>
                        <BarGraph
                          value={oneResult.potassium_mg}
                          minValue={"0"}
                          maxValue={maxValues.potassium}
                          width={"260"}
                          height={"16"}
                          color={"21a325"}
                        ></BarGraph>
                        <StyledParagraphNormal>
                          Cholesterol: {oneResult.cholesterol_mg}mg
                        </StyledParagraphNormal>
                        <BarGraph
                          value={oneResult.cholesterol_mg}
                          minValue={"0"}
                          maxValue={maxValues.cholesterol}
                          width={"260"}
                          height={"16"}
                          color={"21a325"}
                        ></BarGraph>
                        <StyledParagraphNormal>
                          Fiber: {oneResult.fiber_g}g
                        </StyledParagraphNormal>
                        <BarGraph
                          value={oneResult.fiber_g}
                          minValue={"0"}
                          maxValue={maxValues.fiber}
                          width={"260"}
                          height={"16"}
                          color={"21a325"}
                        ></BarGraph>
                        <StyledParagraphNormal>
                          Sugar: {oneResult.sugar_g}g
                        </StyledParagraphNormal>
                        <BarGraph
                          value={oneResult.sugar_g}
                          minValue={"0"}
                          maxValue={maxValues.sugar}
                          width={"260"}
                          height={"16"}
                          color={"21a325"}
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
      <Navigation selected={"diet"} userName={userName} />
    </>
  );
}
