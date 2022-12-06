import { Languages } from "../types";

const englishToFrench = {
  ["3000"]: {
    translations: ["trois mille", "trois milles"],
    englishDefinition: "",
  },
  april: { translations: ["Avril"], englishDefinition: "" },
  as: { translations: ["comme", "en tant que"], englishDefinition: "" },
  beg: { translations: ["demander", "supplier"], englishDefinition: "" },
  butts: { translations: ["mégots", "fesses"], englishDefinition: "" },
  by: { translations: ["par", "de"], englishDefinition: "" },
  chess: { translations: ["jeu d'échecs"], englishDefinition: "" },
  district: {
    translations: ["district", "quartier", "le district"],
    englishDefinition: "",
  },
  every: { translations: ["chaque", "tous les"], englishDefinition: "" },
  fact: { translations: ["fait"], englishDefinition: "" },
  fans: {
    translations: ["ventilateurs", "fans", "supporters"],
    englishDefinition: "",
  },
  for: { translations: ["pour", "pour le site"], englishDefinition: "" },
  french: { translations: ["français"], englishDefinition: "" },
  full: { translations: ["complet", "pleine page"], englishDefinition: "" },
  how: { translations: ["comment"], englishDefinition: "" },
  i: { translations: ["je"], englishDefinition: "" },
  in: { translations: ["sur", "à", "à l'adresse"], englishDefinition: "" },
  is: { translations: ["est", "c'est"], englishDefinition: "" },
  kick: { translations: ["coup de pied", "kick"], englishDefinition: "" },
  known: { translations: ["connu", "connu sous"], englishDefinition: "" },
  ["let's"]: { translations: ["allons-y", "allons"], englishDefinition: "" },
  mustard: { translations: ["moutarde"], englishDefinition: "" },
  mind: { translations: ["esprit", "l'esprit"], englishDefinition: "" },
  never: { translations: ["jamais"], englishDefinition: "" },
  no: { translations: ["pas de", "non", "aucun"], englishDefinition: "" },
  of: { translations: ["de", "du site", "sur", "de"], englishDefinition: "" },
  one: { translations: ["un", "une"], englishDefinition: "" },
  other: { translations: ["autre", "autres"], englishDefinition: "" },
  pardon: { translations: ["pardon", "la grâce"], englishDefinition: "" },
  produces: { translations: ["produit"], englishDefinition: "" },
  ["re-enacted"]: {
    translations: ["réédité", "rétabli"],
    englishDefinition: "",
  },
  renowned: { translations: ["renommé", "célèbre"], englishDefinition: "" },
  say: { translations: ["dites", "dire"], englishDefinition: "" },
  scene: { translations: ["scène"], englishDefinition: "" },
  simulator: {
    translations: ["simulatrice", "simulateur"],
    englishDefinition: "",
  },
  ski: { translations: ["ski", "le ski"], englishDefinition: "" },
  some: {
    translations: ["un peu de", "quelques", "un certain"],
    englishDefinition: "",
  },
  stop: { translations: ["arrêter", "arrêtez", "stop"], englishDefinition: "" },
  the: { translations: ["le", "le site"], englishDefinition: "" },
  thing: { translations: ["chose", "objet", "truc"], englishDefinition: "" },
  things: {
    translations: ["choses", "les choses", "sites"],
    englishDefinition: "",
  },
  thousands: { translations: ["milliers"], englishDefinition: "" },
  uh: { translations: ["hum"], englishDefinition: "" },
  warlord: {
    translations: ["seigneur de guerre", "chef de guerre"],
    englishDefinition: "",
  },
  wassup: {
    translations: ["quoi de neuf", "qu'est-ce qui se passe"],
    englishDefinition: "",
  },
  wassupppp: {
    translations: ["quoi de neuf", "qu'est-ce qui se passe"],
    englishDefinition: "",
  },
  waterfall: {
    translations: ["cascade", "chute d'eau"],
    englishDefinition: "",
  },
  world: { translations: ["monde"], englishDefinition: "" },
  yo: { translations: ["bonjour", "salut", "hé"], englishDefinition: "" },
  you: { translations: ["vous", "tu"], englishDefinition: "" },
  your: { translations: ["votre", "vous"], englishDefinition: "" },
};

const frenchToEnglish = {
  hum: { translations: ["um"], englishDefinition: "" },
  depuis: { translations: ["since", "from"], englishDefinition: "" },
  quand: { translations: ["when", "at"], englishDefinition: "" },
  ce: { translations: ["this", "that"], englishDefinition: "" },
  mot: { translations: ["word", "note"], englishDefinition: "" },
  connaissez: { translations: ["know", "know about"], englishDefinition: "" },
  vous: { translations: ["you", "you at"], englishDefinition: "" },
  ["connaissez-vous"]: {
    translations: ["do you know", "are you familiar with"],
    englishDefinition: "",
  },
  j: { translations: ["I"], englishDefinition: "" },
  ai: { translations: ["have"], englishDefinition: "" },
  ["j'ai"]: { translations: ["I have"], englishDefinition: "" },
  oublié: { translations: ["forgotten", "forgot"], englishDefinition: "" },
  ["l'anglais"]: {
    translations: ["English", "the English language"],
    englishDefinition: "",
  },
  ["n'existait"]: { translations: ["didn't exist"], englishDefinition: "" },
  pas: { translations: ["no", "not", "step"], englishDefinition: "" },
  ["l'époque"]: {
    translations: ["the time", "at the time", "the era"],
    englishDefinition: "",
  },
  à: { translations: ["in", "to", "at"], englishDefinition: "" },
  le: { translations: ["the"], englishDefinition: "" },
  français: { translations: ["French"], englishDefinition: "" },
};

export const translate = (
  word: string,
  fromLanguage: Languages.English | Languages.French,
  toLanguage: Languages.French | Languages.English
): { translations: string[]; englishDefinition?: string } => {
  const lookupWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=_`~()?]/g, "");
  const nullReturn = { translations: [], englishDefinition: "" };
  if (fromLanguage === toLanguage) {
    return { translations: [lookupWord], englishDefinition: "" };
  }
  if (fromLanguage === Languages.English && toLanguage === Languages.French) {
    return lookupWord in englishToFrench
      ? englishToFrench[lookupWord as keyof typeof englishToFrench]
      : nullReturn;
  } else if (
    fromLanguage === Languages.French &&
    toLanguage === Languages.English
  ) {
    return lookupWord in frenchToEnglish
      ? frenchToEnglish[lookupWord as keyof typeof frenchToEnglish]
      : nullReturn;
  }
  return nullReturn;
};
