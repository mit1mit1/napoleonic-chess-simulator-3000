<script lang="ts">
import { gameState } from "@/gameState";
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            gameState,
        }
    },


    // methods: {
    //     handleFinished() {
    //         if (this.currentDialog) {
    //             this.currentDialog.triggered = true;
    //             this.dialogLineNumber = 0;
    //         }

    //     },
    //     incrementLine() {
    //         if (this.dialogLineNumber === 0) {
    //             this.readLine(this.dialogLineNumber);
    //         }
    //         if (this.dialogLineNumber + 1 < (this.currentDialog?.lines?.length ?? 0)) {
    //             this.dialogLineNumber = this.dialogLineNumber + 1;
    //             this.readLine(this.dialogLineNumber)
    //         }
    //     },
    //     decrementLine() {
    //         if (this.dialogLineNumber > 0) {
    //             this.dialogLineNumber = this.dialogLineNumber - 1;
    //             this.readLine(this.dialogLineNumber)
    //         }
    //     },
    //     readLine(lineNumber: number) {
    //         const newUtterence = new SpeechSynthesisUtterance();
    //         const readLine = this.currentDialog?.lines[lineNumber];
    //         readLine?.chunks.forEach(chunk => {
    //             newUtterence.text = newUtterence.text.concat(" ", chunk.words);
    //         })
    //         newUtterence.lang = getLang(readLine?.speaker ?? "", "fr");
    //         const customVoice = getVoice(readLine?.speaker ?? "");
    //         newUtterence.rate = getRate(readLine?.speaker ?? "");
    //         if (customVoice) {
    //             newUtterence.voice = customVoice;
    //         }
    //         window.speechSynthesis.speak(newUtterence);
    //     }
    // },

    computed: {
    },

    // components: {
    //     NapoleonFigure, SoldierFigure, TranslatableText,
    // }
});
</script>

<template>
    <div class="toastContainer">
        <div v-for="message in gameState.toastMessages" class="toastBox">
            {{ message }}
        </div>
    </div>
</template>

<style>
.toastContainer {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 300px;

}

.toastBox {
    background-color: #d3d;
    overflow: hidden;
    width: 300px;
    margin-bottom: 20px;
    padding: 15px;
    min-height: 1.2em;
    font-size: 1em;
}
</style>