/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }:any) {
  return (
    <StyledTodayItem>
      {activity.status === "unconfirmed" && <Tag type="green">Arriving</Tag>}

      {activity.status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag
        src={activity.guests.countryFlag}
        alt={`Flag of ${activity.guests.country}`}
      />
      <Guest>{activity.guests.fullName}</Guest>
      <div>{activity.numNights}</div>

      {activity.status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${activity.id}`}
        >
          Check in
        </Button>
      )}

      {activity.status === "checked-in" && (
        <CheckoutButton bookingId={activity.id} />
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
