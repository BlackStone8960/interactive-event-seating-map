import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { SeatDetails } from "./components/SeatDetails";
import { SeatingMap } from "./components/SeatingMap";
import { SelectionSummary } from "./components/SelectionSummary";
import type {
  SelectedSeat,
  SelectionSummary as SelectionSummaryType,
  Venue,
} from "./types/venue";
import { calculateTotalPrice } from "./utils/pricing";

const MAX_SELECTED_SEATS = 8;
const STORAGE_KEY = "seating-selection";

function App() {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);
  const [focusedSeat, setFocusedSeat] = useState<SelectedSeat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load venue data
  useEffect(() => {
    const loadVenue = async () => {
      try {
        const response = await fetch("/venue.json");
        if (!response.ok) {
          throw new Error("Failed to load venue data");
        }
        const venueData: Venue = await response.json();
        setVenue(venueData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadVenue();
  }, []);

  // Load saved selection from localStorage
  useEffect(() => {
    const savedSelection = localStorage.getItem(STORAGE_KEY);
    if (savedSelection && venue) {
      try {
        const parsed = JSON.parse(savedSelection);
        // Validate that saved seats still exist in current venue data
        const validSeats = parsed.filter((savedSeat: SelectedSeat) => {
          return venue.sections.some((section) =>
            section.rows.some((row) =>
              row.seats.some((seat) => seat.id === savedSeat.seat.id)
            )
          );
        });
        setSelectedSeats(validSeats);
      } catch (err) {
        console.warn("Failed to parse saved selection:", err);
      }
    }
  }, [venue]);

  // Save selection to localStorage
  useEffect(() => {
    if (selectedSeats.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedSeats));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [selectedSeats]);

  const handleSeatClick = useCallback(
    (
      seat: Venue["sections"][0]["rows"][0]["seats"][0],
      section: Venue["sections"][0],
      row: Venue["sections"][0]["rows"][0]
    ) => {
      if (seat.status !== "available") return;

      const selectedSeat: SelectedSeat = { seat, section, row };
      const isAlreadySelected = selectedSeats.some(
        (s) => s.seat.id === seat.id
      );

      if (isAlreadySelected) {
        // Remove from selection
        setSelectedSeats((prev) => prev.filter((s) => s.seat.id !== seat.id));
      } else if (selectedSeats.length < MAX_SELECTED_SEATS) {
        // Add to selection
        setSelectedSeats((prev) => [...prev, selectedSeat]);
      }
    },
    [selectedSeats]
  );

  const handleSeatKeyDown = useCallback(
    (
      event: React.KeyboardEvent,
      seat: Venue["sections"][0]["rows"][0]["seats"][0],
      section: Venue["sections"][0],
      row: Venue["sections"][0]["rows"][0]
    ) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleSeatClick(seat, section, row);
      }
    },
    [handleSeatClick]
  );

  const handleClearSelection = useCallback(() => {
    setSelectedSeats([]);
  }, []);

  const handleSeatFocus = useCallback(
    (
      seat: Venue["sections"][0]["rows"][0]["seats"][0],
      section: Venue["sections"][0],
      row: Venue["sections"][0]["rows"][0]
    ) => {
      setFocusedSeat({ seat, section, row });
    },
    []
  );

  const summary: SelectionSummaryType = useMemo(
    () => ({
      selectedSeats,
      totalPrice: calculateTotalPrice(selectedSeats.map((s) => s.seat)),
      maxSeats: MAX_SELECTED_SEATS,
    }),
    [selectedSeats]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading venue data...</p>
        </div>
      </div>
    );
  }

  if (error || !venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">
            {error || "Failed to load venue data"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">{venue.name}</h1>
          <p className="text-gray-600">Interactive Seating Map</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seating Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Seating Map
              </h2>
              <div className="h-96 lg:h-[600px]">
                <SeatingMap
                  venue={venue}
                  selectedSeats={selectedSeats}
                  onSeatClick={handleSeatClick}
                  onSeatKeyDown={handleSeatKeyDown}
                  onSeatFocus={handleSeatFocus}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <SeatDetails selectedSeat={focusedSeat} />
            <SelectionSummary
              summary={summary}
              onClearSelection={handleClearSelection}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
