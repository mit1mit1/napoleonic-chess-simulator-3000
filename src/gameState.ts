// store.js
import { reactive } from "vue";
import type { GameState, Locations } from "./types";


export const gameState = reactive<GameState>({
  selectedLocation: undefined,
  setSelectedLocation(location: Locations) {
    this.selectedLocation = location;
  },
  viewedDialogue: [],
});
