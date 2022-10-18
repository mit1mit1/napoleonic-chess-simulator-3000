<script lang="ts">
import { ChessPieces, Players } from "@/types";
import { defineComponent } from "vue";
import BlackPawn from "../vue-svgs/chess/BlackPawn.vue";
import WhitePawn from "../vue-svgs/chess/WhitePawn.vue";
import BlackKing from "../vue-svgs/chess/BlackKing.vue";
import WhiteKing from "../vue-svgs/chess/WhiteKing.vue";
import BlackQueen from "../vue-svgs/chess/BlackQueen.vue";
import WhiteQueen from "../vue-svgs/chess/WhiteQueen.vue";
import BlackBishop from "../vue-svgs/chess/BlackBishop.vue";
import WhiteBishop from "../vue-svgs/chess/WhiteBishop.vue";
import BlackKnight from "../vue-svgs/chess/BlackKnight.vue";
import WhiteKnight from "../vue-svgs/chess/WhiteKnight.vue";
import BlackRook from "../vue-svgs/chess/BlackRook.vue";
import WhiteRook from "../vue-svgs/chess/WhiteRook.vue";

export default defineComponent({
    props: {
        piece: Number,
        player: Number,

    },
    data(props) {
        return {
            ChessPieces, Players, piece: props.piece, player: props.player,
        }
    },
    components: {
        BlackPawn, WhitePawn,
        BlackKing, WhiteKing,
        BlackQueen, WhiteQueen,
        BlackBishop, WhiteBishop,
        BlackKnight, WhiteKnight,
        BlackRook, WhiteRook,
    }
});
</script>
<template>
    <BlackPawn v-if="piece === ChessPieces.Pawn && player === Players.Black" />
    <WhitePawn v-if="piece === ChessPieces.Pawn && player === Players.White" />
    <BlackKing v-if="piece === ChessPieces.King && player === Players.Black" />
    <WhiteKing v-if="piece === ChessPieces.King && player === Players.White" />
    <BlackQueen v-if="piece === ChessPieces.Queen && player === Players.Black" />
    <WhiteQueen v-if="piece === ChessPieces.Queen && player === Players.White" />
    <BlackBishop v-if="piece === ChessPieces.Bishop && player === Players.Black" />
    <WhiteBishop v-if="piece === ChessPieces.Bishop && player === Players.White" />
    <BlackKnight v-if="piece === ChessPieces.Knight && player === Players.Black" />
    <WhiteKnight v-if="piece === ChessPieces.Knight && player === Players.White" />
    <BlackRook v-if="piece === ChessPieces.Rook && player === Players.Black" />
    <WhiteRook v-if="piece === ChessPieces.Rook && player === Players.White" />
</template>

<style>
.chessSquare {
    cursor: pointer;
}
</style>
