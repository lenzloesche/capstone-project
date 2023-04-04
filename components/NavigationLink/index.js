import styled from "styled-components";

const StyledNavigationLink = styled.a`
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  font-size: 18px;
  text-decoration: none;
  display: inline-block;
  background-color: ${(props) =>
    props.selected ? "hsla(223, 57%, 77%, 1)" : "var(--button-color)"};
  :hover {
    color: white;
    background-color: black;
  }
`;

export default function NavigationLink({children, href, selected}) {
  return (
    <StyledNavigationLink selected={selected} href={href}>
      {children}
    </StyledNavigationLink>
  );
}
