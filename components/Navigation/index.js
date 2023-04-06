import styled from "styled-components";
import NavigationLink from "../NavigationLink";
import StyledImage from "../StyledImage";
import StyledListItem from "../StyledListItem";

const StyledNavigation = styled.footer`
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top:2px;
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

export default function Navigation({selected, children}) {
  return (
    <>
      <StyledNavigation>
        {children}
        <StyledList>
          {"|"}
          <StyledListItem>
            <NavigationLink
              selected={selected === "exerciseSearch"}
              href="/exerciseSearch"
            >
              <StyledImage
                width="30"
                height="30"
                alt="dumbbell image exercises"
                src="/dumbbell-solid.svg"
              />
            </NavigationLink>
          </StyledListItem>
          {"|"}
          <StyledListItem>
            <NavigationLink selected={selected === "calendar"} href="/calendar">
              <StyledImage
                width="30"
                height="30"
                alt="calendar image"
                src="/calendar-solid.svg"
              />
            </NavigationLink>
          </StyledListItem>
          {"|"}
          <StyledListItem>
            <NavigationLink selected={selected === "diet"} href="/diet">
              <StyledImage
                width="30"
                height="30"
                alt="bowl food image diet"
                src="/bowl-food-solid.svg"
              />
            </NavigationLink>
          </StyledListItem>
          {"|"}
        </StyledList>
      </StyledNavigation>
    </>
  );
}
