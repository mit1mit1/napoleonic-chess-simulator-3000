import { ChessPieces, Players, type ChessState } from "@/types";
import { describe, expect, it } from "vitest";
import { greedyMoveValue, isValidMove } from "./chess";

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

const whiteQueenThreeThree: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Queen, player: Players.White },
    ],
  ],
  currentPlayer: Players.White,
  kingsMoved: [],
};

const whiteQueenThreeThreeBlackPawnThreeFour: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Queen, player: Players.White },
      { piece: ChessPieces.Pawn, player: Players.Black },
    ],
  ],
  currentPlayer: Players.White,
  kingsMoved: [],
};

describe.concurrent("queen movement rules", () => {
  it("allows queen movement onto empty adjacent squares", async () => {
    expect(isValidMove(whiteQueenThreeThree, 3, 3, 3, 2)).toBe(true);
  });
  it("allows queen movement onto non-empty adjacent squares", async () => {
    expect(
      isValidMove(whiteQueenThreeThreeBlackPawnThreeFour, 3, 3, 3, 4)
    ).toBe(true);
  });
  it("allows queen movement onto same column squares", async () => {
    expect(isValidMove(whiteQueenThreeThree, 3, 3, 3, 7)).toBe(true);
  });
  it("allows queen movement onto same row squares", async () => {
    expect(isValidMove(whiteQueenThreeThree, 3, 3, 7, 3)).toBe(true);
  });
  it("allows queen movement onto same diagonal squares", async () => {
    expect(isValidMove(whiteQueenThreeThree, 3, 3, 7, 7)).toBe(true);
  });
  it("disallows queen movement onto squares not on square line", async () => {
    expect(isValidMove(whiteQueenThreeThree, 3, 3, 6, 7)).toBe(false);
  });
  it("disallows queen jumping", async () => {
    expect(
      isValidMove(whiteQueenThreeThreeBlackPawnThreeFour, 3, 3, 3, 5)
    ).toBe(false);
  });
});

const blackRookThreeThree: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Rook, player: Players.Black },
    ],
  ],
  currentPlayer: Players.Black,
  kingsMoved: [],
};

const blackRookThreeThreeWhiteRookThreeFour: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Rook, player: Players.Black },
      { piece: ChessPieces.Rook, player: Players.White },
    ],
  ],
  currentPlayer: Players.Black,
  kingsMoved: [],
};

const whiteRookThreeThreeBlackPawnThreeFour: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Rook, player: Players.White },
      { piece: ChessPieces.Pawn, player: Players.Black },
    ],
  ],
  currentPlayer: Players.White,
  kingsMoved: [],
};

describe.concurrent("rook movement rules", () => {
  it("allows rook movement onto empty adjacent same row square", async () => {
    expect(isValidMove(blackRookThreeThree, 3, 3, 3, 2)).toBe(true);
  });
  it("allows rook movement onto non-empty adjacent same row squares", async () => {
    expect(isValidMove(blackRookThreeThreeWhiteRookThreeFour, 3, 3, 3, 4)).toBe(
      true
    );
  });
  it("allows rook movement onto same column squares", async () => {
    expect(isValidMove(blackRookThreeThree, 3, 3, 3, 7)).toBe(true);
  });
  it("allows rook movement onto same row squares", async () => {
    expect(isValidMove(blackRookThreeThree, 3, 3, 7, 3)).toBe(true);
  });
  it("disallows rook movement onto same diagonal squares", async () => {
    expect(isValidMove(blackRookThreeThree, 3, 3, 7, 7)).toBe(false);
  });
  it("disallows rook movement onto squares not on square line", async () => {
    expect(isValidMove(blackRookThreeThree, 3, 3, 6, 7)).toBe(false);
  });
  it("disallows rook jumping", async () => {
    expect(isValidMove(whiteRookThreeThreeBlackPawnThreeFour, 3, 3, 3, 5)).toBe(
      false
    );
  });
});

const blackBishopThreeThree: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Bishop, player: Players.Black },
    ],
  ],
  currentPlayer: Players.Black,
  kingsMoved: [],
};

const blackBishopThreeThreeWhiteBishopThreeFour: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Bishop, player: Players.Black },
      { piece: ChessPieces.Bishop, player: Players.White },
    ],
  ],
  currentPlayer: Players.Black,
  kingsMoved: [],
};

const whiteBishopThreeThreeBlackPawnFourFour: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Bishop, player: Players.White },
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Pawn, player: Players.Black },
    ],
  ],
  currentPlayer: Players.Black,
  kingsMoved: [],
};

describe.concurrent("bishop movement rules", () => {
  it("allows bishop movement onto empty adjacent diagonal square", async () => {
    expect(isValidMove(blackBishopThreeThree, 3, 3, 2, 2)).toBe(true);
  });
  it("disallows bishop movement onto non-empty adjacent same row squares", async () => {
    expect(
      isValidMove(blackBishopThreeThreeWhiteBishopThreeFour, 3, 3, 3, 4)
    ).toBe(false);
  });
  it("disallows bishop movement onto same column squares", async () => {
    expect(isValidMove(blackBishopThreeThree, 3, 3, 3, 7)).toBe(false);
  });
  it("disallows bishop movement onto same row squares", async () => {
    expect(isValidMove(blackBishopThreeThree, 3, 3, 7, 3)).toBe(false);
  });
  it("allows bishop movement onto same diagonal squares", async () => {
    expect(isValidMove(blackBishopThreeThree, 3, 3, 7, 7)).toBe(true);
  });
  it("disallows bishop movement onto squares not on square line", async () => {
    expect(isValidMove(blackBishopThreeThree, 3, 3, 6, 7)).toBe(false);
  });
  it("allows bishop diagonal capturing", async () => {
    expect(
      isValidMove(whiteBishopThreeThreeBlackPawnFourFour, 3, 3, 4, 4)
    ).toBe(true);
  });
  it("disallows bishop jumping", async () => {
    expect(
      isValidMove(whiteBishopThreeThreeBlackPawnFourFour, 3, 3, 5, 5)
    ).toBe(false);
  });
});

describe.concurrent("greedy move values", () => {
  it("values pieces in order of power", async () => {
    expect(
      greedyMoveValue({ piece: ChessPieces.Queen, player: Players.White })
    ).toBeGreaterThan(
      greedyMoveValue({ piece: ChessPieces.Rook, player: Players.White })
    );
    expect(
      greedyMoveValue({ piece: ChessPieces.Rook, player: Players.White })
    ).toBeGreaterThan(
      greedyMoveValue({ piece: ChessPieces.Bishop, player: Players.White })
    );
    expect(
      greedyMoveValue({ piece: ChessPieces.Bishop, player: Players.White })
    ).toBeGreaterThan(
      greedyMoveValue({ piece: ChessPieces.Knight, player: Players.White })
    );
    expect(
      greedyMoveValue({ piece: ChessPieces.Knight, player: Players.White })
    ).toBeGreaterThan(
      greedyMoveValue({ piece: ChessPieces.Pawn, player: Players.White })
    );
  });
  it("always targets the king", async () => {
    expect(
      greedyMoveValue({ piece: ChessPieces.King, player: Players.White })
    ).toBeGreaterThan(
      greedyMoveValue({ piece: ChessPieces.Queen, player: Players.White })
    );
  });
  it("treats empty squares as worthless", async () => {
    expect(greedyMoveValue()).toBe(0);
  });
});
