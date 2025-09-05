import React, { memo, useMemo } from "react";
import type { Seat as SeatType, SelectedSeat, Venue } from "../types/venue";
import { Seat } from "./Seat";

interface SeatingMapProps {
  venue: Venue;
  selectedSeats: SelectedSeat[];
  onSeatClick: (
    seat: SeatType,
    section: Venue["sections"][0],
    row: Venue["sections"][0]["rows"][0]
  ) => void;
  onSeatKeyDown: (
    event: React.KeyboardEvent,
    seat: SeatType,
    section: Venue["sections"][0],
    row: Venue["sections"][0]["rows"][0]
  ) => void;
  onSeatFocus?: (
    seat: SeatType,
    section: Venue["sections"][0],
    row: Venue["sections"][0]["rows"][0]
  ) => void;
}

export const SeatingMap: React.FC<SeatingMapProps> = memo(
  ({ venue, selectedSeats, onSeatClick, onSeatKeyDown, onSeatFocus }) => {
    const selectedSeatIds = useMemo(
      () => new Set(selectedSeats.map((s) => s.seat.id)),
      [selectedSeats]
    );

    return (
      <div className="w-full h-full overflow-auto bg-gray-50">
        <svg
          width={venue.map.width}
          height={venue.map.height}
          viewBox={`0 0 ${venue.map.width} ${venue.map.height}`}
          className="border border-gray-300 bg-white"
          role="img"
          aria-label={`Seating map for ${venue.name}`}
        >
          {/* Render sections */}
          {venue.sections.map((section) => (
            <g key={section.id}>
              {/* Section label */}
              <text
                x={section.transform.x + 10}
                y={section.transform.y + 20}
                fontSize="14"
                fontWeight="bold"
                fill="#374151"
                className="select-none"
              >
                {section.label}
              </text>

              {/* Render rows */}
              {section.rows.map((row) => (
                <g key={`${section.id}-${row.index}`}>
                  {/* Row label */}
                  <text
                    x={section.transform.x + 10}
                    y={row.seats[0]?.y + 5 || section.transform.y + 40}
                    fontSize="10"
                    fill="#6b7280"
                    className="select-none"
                  >
                    Row {row.index}
                  </text>

                  {/* Render seats */}
                  {row.seats.map((seat) => (
                    <Seat
                      key={seat.id}
                      seat={seat}
                      isSelected={selectedSeatIds.has(seat.id)}
                      onClick={(clickedSeat) =>
                        onSeatClick(clickedSeat, section, row)
                      }
                      onKeyDown={(event, clickedSeat) =>
                        onSeatKeyDown(event, clickedSeat, section, row)
                      }
                      onFocus={(clickedSeat) =>
                        onSeatFocus?.(clickedSeat, section, row)
                      }
                    />
                  ))}
                </g>
              ))}
            </g>
          ))}
        </svg>
      </div>
    );
  }
);
