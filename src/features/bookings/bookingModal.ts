export interface booking {
  id: number;
  guests: { fullName: string; email: string };
  totalPrice: number;
  numGuests: number;
  hasBreakfast: boolean;
  numNights: number;
  cabins: { name: string };
  startDate: string;
  endDate: string;
  status: string;
  created_at: string;
}
export interface allBookingData {
  id: number;
  guests: {
    fullName: string;
    email: string;
    country: string;
    countryFlag: string;
    nationalID: string;
  };
  totalPrice: number;
  numGuests: number;
  hasBreakfast: boolean;
  numNights: number;
  created_at: string;
  startDate: string;
  endDate: string;
  cabinPrice: number;
  extraPrice: number;
  observations: string;
  isPaid: boolean;
  cabins: { name: string };
}
