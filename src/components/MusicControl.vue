<script lang="ts">
import { startNewSong, setVolume, setVibe } from "@/utils/music";
import { defineComponent } from "vue";
const defaultVolume = -24
setVolume(defaultVolume);

export default defineComponent({
    data() {
        return {
            defaultVolume,
        }
    },
    methods: {
        startNewSong,
        setVolume,
        setVibe,
    }
});
</script>

<template>
    <button class="napoleonic-button" :onclick="startNewSong">Start new song</button>

    <div class="volume-slider">
        <label for="volumeSlider">Volume</label><br />
        <input @input="(event: any) => setVolume(event.target.value)" type="range" min="-50" max="10" :value="defaultVolume"
            class="slider" id="volumeSlider" />
        <div>
            <select @input="(event: any) => setVibe(event.target.value)" name="music-vibes" id="music-vibes">
                <option value="">Select your option</option>
                <option value="pleasentlypicky">Picky</option>
                <option value="creepy">Creepy</option>
                <option value="bumpish">Bumpish</option>
                <option value="basicpicky">Picky (Basic)</option>
                <option value="funkypicky">Picky (Funky)</option>
            </select>
        </div>
    </div>

</template>

<style>
label {
    font-size: 0.95em;
    font-family: "Quicksand", sans-serif;

}
</style>