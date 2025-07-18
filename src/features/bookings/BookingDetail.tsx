/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import { useState } from "react";
import BookingDataBox from "./BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingout } = useCheckout();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const moveBack = useMoveBack();

  const statusToTagName:any = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (isLoading) return <Spinner />;
  const { status, id } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
            <HiArrowDownOnSquare />
            CheckIn
          </Button>
        )}

        {booking.status === "checked-in" && (
          <Button onClick={() => checkout(booking.id)} disabled={isCheckingout}>
            <HiArrowUpOnSquare />
            CheckedOut
          </Button>
        )}

        {isOpenModal && (
          <Modal onClose={() => setIsOpenModal(false)}>
            <ConfirmDelete
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(booking.id, { onSettled: () => navigate(-1) })
              }
              resourceName="booking"
              cancel={() => setIsOpenModal(false)}
            />
          </Modal>
        )}
        <Button variation="danger" onClick={() => setIsOpenModal(true)}>
          Delete Booking
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
