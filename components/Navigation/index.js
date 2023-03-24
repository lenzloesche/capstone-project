import styled from "styled-components";
import NavigationLink from "../NavigationLink";

const StyledNavigation = styled.footer`
  background-color: #a3b6e6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-top: 1px solid black;
   position fixed;
  bottom: 0;
  left: 0;
  width:100%;
`;
const StyledList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
`;

export default function Navigation({selected, children, userName}) {
  return (
    <>
      <StyledNavigation>
        {children}
        <StyledList>
          <li>
            <NavigationLink
              selected={selected === "index" ? true : false}
              href="/"
            >
              {"User: " + userName}
            </NavigationLink>
          </li>
          {" - "}
          <li>
            <NavigationLink
              selected={selected === "exerciseSearch" ? true : false}
              href="/exerciseSearch"
            >
              Exercises
            </NavigationLink>
          </li>
          {" - "}
          <li>
            <NavigationLink
              selected={selected === "calendar" ? true : false}
              href="/calendar"
            >
              Calendar
            </NavigationLink>
          </li>
        </StyledList>
      </StyledNavigation>
    </>
  );
}
