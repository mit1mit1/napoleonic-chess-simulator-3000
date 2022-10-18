<script lang="ts">
import { ChessPieces, Players } from "@/types";
import { normalStartingChessBoard } from "@/constants";
import { hasPieceOfColor, isValidMove } from "@/utils/chess";
import { defineComponent } from "vue";
import ChessPieceFigure from "./ChessPieceFigure.vue";
const length = 400;
let selectedSquareX = -1;
let selectedSquareY = -1;
let currentPlayer = Players.White

const squarePieces = normalStartingChessBoard;
const lightSquareColor = "#fcf9e6";
const darkSquareColor = "#c7b3a3";
export default defineComponent({
    data() {
        return {
            length, squarePieces, selectedSquareX, selectedSquareY, ChessPieces, Players, lightSquareColor,
            darkSquareColor, squareIndicies: [...Array(8).keys()], currentPlayer
        }
    },

    methods: {
        handleClick(x: number, y: number) {
            const isPieceSelected = () => {
                return hasPieceOfColor(this.selectedSquareX, this.selectedSquareY, this.currentPlayer, this.squarePieces)
            }
            const hasPlayersPiece = () => {
                return hasPieceOfColor(x, y, this.currentPlayer, this.squarePieces)
            }
            if (isPieceSelected()) {
                if (isValidMove(this.squarePieces, this.selectedSquareX, this.selectedSquareY, x, y)) {
                    this.squarePieces[x][y] = this.squarePieces[this.selectedSquareX][this.selectedSquareY];
                    delete this.squarePieces[this.selectedSquareX][this.selectedSquareY];
                    this.selectedSquareX = -1;
                    this.selectedSquareY = -1;
                    this.currentPlayer = this.currentPlayer === Players.White ? Players.Black : Players.White;
                }
            }
            if (hasPlayersPiece()) {
                this.selectedSquareX = x;
                this.selectedSquareY = y;
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
            <g class="chessSquare" :onClick="() => handleClick(x, y)" v-for="y in squareIndicies"
                v-bind:key="`square-${x}-${y}`">
                <rect :height="length/8" :width="length/8" :x="x*length/8" :y="y*length/8"
                    :fill="((x + y) % 2) ? lightSquareColor : darkSquareColor" />
                <rect :height="(length * 0.9)/8" :width="(length * 0.9)/8" :x="(x+0.05)*length/8" :y="(y+0.05)*length/8"
                    :fill="selectedSquareX === x && selectedSquareY === y ? '#a34b9a' : 'transparent'" />

                <g v-if="squarePieces[x] && squarePieces[x][y]?.piece"
                    :transform="`translate(${x*length/8 + 2}, ${y*length/8})`">
                    <ChessPieceFigure :piece="squarePieces[x][y]?.piece" :player="squarePieces[x][y]?.player" />
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
