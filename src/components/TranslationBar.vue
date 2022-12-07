<script lang="ts">
import { Languages } from "@/types";
import { translate } from "@/utils/translate";
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        fromLanguage: String,
        toLanguage: String,
        translatedWord: String,
    },

    // data(props) {
    //     const translatedWords = translate(props.translatedWord ?? "", this.fromLanguage as Languages, this.toLanguage as Languages).translations;
    //     return { translatedWords }
    // },

    computed: {
        translationInfo() {
            return translate(this.translatedWord ?? "", this.fromLanguage as Languages, this.toLanguage as Languages)
        }

    },

    methods: {
        speakWord(word: string, language?: string) {
            const newUtterence = new SpeechSynthesisUtterance();
            newUtterence.text = word;
            newUtterence.lang = language ?? Languages.French;
            window.speechSynthesis.speak(newUtterence);
        }
    }
});
</script>

<template>
    <div class="translation-bar">
        <div v-if="translatedWord" class="translation-bar-text">
            <a class="readable-word" :onclick="() => speakWord(translationInfo.lookupWord, fromLanguage)">{{
                    translationInfo.lookupWord
            }}</a>
            ({{ fromLanguage }}):
            <span v-for="translationWord in translationInfo.translations">
                <a class="readable-word" :onclick="() => speakWord(translationWord, toLanguage)">
                    {{ translationWord }}
                </a>;
            </span>
            <span v-if="translationInfo.englishDefinition">
                <a class="readable-word" :onclick="() => speakWord(translationInfo.englishDefinition ?? '', 'en')">
                    {{ translationInfo.englishDefinition }}
                </a>.
            </span>


        </div>
    </div>
</template>

<style>
.translation-bar {
    background-color: #d3d5da;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 15px;
    min-height: 1.2em;
    font-size: 1em;
}

.readable-word {
    cursor: pointer;
}
</style>