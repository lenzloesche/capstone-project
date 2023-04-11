import StyledButton from ".";
import {screen, render, fireEvent} from "@testing-library/react";

test("this button has children", () => {
  render(<StyledButton>TestChildren</StyledButton>);
  const children = screen.getByText(/TestChildren/i);
  expect(children).toBeInTheDocument();
});

test("on click a function is called", () => {
  testFunction = jest.fn();
  render(<StyledButton onClick={testFunction}>TestButton</StyledButton>);
  const button = screen.getByText(/TestButton/i);
  fireEvent.click(button);
  expect(testFunction).toHaveBeenCalled();
});
