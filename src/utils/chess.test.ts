import { normalStartingChessBoard } from "@/constants";
import { ChessPieces, Players, type ChessState } from "@/types";
import { describe, expect, it } from "vitest";
import { isValidMove } from "./chess";

const whiteKingThreeThree: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.King, player: Players.White },
    ],
  ],
  currentPlayer: Players.White,
  kingsMoved: [],
};

const whiteKingThreeThreeBlackPawnThreeFour: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.King, player: Players.White },
      { piece: ChessPieces.Pawn, player: Players.Black },
    ],
  ],
  currentPlayer: Players.White,
  kingsMoved: [],
};

const whiteKingRookPreCastle: ChessState = {
  squares: [
    [{ piece: ChessPieces.Rook, player: Players.White }],
    [],
    [],
    [],
    [{ piece: ChessPieces.King, player: Players.White }],
  ],
  currentPlayer: Players.White,
  kingsMoved: [],
};

const whiteKingMovedRookPreCastle: ChessState = {
  squares: [
    [{ piece: ChessPieces.Rook, player: Players.White }],
    [],
    [],
    [],
    [{ piece: ChessPieces.King, player: Players.White }],
  ],
  currentPlayer: Players.White,
  kingsMoved: [Players.White],
};

const whiteKingRookPreCastleWithMiddlePiece: ChessState = {
  squares: [
    [{ piece: ChessPieces.Rook, player: Players.White }],
    [{ piece: ChessPieces.Bishop, player: Players.White }],
    [],
    [],
    [{ piece: ChessPieces.King, player: Players.White }],
  ],
  currentPlayer: Players.White,
  kingsMoved: [],
};

describe.concurrent("king movement rules", () => {
  it("allows king movement onto empty adjacent squares", async () => {
    expect(isValidMove(whiteKingThreeThree, 3, 3, 3, 2)).toBe(true);
  });
  it("allows king movement onto non-empty adjacent squares", async () => {
    expect(isValidMove(whiteKingThreeThreeBlackPawnThreeFour, 3, 3, 3, 4)).toBe(
      true
    );
  });
  it("disallows king movement onto non-castle non-adjacent squares", async () => {
    expect(isValidMove(whiteKingThreeThree, 3, 3, 3, 7)).toBe(false);
  });
  it("allows castling as first king move when with rook on empty row", async () => {
    expect(isValidMove(whiteKingRookPreCastle, 4, 0, 2, 0)).toBe(true);
  });
  it("disallows castling as first king move when with rook on nonempty row", async () => {
    expect(isValidMove(whiteKingRookPreCastleWithMiddlePiece, 4, 0, 2, 0)).toBe(
      false
    );
  });
  it("disallows castling as nonfirst king move when with rook on empty row", async () => {
    expect(isValidMove(whiteKingMovedRookPreCastle, 4, 0, 2, 0)).toBe(false);
  });
});
  