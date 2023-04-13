import styled from "styled-components";

const Header = styled.header`
  background-color: var(--background-color);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 58px;
  padding-left: 14px;
  justify-content: space-between;
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;
export default Header;
