<script lang="ts">
import { defineComponent } from "vue";
import type { Languages } from "../types";
import { translate } from "../utils/translate";

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
            const translatedWords = translate(word, this.fromLanguage as Languages, this.toLanguage as Languages);
            if (translatedWords.length === 0) {
                const originalLanguageMessage = new SpeechSynthesisUtterance();
                originalLanguageMessage.text = word;
                originalLanguageMessage.lang = this.toLanguage ?? "en";
                window.speechSynthesis.speak(originalLanguageMessage);
            }
            this.displayWords[word] = translatedWords ?? {};
            let index = 0;
            for (let translatedWord of translatedWords) {
                if (index === 0) {
                    this.showTranslationCard = word;
                    setTimeout(() => {
                        const translatedMessage = new SpeechSynthesisUtterance();
                        translatedMessage.text = translatedWord;
                        translatedMessage.lang = this.toLanguage ?? "en";
                        window.speechSynthesis.speak(translatedMessage);
                    }, 2000 * index)
                    index++;
                }
            }
            setTimeout(() => {
                if (this.showTranslationCard == word) {
                    this.showTranslationCard = "";
                };
            }, 2000 * index)
        }
    },
});
</script>

<template>
    <span class="positionParent" v-for="word in splitText" v-bind:key="word">
        <a :onClick="() => handleTranslate(word)" class="translatableText">
            {{ word + " " }}
        </a>
        <div v-if="showTranslationCard === word && displayWords[word] && displayWords[word].length > 0" class="translationCard">
            <div v-for="displayWord in displayWords[word]" class="translationLine">{{displayWord}}</div>
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
    background-color: white;
    display: inline-block;
    width: 150px;
    font-size: medium;
    z-index: 2;
    top: 50px;
    left: 0px;
    right: 0px;
}
</style>
