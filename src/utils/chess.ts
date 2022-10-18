import { ChessPieces, Players } from "@/types";
import type { Square } from "@/types";

export const hasPiece = (
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
  return hasPiece(x, y, squares) && squares[x][y]?.player === player;
};

export const hasPieceOfType = (
  x: number,
  y: number,
  type: ChessPieces,
  squares: Array<Array<Square | undefined>>
) => {
  return hasPiece(x, y, squares) && squares[x][y]?.piece === type;
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
      if (hasPiece(investigateX, investigateY, squares)) {
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
      if (hasPiece(investigateX, investigateY, squares)) {
        return true;
      }
      i++;
    }
  }
  return false;
};

export const isValidMove = (
  squares: Array<Array<Square | undefined>>,
  startX: number,
  startY: number,
  endX: number,
  endY: number
) => {
  if (startX === endX && startY === endY) {
    return false;
  }
  const movingPiece =
    squares[startX] &&
    squares[startX][startY] &&
    squares[startX][startY]?.piece;
  const currentPlayer =
    squares[startX] &&
    squares[startX][startY] &&
    squares[startX][startY]?.player;

  if (!movingPiece) {
    return false;
  }
  if (!currentPlayer) {
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
        return !hasPiece(startX, startY - 1, squares);
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
    return false;
  }

  return false;
};
