export type LocationChessResults = Record<
  Locations,
  { wins: number; losses: number; ties: number }
>;

export type GameState = {
  translatedWord: string | undefined;
  translatedWordFromLanguage: string | undefined;
  translatedWordToLanguage: string | undefined;
  selectedLocation?: Locations;
  locationChessResults: LocationChessResults;
  setSelectedLocation: (location: Locations) => void;
  pushLocationChessResult: (
    location: Locations,
    result: "win" | "loss" | "tie"
  ) => void;
  viewedDialogue: Array<number>;
  toastMessages: string[];
  pushToastMessage: (message: string) => void;
  setTranslatedWord: (
    word: string,
    fromLanguage: Languages,
    toLanguage: Languages
  ) => void;
};

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
  None = "None",
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

export const allLocations = Object.values(Locations).sort((a, b) =>
  a.localeCompare(b)
);

export type DialogLineChunk = {
  words: string;
  fromLanguage?: Languages;
  toLanguage?: Languages;
};

export type DialogLine = {
  speaker: "Pierre" | "Napoleon";
  chunks: Array<DialogLineChunk>;
  vibe?: "muttered";
};

export type Dialogs = Array<{
  triggerCondition: (gameState: GameState) => boolean;
  triggered: boolean;
  delayMilliseconds: number;
  lines: Array<DialogLine>;
}>;

export interface LocationInfo {
  nameEnglish: string;
  nameFrench: string;
  cityCoordinates: {
    latitude: number;
    longitude: number;
  };
  cityHectares: number;
  districtHectares: number;
  subtitleEnglish: string;
  subtitleFrench: string;
  descriptionEnglish: string;
  descriptionFrench: string;
  influenceAvailable: number;
}

export type Dictionary = Record<
  string,
  { translations: string[]; englishDefinition: string }
>;
