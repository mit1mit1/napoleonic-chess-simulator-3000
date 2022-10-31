import {
  ChessPieces,
  Locations,
  Players,
  type LocationInfo,
  type Square,
} from "./types";

export const chessBoardLength = 8;

export const emptyChessBoard: Square[][] = [[], [], [], [], [], [], [], []];
export const normalStartingChessBoard: Array<Array<Square | undefined>> = [
  [
    { piece: ChessPieces.Rook, player: Players.Black },
    { piece: ChessPieces.Pawn, player: Players.Black },
    undefined,
    undefined,
    undefined,
    undefined,
    { piece: ChessPieces.Pawn, player: Players.White },
    { piece: ChessPieces.Rook, player: Players.White },
  ],
  [
    { piece: ChessPieces.Knight, player: Players.Black },
    { piece: ChessPieces.Pawn, player: Players.Black },
    undefined,
    undefined,
    undefined,
    undefined,
    { piece: ChessPieces.Pawn, player: Players.White },
    { piece: ChessPieces.Knight, player: Players.White },
  ],
  [
    { piece: ChessPieces.Bishop, player: Players.Black },
    { piece: ChessPieces.Pawn, player: Players.Black },
    undefined,
    undefined,
    undefined,
    undefined,
    { piece: ChessPieces.Pawn, player: Players.White },
    { piece: ChessPieces.Bishop, player: Players.White },
  ],
  [
    { piece: ChessPieces.Queen, player: Players.Black },
    { piece: ChessPieces.Pawn, player: Players.Black },
    undefined,
    undefined,
    undefined,
    undefined,
    { piece: ChessPieces.Pawn, player: Players.White },
    { piece: ChessPieces.Queen, player: Players.White },
  ],
  [
    { piece: ChessPieces.King, player: Players.Black },
    { piece: ChessPieces.Pawn, player: Players.Black },
    undefined,
    undefined,
    undefined,
    undefined,
    { piece: ChessPieces.Pawn, player: Players.White },
    { piece: ChessPieces.King, player: Players.White },
  ],
  [
    { piece: ChessPieces.Bishop, player: Players.Black },
    { piece: ChessPieces.Pawn, player: Players.Black },
    undefined,
    undefined,
    undefined,
    undefined,
    { piece: ChessPieces.Pawn, player: Players.White },
    { piece: ChessPieces.Bishop, player: Players.White },
  ],
  [
    { piece: ChessPieces.Knight, player: Players.Black },
    { piece: ChessPieces.Pawn, player: Players.Black },
    undefined,
    undefined,
    undefined,
    undefined,
    { piece: ChessPieces.Pawn, player: Players.White },
    { piece: ChessPieces.Knight, player: Players.White },
  ],
  [
    { piece: ChessPieces.Rook, player: Players.Black },
    { piece: ChessPieces.Pawn, player: Players.Black },
    undefined,
    undefined,
    undefined,
    undefined,
    { piece: ChessPieces.Pawn, player: Players.White },
    { piece: ChessPieces.Rook, player: Players.White },
  ],
];

export const INFINITE_VALUE = 99999;

export const locationInfos: {[key in Locations]: LocationInfo | undefined} = {
  [Locations.ParisDistrict]: {
    name: "Paris District",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Once opulent heart",
    descriptionEnglish:
      "Once a heart of opulence in the world, now destroyed by political infighting.",
    influenceAvailable: 55,
  },

  [Locations.AimensDistrict]: {
    name: "Aimens District",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Once opulent heart",
    descriptionEnglish:
      "Once a heart of opulence in the world, now destroyed by political infighting.",
    influenceAvailable: 55,
  },

  [Locations.RennesDistrictWest]: {
    name: "Rennes District (West)",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Once opulent heart",
    descriptionEnglish:
      "Once a heart of opulence in the world, now destroyed by political infighting.",
    influenceAvailable: 55,
  },

  [Locations.RennesDistrictEast]: {
    name: "Rennes District (East)",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Once opulent heart",
    descriptionEnglish:
      "Once a heart of opulence in the world, now destroyed by political infighting.",
    influenceAvailable: 55,
  },

  [Locations.PotiersDistrict]: {
    name: "Potiers District",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Once opulent heart",
    descriptionEnglish:
      "Once a heart of opulence in the world, now destroyed by political infighting.",
    influenceAvailable: 55,
  },

  [Locations.OrleansDistrict]: {
    name: "Orleans District",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Once opulent heart",
    descriptionEnglish:
      "Once a heart of opulence in the world, now destroyed by political infighting.",
    influenceAvailable: 55,
  },

  [Locations.BordeauxDistrict]: {
    name: "Bordeaux District",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Once opulent heart",
    descriptionEnglish:
      "Once a heart of opulence in the world, now destroyed by political infighting.",
    influenceAvailable: 55,
  },

  [Locations.TolouseDistrict]: {
    name: "Tolouse District",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Once opulent heart",
    descriptionEnglish:
      "Once a heart of opulence in the world, now destroyed by political infighting.",
    influenceAvailable: 55,
  },

  [Locations.MarsielleDistrict]: {
    name: "Marsielle District",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Once opulent heart",
    descriptionEnglish:
      "Once a heart of opulence in the world, now destroyed by political infighting.",
    influenceAvailable: 55,
  },

  [Locations.ValenceDistrict]: {
    name: "Valence District",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Once opulent heart",
    descriptionEnglish:
      "Once a heart of opulence in the world, now destroyed by political infighting.",
    influenceAvailable: 55,
  },

  [Locations.LyonDistrict]: {
    name: "Lyon District",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Once opulent heart",
    descriptionEnglish:
      "Once a heart of opulence in the world, now destroyed by political infighting.",
    influenceAvailable: 55,
  },

  [Locations.DijonDistrict]: {
    name: "Dijon District",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Once opulent heart",
    descriptionEnglish:
      "Once a heart of opulence in the world, now destroyed by political infighting.",
    influenceAvailable: 55,
  },

  [Locations.ReimsDistrict]: {
    name: "Reims District",
    cityCoordinates: {
      latitude: 23,
      longitude: 45,
    },
    cityHectares: 58,
    districtHectares: 108,
    subtitleEnglish: "Once opulent heart",
    descriptionEnglish:
      "Once a heart of opulence in the world, now destroyed by political infighting.",
    influenceAvailable: 55,
  },

  [Locations.None] : undefined,
};
