<script lang="ts">
import NapoleonFigure from "@/vue-svgs/NapoleonFigure.vue";
import TranslatableText from "@/components/TranslatableText.vue";
import SoldierFigure from "@/vue-svgs/SoldierFigure.vue";
import { defineComponent } from "vue";

let dialogLineNumber = 0;
let line = [] as Array<{ words: string, fromLanguage: string, toLanguage: string }>;
let speaker = ""
export default defineComponent({
    props: {
        onFinishedDialog: Function,
        dialogLines: Array,
        setTranslatedWord: Function,
    },

    data(props) {
        if (props.dialogLines && line.length === 0) {
            const dialogLine = (props.dialogLines[dialogLineNumber] as { line: Array<{ words: string, fromLanguage: string, toLanguage: string }>, speaker: string });
            line = dialogLine.line;
            speaker = dialogLine.speaker;
        }
        return {
            dataDialogLines: props.dialogLines, dialogLineNumber, line, lineCount: props.dialogLines?.length ?? 0, speaker
        }
    },

    methods: {
        handleFinished() {
            if (this.onFinishedDialog) {
                this.onFinishedDialog();
            }
        },
        incrementLine() {
            if (this.dialogLineNumber + 1 < this.lineCount) {
                this.dialogLineNumber = this.dialogLineNumber + 1;
                const dialogLine = ((this.dataDialogLines ? this.dataDialogLines[this.dialogLineNumber] : []) as { line: Array<{ words: string, fromLanguage: string, toLanguage: string }>, speaker: string });
                this.line = dialogLine.line;
                this.speaker = dialogLine.speaker;
            }
        },
        decrementLine() {
            if (this.dialogLineNumber > 0) {
                this.dialogLineNumber = this.dialogLineNumber - 1;
                const dialogLine = ((this.dataDialogLines ? this.dataDialogLines[this.dialogLineNumber] : []) as { line: Array<{ words: string, fromLanguage: string, toLanguage: string }>, speaker: string });
                this.line = dialogLine.line;
                this.speaker = dialogLine.speaker;
            }
        },
    },

    components: {
        NapoleonFigure, SoldierFigure, TranslatableText,
    }
});
</script>

<template>
    <div class="greyBackground" :onclick="handleFinished"></div>
    <div class="visibleModal">
        <div class="modalContent" @keyup.esc="handleFinished" tabindex="0">
            <button class="modalCloseButton napoleonic-button" :onclick="handleFinished">x</button>
            <div>
                <h2 class="modalTitle">{{ speaker }}</h2>
                <svg class="speaker-svg" v-if="speaker === 'Napoleon'" viewBox="0 0 300 350" height="200" width="200"
                    xmlns="http://www.w3.org/2000/svg">
                    <NapoleonFigure />
                </svg>
                <svg class="speaker-svg" v-if="speaker === 'Pierre'" viewBox="0 0 300 350" height="200" width="200">
                    <SoldierFigure />
                </svg>
                <div v-if="lineCount > 0" class="textBlock">
                    <TranslatableText v-for="chunk in line" v-bind:key="chunk.words"
                        :from-language="chunk.fromLanguage" :to-language="chunk.toLanguage" :text="chunk.words"
                        :setTranslatedWord="setTranslatedWord" />
                </div>
            </div>
            <div>
                <!-- <button v-if="dialogLineNumber > 0" :onclick="decrementLine">Prev</button> -->
                <button class="napoleonic-button " v-if="dialogLineNumber + 1 < lineCount"
                    :onclick="incrementLine">Next</button>
                <button class="napoleonic-button" v-else :onclick="handleFinished">Close</button>
            </div>
        </div>
    </div>
</template>

<style>
.speaker-svg {
    max-height: 150px;
    max-width: 175px;
}

.textBlock {
    display: inline;
    text-align: center;
    height: 100%;
    font-family: 'Quicksand';
    vertical-align: top;
}

.visibleModal {
    position: absolute;
    left: 0;
    right: 0;
    top: 50px;
    align-items: center;
    justify-content: center;
    max-width: 1080px;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
}

@media screen and (max-height: 480px) {
    .visibleModal {
        height: -webkit-fill-available;
    }
}


.modalContent {
    width: 90%;
    background-color: #fff;
    color: #212121;
    padding: 20px 30px 25px 30px;
    height: inherit;
    overflow: auto;
    padding-bottom: 50px;
}

.modalTitle {
    margin-top: 0;
    font-family: Quicksand;
    text-align: left;
}

.invisibleModal {
    display: none;
}

.greyBackground {
    position: fixed;
    left: 0;
    right: 0;
    bottom: -50px;
    top: 0;
    background-color: #ffffff90;
}

.modalCloseButton {
    position: absolute;
    top: 5px;
    right: 50px;
    width: 40px;
    height: 40px;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
</style>