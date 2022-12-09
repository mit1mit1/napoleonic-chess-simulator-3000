<script lang="ts">
import NapoleonFigure from "@/vue-svgs/NapoleonFigure.vue";
import TranslatableText from "@/components/TranslatableText.vue";
import SoldierFigure from "@/vue-svgs/SoldierFigure.vue";
import { defineComponent } from "vue";
import { type DialogLine, type DialogLineChunk, Languages } from "@/types";

let dialogLineNumber = 0;
let line = [] as Array<DialogLineChunk>;
let speaker = ""

const getLang = (speaker: string, fromLanguage: string) => {
    if (speaker === "Pierre") {
        return Languages.French;
    }
    if (speaker === "Napoleon") {
        return Languages.English;
    }
    return fromLanguage;
}

const getVoice = (speaker: string) => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();

    if (speaker === "Pierre") {
        return voices.find(voice => voice.name === "Google français");
    }
    if (speaker === "Napoleon") {
        return voices.find(voice => voice.name === "Microsoft James - English (Australia)");
    }
}

const getRate = (speaker: string) => {
    if (speaker === "Pierre") {
        return 1.2;
    }
    if (speaker === "Napoleon") {
        return 1.1;
    }
    return 1;
}

export default defineComponent({
    props: {
        onFinishedDialog: Function,
        dialogLines: Array<DialogLine>,
        setTranslatedWord: Function,
    },

    data(props) {
        if (props.dialogLines && line.length === 0) {
            const dialogLine = (props.dialogLines[dialogLineNumber] as DialogLine);
            if (dialogLine) {
                line = dialogLine.chunks;
                speaker = dialogLine.speaker;
            }
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
            if (this.dialogLineNumber === 0) {
                this.readLine();
            }
            if (this.dialogLineNumber + 1 < this.lineCount) {
                this.dialogLineNumber = this.dialogLineNumber + 1;
                const dialogLine = ((this.dataDialogLines ? this.dataDialogLines[this.dialogLineNumber] : []) as DialogLine);
                this.line = dialogLine.chunks;
                this.speaker = dialogLine.speaker;
                this.readLine()
            }
        },
        decrementLine() {
            if (this.dialogLineNumber > 0) {
                this.dialogLineNumber = this.dialogLineNumber - 1;
                const dialogLine = ((this.dataDialogLines ? this.dataDialogLines[this.dialogLineNumber] : []) as DialogLine);
                this.line = dialogLine.chunks;
                this.speaker = dialogLine.speaker;
                this.readLine()
            }
        },
        readLine() {
            const newUtterence = new SpeechSynthesisUtterance();
            this.line.forEach(chunk => {
                newUtterence.text = newUtterence.text.concat(" ", chunk.words);
            })
            newUtterence.lang = getLang(this.speaker, "fr");
            const customVoice = getVoice(this.speaker);
            newUtterence.rate = getRate(this.speaker);
            if (customVoice) {
                newUtterence.voice = customVoice;
            }
            window.speechSynthesis.speak(newUtterence);
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
        <div class="modalContent" @keyup.esc="handleFinished" tabindex="0">
            <button class="modalCloseButton napoleonic-button" :onclick="handleFinished">x</button>
            <h2 class="modalTitle">{{ speaker }}</h2>
            <div class="speaker-div">
                <svg class="speaker-svg" v-if="speaker === 'Napoleon'" viewBox="0 0 300 350" height="200" width="200"
                    xmlns="http://www.w3.org/2000/svg">
                    <NapoleonFigure />
                </svg>
                <svg class="speaker-svg" v-if="speaker === 'Pierre'" viewBox="0 0 300 350" height="200" width="200">
                    <SoldierFigure />
                </svg>
            </div>
            <div v-if="lineCount > 0" class="textBlock">
                <TranslatableText v-for="chunk in line" v-bind:key="chunk.words" :from-language="chunk.fromLanguage"
                    :to-language="chunk.toLanguage" :text="chunk.words" :setTranslatedWord="setTranslatedWord" />
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

.speaker-div {
    display: inline-block;
    height: 100%;
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
    min-height: 150px;
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