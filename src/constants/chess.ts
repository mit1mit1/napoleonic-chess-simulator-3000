import { ChessPieces, Players, type Square } from "@/types";

export const squaresPerRow = 8;

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
