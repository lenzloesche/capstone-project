import styled from "styled-components";
import Image from "next/image";
const StyledImage = styled(Image)`
  :hover {
    
    ${(props) => (props.isSelected ? "" : "background-color: grey;")}
    
      color:white;

        `;

export default StyledImage;
