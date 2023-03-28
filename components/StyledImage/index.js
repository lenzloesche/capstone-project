import styled from "styled-components";
import Image from "next/image";

// this helper function is only necessary because the isitselected prop would be sent to the dom without the helper function and react would give a warning because of it.
const StyledImageHelper = ({className, onClick, src, alt, width, height}) => {
  return (
    <Image
      className={className}
      onClick={onClick}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

const StyledImage = styled(StyledImageHelper)`
  :hover {
    
    ${(props) => (props.isitselected ? "" : "background-color: grey;")}
    
      color:white;

        `;

export default StyledImage;
