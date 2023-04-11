import StyledButton from ".";
import {screen, render} from "@testing-library/react";

test("this button has children", () => {
  render(<StyledButton>TestChildren</StyledButton>);
  const children = screen.getByText(/TestChildren/i);
  expect(children).toBeInTheDocument();
});
