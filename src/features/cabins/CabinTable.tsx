// import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import CabinRow from "./CabinRow";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const { isLoading, data: cabin } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const [searchParmas] = useSearchParams();
  if (isLoading) return <Spinner />;
  if (!cabin?.length) return <Empty resource={"cabins"} />;

  const filterValue = searchParmas.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabin;
  if (filterValue === "discount")
    filteredCabins = cabin?.filter((cabin) => cabin.discount > 0);

  if (filterValue === "no-discount")
    filteredCabins = cabin?.filter((cabin) => cabin.discount === 0);

  const sortBy = searchParmas.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {sortedCabins?.map(
        (cabin: {
          id: void;
          created_at: string;
          name: string;
          maxCapacity: number;
          regularPrice: number;
          discount: number;
          description: string;
          image: string;
        }) => {
          return <CabinRow key={cabin.created_at} cabin={cabin} />;
        }
      )}
    </Table>
  );
}
export default CabinTable;
