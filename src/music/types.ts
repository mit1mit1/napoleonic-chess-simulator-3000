export interface Note {
  pitch: Pitch;
  durations: Array<BaseDuration>;
  staccato?: boolean;
  rest?: boolean;
}

export type ToneJSDuration = {
  [key in typeof durationNames[number]]?: number;
};

export const pitchNames = [
  // "E3",
  // "F3",
  // "F#3",
  // "G3",
  // "G#3",
  "A3",
  "A#3",
  "B3",
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4",
  "C5",
  "C#5",
  "D5",
  "D#5",
  "E5",
  "F5",
  "F#5",
  "G5",
  "G#5",
] as const;

export const durationNames = [
  "16n",
  "8n",
  "8n.",
  "4n",
  "4n.",
  "2n",
  "2n.",
  "1n",
  "1n.",
  "16t",
  "8t",
  "4t",
  "2t",
] as const;

export type BaseDuration = typeof durationNames[number];
export type Pitch = typeof pitchNames[number];
export type Chord = {
    rootNote: Pitch,
    chordType: "major" | "minor" | "diminished"
}
