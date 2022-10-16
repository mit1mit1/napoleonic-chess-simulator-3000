<script setup lang="ts">
import NapoleonFigure from './vue-svgs/NapoleonFigure.vue';
import SoldierFigure from './vue-svgs/SoldierFigure.vue';
import ChessBoard from './components/ChessBoard.vue';
</script>

<template>
    <main>
        <h1>Napoleonic Chess Simulator 3000</h1>
        <svg height="300" width="350">
            <NapoleonFigure />
        </svg>
        <ChessBoard />
        <svg height="300" width="250">
            <SoldierFigure />
        </svg>
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