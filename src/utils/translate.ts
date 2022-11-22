import { Languages } from "../types";

const englishToFrench = {
  ["3000"]: ["trois mille", "trois milles"],
  april: ["Avril"],
  as: ["comme", "en tant que"],
  beg: ["demander", "supplier"],
  butts: ["mégots", "fesses"],
  by: ["par", "de"],
  chess: ["jeu d'échecs"],
  district: ["district", "quartier", "le district"],
  every: ["chaque", "tous les"],
  fact: ["fait"],
  fans: ["ventilateurs", "fans", "supporters"],
  for: ["pour", "pour le site"],
  french: ["français"],
  full: ["complet", "pleine page"],
  how: ["comment"],
  i: ["je"],
  in: ["sur", "à", "à l'adresse"],
  is: ["est", "c'est"],
  kick: ["coup de pied", "kick"],
  known: ["connu", "connu sous"],
  ["let's"]: ["allons-y", "allons"],
  mustard: ["moutarde"],
  mind: ["esprit", "l'esprit"],
  never: ["jamais"],
  no: ["pas de", "non", "aucun"],
  of: ["de", "du site", "sur", "de"],
  one: ["un", "une"],
  other: ["autre", "autres"],
  pardon: ["pardon", "la grâce"],
  produces: ["produit"],
  ["re-enacted"]: ["réédité", "rétabli"],
  renowned: ["renommé", "célèbre"],
  say: ["dites", "dire"],
  scene: ['scène'],
  simulator: ["simulatrice", "simulateur"],
  ski: ["ski", "le ski"],
  some: ["un peu de", "quelques", "un certain"],
  stop: ["arrêter", "arrêtez", "stop"],
  the: ["le", "le site"],
  thing: ["chose", "objet", "truc"],
  things: ["choses", "les choses", "sites"],
  thousands: ["milliers"],
  uh: ["hum"],
  warlord: ["seigneur de guerre", "chef de guerre"],
  wassup: ["quoi de neuf", "qu'est-ce qui se passe"],
  wassupppp: ["quoi de neuf", "qu'est-ce qui se passe"],
  waterfall: ["cascade", "chute d'eau"],
  world: ["monde"],
  yo: ["bonjour", "salut", "hé"],
  you: ["vous", "tu"],
  your: ["votre", "vous"],
};

const frenchToEnglish = {
  hum: ["um"],
  depuis: ["since", "from"],
  quand: ["when", "at"],
  ce: ["this", "that"],
  mot: ["word", "note"],
  connaissez: ["know", "know about"],
  vous: ["you", "you at"],
  ["connaissez-vous"]: ["do you know", "are you familiar with"],
  j: ["I"],
  ai: ["have"],
  ["j'ai"]: ["I have"],
  oublié: ["forgotten", "forgot"],
  ["l'anglais"]: ["English", "the English language"],
  ["n'existait"]: ["didn't exist"],
  pas: ["no", "not", "step"],
  ["l'époque"]: ["the time", "at the time", "the era"],
  à: ["in", "to", "at"],
  le: ["the"],
  français: ["French"],
};

export const translate = (
  word: string,
  fromLanguage: Languages.English | Languages.French,
  toLanguage: Languages.French | Languages.English
): string[] => {
  const lookupWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=_`~()?]/g, "");
  console.log(lookupWord);
  if (fromLanguage === toLanguage) {
    return [lookupWord];
  }
  if (fromLanguage === Languages.English && toLanguage === Languages.French) {
    return lookupWord in englishToFrench
      ? englishToFrench[lookupWord as keyof typeof englishToFrench]
      : [];
  } else if (
    fromLanguage === Languages.French &&
    toLanguage === Languages.English
  ) {
    return lookupWord in frenchToEnglish
      ? frenchToEnglish[lookupWord as keyof typeof frenchToEnglish]
      : [];
  }
  return [];
};
