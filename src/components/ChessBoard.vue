<script lang="ts">
import { ChessPieces, Players } from "@/types";
import { normalStartingChessBoard } from "@/constants";
import { getAIMove, hasPieceOfColor, isValidMove } from "@/utils/chess";
import { defineComponent } from "vue";
import ChessPieceFigure from "./ChessPieceFigure.vue";
const length = 400;
let selectedSquareX = -1;
let selectedSquareY = -1;
let currentPlayer = Players.White;
let aiPlayers = [Players.White];

const squares = normalStartingChessBoard;
const lightSquareColor = "#fcf9e6";
const darkSquareColor = "#c7b3a3";
export default defineComponent({
    data() {
        return {
            length, squares, selectedSquareX, selectedSquareY, ChessPieces, Players, lightSquareColor,
            darkSquareColor, squareIndicies: [...Array(8).keys()], currentPlayer, aiPlayers
        }
    },

    methods: {
        handleSquareClick(x: number, y: number) {
            if (this.aiPlayers.includes(this.currentPlayer)) {
                this.attemptAIMove();
                return;
            }
            const isPieceSelected = () => {
                return hasPieceOfColor(this.selectedSquareX, this.selectedSquareY, this.currentPlayer, this.squares)
            }
            const hasPlayersPiece = () => {
                return hasPieceOfColor(x, y, this.currentPlayer, this.squares)
            }
            if (isPieceSelected()) {
                if (isValidMove(this.squares, this.selectedSquareX, this.selectedSquareY, x, y)) {
                    this.makeMove(x, y);
                }
            }
            if (hasPlayersPiece()) {
                this.selectedSquareX = x;
                this.selectedSquareY = y;
            }
            this.attemptAIMove();
        },
        makeMove(x: number, y: number) {
            this.squares[x][y] = this.squares[this.selectedSquareX][this.selectedSquareY];
            delete this.squares[this.selectedSquareX][this.selectedSquareY];
            this.selectedSquareX = -1;
            this.selectedSquareY = -1;
            this.currentPlayer = this.currentPlayer === Players.White ? Players.Black : Players.White;
        },
        attemptAIMove() {
            if (this.aiPlayers.includes(this.currentPlayer)) {
                const [startX, startY, endX, endY] = getAIMove(this.squares, this.currentPlayer);
                if (isValidMove(this.squares, startX, startY, endX, endY)) {
                    setTimeout(() => {
                        this.selectedSquareX = startX;
                        this.selectedSquareY = startY;
                        this.makeMove(endX, endY);
                    }, 100);

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
            <g class="chessSquare" :onClick="() => handleSquareClick(x, y)" v-for="y in squareIndicies"
                v-bind:key="`square-${x}-${y}`">
                <rect :height="length/8" :width="length/8" :x="x*length/8" :y="y*length/8"
                    :fill="((x + y) % 2) ? lightSquareColor : darkSquareColor" />
                <rect :height="(length * 0.9)/8" :width="(length * 0.9)/8" :x="(x+0.05)*length/8" :y="(y+0.05)*length/8"
                    :fill="selectedSquareX === x && selectedSquareY === y ? '#a34b9a' : 'transparent'" />

                <g v-if="squares[x] && squares[x][y]?.piece" :transform="`translate(${x*length/8 + 2}, ${y*length/8})`">
                    <ChessPieceFigure :piece="squares[x][y]?.piece" :player="squares[x][y]?.player" />
                </g>
            </g>
        </g>
    </svg>
</template>

<style>
.chessSquare {
    cursor: pointer;
}
</style>
