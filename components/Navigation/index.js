import styled from "styled-components";
import NavigationLink from "../NavigationLink";

const StyledNavigation = styled.footer`
  background-color: #a3b6e6;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-top: 1px solid black;
   position fixed;
  bottom: 0;
  left: 0;
`;
const StyledList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  width: 100%;
`;

export default function Navigation({ selected, children }) {
  return (
    <>
      <StyledNavigation>
        {" "}
        {children}
        <StyledList>
          <li>
            <NavigationLink
              selected={selected === "strength" ? true : false}
              href="/strength"
            >
              Strength
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
