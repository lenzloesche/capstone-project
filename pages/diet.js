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

export default function Diet({userName, setFetchingStatus}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    fetchDiet(searchInput, setFetchingStatus, setSearchResults);
  }
  console.log(searchResults);
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
        </StrengthContainer>
      </main>

      <Navigation selected={"diet"} userName={userName}></Navigation>
    </>
  );
}
