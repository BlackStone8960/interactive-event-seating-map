import React from "react";
import { SelectedSeat } from "../types/venue";
import { getPriceForTier } from "../utils/pricing";

interface SeatDetailsProps {
  selectedSeat: SelectedSeat | null;
}

export const SeatDetails: React.FC<SeatDetailsProps> = ({ selectedSeat }) => {
  if (!selectedSeat) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Seat Information
        </h3>
        <p className="text-gray-500">Click on a seat to view details</p>
      </div>
    );
  }

  const { seat, section, row } = selectedSeat;
  const price = getPriceForTier(seat.priceTier);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "available":
        return "text-green-600 bg-green-100";
      case "reserved":
        return "text-yellow-600 bg-yellow-100";
      case "sold":
        return "text-red-600 bg-red-100";
      case "held":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Seat Information
      </h3>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Seat ID:</span>
          <span className="font-medium">{seat.id}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Section:</span>
          <span className="font-medium">{section.label}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Row:</span>
          <span className="font-medium">{row.index}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Column:</span>
          <span className="font-medium">{seat.col}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Price Tier:</span>
          <span className="font-medium">Tier {seat.priceTier}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Price:</span>
          <span className="font-bold text-lg">${price}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Status:</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              seat.status
            )}`}
          >
            {seat.status.charAt(0).toUpperCase() + seat.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};
