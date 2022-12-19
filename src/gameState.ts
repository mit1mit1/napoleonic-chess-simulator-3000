// store.js
import { reactive } from "vue";
import type { GameState, Locations } from "./types";


export const gameState = reactive<GameState>({
  selectedLocation: undefined,
  setSelectedLocation(location: Locations) {
    this.selectedLocation = location;
  },
  viewedDialogue: [],
  toastMessages: [],
  pushToastMessage(message: string) {
    this.toastMessages.push(message);
    setTimeout(() => this.toastMessages.shift(), 2000)
  }
});
