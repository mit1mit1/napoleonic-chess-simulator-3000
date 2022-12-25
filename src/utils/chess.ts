import { ChessPieces, Players, type ValidMoves } from "@/types";
import type { Square, ChessState } from "@/types";
import { squaresPerRow, INFINITE_VALUE } from "@/constants";

const getFirstFreeNumber = (steps: number, takenNumbers: Array<number>) => {
  let result = 0;
  for (let i = 0; i < steps; i++) {
    while (takenNumbers.includes(result)) {
      result++;
    }
    result++;
  }
  while (takenNumbers.includes(result)) {
    result++;
  }
  return result;
};

export const getFischerBoard = (primeGreaterThanFive: number) => {
  const squares = [[], [], [], [], [], [], [], []] as (Square | undefined)[][];
  const blackBishopIndex = (primeGreaterThanFive % 4) * 2;
  const whiteBishopIndex =
    ((primeGreaterThanFive * primeGreaterThanFive) % 4) * 2 - 1;
  const queenIndex = getFirstFreeNumber(
    (primeGreaterThanFive * primeGreaterThanFive * primeGreaterThanFive) % 6,
    [blackBishopIndex, whiteBishopIndex]
  );
  const firstKnightIndex = getFirstFreeNumber(
    (primeGreaterThanFive *
      primeGreaterThanFive *
      primeGreaterThanFive *
      primeGreaterThanFive) %
      5,
    [blackBishopIndex, whiteBishopIndex, queenIndex]
  );
  const secondKnightIndex = getFirstFreeNumber(
    (primeGreaterThanFive *
      primeGreaterThanFive *
      primeGreaterThanFive *
      primeGreaterThanFive *
      primeGreaterThanFive) %
      4,
    [blackBishopIndex, whiteBishopIndex, queenIndex, firstKnightIndex]
  );
  let rookPlaced = false;
  let kingPlaced = false;
  for (let i = 0; i < squaresPerRow; i++) {
    if (i === blackBishopIndex || i === whiteBishopIndex) {
      squares[i][0] = {
        player: Players.Black,
        piece: ChessPieces.Bishop,
      };
      squares[i][squaresPerRow - 1] = {
        player: Players.White,
        piece: ChessPieces.Bishop,
      };
    } else if (i === queenIndex) {
      squares[i][0] = {
        player: Players.Black,
        piece: ChessPieces.Queen,
      };
      squares[i][squaresPerRow - 1] = {
        player: Players.White,
        piece: ChessPieces.Queen,
      };
    } else if (i === firstKnightIndex || i === secondKnightIndex) {
      squares[i][0] = {
        player: Players.Black,
        piece: ChessPieces.Knight,
      };
      squares[i][squaresPerRow - 1] = {
        player: Players.White,
        piece: ChessPieces.Knight,
      };
    } else if (!rookPlaced || (rookPlaced && kingPlaced)) {
      squares[i][0] = {
        player: Players.Black,
        piece: ChessPieces.Rook,
      };
      squares[i][squaresPerRow - 1] = {
        player: Players.White,
        piece: ChessPieces.Rook,
      };
      rookPlaced = true;
    } else {
      squares[i][0] = {
        player: Players.Black,
        piece: ChessPieces.King,
      };
      squares[i][squaresPerRow - 1] = {
        player: Players.White,
        piece: ChessPieces.King,
      };
      kingPlaced = true;
    }
    squares[i][1] = {
      player: Players.Black,
      piece: ChessPieces.Pawn,
    };
    squares[i][squaresPerRow - 2] = {
      player: Players.White,
      piece: ChessPieces.Pawn,
    };
  }
  return squares;
};

export const getPiece = (
  x: number,
  y: number,
  squares: Array<Array<Square | undefined>>
) => {
  return squares[x] && squares[x][y];
};

export const hasPieceOfColor = (
  x: number,
  y: number,
  player: Players,
  squares: Array<Array<Square | undefined>>
) => {
  return getPiece(x, y, squares) && squares[x][y]?.player === player;
};

export const hasPieceOfType = (
  x: number,
  y: number,
  type: ChessPieces,
  squares: Array<Array<Square | undefined>>
) => {
  return getPiece(x, y, squares) && squares[x][y]?.piece === type;
};

