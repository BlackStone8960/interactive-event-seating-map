import React, { memo } from "react";
import type { SeatStatus, Seat as SeatType } from "../types/venue";
import { getPriceForTier } from "../utils/pricing";

interface SeatProps {
  seat: SeatType;
  isSelected: boolean;
  onClick: (seat: SeatType) => void;
  onKeyDown: (event: React.KeyboardEvent, seat: SeatType) => void;
  onFocus?: (seat: SeatType) => void;
}

const getSeatColor = (status: SeatStatus, isSelected: boolean): string => {
  if (isSelected) return "#3b82f6"; // Blue for selected
  if (status === "available") return "#10b981"; // Green for available
  if (status === "reserved") return "#f59e0b"; // Yellow for reserved
  if (status === "sold") return "#ef4444"; // Red for sold
  if (status === "held") return "#8b5cf6"; // Purple for held
  return "#6b7280"; // Gray fallback
};

const getSeatLabel = (status: SeatStatus): string => {
  switch (status) {
    case "available":
      return "Available seat";
    case "reserved":
      return "Reserved seat";
    case "sold":
      return "Sold seat";
    case "held":
      return "Held seat";
    default:
      return "Unknown seat status";
  }
};

export const Seat: React.FC<SeatProps> = memo(
  ({ seat, isSelected, onClick, onKeyDown, onFocus }) => {
    const color = getSeatColor(seat.status, isSelected);
    const label = getSeatLabel(seat.status);
    const price = getPriceForTier(seat.priceTier);

    return (
      <circle
        cx={seat.x}
        cy={seat.y}
        r={8}
        fill={color}
        stroke={isSelected ? "#1d4ed8" : "#374151"}
        strokeWidth={isSelected ? 2 : 1}
        className="cursor-pointer transition-all duration-150 hover:r-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => onClick(seat)}
        onKeyDown={(e) => onKeyDown(e, seat)}
        onFocus={() => onFocus?.(seat)}
        tabIndex={seat.status === "available" ? 0 : -1}
        aria-label={`${label} ${seat.id}, Section ${
          seat.id.split("-")[0]
        }, Row ${seat.id.split("-")[1]}, Column ${
          seat.id.split("-")[2]
        }, Price $${price}`}
        role="button"
        aria-pressed={isSelected}
      />
    );
  }
);
