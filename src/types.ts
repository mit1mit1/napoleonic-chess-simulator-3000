export enum Languages {
  English = "en",
  French = "fr",
}

export enum ChessPieces {
  King = 1,
  Queen,
  Bishop,
  Knight,
  Rook,
  Pawn,
}

export enum Players {
  White = 1,
  Black,
}

export interface Square {
  piece: ChessPieces;
  player: Players;
}

export interface ChessState {
  currentPlayer: Players;
  squares: Array<Array<Square | undefined>>;
  kingsMoved: Array<Players>;
  enPassantableSquare?: [number, number];
}

export enum Locations {
  None = "",
  ParisDistrict = "ParisDistrict",
  AimensDistrict = "AimensDistrict",
  RennesDistrictWest = "RennesDistrictWest",
  RennesDistrictEast = "RennesDistrictEast",
  PotiersDistrict = "PotiersDistrict",
  OrleansDistrict = "OrleansDistrict",
  BordeauxDistrict = "BordeauxDistrict",
  TolouseDistrict = "TolouseDistrict",
  MarsielleDistrict = "MarsielleDistrict",
  ValenceDistrict = "ValenceDistrict",
  LyonDistrict = "LyonDistrict",
  DijonDistrict = "DijonDistrict",
  ReimsDistrict = "ReimsDistrict",
}

export interface LocationInfo {
  name: string;
  cityCoordinates: {
    latitude: number;
    longitude: number;
  };
  cityHectares: number;
  districtHectares: number;
  subtitleEnglish: string;
  descriptionEnglish: string;
  influenceAvailable: number;
}
