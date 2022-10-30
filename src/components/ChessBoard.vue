<script lang="ts">
import { ChessPieces, Players } from "@/types";
import type { ChessState } from "@/types";
import { chessBoardLength, normalStartingChessBoard } from "@/constants";
import { getGreediestMove, hasPieceOfColor, isValidMove, getStateAfterMove } from "@/utils/chess";
import { defineComponent } from "vue";
import ChessPieceFigure from "./ChessPieceFigure.vue";
const length = 400;
let selectedSquareX = -1;
let selectedSquareY = -1;
let aiPlayers = [Players.Black];
let startedGame = false;
let chessState = {
    squares: normalStartingChessBoard,
    currentPlayer: Players.White,
    kingsMoved: [],

} as ChessState;

const lightSquareColor = "#fcf9e6";
const darkSquareColor = "#c7b3a3";
export default defineComponent({
    data() {
        return {
            length, chessState, selectedSquareX, selectedSquareY, ChessPieces, Players, lightSquareColor,
            darkSquareColor, squareIndicies: [...Array(chessBoardLength).keys()], aiPlayers, startedGame,
            chessBoardLength
        }
    },

    methods: {
        handleSquareClick(x: number, y: number) {
            this.startedGame = true;
            if (this.aiPlayers.includes(this.chessState.currentPlayer)) {
                this.attemptAIMove();
                return;
            }
            const isPieceSelected = () => {
                return hasPieceOfColor(this.selectedSquareX, this.selectedSquareY, this.chessState.currentPlayer, this.chessState.squares)
            }
            const hasPlayersPiece = () => {
                return hasPieceOfColor(x, y, this.chessState.currentPlayer, this.chessState.squares)
            }
            if (isPieceSelected()) {
                if (isValidMove({ squares: this.chessState.squares, kingsMoved: [], currentPlayer: this.chessState.currentPlayer }, this.selectedSquareX, this.selectedSquareY, x, y)) {
                    this.makeMove(x, y);
                }
            }
            if (hasPlayersPiece()) {
                this.selectedSquareX = x;
                this.selectedSquareY = y;
            }
            setTimeout(this.attemptAIMove, 1);
        },
        makeMove(x: number, y: number) {
            this.chessState = getStateAfterMove(this.chessState, this.selectedSquareX, this.selectedSquareY, x, y);
            this.selectedSquareX = -1;
            this.selectedSquareY = -1;
        },
        attemptAIMove() {
            if (this.aiPlayers.includes(this.chessState.currentPlayer)) {
                const { startX, startY, endX, endY } = getGreediestMove(this.chessState, 0, 1, 1);
                if (isValidMove(this.chessState, startX, startY, endX, endY)) {
                    this.selectedSquareX = startX;
                    this.selectedSquareY = startY;
                    this.makeMove(endX, endY);
                }
            }
        }
    },

    components: {
        ChessPieceFigure
    }
});
</script>

<template>
    <svg :height="length" :width="length">
        <g v-for="x in squareIndicies" v-bind:key="`row-${x}`">
            <g :class="!(aiPlayers.includes(chessState.currentPlayer) && startedGame) && 'chessSquare'"
                :onClick="() => handleSquareClick(x, y)" v-for="y in squareIndicies" v-bind:key="`square-${x}-${y}`">
                <rect :height="length/chessBoardLength" :width="length/chessBoardLength" :x="x*length/chessBoardLength"
                    :y="y*length/chessBoardLength" :fill="((x + y) % 2) ? darkSquareColor : lightSquareColor" />
                <rect :height="(length * 0.9)/chessBoardLength" :width="(length * 0.9)/chessBoardLength"
                    :x="(x+0.05)*length/chessBoardLength" :y="(y+0.05)*length/chessBoardLength"
                    :fill="selectedSquareX === x && selectedSquareY === y ? '#a34b9a' : 'transparent'" />

                <g v-if="chessState.squares[x] && chessState.squares[x][y]?.piece"
                    :transform="`translate(${x*length/chessBoardLength + 2}, ${y*length/chessBoardLength})`">
                    <ChessPieceFigure :piece="chessState.squares[x][y]?.piece" :player="chessState.squares[x][y]?.player" />
                </g>
            </g>
        </g>
    </svg>
    <div class="loadingMessage" v-if="aiPlayers.includes(chessState.currentPlayer) && startedGame">Thinking...</div>
    <div class="loadingMessage" v-if="aiPlayers.includes(chessState.currentPlayer) && !startedGame">Click to start</div>
</template>

<style>
.clickable {
    cursor: pointer;
}

.loadingMessage {
    position: absolute;
}
</style>
