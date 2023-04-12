import UserNameForm from ".";
import {screen, render, fireEvent, waitFor} from "@testing-library/react";

test("on click change user name an inpiut field appears.", async () => {
  render(
    <UserNameForm userName="TestName" handleUserNameFormSubmit={() => {}} />
  );
  const userName = screen.getByText(/TestName/i);
  expect(userName).toBeInTheDocument();
  const changeUserNameButton = screen.getByRole("button", {name: /change/i});
  expect(changeUserNameButton).toBeInTheDocument();

  fireEvent.click(changeUserNameButton);
  await waitFor(() => {
    const inputField = screen.getByRole("textbox");
    expect(inputField).toBeInTheDocument;
  });
});
