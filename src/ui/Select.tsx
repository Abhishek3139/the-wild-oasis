import styled from "styled-components";
interface PropsType {
  options?: { label: string; value: string }[];
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void;
  type: string;
}

const StyledSelect = styled.select<PropsType>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;
function Select({ options, value, onChange, ...props }: PropsType) {
  console.log(options);
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}
export default Select;
