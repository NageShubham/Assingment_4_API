// SWAPI VECTOR TYPES
export interface SWVector {
    personId: number;
    personName: string;
    filmCount: number;
    homeworldId: number;
    pilotedStarships: number;
}

// AIC VECTOR TYPES
export interface AICVector {
    artworkId: number;
    expectedTitleFragment: string;
    expectedArtistFragment: string;
    expectedPage: number;
}

// ─────────────────────────────────────────────────────────────
// STAR WARS TEST DATA  (verified against https://swapi.info)
// ─────────────────────────────────────────────────────────────
export const SWVectorsData: SWVector[] = [
    {
        personId: 1,
        personName: "Luke Skywalker",
        filmCount: 4,
        homeworldId: 1,
        pilotedStarships: 2,        // X-wing, Imperial shuttle
    },
    {
        personId: 2,
        personName: "C-3PO",
        filmCount: 6,
        homeworldId: 1,
        pilotedStarships: 0,
    },
    {
        personId: 3,
        personName: "R2-D2",
        filmCount: 6,
        homeworldId: 8,
        pilotedStarships: 0,
    },
    {
        personId: 4,
        personName: "Darth Vader",
        filmCount: 4,
        homeworldId: 1,
        pilotedStarships: 1,        // TIE Advanced x1
    },
    {
        personId: 5,
        personName: "Leia Organa",
        filmCount: 4,
        homeworldId: 2,
        pilotedStarships: 0,        // SWAPI lists no piloted starships for Leia
    },
];


// ART INSTITUTE OF CHICAGO TEST DATA
// Verified against https://api.artic.edu/api/v1/artworks/<id>

export const AICVectorData: AICVector[] = [
    {
        artworkId: 27992,
        expectedTitleFragment: "La Grande Jatte",   // "A Sunday on La Grande Jatte — 1884"
        expectedArtistFragment: "Seurat",            // "Georges Seurat (French, 1859–1891)"
        expectedPage: 1,
    },
    {
        artworkId: 28560,
        expectedTitleFragment: "The Bedroom",        // "The Bedroom" ✅ correct
        expectedArtistFragment: "van Gogh",          // "Vincent van Gogh" ✅ correct
        expectedPage: 1,
    },
    {
        artworkId: 129884,
        expectedTitleFragment: "Starry Night",       // "Starry Night and the Astronauts"
        expectedArtistFragment: "Thomas",            // "Alma Thomas\nAmerican, 1891–1978"
        expectedPage: 1,
    },
];