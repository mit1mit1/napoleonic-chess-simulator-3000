import { pitchNames, type Chord, type Pitch } from "./types";

export const getSecond = (baseNote: Pitch): Pitch =>
  pitchNames[(pitchNames.indexOf(baseNote) + 2) % pitchNames.length];

export const getFlatThird = (baseNote: Pitch): Pitch =>
  pitchNames[(pitchNames.indexOf(baseNote) + 3) % pitchNames.length];

export const getThird = (baseNote: Pitch): Pitch =>
  pitchNames[(pitchNames.indexOf(baseNote) + 4) % pitchNames.length];

export const getFourth = (baseNote: Pitch): Pitch =>
  pitchNames[(pitchNames.indexOf(baseNote) + 5) % pitchNames.length];

export const getFlatFifth = (baseNote: Pitch): Pitch =>
  pitchNames[(pitchNames.indexOf(baseNote) + 6) % pitchNames.length];

export const getFifth = (baseNote: Pitch): Pitch =>
  pitchNames[(pitchNames.indexOf(baseNote) + 7) % pitchNames.length];

export const getSixth = (baseNote: Pitch): Pitch =>
  pitchNames[(pitchNames.indexOf(baseNote) + 9) % pitchNames.length];

export const getSeventh = (baseNote: Pitch): Pitch =>
  pitchNames[(pitchNames.indexOf(baseNote) + 11) % pitchNames.length];

export const getRootMajor = (key: Pitch): Chord => ({
  rootNote: key,
  chordType: "major",
});

export const getMinorSecond = (key: Pitch): Chord => ({
  rootNote: getSecond(key),
  chordType: "minor",
});

export const getMajorThird = (key: Pitch): Chord => ({
  rootNote: getThird(key),
  chordType: "major",
});

export const getMinorThird = (key: Pitch): Chord => ({
  rootNote: getThird(key),
  chordType: "minor",
});

export const getMajorFourth = (key: Pitch): Chord => ({
  rootNote: getFourth(key),
  chordType: "major",
});

export const getMajorFifth = (key: Pitch): Chord => ({
  rootNote: getFifth(key),
  chordType: "major",
});

export const getMinorSixth = (key: Pitch): Chord => ({
  rootNote: getSixth(key),
  chordType: "minor",
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
