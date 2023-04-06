import styled from "styled-components";
import Image from "next/image";

// this helper function is only necessary because the isitselected prop would be sent to the dom without the helper function and react would give a warning because of it.
const StyledImageHelper = ({
  onClick,
  src,
  alt,
  width,
  height,
  priority,
  bookmark,
  addBorder,
  addSmallBorder,
}) => {
  return (
    <Image
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

${(props) => (props.bookmark ? "position:relative; right:-120px;" : "")}
${(props) =>
  props.addBorder
    ? "border:1px solid grey; border-radius:10px; background-color:hsla(223, 57%, 77%, 1);"
    : ""}
    ${(props) =>
      props.addSmallBorder
        ? "border:1px solid grey; border-radius:10px;background-color:var(--button-color);"
        : ""}
  :hover {
    
    ${(props) => (props.isitselected ? "" : "background-color: grey;")}
    
      color:white;

        `;

export default StyledImage;
