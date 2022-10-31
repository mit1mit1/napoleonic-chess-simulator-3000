import { ChessPieces, Players } from "@/types";
import type { Square, ChessState } from "@/types";
import { chessBoardLength, INFINITE_VALUE } from "@/constants";

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
        hasPieceOfType(0, startY, ChessPieces.Rook, squares) &&
        isValidMove(chessState, 0, startY, (startX + endX) / 2, endY)
      ) {
        return true;
      }
      if (
        startX < endX &&
        hasPieceOfType(
          chessBoardLength - 1,
          startY,
          ChessPieces.Rook,
          squares
        ) &&
        isValidMove(
          chessState,
          chessBoardLength - 1,
          startY,
          (startX + endX) / 2,
          endY
        )
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
  const randomNumber = Math.floor(Math.random() * (chessBoardLength - 1));
  return 1 + randomNumber + (randomNumber % 2);
};
const getFirstValue = () => {
  return Math.floor(Math.random() * 8);
};

export const getGreediestMove = (
  chessState: ChessState,
  recursionDepth: number,
  maxRecursionDepth: number,
  recursionProbability: number
) => {
  const bestMove = {
    startX: -1,
    startY: -1,
    endX: -1,
    endY: -1,
    moveValue: undefined as number | undefined,
  };
  const firstX = getFirstValue();
  const firstY = getFirstValue();
  const xCoprime = getCoprimeWithEight();
  const yCoprime = getCoprimeWithEight();
  for (
    let startXMultiplier = 0;
    startXMultiplier < chessBoardLength;
    startXMultiplier++
  ) {
    const startX = ((startXMultiplier + firstX) * xCoprime) % 8;
    for (
      let startYMultiplier = 0;
      startYMultiplier < chessBoardLength;
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
        for (let endX = 0; endX < chessBoardLength; endX++) {
          for (let endY = 0; endY < chessBoardLength; endY++) {
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
      copiedState.squares[startX - 1][startY] = copiedState.squares[0][startY];
      copiedState.squares[0][startY] = undefined;
    }
    if (startX < endX) {
      if (!copiedState.squares[startX + 1]) {
        copiedState.squares[startX + 1] = [];
      }
      copiedState.squares[startX + 1][startY] =
        copiedState.squares[chessBoardLength - 1][startY];
      copiedState.squares[chessBoardLength - 1][startY] = undefined;
    }
  }

  copiedState.currentPlayer =
    chessState.currentPlayer === Players.White ? Players.Black : Players.White;
  copiedState.squares[endX][endY] = copiedState.squares[startX][startY];
  copiedState.squares[startX][startY] = undefined;

  return copiedState;
};

export const getVictor = (chessState: ChessState): Players | "tie" | undefined => {
  const playersWithKings = new Set([] as Players[]);
  let anyValidMoves = false;
  for (let startX = 0; startX < chessBoardLength; startX++) {
    for (let startY = 0; startY < chessBoardLength; startY++) {
      if (
        hasPieceOfType(startX, startY, ChessPieces.King, chessState.squares)
      ) {
        const piecePlayer = chessState.squares[startX][startY]?.player;
        piecePlayer && playersWithKings.add(piecePlayer);
      }
      if (!anyValidMoves && !!getPiece(startX, startY, chessState.squares)) {
        for (let endX = 0; endX < chessBoardLength; endX++) {
          for (let endY = 0; endY < chessBoardLength; endY++) {
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
