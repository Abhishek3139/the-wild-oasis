import { css, styled } from "styled-components";
interface propsType {
  type?: string;
}
const Row = styled.div<propsType>`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;
//defaultProps
Row.defaultProps = {
  type: "vertical",
};
export default Row;
