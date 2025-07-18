/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }:any) {
  const { checkout, isCheckingout } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
