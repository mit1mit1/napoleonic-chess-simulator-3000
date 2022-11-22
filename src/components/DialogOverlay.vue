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
    },

    data(props) {
        if (props.dialogLines && line.length === 0) {
            const dialogLine = (props.dialogLines[dialogLineNumber] as { line: Array<{ words: string, fromLanguage: string, toLanguage: string }>, speaker: string });
            line = dialogLine.line;
            speaker = dialogLine.speaker;
        }
        return {
            dialogLines: props.dialogLines, dialogLineNumber, line, lineCount: props.dialogLines?.length ?? 0, speaker
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
                const dialogLine = ((this.dialogLines ? this.dialogLines[this.dialogLineNumber] : []) as { line: Array<{ words: string, fromLanguage: string, toLanguage: string }>, speaker: string });
                this.line = dialogLine.line;
                this.speaker = dialogLine.speaker;
            }
        },
        decrementLine() {
            if (this.dialogLineNumber > 0) {
                this.dialogLineNumber = this.dialogLineNumber - 1;
                const dialogLine = ((this.dialogLines ? this.dialogLines[this.dialogLineNumber] : []) as { line: Array<{ words: string, fromLanguage: string, toLanguage: string }>, speaker: string });
                this.line = dialogLine.line;
                this.speaker = dialogLine.speaker;
            }
        }

    },

    components: {
        NapoleonFigure, SoldierFigure, TranslatableText,
    }
});
</script>

<template>
    <div class="greyBackground" :onclick="handleFinished"></div>
    <div class="visibleModal">
        <div class="modalContent">
            <button class="modalCloseButton" :onclick="handleFinished">x</button>
            <svg height="300" width="350">
                <NapoleonFigure />
            </svg>
            <div v-if="lineCount > 0" class="textBlock">
                <h2>{{ speaker }}</h2>
                <TranslatableText v-for="chunk in line" :from-language="chunk.fromLanguage"
                    :to-language="chunk.toLanguage" :text="chunk.words" />
            </div>
            <svg height="300" width="250" class="rightCharacter">
                <SoldierFigure />
            </svg>
            <div>
                <!-- <button v-if="dialogLineNumber > 0" :onclick="decrementLine">Prev</button> -->
                <button v-if="dialogLineNumber + 1 < lineCount" :onclick="incrementLine">Next</button>
                <button v-else :onclick="handleFinished">Close</button>
            </div>
        </div>
    </div>
</template>

<style>
.rightCharacter {
    float: right;
}

.textBlock {
    display: inline;
    text-align: center;
    height: 100%;
}

.visibleModal {
    position: absolute;
    left: 0;
    right: 0;
    top: 50px;
    align-items: center;
    justify-content: center;
    top: 0;
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
    padding-bottom: 140px;
}

.modalTitle {
    margin-top: 0;
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
    top: 0px;
    right: 50px;
    width: 40px;
    height: 40px;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
</style>