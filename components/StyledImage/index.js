import styled from "styled-components";
import Image from "next/image";

// this helper function is only necessary because the isitselected prop would be sent to the dom without the helper function and react would give a warning because of it.
const StyledImageHelper = ({
  className,
  onClick,
  src,
  alt,
  width,
  height,
  priority,
}) => {
  return (
    <Image
      className={className}
      onClick={onClick}
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
    />
  );
};

const StyledImage = styled(StyledImageHelper)`
display: flex;
align-items: center;
justify-content: center;
  :hover {
    
    ${(props) => (props.isitselected ? "" : "background-color: grey;")}
    
      color:white;

        `;

export default StyledImage;
