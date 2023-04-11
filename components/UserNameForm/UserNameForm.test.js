import UserNameForm from ".";
import {screen, render, fireEvent, act} from "@testing-library/react";

test("on click change user name an inpiut field appears.", async () => {
  render(
    <UserNameForm userName="TestName" handleUserNameFormSubmit={() => {}} />
  );
  const changeUserNameButton = screen.getByRole("button", {name: /change/i});
  expect(changeUserNameButton).toBeInTheDocument();
  await act(async () => {
    await fireEvent.click(changeUserNameButton);
  });
  const inputField = screen.getByRole("textbox");
  expect(inputField).toBeInTheDocument;
});
