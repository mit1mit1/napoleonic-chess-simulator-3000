<script lang="ts">
import { defineComponent } from "vue";
import { Languages } from "../types";
import { translate } from "../utils/translate";

export default defineComponent({
    props: {
        fromLanguage: String,
        toLanguage: String,
        text: String,
        setTranslatedWord: Function,
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
            if (translatedWords.length === 0) {
                const originalLanguageMessage = new SpeechSynthesisUtterance();
                originalLanguageMessage.text = word;
                originalLanguageMessage.lang = Languages.French;
                window.speechSynthesis.speak(originalLanguageMessage);
            }
            this.displayWords[word] = translatedWords ?? {};
            let index = 0;
            for (let translatedWord of translatedWords) {
                if (index === 0) {
                    this.setTranslatedWord && this.setTranslatedWord(word, this.fromLanguage, this.toLanguage);
                    this.showTranslationCard = word;
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
            setTimeout(() => {
                if (this.showTranslationCard == word) {
                    this.setTranslatedWord && this.setTranslatedWord("");
                    this.showTranslationCard = "";
                }
            }, 5000 * index)
        }
    },
});
</script>

<template>
    <span class="positionParent" v-for="word, index in splitText" v-bind:key="word">
        <a :onClick="() => handleTranslate(word)" class="translatableText">
            {{ word }}{{ index < splitText.length - 1 ? " " : "" }} </a>
                <div v-if="showTranslationCard === word && displayWords[word] && displayWords[word].length > 0"
                    class="translationCard">
                    <div v-for="displayWord in displayWords[word]" v-bind:key="displayWord" class="translationLine">{{
                            displayWord
                    }}</div>
                </div>
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

.translationCard {
    position: absolute;
    padding: 5px 4px 0px 4px;
    background-color: rgb(205, 205, 205);
    border-color: aqua;
    display: inline-block;
    width: 150px;
    font-size: medium;
    z-index: 2;
    top: 50px;
    left: 0px;
    right: 0px;
}
</style>
