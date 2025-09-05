import React from "react";
import { SelectionSummary as SelectionSummaryType } from "../types/venue";

interface SelectionSummaryProps {
  summary: SelectionSummaryType;
  onClearSelection: () => void;
}

export const SelectionSummary: React.FC<SelectionSummaryProps> = ({
  summary,
  onClearSelection,
}) => {
  const { selectedSeats, totalPrice, maxSeats } = summary;
  const canSelectMore = selectedSeats.length < maxSeats;

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Selection Summary
        </h3>
        {selectedSeats.length > 0 && (
          <button
            onClick={onClearSelection}
            className="text-sm text-red-600 hover:text-red-800 underline"
            aria-label="Clear all selected seats"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Selected Seats:</span>
          <span className="font-medium">
            {selectedSeats.length} / {maxSeats}
          </span>
        </div>

        {selectedSeats.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Selected Seats:
            </h4>
            <div className="space-y-1 max-h-32 overflow-y-auto selection-scroll">
              {selectedSeats.map((selectedSeat) => (
                <div
                  key={selectedSeat.seat.id}
                  className="flex justify-between items-center text-sm bg-gray-50 px-2 py-1 rounded"
                >
                  <span className="font-mono">{selectedSeat.seat.id}</span>
                  <span className="text-gray-600">
                    $
                    {selectedSeat.seat.priceTier === 1
                      ? 150
                      : selectedSeat.seat.priceTier === 2
                      ? 100
                      : 75}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">Total:</span>
            <span className="text-xl font-bold text-blue-600">
              ${totalPrice}
            </span>
          </div>
        </div>

        {!canSelectMore && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
            Maximum of {maxSeats} seats selected
          </div>
        )}

        {selectedSeats.length === 0 && (
          <p className="text-gray-500 text-sm mt-2">
            Click on available seats to add them to your selection
          </p>
        )}
      </div>
    </div>
  );
};
