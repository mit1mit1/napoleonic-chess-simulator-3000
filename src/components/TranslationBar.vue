<script lang="ts">
import type { Languages } from "@/types";
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
        translatedWords() {
            return translate(this.translatedWord ?? "", this.fromLanguage as Languages, this.toLanguage as Languages).translations
        }

    }
});
</script>

<template>
    <div class="translation-bar">
        <div v-if="translatedWord" class="translation-bar-text">
            {{ translatedWord }} ({{ fromLanguage }}): {{ translatedWords }}
        </div>
    </div>
</template>

<style>
.translation-bar {
    background-color: #333;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 15px;
    min-height: 1.2em;
    font-size: 1em;
}
</style>