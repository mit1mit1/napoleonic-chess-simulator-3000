import { Languages } from "../types";

const englishToFrench = {
  chess: ["jeu d'échecs"],
  simulator: ["simulatrice", "simulateur"],
  ["3000"]: ["trois mille", "trois milles"],
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
    return lookupWord in englishToFrench
      ? englishToFrench[lookupWord as keyof typeof englishToFrench]
      : [];
  }
  return [];
};
