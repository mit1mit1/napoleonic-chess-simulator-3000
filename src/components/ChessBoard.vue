<script lang="ts">
import { defineComponent } from "vue";
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
const lightSquareColor = "#fcf9e6";
const darkSquareColor = "#c7b3a3";
export default defineComponent({
    data() {
        return {
            length, squarePieces, selectedSquareX, selectedSquareY, ChessPieces, Players, lightSquareColor,
            darkSquareColor, squareIndicies: [...Array(8).keys()],
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
});
</script>

<template>
    <svg :height="length" :width="length">
        <g v-for="x in squareIndicies" v-bind:key="`row-${x}`">
            <g class="chessSquare" :onClick="() => handleClick(x, y)" v-for="y in squareIndicies"
                v-bind:key="`square-${x}-${y}`">
                <rect :height="length/8" :width="length/8" :x="(x)*length/8" :y="(y)*length/8"
                    :fill="((x + y) % 2) ? lightSquareColor : darkSquareColor" />
                <rect :height="(length * 0.9)/8" :width="(length * 0.9)/8" :x="(x+0.05)*length/8" :y="(y+0.05)*length/8"
                    :fill="selectedSquareX === (x) && selectedSquareY === (y) ? '#a34b9a' : 'transparent'" />
                <g :transform="`translate(${(x)*length/8 + 2}, ${(y)*length/8})`">
                    <BlackRook
                        v-if="squarePieces[(x)] && squarePieces[(x)][(y)] && squarePieces[(x)][(y)].piece === ChessPieces.Rook && squarePieces[(x)][(y)].player === Players.Black" />
                    <WhiteRook
                        v-if="squarePieces[(x)] && squarePieces[(x)][(y)] && squarePieces[(x)][(y)].piece === ChessPieces.Rook && squarePieces[(x)][(y)].player === Players.White" />
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
