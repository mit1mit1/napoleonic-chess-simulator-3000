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

export interface chessState {
  squares: Array<Array<Square | undefined>>;
  kingsMoved: Array<Players>;
  enPassantableSquare: [number, number];
}
