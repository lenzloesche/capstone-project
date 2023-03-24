import styled from "styled-components";

const StyledNavigationLink = styled.a`
  color: black;
  border: 1px solid black;
  box-shadow: 0 0 5px black;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  font-size: 24px;
  text-decoration: none;
  background-color: ${(props) =>
    props.selected ? "hsla(223, 57%, 77%, 1)" : "#d96a3f"};
  :hover {
    color: white;
    background-color: black;
  }
`;

export default function NavigationLink({ children, href, selected }) {
  return (
    <StyledNavigationLink selected={selected} href={href}>
      {children}
    </StyledNavigationLink>
  );
}
