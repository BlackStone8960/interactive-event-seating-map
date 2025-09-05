// Venue data types
export type SeatStatus = "available" | "reserved" | "sold" | "held";

export interface Seat {
  id: string;
  col: number;
  x: number;
  y: number;
  priceTier: number;
  status: SeatStatus;
}

export interface Row {
  index: number;
  seats: Seat[];
}

export interface Section {
  id: string;
  label: string;
  transform: {
    x: number;
    y: number;
    scale: number;
  };
  rows: Row[];
}

export interface VenueMap {
  width: number;
  height: number;
}

export interface Venue {
  venueId: string;
  name: string;
  map: VenueMap;
  sections: Section[];
}

// Selection types
export interface SelectedSeat {
  seat: Seat;
  section: Section;
  row: Row;
}

export interface SelectionSummary {
  selectedSeats: SelectedSeat[];
  totalPrice: number;
  maxSeats: number;
}
