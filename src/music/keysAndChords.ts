import { middleNotes } from "./constants";
import type { Chord, Pitch } from "./types";

export const getSecond = (baseNote: Pitch): Pitch =>
  middleNotes[(middleNotes.indexOf(baseNote) + 2) % middleNotes.length];

export const getFlatThird = (baseNote: Pitch): Pitch =>
  middleNotes[(middleNotes.indexOf(baseNote) + 3) % middleNotes.length];

export const getThird = (baseNote: Pitch): Pitch =>
  middleNotes[(middleNotes.indexOf(baseNote) + 4) % middleNotes.length];

export const getFourth = (baseNote: Pitch): Pitch =>
  middleNotes[(middleNotes.indexOf(baseNote) + 5) % middleNotes.length];

export const getFlatFifth = (baseNote: Pitch): Pitch =>
  middleNotes[(middleNotes.indexOf(baseNote) + 6) % middleNotes.length];

export const getFifth = (baseNote: Pitch): Pitch =>
  middleNotes[(middleNotes.indexOf(baseNote) + 7) % middleNotes.length];

export const getSixth = (baseNote: Pitch): Pitch =>
  middleNotes[(middleNotes.indexOf(baseNote) + 9) % middleNotes.length];

export const getSeventh = (baseNote: Pitch): Pitch =>
  middleNotes[(middleNotes.indexOf(baseNote) + 11) % middleNotes.length];

export const getRootMajor = (key: Pitch): Chord => ({
  rootNote: key,
  chordType: "major",
});

export const getRootPower = (key: Pitch): Chord => ({
  rootNote: key,
  chordType: "power",
});

export const getMinorSecond = (key: Pitch): Chord => ({
  rootNote: getSecond(key),
  chordType: "minor",
});

export const getPowerSecond = (key: Pitch): Chord => ({
  rootNote: getSecond(key),
  chordType: "power",
});

export const getMajorThird = (key: Pitch): Chord => ({
  rootNote: getThird(key),
  chordType: "major",
});

export const getPowerThird = (key: Pitch): Chord => ({
  rootNote: getThird(key),
  chordType: "power",
});

export const getMinorThird = (key: Pitch): Chord => ({
  rootNote: getThird(key),
  chordType: "minor",
});

export const getMajorFourth = (key: Pitch): Chord => ({
  rootNote: getFourth(key),
  chordType: "major",
});

export const getPowerFourth = (key: Pitch): Chord => ({
  rootNote: getFourth(key),
  chordType: "power",
});

export const getMajorFifth = (key: Pitch): Chord => ({
  rootNote: getFifth(key),
  chordType: "major",
});

export const getPowerFifth = (key: Pitch): Chord => ({
  rootNote: getFifth(key),
  chordType: "power",
});

export const getMinorSixth = (key: Pitch): Chord => ({
  rootNote: getSixth(key),
  chordType: "minor",
});

export const getPowerSixth = (key: Pitch): Chord => ({
  rootNote: getSixth(key),
  chordType: "power",
});

export const getDiminishedSeventh = (key: Pitch): Chord => ({
  rootNote: getSeventh(key),
  chordType: "diminished",
});

export const getNormalChords = (key: Pitch): Array<Chord> => [
  getRootMajor(key),
  getMinorSecond(key),
  getMinorThird(key),
  getMajorFourth(key),
  getMajorFifth(key),
  getMinorSixth(key),
  getDiminishedSeventh(key),
  getRootPower(key),
  getPowerSecond(key),
  getPowerThird(key),
  getPowerFourth(key),
  getPowerFifth(key),
  getPowerSixth(key),
];

export const includesChord = (chords: Array<Chord>, chord: Chord) => {
  for (const checkChord of chords) {
    if (
      checkChord.chordType === chord.chordType &&
      checkChord.rootNote === chord.rootNote
    ) {
      return true;
    }
  }
  return false;
};

export const getMinorPentatonicScale = (key: Pitch): Array<Pitch> => [
  key,
  getSecond(key),
  getFlatThird(key),
  getFifth(key),
  getSixth(key),
];

export const getMajorPentatonicScale = (key: Pitch): Array<Pitch> => [
  key,
  getSecond(key),
  getThird(key),
  getFifth(key),
  getSixth(key),
];
