<script lang="ts">
import { defineComponent } from "vue";
import { Languages } from "../types";
import { translate } from "../utils/translate";
import { gameState } from "@/gameState";

export default defineComponent({
    props: {
        fromLanguage: String,
        toLanguage: String,
        text: String,
    },
    data() {
        return {
            displayWords: {} as Record<string, string[]>, showTranslationCard: ""
        }
    },

    computed: {
        splitText() {
            return this.text?.split(" ") ?? []
        }
    },

    methods: {
        handleTranslate(word: string) {
            if (!this.fromLanguage || !this.toLanguage) {
                return;
            }
            const translatedWords = translate(word, this.fromLanguage as Languages, this.toLanguage as Languages).translations;
            if (translatedWords.length === 0 && this.fromLanguage === Languages.English) {
                console.log('no transations for ', word)
                const originalLanguageMessage = new SpeechSynthesisUtterance();
                originalLanguageMessage.text = word;
                originalLanguageMessage.lang = Languages.French;
                window.speechSynthesis.speak(originalLanguageMessage);
            }
            this.displayWords[word] = translatedWords ?? {};
            let index = 0;
            for (let translatedWord of translatedWords) {
                if (index === 0) {
                    gameState.setTranslatedWord(word, this.fromLanguage as Languages, this.toLanguage as Languages);
                    if (this.toLanguage === Languages.French) {
                        setTimeout(() => {
                            const translatedMessage = new SpeechSynthesisUtterance();
                            translatedMessage.text = translatedWord;
                            translatedMessage.lang = Languages.French;
                            window.speechSynthesis.speak(translatedMessage);
                        }, 2000 * index)
                    }
                    index++;
                }
            }
            if (this.toLanguage !== Languages.French) {
                const originalLanguageMessage = new SpeechSynthesisUtterance();
                originalLanguageMessage.text = word;
                originalLanguageMessage.lang = Languages.French;
                window.speechSynthesis.speak(originalLanguageMessage);
            }
        }
    },
});
</script>

<template>
    <span class="positionParent" v-for="word, index in splitText" v-bind:key="word">
        <a :onClick="() => handleTranslate(word)" class="translatableText">
            {{ word }}{{ index < splitText.length - 1 ? " " : "" }} </a>
    </span>
</template>

<style>
.translatableText {
    cursor: pointer;
}

.positionParent {
    position: relative;
}

.translationLine {
    padding-bottom: 5px;
}
</style>
