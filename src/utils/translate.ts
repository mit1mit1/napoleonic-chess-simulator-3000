import { englishToFrench, frenchToEnglish } from "@/constants";
import { Languages } from "../types";

export const translate = (
  word: string,
  fromLanguage: Languages.English | Languages.French,
  toLanguage: Languages.French | Languages.English
): {
  translations: string[];
  englishDefinition?: string;
  lookupWord: string;
} => {
  const lookupWord = word.toLowerCase().replace(/[.,/#!$%^&*;":{}=_`~()?]/g, "");
  const nullReturn = { translations: [], englishDefinition: "", lookupWord };
  if (fromLanguage === toLanguage) {
    return { translations: [lookupWord], englishDefinition: "", lookupWord };
  }
  if (fromLanguage === Languages.English && toLanguage === Languages.French) {
    return lookupWord in englishToFrench
      ? {
          ...englishToFrench[lookupWord as keyof typeof englishToFrench],
          lookupWord,
        }
      : nullReturn;
  } else if (
    fromLanguage === Languages.French &&
    toLanguage === Languages.English
  ) {
    return lookupWord in frenchToEnglish
      ? {
          ...frenchToEnglish[lookupWord as keyof typeof frenchToEnglish],
          lookupWord,
        }
      : nullReturn;
  }
  return nullReturn;
};
