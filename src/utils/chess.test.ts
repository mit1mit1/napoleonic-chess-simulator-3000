import { INFINITE_VALUE } from "@/constants";
import { ChessPieces, Players, type ChessState } from "@/types";
import { describe, expect, it } from "vitest";
import {
  getStateAfterMove,
  greedyMoveValue,
  getPiece,
  hasPieceOfType,
  isValidMove,
  getGreediestMove,
} from "./chess";

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
    [],
    [],
    [{ piece: ChessPieces.Rook, player: Players.White }],
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
  it("allows left castling as first king move when with rook on empty row", async () => {
    expect(isValidMove(whiteKingRookPreCastle, 4, 0, 2, 0)).toBe(true);
  });
  it("allows right castling as first king move when with rook on empty row", async () => {
    expect(isValidMove(whiteKingRookPreCastle, 4, 0, 6, 0)).toBe(true);
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

describe.concurrent("generic movement rules", () => {
  it("disallows movement from an empty square", async () => {
    expect(isValidMove(whiteQueenThreeThree, 0, 0, 3, 2)).toBe(false);
  });
  it("disallows movement onto the same square", async () => {
    expect(
      isValidMove(whiteQueenThreeThreeBlackPawnThreeFour, 3, 3, 3, 3)
    ).toBe(false);
  });
  it("disallows movement onto your own piece", async () => {
    expect(
      isValidMove(whiteQueenThreeThreeWhitePawnThreeFour, 3, 3, 3, 4)
    ).toBe(false);
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

const whiteQueenThreeThreeWhitePawnThreeFour: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Queen, player: Players.White },
      { piece: ChessPieces.Pawn, player: Players.White },
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

const whitePawnThreeThree: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Pawn, player: Players.White },
    ],
  ],
  currentPlayer: Players.White,
  kingsMoved: [],
};

const blackPawnThreeThree: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Pawn, player: Players.Black },
    ],
  ],
  currentPlayer: Players.Black,
  kingsMoved: [],
};

const blackPawnThreeThreeWhitePawnThreeFour: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Pawn, player: Players.Black },
      { piece: ChessPieces.Pawn, player: Players.White },
    ],
  ],
  currentPlayer: Players.Black,
  kingsMoved: [],
};

const blackPawnZeroOneWhitePawnThreeFour: ChessState = {
  squares: [
    [undefined, { piece: ChessPieces.Pawn, player: Players.Black }],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Pawn, player: Players.White },
    ],
  ],
  currentPlayer: Players.Black,
  kingsMoved: [],
};

const whitePawnZeroSixWhitePawnThreeFour: ChessState = {
  squares: [
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Pawn, player: Players.White },
    ],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Pawn, player: Players.White },
    ],
  ],
  currentPlayer: Players.White,
  kingsMoved: [],
};

const whitePawnFourFourBlackPawnThreeThree: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Pawn, player: Players.Black },
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Pawn, player: Players.White },
    ],
  ],
  currentPlayer: Players.White,
  kingsMoved: [],
};

const blackPawnThreeThreeWhitePawnFourFour: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Pawn, player: Players.Black },
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Pawn, player: Players.White },
    ],
  ],
  currentPlayer: Players.Black,
  kingsMoved: [],
};

