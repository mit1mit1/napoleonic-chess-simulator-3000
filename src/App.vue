<script setup lang="ts">
import NapoleonFigure from './vue-svgs/NapoleonFigure.vue';
import SoldierFigure from './vue-svgs/SoldierFigure.vue';
import ChessBoard from './components/ChessBoard.vue';
import TranslatableText from './components/TranslatableText.vue';
import { Languages } from "./types";
</script>

<template>
    <main>
        <h1><TranslatableText :from-language="Languages.English" :to-language="Languages.French" text="Napoleonic Chess Simulator 3000" /></h1>
        <div class="game-screen">
            <svg height="300" width="350">
                <NapoleonFigure />
            </svg>
            <ChessBoard />
            <svg height="300" width="250">
                <SoldierFigure />
            </svg>
        </div>
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

.game-screen {
    margin-left: auto;
    margin-right: auto;
    max-width: 1100px;
}
</style>