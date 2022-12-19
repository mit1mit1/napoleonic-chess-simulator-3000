<script lang="ts">
import NapoleonFigure from "@/vue-svgs/NapoleonFigure.vue";
import TranslatableText from "@/components/TranslatableText.vue";
import SoldierFigure from "@/vue-svgs/SoldierFigure.vue";
import { defineComponent, reactive } from "vue";
import { type DialogLine, Languages } from "@/types";
import { initialDialogs } from "@/constants/initialDialogs";
import { gameState } from "@/gameState";
const availableDialogs = reactive([...initialDialogs]);
let dialogLineNumber = 0;
let displayDialogOverlay = false;

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
        dialogLines: Array<DialogLine>,
        setTranslatedWord: Function,
    },

    data(props) {
        return {
            dataDialogLines: props.dialogLines, dialogLineNumber, displayDialogOverlay,
        }
    },


    methods: {
        handleFinished() {
            if (this.currentDialog) {
                this.currentDialog.triggered = true;
                this.dialogLineNumber = 0;
            }

        },
        incrementLine() {
            if (this.dialogLineNumber === 0) {
                this.readLine(this.dialogLineNumber);
            }
            if (this.dialogLineNumber + 1 < (this.currentDialog?.lines?.length ?? 0)) {
                this.dialogLineNumber = this.dialogLineNumber + 1;
                this.readLine(this.dialogLineNumber)
            }
        },
        decrementLine() {
            if (this.dialogLineNumber > 0) {
                this.dialogLineNumber = this.dialogLineNumber - 1;
                this.readLine(this.dialogLineNumber)
            }
        },
        readLine(lineNumber: number) {
            const newUtterence = new SpeechSynthesisUtterance();
            const readLine = this.currentDialog?.lines[lineNumber];
            readLine?.chunks.forEach(chunk => {
                newUtterence.text = newUtterence.text.concat(" ", chunk.words);
            })
            newUtterence.lang = getLang(readLine?.speaker ?? "", "fr");
            const customVoice = getVoice(readLine?.speaker ?? "");
            newUtterence.rate = getRate(readLine?.speaker ?? "");
            if (customVoice) {
                newUtterence.voice = customVoice;
            }
            window.speechSynthesis.speak(newUtterence);
        }
    },

    computed: {
        currentDialog() {
            const dialog = availableDialogs.find(dialog => dialog.triggerCondition(gameState) && !dialog.triggered);
            if (dialog) {
                setTimeout(() => { this.displayDialogOverlay = true }, dialog.delayMilliseconds);
                return dialog;
            } else {
                this.displayDialogOverlay = false;
                return undefined;
            }
        },
        currentLine() {
            return this.currentDialog?.lines[this.dialogLineNumber]
        },
    },

    components: {
        NapoleonFigure, SoldierFigure, TranslatableText,
    }
});
</script>

<template>
    <div v-if="currentDialog !== undefined && displayDialogOverlay">
        <div class="greyBackground" :onclick="handleFinished"></div>
        <div class="visibleModal">
            <div class="modalContent" @keyup.esc="handleFinished" tabindex="0">
                <button class="modalCloseButton napoleonic-button" :onclick="handleFinished">x</button>
                <h2 class="modalTitle">{{ currentLine?.speaker }}</h2>
                <div class="speaker-div">
                    <svg class="speaker-svg" v-if="currentLine?.speaker === 'Napoleon'" viewBox="0 0 300 350"
                        height="200" width="200" xmlns="http://www.w3.org/2000/svg">
                        <NapoleonFigure />
                    </svg>
                    <svg class="speaker-svg" v-if="currentLine?.speaker === 'Pierre'" viewBox="0 0 300 350" height="200"
                        width="200">
                        <SoldierFigure />
                    </svg>
                </div>
                <div v-if="currentLine" class="textBlock">
                    <TranslatableText v-for="chunk in  currentDialog?.lines[dialogLineNumber].chunks ?? []"
                        v-bind:key="chunk.words" :from-language="chunk.fromLanguage" :to-language="chunk.toLanguage"
                        :text="chunk.words" :setTranslatedWord="setTranslatedWord" />
                </div>
                <div>
                    <!-- <button v-if="dialogLineNumber > 0" :onclick="decrementLine">Prev</button> -->
                    <button class="napoleonic-button " v-if="dialogLineNumber + 1 < currentDialog.lines.length"
                        :onclick="incrementLine">Next</button>
                    <button class="napoleonic-button" v-else :onclick="handleFinished">Close</button>
                </div>
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