const jumpingOverPiece = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  squares: Array<Array<Square | undefined>>
) => {
  let i = 1;
  if (endX !== startX) {
    while (i < Math.abs(endX - startX)) {
      const investigateX =
        startX + (i * (endX - startX)) / Math.abs(endX - startX);
      const investigateY =
        startY + i * Math.floor((endY - startY) / Math.abs(endX - startX));
      if (getPiece(investigateX, investigateY, squares)) {
        return true;
      }
      i++;
    }
  }
  if (endY !== startY) {
    while (i < Math.abs(endY - startY)) {
      const investigateX =
        startX + (i * (endX - startX)) / Math.abs(endY - startY);
      const investigateY =
        startY + i * Math.floor((endY - startY) / Math.abs(endY - startY));
      if (getPiece(investigateX, investigateY, squares)) {
        return true;
      }
      i++;
    }
  }
  return false;
};

const isPromoting = (
  chessState: ChessState,
  startX: number,
  startY: number,
  endX: number,
  endY: number
): boolean => {
  return !!(
    hasPieceOfType(startX, startY, ChessPieces.Pawn, chessState.squares) &&
    (endY === 0 || endY === squaresPerRow - 1)
  );
};

const isCastling = (
  chessState: ChessState,
  startX: number,
  startY: number,
  endX: number,
  endY: number
): boolean => {
  const xDistance = Math.abs(startX - endX);
  const yDistance = Math.abs(startY - endY);
  return (
    xDistance === 2 &&
    yDistance === 0 &&
    !!hasPieceOfType(startX, startY, ChessPieces.King, chessState.squares)
  );
};

export const isValidMove = (
  chessState: ChessState,
  startX: number,
  startY: number,
  endX: number,
  endY: number
) => {
  if (startX === endX && startY === endY) {
    return false;
  }
  const { squares, enPassantableSquare, kingsMoved } = chessState;
  const movingPiece =
    squares[startX] &&
    squares[startX][startY] &&
    squares[startX][startY]?.piece;
  const currentPlayer =
    squares[startX] &&
    squares[startX][startY] &&
    squares[startX][startY]?.player;

  if (!(movingPiece && currentPlayer)) {
    return false;
  }

  const endPlayer =
    squares[endX] && squares[endX][endY] && squares[endX][endY]?.player;

  if (endPlayer === currentPlayer) {
    return false;
  }

  if (movingPiece === ChessPieces.Knight) {
    if (
      (Math.abs(startX - endX) === 2 && Math.abs(startY - endY) === 1) ||
      (Math.abs(startX - endX) === 1 && Math.abs(startY - endY) === 2)
    ) {
      return !hasPieceOfColor(endX, endY, currentPlayer, squares);
    }
    return false;
  } else {
    if (jumpingOverPiece(startX, startY, endX, endY, squares)) {
      return false;
    }
  }

  if (movingPiece === ChessPieces.Pawn) {
    if (currentPlayer === Players.Black) {
      if (
        startY === 1 &&
        endY - startY === 2 &&
        endX === startX &&
        !endPlayer
      ) {
        return true;
      }
      if (endY - startY === 1 && endX === startX && !endPlayer) {
        return true;
      }
      if (endY - startY === 1 && Math.abs(endX - startX) === 1 && endPlayer) {
        return true;
      }
      return false;
    }
    if (currentPlayer === Players.White) {
      if (
        startY === 6 &&
        endY - startY === -2 &&
        endX === startX &&
        !endPlayer
      ) {
        return !getPiece(startX, startY - 1, squares);
      }
      if (endY - startY === -1 && endX === startX && !endPlayer) {
        return true;
      }
      if (endY - startY === -1 && Math.abs(endX - startX) === 1 && endPlayer) {
        return true;
      }
      return false;
    }
  }

  if (movingPiece === ChessPieces.Rook) {
    if (startX === endX || startY === endY) {
      return true;
    }
    return false;
  }

  if (movingPiece === ChessPieces.Bishop) {
    const xDistance = Math.abs(startX - endX);
    const yDistance = Math.abs(startY - endY);
    if (xDistance === yDistance) {
      return true;
    }
    return false;
  }

  if (movingPiece === ChessPieces.Queen) {
    const xDistance = Math.abs(startX - endX);
    const yDistance = Math.abs(startY - endY);
    if (startX === endX || startY === endY || xDistance === yDistance) {
      return true;
    }
    return false;
  }

  if (movingPiece === ChessPieces.King) {
    const xDistance = Math.abs(startX - endX);
    const yDistance = Math.abs(startY - endY);
    if (xDistance <= 1 && yDistance <= 1) {
      return true;
    }
    if (
      xDistance === 2 &&
      yDistance === 0 &&
      !kingsMoved.includes(currentPlayer)
    ) {
      if (
        startX > endX &&
        ((hasPieceOfType(endX - 1, startY, ChessPieces.Rook, squares) &&
          isValidMove(chessState, endX - 1, startY, startX - 1, endY)) ||
          (hasPieceOfType(endX - 2, startY, ChessPieces.Rook, squares) &&
            isValidMove(chessState, endX - 2, startY, startX - 1, endY)))
      ) {
        return true;
      }
      if (
        startX < endX &&
        ((hasPieceOfType(endX + 1, startY, ChessPieces.Rook, squares) &&
          isValidMove(chessState, endX + 1, startY, startX + 1, endY)) ||
          (hasPieceOfType(endX + 2, startY, ChessPieces.Rook, squares) &&
            isValidMove(chessState, endX + 2, startY, startX + 1, endY)))
      ) {
        return true;
      }
      return false;
    }
    return false;
  }

  return false;
};

