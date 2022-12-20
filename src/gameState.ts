// store.js
import { reactive } from "vue";
import type { GameState, Locations, Languages } from "./types";

export const gameState = reactive<GameState>({
  translatedWord: undefined,
  translatedWordFromLanguage: undefined,
  translatedWordToLanguage: undefined,
  selectedLocation: undefined,
  setSelectedLocation(location: Locations) {
    this.selectedLocation = location;
  },
  viewedDialogue: [],
  toastMessages: [],
  pushToastMessage(message: string) {
    this.toastMessages.push(message);
    setTimeout(() => this.toastMessages.shift(), 2000);
  },
  setTranslatedWord(
    word: string,
    fromLanguage: Languages,
    toLanguage: Languages
  ) {
    this.translatedWord = word;
    this.translatedWordFromLanguage = fromLanguage;
    this.translatedWordToLanguage = toLanguage;
  },
});
