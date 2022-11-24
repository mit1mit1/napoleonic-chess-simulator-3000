<script lang="ts">
import ChessBoard from './components/ChessBoard.vue';
import DialogOverlay from './components/DialogOverlay.vue';
import TranslatableText from './components/TranslatableText.vue';
import { Languages, Locations, Players } from "./types";
import DividedFrance from './components/DividedFrance.vue';
import { startMusic } from "./utils/music";
import { initialDialogs } from "./initialDialogs";
import { defineComponent } from "vue";
let displayChessBoard = false;
let displayDividedFrance = true;
let displayDialogOverlay = true;
const availableDialogs = [...initialDialogs];

const currentLines = availableDialogs.find(dialog => dialog.triggerCondition())?.lines ?? [];

let attackedLocation: Locations | undefined = undefined;
export default defineComponent({
    data() {
        return {
            Languages, displayChessBoard, displayDividedFrance, displayDialogOverlay, availableDialog: currentLines, attackedLocation
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

        onSoundTrigger() {
            startMusic();
        }
    },

    components: {
        ChessBoard, DividedFrance, TranslatableText, DialogOverlay
    }
});
</script>

<template>
    <main>
        <h1>
            <TranslatableText :from-language="Languages.English" :to-language="Languages.French"
                text="Napoleonic Chess Simulator 0.01" />
        </h1>
        <div class="game-screen" id="musical-box">
            <ChessBoard v-if="displayChessBoard" :onVictory="onVictory" :attacked-location="attackedLocation" />
            <DividedFrance v-if="displayDividedFrance" :onAttackLocation="onAttackLocation" />
            <DialogOverlay v-if="displayDialogOverlay"
                :on-finished-dialog="() => displayDialogOverlay = !displayDialogOverlay"
                :dialog-lines="availableDialog" />
            <button :onclick="onSoundTrigger">Music?</button>
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