import { middleNotes } from "./constants";
import { pitchNames, type Chord, type Pitch } from "./types";

const getMiddleNote = (baseNote: Pitch) => {
  if (middleNotes.find(note => note === baseNote)) {
    return middleNotes.indexOf(baseNote as typeof middleNotes[number]);
  }
  const similarNote = middleNotes.find(note => note.startsWith(baseNote.slice(0, -1)));
  if (similarNote) {
    return middleNotes.indexOf(similarNote);
  }
  return 0;
}

export const getSecond = (baseNote: Pitch): Pitch =>
  middleNotes[(getMiddleNote(baseNote) + 2) % middleNotes.length];

export const getFlatThird = (baseNote: Pitch): Pitch =>
  middleNotes[(getMiddleNote(baseNote) + 3) % middleNotes.length];

export const getThird = (baseNote: Pitch): Pitch =>
  middleNotes[(getMiddleNote(baseNote) + 4) % middleNotes.length];

export const getFourth = (baseNote: Pitch): Pitch =>
  middleNotes[(getMiddleNote(baseNote) + 5) % middleNotes.length];

export const getFlatFifth = (baseNote: Pitch): Pitch =>
  middleNotes[(getMiddleNote(baseNote) + 6) % middleNotes.length];

export const getFifth = (baseNote: Pitch): Pitch =>
  middleNotes[(getMiddleNote(baseNote) + 7) % middleNotes.length];

export const getSixth = (baseNote: Pitch): Pitch =>
  middleNotes[(getMiddleNote(baseNote) + 9) % middleNotes.length];

export const getSeventh = (baseNote: Pitch): Pitch =>
  middleNotes[(getMiddleNote(baseNote) + 11) % middleNotes.length];

export const getEighth = (baseNote: Pitch): Pitch =>
  pitchNames[(pitchNames.indexOf(baseNote) + 12) % pitchNames.length];

export const getNinth = (baseNote: Pitch): Pitch =>
  pitchNames[(pitchNames.indexOf(baseNote) + 14) % pitchNames.length];

export const getFlatTenth = (baseNote: Pitch): Pitch =>
  pitchNames[(pitchNames.indexOf(baseNote) + 15) % pitchNames.length];

export const getTenth = (baseNote: Pitch): Pitch =>
  pitchNames[(pitchNames.indexOf(baseNote) + 16) % pitchNames.length];

export const getEleventh = (baseNote: Pitch): Pitch =>
  pitchNames[(pitchNames.indexOf(baseNote) + 17) % pitchNames.length];

export const getTwelfth = (baseNote: Pitch): Pitch =>
  pitchNames[(pitchNames.indexOf(baseNote) + 19) % pitchNames.length];

export const getThirteenth = (baseNote: Pitch): Pitch =>
  pitchNames[(pitchNames.indexOf(baseNote) + 21) % pitchNames.length];

export const getFourteenth = (baseNote: Pitch): Pitch =>
  pitchNames[(pitchNames.indexOf(baseNote) + 23) % pitchNames.length];

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
  getEighth(key),
  getNinth(key),
  getFlatTenth(key),
  getTwelfth(key),
  getThirteenth(key),
];

export const getMajorPentatonicScale = (key: Pitch): Array<Pitch> => [
  key,
  getSecond(key),
  getThird(key),
  getFifth(key),
  getSixth(key),
  getEighth(key),
  getNinth(key),
  getTenth(key),
  getTwelfth(key),
  getThirteenth(key),
];
