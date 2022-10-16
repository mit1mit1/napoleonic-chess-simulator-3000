<script lang="ts">
import BlackRook from "../vue-svgs/chess/BlackRook.vue";
import WhiteRook from "../vue-svgs/chess/WhiteRook.vue";
const length = 400;
let selectedSquareX = 4;
let selectedSquareY = 4;
enum ChessPieces {
    King,
    Queen,
    Bishop,
    Knight,
    Rook,
    Pawn,
}
enum Players {
    White,
    Black
}
const squarePieces = [[{ piece: ChessPieces.Rook, player: Players.Black }, { piece: ChessPieces.Rook, player: Players.White }]];
export default {
    data() {
        return {
            length, squarePieces, selectedSquareX, selectedSquareY, ChessPieces, Players
        }
    },

    methods: {
        handleClick(x: number, y: number) {
            this.selectedSquareX = x;
            this.selectedSquareY = y;
        }
    },

    components: {
        BlackRook, WhiteRook
    }
}
</script>

<template>
    <svg :height="length" :width="length">
        <g v-for="xPlusOne in 8" v-bind:key="`row-${xPlusOne}`">
            <g class="chessSquare" :onClick="() => handleClick(xPlusOne - 1, yPlusOne - 1)" v-for="yPlusOne in 8"
                v-bind:key="`square-${xPlusOne}-${yPlusOne}`">
                <rect :height="length/8" :width="length/8" :x="(xPlusOne-1)*length/8" :y="(yPlusOne-1)*length/8"
                    :fill="((xPlusOne + yPlusOne) % 2) ? '#d3e2e3' : '#c7b3a3'" />
                <rect :height="(length * 0.9)/8" :width="(length * 0.9)/8" :x="(xPlusOne-0.95)*length/8"
                    :y="(yPlusOne-0.95)*length/8"
                    :fill="selectedSquareX === (xPlusOne-1) && selectedSquareY === (yPlusOne-1) ? '#a34b9a' : 'transparent'" />
                <g :transform="`translate(${(xPlusOne-1)*length/8 + 2}, ${(yPlusOne-1)*length/8})`">
                    <BlackRook
                        v-if="squarePieces[(xPlusOne-1)] && squarePieces[(xPlusOne-1)][(yPlusOne-1)] && squarePieces[(xPlusOne-1)][(yPlusOne-1)].piece === ChessPieces.Rook && squarePieces[(xPlusOne-1)][(yPlusOne-1)].player === Players.Black" />
                    <WhiteRook
                        v-if="squarePieces[(xPlusOne-1)] && squarePieces[(xPlusOne-1)][(yPlusOne-1)] && squarePieces[(xPlusOne-1)][(yPlusOne-1)].piece === ChessPieces.Rook && squarePieces[(xPlusOne-1)][(yPlusOne-1)].player === Players.White" />
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
