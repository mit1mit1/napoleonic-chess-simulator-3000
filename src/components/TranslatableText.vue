<script setup lang="ts">
import { Languages } from "../constants";
import { translate } from "../utils/translate";
const props = withDefaults(defineProps<{
    fromLanguage?: Languages;
    toLanguage?: Languages;
    text: string;
}>(), {
    fromLanguage: Languages.French,
    toLanguage: Languages.English,
    text: "",
});
const splitText = props.text.split(" ");
const handleTranslate = (word: string) => {
    const message = new SpeechSynthesisUtterance();
    message.text = word;
    message.lang = props.fromLanguage;
    window.speechSynthesis.speak(message);
    const tranlatedWords = translate(word, props.fromLanguage, props.toLanguage);
    for (let translatedWord of tranlatedWords) {
        const translatedMessage = new SpeechSynthesisUtterance();
        translatedMessage.text = translatedWord;
        translatedMessage.lang = props.toLanguage;
        window.speechSynthesis.speak(translatedMessage);
    }
}
</script>

<template>
    <a v-for="word in splitText" v-bind:key="word" :onClick="() => handleTranslate(word)" class="translatableText">
        {{ word + " " }}
    </a>
</template>

<style>
.translatableText {
    cursor: pointer;
}
</style>
