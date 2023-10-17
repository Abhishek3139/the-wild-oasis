import { useState } from "react";
import styled from "styled-components";
import { format, isToday } from "date-fns";
import Tag from "../../ui/Tag";
// import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { booking } from "./bookingModal";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEllipsisVertical,
  HiEye,
  // HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
// import Modal from "../../ui/Modal";
// import ConfirmDelete from "../../ui/ConfirmDelete";
// import { useDeleteBooking } from "./useDeleteBooking";
// import { HiEye } from "react-icons/hi2";

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
const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: 20px;
  top: 35px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
function BookingRow({ booking }) {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const { checkout, isCheckingout } = useCheckout();
  const [sameId, setSameId] = useState(null);
  // const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  // const { isDeleting, deleteBooking } = useDeleteBooking();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statusToTagName: any = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  function handleShowDetails(id: number) {
    if (id) {
      setSameId(id);
      setShowDetails(!showDetails);
    } else {
      setSameId(null);
      setShowDetails(false);
    }
  }
  return (
    <>
      {booking.map((booking: booking) => {
        return (
          <TableRow key={booking.id}>
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

            <StyledMenu>
              <StyledToggle onClick={() => handleShowDetails(booking.id)}>
                <HiEllipsisVertical />
                {showDetails && sameId === booking.id ? (
                  <StyledList>
                    <StyledButton
                      onClick={() => navigate(`/bookings/${booking.id}`)}
                    >
                      <HiEye />
                      Details
                    </StyledButton>
                    {booking.status === "unconfirmed" && (
                      <StyledButton
                        onClick={() => navigate(`/checkin/${booking.id}`)}
                      >
                        <HiArrowDownOnSquare />
                        CheckIn
                      </StyledButton>
                    )}
                    {booking.status === "checked-in" && (
                      <StyledButton
                        onClick={() => checkout(booking.id)}
                        disabled={isCheckingout}
                      >
                        <HiArrowUpOnSquare />
                        Checked Out
                      </StyledButton>
                    )}
                    {/* <StyledButton onClick={() => setIsOpenModal(true)}>
                      <HiTrash />
                      <span>Delete</span>
                    </StyledButton> */}
                  </StyledList>
                ) : null}
              </StyledToggle>
            </StyledMenu>
            {/* {isOpenModal && (
              <Modal onClose={() => setIsOpenModal(false)}>
                <ConfirmDelete
                  disabled={isDeleting}
                  onConfirm={() => deleteBooking(booking.id)}
                  resourceName="booking"
                />
              </Modal>
            )} */}
          </TableRow>
        );
      })}
    </>
  );
}

export default BookingRow;
