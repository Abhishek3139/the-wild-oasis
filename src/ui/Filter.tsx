/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

interface PropType {
  filterField: string;
  options: { label: string; value: string }[];

}
const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

interface FilterButtonProps {
  active?: boolean;
}

const FilterButton = styled.button<FilterButtonProps>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;


export default function Filter({ filterField, options }: PropType) {
  const [searchParmas, setSearchParams] = useSearchParams();

  const currentFilter = searchParmas.get(filterField) || options[0].value;
  const handleClick = (value: string) => {
    searchParmas.set(filterField, value);
    if (searchParmas.get("page")) searchParmas.set("page", "1");
    setSearchParams(searchParmas);
  };
  return (
    <StyledFilter>
      {options.map((option) => {
        return (
          <FilterButton
            key={option.value}
            onClick={() => handleClick(option.value)}
            active={option.value === currentFilter}
            disabled={option.value === currentFilter}
          >
            {option.label}
          </FilterButton>
        );
      })}
    </StyledFilter>
  );
}