const pieceValue = (piece: ChessPieces) => {
  if (piece === ChessPieces.Rook) {
    return 5;
  }
  if (piece === ChessPieces.Knight) {
    return 2.5;
  }
  if (piece === ChessPieces.Bishop) {
    return 3;
  }
  if (piece === ChessPieces.Queen) {
    return 9;
  }
  if (piece === ChessPieces.King) {
    return INFINITE_VALUE;
  }
  if (piece === ChessPieces.Pawn) {
    return 1;
  }
  return 0;
};

export const greedyMoveValue = (toSquare?: Square) => {
  if (!toSquare) {
    return 0;
  }
  return pieceValue(toSquare.piece);
};

const getCoprimeWithEight = () => {
  const randomNumber = Math.floor(Math.random() * (squaresPerRow - 1));
  return 1 + randomNumber + (randomNumber % 2);
};
const getFirstValue = () => {
  return Math.floor(Math.random() * 8);
};

export const getGreediestMove = (
  chessState: ChessState,
  recursionDepth: number,
  maxRecursionDepth: number,
  recursionProbability: number,
  comparedMove?: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    moveValue: number | undefined;
  },
  investigateRange?: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  }
) => {
  const bestMove = {
    startX: comparedMove?.startX ?? -1,
    startY: comparedMove?.startY ?? -1,
    endX: comparedMove?.endX ?? -1,
    endY: comparedMove?.endY ?? -1,
    moveValue: comparedMove?.moveValue ?? (undefined as number | undefined),
  };
  const firstX = getFirstValue();
  const firstY = getFirstValue();
  const xCoprime = getCoprimeWithEight();
  const yCoprime = getCoprimeWithEight();
  for (
    let startXMultiplier = 0;
    startXMultiplier < squaresPerRow;
    startXMultiplier++
  ) {
    const startX = ((startXMultiplier + firstX) * xCoprime) % 8;
    for (
      let startYMultiplier = 0;
      startYMultiplier < squaresPerRow;
      startYMultiplier++
    ) {
      const startY = ((startYMultiplier + firstY) * yCoprime) % 8;
      if (
        hasPieceOfColor(
          startX,
          startY,
          chessState.currentPlayer,
          chessState.squares
        )
      ) {
        for (
          let endX = investigateRange?.minX ?? 0;
          endX < (investigateRange?.maxX ?? squaresPerRow);
          endX++
        ) {
          for (
            let endY = investigateRange?.minY ?? 0;
            endY < (investigateRange?.maxY ?? squaresPerRow);
            endY++
          ) {
            if (isValidMove(chessState, startX, startY, endX, endY)) {
              let currentValue = greedyMoveValue(
                chessState.squares[endX][endY]
              );
              if (
                recursionDepth < maxRecursionDepth &&
                Math.random() <
                  Math.pow(recursionProbability, recursionDepth) &&
                currentValue < INFINITE_VALUE
              ) {
                const nextState = getStateAfterMove(
                  chessState,
                  startX,
                  startY,
                  endX,
                  endY
                );
                const nextValue =
                  getGreediestMove(
                    nextState,
                    recursionDepth + 1,
                    maxRecursionDepth,
                    recursionProbability
                  ).moveValue || 0;
                currentValue = currentValue - 0.9 * nextValue;
              }
              if (!bestMove.moveValue || currentValue > bestMove.moveValue) {
                bestMove.moveValue = currentValue;
                bestMove.startX = startX;
                bestMove.startY = startY;
                bestMove.endX = endX;
                bestMove.endY = endY;
              }
            }
          }
        }
      }
    }
  }
  return bestMove;
};

