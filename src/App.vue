<script lang="ts">
import ChessBoard from './components/ChessBoard.vue';
import DialogOverlay from './components/DialogOverlay.vue';
import TranslatableText from './components/TranslatableText.vue';
import TranslationBar from './components/TranslationBar.vue';
import { Languages, Locations, Players } from "./types";
import DividedFrance from './components/DividedFrance.vue';
import { initialDialogs } from "./initialDialogs";
import { defineComponent } from "vue";
import MusicControl from './components/MusicControl.vue';
let displayChessBoard = false;
let displayDividedFrance = true;
let displayDialogOverlay = true;
const availableDialogs = [...initialDialogs];

const currentLines = availableDialogs.find(dialog => dialog.triggerCondition())?.lines ?? [];
let translatedWord = "";
let fromLanguage = Languages.English
let toLanguage = Languages.French;


let attackedLocation: Locations | undefined = undefined;
export default defineComponent({
    data() {
        return {
            Languages, displayChessBoard, displayDividedFrance, displayDialogOverlay, availableDialog: currentLines, attackedLocation, translatedWord, fromLanguage, toLanguage
        }
    },

    methods: {
        onAttackLocation(attackedLocation: Locations) {
            this.attackedLocation = attackedLocation;
            this.displayDividedFrance = false;
            this.displayChessBoard = true;
        },

        onVictory(victor: Players | "tie") {
            alert(victor + " won!")
            this.displayDividedFrance = true;
            this.displayChessBoard = false;
        },


        setTranslatedWord(word: string, fromLanguage: Languages, toLanguage: Languages) {
            this.translatedWord = word;
            this.fromLanguage = fromLanguage;
            this.toLanguage = toLanguage;
        }
    },

    components: {
        ChessBoard,
        DividedFrance,
        TranslatableText,
        DialogOverlay,
        TranslationBar,
        MusicControl
    }
});
</script>

<template>
    <main>
        <h1>
            <TranslatableText :setTranslatedWord="setTranslatedWord" :from-language="Languages.English"
                :to-language="Languages.French" text="Napoleonic Chess Simulator 0.01" />
        </h1>
        <div class="game-screen">
            <ChessBoard v-if="displayChessBoard" :onVictory="onVictory" :attacked-location="attackedLocation" />
            <DividedFrance v-if="displayDividedFrance" :onAttackLocation="onAttackLocation"
                :setTranslatedWord="setTranslatedWord" />
            <div class="music-control-box">
                <MusicControl />
            </div>
            <DialogOverlay v-if="displayDialogOverlay"
                :on-finished-dialog="() => displayDialogOverlay = !displayDialogOverlay" :dialog-lines="availableDialog"
                :setTranslatedWord="setTranslatedWord" />
        </div>
        <TranslationBar :translatedWord="translatedWord" :fromLanguage="fromLanguage" :toLanguage="toLanguage" />
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
    position: absolute;
    top: 40px;
}
</style>