<script lang="ts">
import NapoleonFigure from './vue-svgs/NapoleonFigure.vue';
import SoldierFigure from './vue-svgs/SoldierFigure.vue';
import ChessBoard from './components/ChessBoard.vue';
import TranslatableText from './components/TranslatableText.vue';
import { Languages, Locations, Players } from "./types";
import DividedFrance from './components/DividedFrance.vue';
import { defineComponent } from "vue";
let displayChessBoard = false;
let displayCharacters = false;
let displayDividedFrance = true;
export default defineComponent({
    data() {
        return {
            Languages, displayChessBoard, displayDividedFrance, displayCharacters
        }
    },

    methods: {
        onAttackLocation(attackedLocation: Locations) {
            this.displayDividedFrance = false;
            this.displayChessBoard = true;
        },
        
        onVictory(victor: Players | "tie") {
            alert(victor + " won!")
            this.displayDividedFrance = true;
            this.displayChessBoard = false;
        }
    },

    components: {
        NapoleonFigure, ChessBoard, SoldierFigure, DividedFrance, TranslatableText
    }
});
</script>

<template>
    <main>
        <h1>
            <TranslatableText :from-language="Languages.English" :to-language="Languages.French"
                text="Napoleonic Chess Simulator 0.01" />
        </h1>
        <div class="game-screen">
            <svg v-if="displayCharacters" height="300" width="350">
                <NapoleonFigure />
            </svg>
            <ChessBoard v-if="displayChessBoard" :onVictory="onVictory" />
            <DividedFrance v-if="displayDividedFrance" :onAttackLocation="onAttackLocation" />
            <svg v-if="displayCharacters" height="300" width="250">
                <SoldierFigure />
            </svg>
        </div>
    </main>
</template>

<style>
h1 {
    text-align: center;
    font-family: monospace;
    font-weight: normal;
}

html {
    background-color: #eee;
}

.game-screen {
    margin-left: auto;
    margin-right: auto;
    max-width: 1100px;
}
</style>