describe.concurrent("pawn movement rules", () => {
  it("disallows pawn movement onto empty adjacent diagonal square", async () => {
    expect(isValidMove(blackPawnThreeThree, 3, 3, 2, 2)).toBe(false);
    expect(isValidMove(blackPawnZeroOneWhitePawnThreeFour, 0, 1, 1, 2)).toBe(
      false
    );
  });
  it("allows black pawn moving forwards", async () => {
    expect(isValidMove(blackPawnThreeThree, 3, 3, 3, 4)).toBe(true);
    expect(isValidMove(blackPawnThreeThree, 3, 3, 3, 2)).toBe(false);
    expect(isValidMove(blackPawnZeroOneWhitePawnThreeFour, 0, 1, 0, 2)).toBe(
      true
    );
    expect(isValidMove(blackPawnZeroOneWhitePawnThreeFour, 0, 1, 0, 0)).toBe(
      false
    );
  });
  it("allows black pawn moving forwards two on first turn", async () => {
    expect(isValidMove(blackPawnThreeThree, 3, 3, 3, 5)).toBe(false);
    expect(isValidMove(blackPawnThreeThree, 3, 3, 3, 1)).toBe(false);
    expect(isValidMove(blackPawnZeroOneWhitePawnThreeFour, 0, 1, 0, 3)).toBe(
      true
    );
  });
  it("allows white pawn moving backwards", async () => {
    expect(isValidMove(whitePawnThreeThree, 3, 3, 3, 4)).toBe(false);
    expect(isValidMove(whitePawnThreeThree, 3, 3, 3, 2)).toBe(true);
    expect(isValidMove(whitePawnZeroSixWhitePawnThreeFour, 0, 6, 0, 7)).toBe(
      false
    );
    expect(isValidMove(whitePawnZeroSixWhitePawnThreeFour, 0, 6, 0, 5)).toBe(
      true
    );
  });
  it("allows white pawn moving backwards two on first turn", async () => {
    expect(isValidMove(whitePawnThreeThree, 3, 3, 3, 5)).toBe(false);
    expect(isValidMove(whitePawnThreeThree, 3, 3, 3, 1)).toBe(false);
    expect(isValidMove(whitePawnZeroSixWhitePawnThreeFour, 0, 6, 0, 4)).toBe(
      true
    );
  });
  it("disallows pawn movement onto non-empty adjacent same row squares", async () => {
    expect(isValidMove(blackPawnThreeThreeWhitePawnThreeFour, 3, 3, 3, 4)).toBe(
      false
    );
  });
  it("disallows pawn movement onto distant same column squares", async () => {
    expect(isValidMove(blackPawnThreeThree, 3, 3, 3, 7)).toBe(false);
    expect(isValidMove(blackPawnThreeThree, 3, 3, 3, 0)).toBe(false);
  });
  it("disallows pawn movement onto distant same row squares", async () => {
    expect(isValidMove(blackPawnThreeThree, 3, 3, 7, 3)).toBe(false);
    expect(isValidMove(blackPawnThreeThree, 3, 3, 0, 3)).toBe(false);
  });
  it("disallows pawn movement onto distant same diagonal squares", async () => {
    expect(isValidMove(blackPawnThreeThree, 3, 3, 7, 7)).toBe(false);
    expect(isValidMove(blackPawnThreeThree, 3, 3, 0, 0)).toBe(false);
  });
  it("disallows pawn movement onto squares not on square line", async () => {
    expect(isValidMove(blackPawnThreeThree, 3, 3, 6, 7)).toBe(false);
    expect(isValidMove(blackPawnThreeThree, 3, 3, 2, 1)).toBe(false);
  });
  it("allows pawn diagonal capturing", async () => {
    expect(isValidMove(blackPawnThreeThreeWhitePawnFourFour, 3, 3, 4, 4)).toBe(
      true
    );
    expect(isValidMove(whitePawnFourFourBlackPawnThreeThree, 4, 4, 3, 3)).toBe(
      true
    );
  });
  it("disallows pawn jumping", async () => {
    expect(isValidMove(blackPawnThreeThreeWhitePawnFourFour, 3, 3, 6, 6)).toBe(
      false
    );
  });
});

const blackKnightThreeThree: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Knight, player: Players.Black },
    ],
  ],
  currentPlayer: Players.Black,
  kingsMoved: [],
};

const blackKnightThreeThreeWhiteKnightThreeFour: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Knight, player: Players.Black },
      { piece: ChessPieces.Knight, player: Players.White },
    ],
  ],
  currentPlayer: Players.Black,
  kingsMoved: [],
};

