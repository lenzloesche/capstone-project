import FormContainer from "../FormContainer";
import Form from "../Form";
import Input from "../Input";
import Label from "../Label";
import { useState, useEffect } from "react";
import StyledButton from "../StyledButton";

export default function UserNameForm({
  userName,
  handleUserNameFormSubmit,
  children,
}) {
  const [userInput, setUserInput] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (userName === undefined) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [userName]);

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
              handleUserNameFormSubmit(event, userInput);
            }}
          >
            <Label htmlFor={userName}>
              Type in User Name And Press Return:
            </Label>
            <Input
              type="text"
              id={userName}
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
            ></Input>
          </Form>
        ) : (
          ""
        )}
        {children}
      </FormContainer>
    </>
  );
}
