<script setup lang="ts">
import EffectiveAltruismWhat from './comics/EffectiveAltruismWhat.vue';
import EffectiveAltruismWhy from './comics/EffectiveAltruismWhy.vue';
import IntroComic from './comics/IntroComic.vue';
import SydneyEvangelicalWhat from './comics/SydneyEvangelicalWhat.vue';
import SydneyEvangelicalWhy from './comics/SydneyEvangelicalWhy.vue';
import { getComicNumber } from './vue-comic-components/utils/comicNumber';
const comicList = ['intro', 'sydney_evangelical_what',
    'sydney_evangelical_why',
    'effective_altruism_what',
    'effective_altruism_why']
const comicNumber = getComicNumber(comicList);
</script>

<template>
    <main>
        <h1>MITT COMICS</h1>
        <IntroComic v-if="comicNumber == comicList.indexOf('intro')" :comicList="comicList" />
        <SydneyEvangelicalWhat :comicList="comicList"
            v-else-if="comicNumber == comicList.indexOf('sydney_evangelical_what')" />
        <SydneyEvangelicalWhy :comicList="comicList"
            v-else-if="comicNumber == comicList.indexOf('sydney_evangelical_why')" />
        <EffectiveAltruismWhat :comicList="comicList"
            v-else-if="comicNumber == comicList.indexOf('effective_altruism_what')" />
        <EffectiveAltruismWhy :comicList="comicList"
            v-else-if="comicNumber == comicList.indexOf('effective_altruism_why')" />
        <div v-else>Sorry, no comic at this address.</div>
    </main>
</template>

<style>
h1 {
    text-align: center;
    font-family: monospace;
    font-weight: normal;
}

html {
    background-color: #eee;
}
</style>