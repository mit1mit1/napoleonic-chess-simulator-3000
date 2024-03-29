<script lang="ts">
import ChessBoard from './components/ChessBoard.vue';
import DialogOverlay from './components/DialogOverlay.vue';
import TranslatableText from './components/TranslatableText.vue';
import TranslationBar from './components/TranslationBar.vue';
import ToastNotification from './components/ToastNotification.vue';
import { Languages, Locations, } from "./types";
import DividedFrance from './components/DividedFrance.vue';
import { generateSassyFrenchMessage } from './utils/dialogue';
import { defineComponent } from "vue";
import { gameState } from "./gameState";
let displayChessBoard = false;
let displayDividedFrance = true;

let translatedWord = "";
let fromLanguage = Languages.English
let toLanguage = Languages.French;


let attackedLocation: Locations | undefined = undefined;
export default defineComponent({
    data() {
        return {
            Languages, displayChessBoard, displayDividedFrance, attackedLocation, translatedWord, fromLanguage, toLanguage, gameState
        }
    },

    methods: {
        onAttackLocation(attackedLocation: Locations) {
            this.attackedLocation = attackedLocation;
            this.displayDividedFrance = false;
            this.displayChessBoard = true;
        },

        onKingTaken(result: "win" | "loss" | "tie") {
            const message = generateSassyFrenchMessage(result);
            gameState.pushToastMessage(message);
            gameState.pushLocationChessResult(this.attackedLocation as Locations, result);
            this.displayDividedFrance = true;
            this.displayChessBoard = false;
        },
    },

    components: {
        ChessBoard,
        DividedFrance,
        TranslatableText,
        DialogOverlay,
        TranslationBar,
        ToastNotification,
    }
});
</script>

<template>
    <main>
        <h1>
            <TranslatableText :from-language="Languages.English" :to-language="Languages.French"
                text="Napoleonic Chess Simulator 0.05" />
        </h1>
        <div class="game-screen">
            <ChessBoard v-if="displayChessBoard" :onKingTaken="onKingTaken" :attacked-location="attackedLocation" />
            <DividedFrance v-if="displayDividedFrance" :onAttackLocation="onAttackLocation" />
            <DialogOverlay />
        </div>
        <TranslationBar :translatedWord="gameState.translatedWord" :fromLanguage="gameState.translatedWordFromLanguage"
            :toLanguage="gameState.translatedWordToLanguage" />
        <ToastNotification />
    </main>
</template>

<style>
h1 {
    text-align: center;
    font-family: monospace;
    font-weight: normal;
    margin-bottom: 20px;
}

html {
    background-color: #eee;
    font-family: Merriweather;
}

.game-screen {
    margin-left: auto;
    margin-right: auto;
    max-width: 1100px;
    margin-bottom: 100px;
}



.napoleonic-button {
    margin-right: 10px;
    margin-bottom: 5px;
    transition-duration: 0.4s;
    border: none;
    padding: 8px 12px;
    min-height: 40px;
    min-width: 100px;
    font-size: 0.95em;
    font-family: "Quicksand", sans-serif;
}

.napoleonic-button:hover {
    background-color: #ffb7c5;
    cursor: pointer;
}

.music-control-box {
    margin-top: 40px;
}
</style>