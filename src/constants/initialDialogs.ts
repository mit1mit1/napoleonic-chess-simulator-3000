import { Languages } from "@/types";

export const initialDialogs = [
  {
    triggerCondition: () => true,
    lines: [
      {
        speaker: "Napoleon",
        line: [
          {
            words: "Pierre?!? Yo, wassupppp!",
            fromLanguage: Languages.English,
            toLanguage: Languages.French,
          },
        ],
      },
      {
        speaker: "Pierre",
        line: [
          {
            words: "Hum, '",
            fromLanguage: Languages.French,
            toLanguage: Languages.English,
          },
          {
            words: "wassup",
            fromLanguage: Languages.English,
            toLanguage: Languages.French,
          },
          { words: "'? " },
          {
            words: "Sire, depuis quand connaissez-vous ce mot?",
            fromLanguage: Languages.French,
            toLanguage: Languages.English,
          },
        ],
      },
      {
        speaker: "Napoleon",
        line: [
          {
            words: "Uh - I beg your pardon?",
            fromLanguage: Languages.English,
            toLanguage: Languages.French,
          },
        ],
      },
      {
        speaker: "Pierre",
        line: [
          {
            words: "Oh, j'ai oublié, le français n'existait pas à l'époque.",
            fromLanguage: Languages.French,
            toLanguage: Languages.English,
          },
        ],
        vibe: "muttered",
      },
      {
        speaker: "Pierre",
        line: [
          {
            words: "Ah, I, um, apologise sire. I forgot, you don't speak French.",
            fromLanguage: Languages.English,
            toLanguage: Languages.French,
          },
        ],
      },
      {
        speaker: "Napoleon",
        line: [
          {
            words: "Frennnnchhh??",
            fromLanguage: Languages.English,
            toLanguage: Languages.French,
          },
        ],
      },
      {
        speaker: "Pierre",
        line: [
          {
            words: "Uh - never mind, Sire. Let's kick some warlord - how you say? Ah yes, butts. ",
            fromLanguage: Languages.English,
            toLanguage: Languages.French,
          },
          {
            words: "Scrableau!",
            fromLanguage: Languages.French,
            toLanguage: Languages.English,
          },
        ],
      },
    ],
  },
];
