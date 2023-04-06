import styled from "styled-components";
import NavigationLink from "../NavigationLink";

const StyledNavigation = styled.footer`
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-top: 1px solid black;
   position fixed;
  bottom: 0;
  left:-30px;
  width:calc(100% + 30px);
`;
const StyledList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  margin: 0;
`;

export default function Navigation({selected, children, userName}) {
  return (
    <>
      <StyledNavigation>
        {children}
        <StyledList>
          <li>
            <NavigationLink
              selected={selected === "exerciseSearch"}
              href="/exerciseSearch"
            >
              Exercises
            </NavigationLink>
          </li>
          {" - "}
          <li>
            <NavigationLink selected={selected === "calendar"} href="/calendar">
              Calendar
            </NavigationLink>
          </li>
          {" - "}
          <li>
            <NavigationLink selected={selected === "diet"} href="/diet">
              Diet
            </NavigationLink>
          </li>
        </StyledList>
      </StyledNavigation>
    </>
  );
}
