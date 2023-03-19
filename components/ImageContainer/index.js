import styled from "styled-components";

const StyledImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default function ImageContainer({ children }) {
  return <StyledImageContainer>{children}</StyledImageContainer>;
}
