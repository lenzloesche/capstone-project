import Home from "../pages/";
import {screen, render} from "@testing-library/react";

test("the user name is displayed", () => {
  render(<Home userName="TestName" />);
  const userName = screen.getByText(/TestName/i);
  expect(userName).toBeInTheDocument();
});

test("there is attribution on the page", () => {
  render(<Home userName="TestName" />);
  const attribution = screen.getByText(/attribution/i);
  expect(attribution).toBeInTheDocument();
});
