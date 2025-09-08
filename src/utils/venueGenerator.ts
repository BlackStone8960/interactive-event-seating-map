import type { Row, Seat, SeatStatus, Section, Venue } from "../types/venue";

/**
 * Generate a large venue with approximately 15,000 seats for performance testing
 */
export function generateLargeVenue(): Venue {
  const sections: Section[] = [];

  // Generate multiple sections
  for (let sectionIndex = 0; sectionIndex < 20; sectionIndex++) {
    const sectionId = String.fromCharCode(65 + sectionIndex); // A, B, C, etc.
    const rows: Row[] = [];

    // Generate rows for each section
    for (let rowIndex = 1; rowIndex <= 50; rowIndex++) {
      const seats: Seat[] = [];

      // Generate seats for each row
      for (let colIndex = 1; colIndex <= 15; colIndex++) {
        const seatId = `${sectionId}-${rowIndex}-${colIndex
          .toString()
          .padStart(2, "0")}`;
        const x = 50 + sectionIndex * 200 + colIndex * 25;
        const y = 40 + rowIndex * 20;

        // Random status distribution: 70% available, 15% reserved, 10% sold, 5% held
        const random = Math.random();
        let status: SeatStatus;
        if (random < 0.7) status = "available";
        else if (random < 0.85) status = "reserved";
        else if (random < 0.95) status = "sold";
        else status = "held";

        // Price tier distribution: 20% tier 1, 30% tier 2, 30% tier 3, 20% tier 4
        const priceRandom = Math.random();
        let priceTier: number;
        if (priceRandom < 0.2) priceTier = 1;
        else if (priceRandom < 0.5) priceTier = 2;
        else if (priceRandom < 0.8) priceTier = 3;
        else priceTier = 4;

        seats.push({
          id: seatId,
          col: colIndex,
          x,
          y,
          priceTier,
          status,
        });
      }

      rows.push({
        index: rowIndex,
        seats,
      });
    }

    sections.push({
      id: sectionId,
      label: `Section ${sectionId}`,
      transform: {
        x: sectionIndex * 200,
        y: 0,
        scale: 1,
      },
      rows,
    });
  }

  return {
    venueId: "large-arena-01",
    name: "Large Performance Arena",
    map: {
      width: 4000,
      height: 1200,
    },
    sections,
  };
}

/**
 * Generate a small test venue for development
 */
export function generateTestVenue(): Venue {
  return {
    venueId: "test-arena-01",
    name: "Test Arena",
    map: {
      width: 800,
      height: 600,
    },
    sections: [
      {
        id: "A",
        label: "Section A",
        transform: { x: 0, y: 0, scale: 1 },
        rows: [
          {
            index: 1,
            seats: [
              {
                id: "A-1-01",
                col: 1,
                x: 50,
                y: 40,
                priceTier: 1,
                status: "available",
              },
              {
                id: "A-1-02",
                col: 2,
                x: 80,
                y: 40,
                priceTier: 1,
                status: "reserved",
              },
              {
                id: "A-1-03",
                col: 3,
                x: 110,
                y: 40,
                priceTier: 1,
                status: "available",
              },
            ],
          },
          {
            index: 2,
            seats: [
              {
                id: "A-2-01",
                col: 1,
                x: 50,
                y: 70,
                priceTier: 1,
                status: "available",
              },
              {
                id: "A-2-02",
                col: 2,
                x: 80,
                y: 70,
                priceTier: 1,
                status: "sold",
              },
              {
                id: "A-2-03",
                col: 3,
                x: 110,
                y: 70,
                priceTier: 1,
                status: "held",
              },
            ],
          },
        ],
      },
    ],
  };
}
