import { css, styled } from "styled-components";
interface props {
  as: string;
}
const Heading = styled.h1<props>`
  ${(props) =>
    //as props define the element like h1 and h2
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    
  line-height:1.4;
`;

export default Heading;
