<script lang="ts">
import { gameState } from "@/gameState";
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            gameState,
        }
    },
});
</script>

<template>
    <div class="toastContainer">
        <div v-for="message in gameState.toastMessages" class="toastBox">
            {{ message }}
        </div>
    </div>
</template>

<style>
.toastContainer {
    position: fixed;
    bottom: 40px;
    right: 30px;
    width: 300px;

}

.toastBox {
    background-color: #eddddc;
    overflow: hidden;
    margin-bottom: 20px;
    padding: 15px 20px;
    min-height: 1.2em;
    font-size: 1em;
    font-family: Quicksand;
}
</style>