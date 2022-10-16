import { Languages } from "../constants";

const englishToFrench = {
  chess: ["jeu d'échecs"],
  simulator: ["simulatrice", "simulateur"],
};

export const translate = (
  word: string,
  fromLanguage: Languages.English | Languages.French,
  toLanguage: Languages.French | Languages.English
): string[] => {
  const lookupWord = word
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  if (fromLanguage === toLanguage) {
    return [lookupWord];
  }
  if (fromLanguage === Languages.English && toLanguage === Languages.French) {
    return englishToFrench[lookupWord] ?? [];
  }
  return [];
};
