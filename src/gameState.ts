// store.js
import { reactive } from "vue";
import type { GameState, Languages, LocationChessResults } from "./types";
import { Locations } from "./types";

const chessResults: Partial<LocationChessResults> = {};
Object.values(Locations).forEach((location) => {
  chessResults[location] = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
});

export const gameState = reactive<GameState>({
  translatedWord: undefined,
  translatedWordFromLanguage: undefined,
  translatedWordToLanguage: undefined,
  selectedLocation: undefined,
  locationChessResults: chessResults as LocationChessResults,
  pushLocationChessResult(location: Locations, result: "win" | "loss" | "tie") {
    // if (!this.locationChessResults[location]) {
    //   this.locationChessResults[location] = {
    //     wins: 0,
    //     losses: 0,
    //     ties: 0,
    //   };
    // }
    this.locationChessResults[location].wins += result === "win" ? 1 : 0;
    this.locationChessResults[location].losses += result === "loss" ? 1 : 0;
    this.locationChessResults[location].ties += result === "tie" ? 1 : 0;
  },
  setSelectedLocation(location: Locations) {
    this.selectedLocation = location;
  },
  viewedDialogue: [],
  toastMessages: [],
  pushToastMessage(message: string) {
    this.toastMessages.push(message);
    setTimeout(() => this.toastMessages.shift(), 2500);
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