const whiteKnightThreeThreeBlackPawnFiveFour: ChessState = {
  squares: [
    [],
    [],
    [],
    [
      undefined,
      undefined,
      undefined,
      { piece: ChessPieces.Knight, player: Players.White },
    ],
    [],
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

describe.concurrent("knight movement rules", () => {
  it("disallows knight movement onto empty adjacent diagonal square", async () => {
    expect(isValidMove(blackKnightThreeThree, 3, 3, 2, 2)).toBe(false);
  });
  it("disallows knight movement onto non-empty adjacent same row squares", async () => {
    expect(
      isValidMove(blackKnightThreeThreeWhiteKnightThreeFour, 3, 3, 3, 4)
    ).toBe(false);
  });
  it("disallows knight movement onto same column squares", async () => {
    expect(isValidMove(blackKnightThreeThree, 3, 3, 3, 7)).toBe(false);
  });
  it("disallows knight movement onto same row squares", async () => {
    expect(isValidMove(blackKnightThreeThree, 3, 3, 7, 3)).toBe(false);
  });
  it("disallows knight movement onto same diagonal squares", async () => {
    expect(isValidMove(blackKnightThreeThree, 3, 3, 7, 7)).toBe(false);
  });
  it("allows knight movement onto l-away squares", async () => {
    expect(isValidMove(blackKnightThreeThree, 3, 3, 5, 4)).toBe(true);
  });
  it("allows knight capturing", async () => {
    expect(
      isValidMove(whiteKnightThreeThreeBlackPawnFiveFour, 3, 3, 5, 4)
    ).toBe(true);
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
    expect(
      greedyMoveValue({ piece: ChessPieces.King, player: Players.White })
    ).toBeGreaterThan(
      greedyMoveValue({ piece: ChessPieces.Queen, player: Players.Black })
    );
    expect(
      greedyMoveValue({ piece: ChessPieces.King, player: Players.Black })
    ).toBeGreaterThan(
      greedyMoveValue({ piece: ChessPieces.Queen, player: Players.White })
    );
    expect(
      greedyMoveValue({ piece: ChessPieces.King, player: Players.Black })
    ).toBeGreaterThan(
      greedyMoveValue({ piece: ChessPieces.Queen, player: Players.Black })
    );
  });
  it("treats empty squares as worthless", async () => {
    expect(greedyMoveValue()).toBe(0);
  });
});

const whiteKingAloneInCorner = [
  [{ piece: ChessPieces.King, player: Players.White }],
];

const whiteKingAndRooksInStartingPosition = [
  [{ piece: ChessPieces.Rook, player: Players.White }],
  [],
  [],
  [],
  [{ piece: ChessPieces.King, player: Players.White }],
  [],
  [],
  [{ piece: ChessPieces.Rook, player: Players.White }],
];

const unmovedWhiteKingInCorner: ChessState = {
  currentPlayer: Players.White,
  squares: whiteKingAloneInCorner,
  kingsMoved: [],
};

const unmovedWhiteKingAndRookInStart: ChessState = {
  currentPlayer: Players.White,
  squares: whiteKingAndRooksInStartingPosition,
  kingsMoved: [],
};

describe.concurrent("can get board state after a move", async () => {
  it("can move a king on an empty board", async () => {
    expect(!!getPiece(0, 0, unmovedWhiteKingInCorner.squares)).toBe(true);
    expect(
      !!hasPieceOfType(0, 1, ChessPieces.King, unmovedWhiteKingInCorner.squares)
    ).toBe(false);

    const nextState = getStateAfterMove(unmovedWhiteKingInCorner, 0, 0, 0, 1);

    expect(nextState.currentPlayer).toBe(Players.Black);
    expect(nextState.kingsMoved).toContain(Players.White);
    expect(nextState.kingsMoved).not.toContain(Players.Black);
    expect(!!getPiece(0, 0, nextState.squares)).toBe(false);
    expect(!!hasPieceOfType(0, 1, ChessPieces.King, nextState.squares)).toBe(
      true
    );
  });
  it("can right castle a king", async () => {
    expect(
      !!hasPieceOfType(
        0,
        0,
        ChessPieces.Rook,
        unmovedWhiteKingAndRookInStart.squares
      )
    ).toBe(true);
    expect(
      !!hasPieceOfType(
        4,
        0,
        ChessPieces.King,
        unmovedWhiteKingAndRookInStart.squares
      )
    ).toBe(true);

    const nextState = getStateAfterMove(
      unmovedWhiteKingAndRookInStart,
      4,
      0,
      2,
      0
    );

    expect(nextState.currentPlayer).toBe(Players.Black);
    expect(nextState.kingsMoved).toContain(Players.White);
    expect(nextState.kingsMoved).not.toContain(Players.Black);
    expect(!!getPiece(0, 0, nextState.squares)).toBe(false);
    expect(!!getPiece(4, 0, nextState.squares)).toBe(false);
    expect(!!hasPieceOfType(2, 0, ChessPieces.King, nextState.squares)).toBe(
      true
    );
    expect(!!hasPieceOfType(3, 0, ChessPieces.Rook, nextState.squares)).toBe(
      true
    );
  });
  it("can left castle a king", async () => {
    expect(
      !!hasPieceOfType(
        7,
        0,
        ChessPieces.Rook,
        unmovedWhiteKingAndRookInStart.squares
      )
    ).toBe(true);
    expect(
      !!hasPieceOfType(
        4,
        0,
        ChessPieces.King,
        unmovedWhiteKingAndRookInStart.squares
      )
    ).toBe(true);

    const nextState = getStateAfterMove(
      unmovedWhiteKingAndRookInStart,
      4,
      0,
      6,
      0
    );

    expect(nextState.currentPlayer).toBe(Players.Black);
    expect(nextState.kingsMoved).toContain(Players.White);
    expect(nextState.kingsMoved).not.toContain(Players.Black);
    expect(!!getPiece(7, 0, nextState.squares)).toBe(false);
    expect(!!getPiece(4, 0, nextState.squares)).toBe(false);
    expect(!!hasPieceOfType(6, 0, ChessPieces.King, nextState.squares)).toBe(
      true
    );
    expect(!!hasPieceOfType(5, 0, ChessPieces.Rook, nextState.squares)).toBe(
      true
    );
  });
  it("does nothing if attempting to move an empty square", async () => {
    expect(!!getPiece(5, 5, unmovedWhiteKingInCorner.squares)).toBe(false);
    expect(!!getPiece(3, 7, unmovedWhiteKingInCorner.squares)).toBe(false);

    const nextState = getStateAfterMove(unmovedWhiteKingInCorner, 5, 5, 3, 7);

    expect(nextState.currentPlayer).toBe(Players.White);
    expect(nextState.kingsMoved).toEqual([]);
    expect(!!getPiece(5, 5, nextState.squares)).toBe(false);
    expect(!!getPiece(3, 7, nextState.squares)).toBe(false);
  });
});

const whiteKingFourZeroCapturable = [
  [
    { piece: ChessPieces.Rook, player: Players.Black },
    { piece: ChessPieces.Knight, player: Players.White },
  ],
  [
    undefined,
    { piece: ChessPieces.Queen, player: Players.White },
    { piece: ChessPieces.King, player: Players.Black },
  ],
  [],
  [undefined, undefined, { piece: ChessPieces.Knight, player: Players.Black }],
  [{ piece: ChessPieces.King, player: Players.White }],
  [undefined, { piece: ChessPieces.Bishop, player: Players.Black }],
  [undefined, undefined, { piece: ChessPieces.Bishop, player: Players.White }],
  [],
];

const whiteKingFourZeroOneWayOut = [
  [{ piece: ChessPieces.Rook, player: Players.Black }],
  [],
  [],
  [],
  [
    { piece: ChessPieces.King, player: Players.White },
    undefined,
    undefined,
    { piece: ChessPieces.Knight, player: Players.Black },
  ],
  [],
  [],
  [
    { piece: ChessPieces.Rook, player: Players.Black },
    undefined,
    undefined,
    undefined,
    undefined,
    { piece: ChessPieces.Queen, player: Players.White },
  ],
];

const capturableKingFourZero: ChessState = {
  currentPlayer: Players.Black,
  squares: whiteKingFourZeroCapturable,
  kingsMoved: [],
};

const endangeredKingFourZero: ChessState = {
  currentPlayer: Players.White,
  squares: whiteKingFourZeroOneWayOut,
  kingsMoved: [],
};

describe.concurrent("gets greediest move", async () => {
  it("always captures the king if it can", async () => {
    const noRecursion = getGreediestMove(capturableKingFourZero, 0, 0, 0);
    expect(noRecursion.endX).toBe(4);
    expect(noRecursion.endY).toBe(0);
    expect(noRecursion.moveValue).toBe(INFINITE_VALUE);

    const someRecursion = getGreediestMove(capturableKingFourZero, 1, 1, 1);
    expect(someRecursion.endX).toBe(4);
    expect(someRecursion.endY).toBe(0);
    expect(someRecursion.moveValue).toBe(INFINITE_VALUE);

    const possibleRecursion = getGreediestMove(
      capturableKingFourZero,
      1,
      1,
      0.5
    );
    expect(possibleRecursion.endX).toBe(4);
    expect(possibleRecursion.endY).toBe(0);
    expect(possibleRecursion.moveValue).toBe(INFINITE_VALUE);

    const likelyRecursion = getGreediestMove(capturableKingFourZero, 1, 1, 0.8);
    expect(likelyRecursion.endX).toBe(4);
    expect(likelyRecursion.endY).toBe(0);
    expect(likelyRecursion.moveValue).toBe(INFINITE_VALUE);
  });

  it("always saves the king if it can if recursion is on", async () => {
    const someRecursion = getGreediestMove(endangeredKingFourZero, 0, 1, 1);
    console.log(someRecursion);
    expect(someRecursion.endX).toBe(4);
    expect(someRecursion.endY).toBe(1);
  });
});
