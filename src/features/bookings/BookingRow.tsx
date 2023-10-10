import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
// import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { booking } from "./bookingModal";
// import { booking } from "./bookingModal";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking }) {
  console.log(booking);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statusToTagName: any = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      {booking.map((booking: booking) => {
        return (
          <TableRow>
            <Cabin>{booking.cabins.name}</Cabin>

            <Stacked>
              <span>{booking.guests.fullName}</span>
              <span>{booking.guests.email}</span>
            </Stacked>

            <Stacked>
              <span>
                {isToday(new Date(booking.startDate))
                  ? "Today"
                  : formatDistanceFromNow(booking.startDate)}{" "}
                &rarr; {booking.numNights} night stay
              </span>
              <span>
                {format(new Date(booking.startDate), "MMM dd yyyy")} &mdash;{" "}
                {format(new Date(booking.endDate), "MMM dd yyyy")}
              </span>
            </Stacked>

            <Tag type={statusToTagName[booking.status]}>
              {booking.status.replace("-", " ")}
            </Tag>

            <Amount>{formatCurrency(booking.totalPrice)}</Amount>
          </TableRow>
        );
      })}
    </>
  );
}

export default BookingRow;
