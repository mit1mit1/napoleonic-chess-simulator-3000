import { type Dialogs, Languages, type GameState } from "@/types";

export const initialDialogs: Dialogs = [
  {
    triggerCondition: (gameState: GameState) => true,
    triggered: false,
    lines: [
      {
        speaker: "Napoleon",
        chunks: [
          {
            words: "Pierre?!? Yo, wassupppp!",
            fromLanguage: Languages.English,
            toLanguage: Languages.French,
          },
        ],
      },
      {
        speaker: "Pierre",
        chunks: [
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
        chunks: [
          {
            words: "Uh - I beg your pardon?",
            fromLanguage: Languages.English,
            toLanguage: Languages.French,
          },
        ],
      },
      {
        speaker: "Pierre",
        chunks: [
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
        chunks: [
          {
            words:
              "Ah, I, um, apologise sire. I forgot, you don't speak French.",
            fromLanguage: Languages.English,
            toLanguage: Languages.French,
          },
        ],
      },
      {
        speaker: "Napoleon",
        chunks: [
          {
            words: "Frennnnchhh??",
            fromLanguage: Languages.English,
            toLanguage: Languages.French,
          },
        ],
      },
      {
        speaker: "Pierre",
        chunks: [
          {
            words:
              "Uh - never mind, Sire. Let's kick some warlord - how you say? Ah yes, butts. ",
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
  {
    triggerCondition: (gameState: GameState) =>
      !!gameState.selectedLocation,
    triggered: false,
    lines: [
      {
        speaker: "Napoleon",
        chunks: [
          {
            words: "Pierre?!? What the hell is this?",
            fromLanguage: Languages.English,
            toLanguage: Languages.French,
          },
        ],
      },
      {
        speaker: "Pierre",
        chunks: [
          {
            words: "Hum... ",
            fromLanguage: Languages.French,
            toLanguage: Languages.English,
          },
          {
            words: "'French', Sire.",
            fromLanguage: Languages.English,
            toLanguage: Languages.French,
          },
        ],
      },
      {
        speaker: "Napoleon",
        chunks: [
          {
            words: "Urgh",
            fromLanguage: Languages.English,
            toLanguage: Languages.French,
          },
        ],
      },
    ],
  },
];