const getRandomPromotionPiece = () => {
  const randomiser = Math.floor(Math.random() * 4);
  const pieces = [
    ChessPieces.Bishop,
    ChessPieces.Knight,
    ChessPieces.Queen,
    ChessPieces.Rook,
  ];
  return pieces[randomiser];
};

export const getStateAfterMove = (
  chessState: ChessState,
  startX: number,
  startY: number,
  endX: number,
  endY: number
): ChessState => {
  const copiedState = JSON.parse(JSON.stringify(chessState)) as ChessState;
  if (!isValidMove(copiedState, startX, startY, endX, endY)) {
    return copiedState;
  }
  if (
    hasPieceOfType(startX, startY, ChessPieces.King, copiedState.squares) &&
    !copiedState.kingsMoved.includes(copiedState.currentPlayer)
  ) {
    copiedState.kingsMoved.push(copiedState.currentPlayer);
  }
  if (isCastling(copiedState, startX, startY, endX, endY)) {
    if (startX > endX) {
      if (!copiedState.squares[startX - 1]) {
        copiedState.squares[startX - 1] = [];
      }
      if (
        hasPieceOfType(endX - 1, endY, ChessPieces.Rook, copiedState.squares)
      ) {
        copiedState.squares[startX - 1][startY] =
          copiedState.squares[endX - 1][startY];
        copiedState.squares[endX - 1][startY] = undefined;
      } else {
        copiedState.squares[startX - 1][startY] =
          copiedState.squares[endX - 2][startY];
        copiedState.squares[endX - 2][startY] = undefined;
      }
    }
    if (startX < endX) {
      if (!copiedState.squares[startX + 1]) {
        copiedState.squares[startX + 1] = [];
      }
      if (
        hasPieceOfType(endX + 1, endY, ChessPieces.Rook, copiedState.squares)
      ) {
        copiedState.squares[startX + 1][startY] =
          copiedState.squares[endX + 1][startY];
        copiedState.squares[endX + 1][startY] = undefined;
      } else {
        copiedState.squares[startX + 1][startY] =
          copiedState.squares[endX + 2][startY];
        copiedState.squares[endX + 2][startY] = undefined;
      }
    }
  }

  copiedState.currentPlayer =
    chessState.currentPlayer === Players.White ? Players.Black : Players.White;
  copiedState.squares[endX][endY] = copiedState.squares[startX][startY];
  if (isPromoting(chessState, startX, startY, endX, endY)) {
    const promotedSquare = copiedState.squares[endX][endY];
    if (promotedSquare) {
      promotedSquare.piece = getRandomPromotionPiece();
    }
  }
  copiedState.squares[startX][startY] = undefined;

  return copiedState;
};

export const getVictor = (
  chessState: ChessState
): Players | "tie" | undefined => {
  const playersWithKings = new Set([] as Players[]);
  let anyValidMoves = false;
  for (let startX = 0; startX < squaresPerRow; startX++) {
    for (let startY = 0; startY < squaresPerRow; startY++) {
      if (
        hasPieceOfType(startX, startY, ChessPieces.King, chessState.squares)
      ) {
        const piecePlayer = chessState.squares[startX][startY]?.player;
        piecePlayer && playersWithKings.add(piecePlayer);
      }
      if (!anyValidMoves && !!getPiece(startX, startY, chessState.squares)) {
        for (let endX = 0; endX < squaresPerRow; endX++) {
          for (let endY = 0; endY < squaresPerRow; endY++) {
            if (!anyValidMoves) {
              if (isValidMove(chessState, startX, startY, endX, endY)) {
                anyValidMoves = true;
              }
            }
          }
        }
      }
    }
  }
  if (playersWithKings.size === 1) {
    if (playersWithKings.has(Players.White)) {
      return Players.White;
    }
    return Players.Black;
  }
  if (!anyValidMoves) {
    return "tie";
  }
};

export const getValidMoves = (chessState: ChessState) => {
  const validMoves: ValidMoves = {};
  for (let x = 0; x < squaresPerRow; x++) {
    for (let y = 0; y < squaresPerRow; y++) {
      validMoves[`x${x}y${y}`] = [];
      for (let investigateX = 0; investigateX < squaresPerRow; investigateX++) {
        validMoves[`x${x}y${y}`][investigateX] = [];
        for (
          let investigateY = 0;
          investigateY < squaresPerRow;
          investigateY++
        ) {
          validMoves[`x${x}y${y}`][investigateX].push(
            isValidMove(chessState, x, y, investigateX, investigateY)
          );
        }
      }
    }
  }
  return validMoves;
};
