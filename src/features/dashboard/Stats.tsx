import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confiremedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce(
    (acc: number, value) => acc + value.totalPrice,
    0
  );
  const checkins = confiremedStays.length;
  const occuption =
    confiremedStays.reduce((acc, value) => acc + value.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title={"Bookings"}
        color={"blue"}
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title={"Sales"}
        color={"green"}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title={"Check ins"}
        color={"indigo"}
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />{" "}
      <Stat
        title={"Occupancy rate"}
        color={"yellow"}
        icon={<HiOutlineChartBar />}
        value={Math.round(occuption * 100) + "%"}
      />
    </>
  );
}

export default Stats;
