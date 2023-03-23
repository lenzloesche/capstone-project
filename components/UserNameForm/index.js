import FormContainer from "../FormContainer";
import Form from "../Form";
import Input from "../Input";
import Label from "../Label";
import { useState } from "react";
import StyledButton from "../StyledButton";

export default function UserNameForm({ userName, setUserName }) {
  const [userInput, setUserInput] = useState("");
  const [showForm, setShowForm] = useState(false);
  function handleUserNameSubmit(event) {
    event.preventDefault();
    setUserName(userInput);
    setShowForm(!showForm);
  }
  return (
    <>
      <FormContainer>
        <StyledButton onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Change User Name"}
        </StyledButton>
        {!showForm ? <p>User Name: {userName}</p> : ""}
        {showForm ? (
          <Form
            onSubmit={(event) => {
              handleUserNameSubmit(event);
            }}
          >
            <Label htmlFor={userName}>
              Type in User Name:
              <Input
                type="text"
                id={userName}
                value={userInput}
                onChange={(event) => setUserInput(event.target.value)}
              ></Input>
            </Label>
          </Form>
        ) : (
          ""
        )}
      </FormContainer>
    </>
  );
}
