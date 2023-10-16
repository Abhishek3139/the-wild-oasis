import { useEffect, useState } from "react";
import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { allBookingData } from "../bookings/bookingModal";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckIn";
import useSettings from "../settings/useSettings";
// import { settingsType } from "../settings/settingModal";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [addBreakFast, setAddBreakFast] = useState<boolean>(false);
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false);

  const {
    booking,
    isLoading,
  }: { booking: allBookingData; isLoading: boolean } = useBooking();
  const { settings, isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();
  const { checkIn, isCheckingIn } = useCheckIn();
  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakFast) {
      checkIn({
        bookingId: booking.id,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakFastPrice,
          totalPrice: booking.totalPrice + optionalBreakFastPrice,
        },
      });
    } else {
      checkIn({ bookingId: booking.id });
    }
  }
  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
  }, [booking]);
  if (isLoading || isLoadingSettings) return <Spinner />;
  const optionalBreakFastPrice =
    settings.breakfastPrice * booking.numNights * booking.numGuests;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!booking.hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakFast}
            onChange={() => {
              setAddBreakFast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {optionalBreakFastPrice}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid}
          id="confirm"
        >
          I confirm that {booking.cabins.name} has paid the total amount of
          {!addBreakFast
            ? formatCurrency(booking.totalPrice)
            : `${formatCurrency(
                booking.totalPrice + optionalBreakFastPrice
              )} ( ${formatCurrency(
                booking.totalPrice
              )}+${optionalBreakFastPrice} )`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{booking.id}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
