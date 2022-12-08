import { middleNotes } from "./constants";
import type { Chord, Pitch } from "./types";
import { pitchNames } from "./types";

const allPitches = [...pitchNames];

export const getAvailableNote = (
  baseNote: Pitch,
  availableNotes: Pitch[] = middleNotes
) => {
  if (availableNotes.find((note) => note === baseNote)) {
    return availableNotes.indexOf(baseNote);
  }
  const similarNote = availableNotes.find((note) =>
    note.startsWith(baseNote.slice(0, -1))
  );
  if (similarNote) {
    return availableNotes.indexOf(similarNote);
  }
  return 0;
};

export const getSecond = (
  baseNote: Pitch,
  availableNotes: Pitch[] = middleNotes
): Pitch =>
  availableNotes[
    (getAvailableNote(baseNote, availableNotes) + 2) % availableNotes.length
  ];

export const getFlatThird = (
  baseNote: Pitch,
  availableNotes: Pitch[] = middleNotes
): Pitch =>
  availableNotes[
    (getAvailableNote(baseNote, availableNotes) + 3) % availableNotes.length
  ];

export const getThird = (
  baseNote: Pitch,
  availableNotes: Pitch[] = middleNotes
): Pitch =>
  availableNotes[
    (getAvailableNote(baseNote, availableNotes) + 4) % availableNotes.length
  ];

export const getFourth = (
  baseNote: Pitch,
  availableNotes: Pitch[] = middleNotes
): Pitch =>
  availableNotes[
    (getAvailableNote(baseNote, availableNotes) + 5) % availableNotes.length
  ];

export const getFlatFifth = (
  baseNote: Pitch,
  availableNotes: Pitch[] = middleNotes
): Pitch =>
  availableNotes[
    (getAvailableNote(baseNote, availableNotes) + 6) % availableNotes.length
  ];

export const getFifth = (
  baseNote: Pitch,
  availableNotes: Pitch[] = middleNotes
): Pitch =>
  availableNotes[
    (getAvailableNote(baseNote, availableNotes) + 7) % availableNotes.length
  ];

export const getSixth = (
  baseNote: Pitch,
  availableNotes: Pitch[] = middleNotes
): Pitch =>
  availableNotes[
    (getAvailableNote(baseNote, availableNotes) + 9) % availableNotes.length
  ];

export const getSeventh = (
  baseNote: Pitch,
  availableNotes: Pitch[] = middleNotes
): Pitch =>
  availableNotes[
    (getAvailableNote(baseNote, availableNotes) + 11) % availableNotes.length
  ];

export const getEighth = (
  baseNote: Pitch,
  availableNotes: Pitch[] = allPitches
): Pitch =>
  availableNotes[
    (getAvailableNote(baseNote, availableNotes) + 12) % availableNotes.length
  ];

export const getNinth = (
  baseNote: Pitch,
  availableNotes: Pitch[] = allPitches
): Pitch =>
  availableNotes[
    (getAvailableNote(baseNote, availableNotes) + 14) % availableNotes.length
  ];

export const getFlatTenth = (
  baseNote: Pitch,
  availableNotes: Pitch[] = allPitches
): Pitch =>
  availableNotes[
    (getAvailableNote(baseNote, availableNotes) + 15) % availableNotes.length
  ];

export const getTenth = (
  baseNote: Pitch,
  availableNotes: Pitch[] = allPitches
): Pitch =>
  availableNotes[
    (getAvailableNote(baseNote, availableNotes) + 16) % availableNotes.length
  ];

export const getEleventh = (
  baseNote: Pitch,
  availableNotes: Pitch[] = allPitches
): Pitch =>
  availableNotes[
    (getAvailableNote(baseNote, availableNotes) + 17) % availableNotes.length
  ];

export const getTwelfth = (
  baseNote: Pitch,
  availableNotes: Pitch[] = allPitches
): Pitch =>
  availableNotes[
    (getAvailableNote(baseNote, availableNotes) + 19) % availableNotes.length
  ];

export const getThirteenth = (
  baseNote: Pitch,
  availableNotes: Pitch[] = allPitches
): Pitch =>
  availableNotes[
    (getAvailableNote(baseNote, availableNotes) + 21) % availableNotes.length
  ];

export const getFourteenth = (
  baseNote: Pitch,
  availableNotes: Pitch[] = allPitches
): Pitch =>
  availableNotes[
    (getAvailableNote(baseNote, availableNotes) + 23) % availableNotes.length
  ];

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

export const getMinorPentatonicScale = (
  key: Pitch,
  availableNotes: Array<Pitch>
): Array<Pitch> =>
  Array.from(
    new Set([
      availableNotes[getAvailableNote(key, availableNotes)],
      getSecond(key, availableNotes),
      getFlatThird(key, availableNotes),
      getFifth(key, availableNotes),
      getSixth(key, availableNotes),
      getEighth(key, availableNotes),
      getNinth(key, availableNotes),
      getFlatTenth(key, availableNotes),
      getTwelfth(key, availableNotes),
      getThirteenth(key, availableNotes),
    ])
  );

export const getMajorPentatonicScale = (
  key: Pitch,
  availableNotes: Array<Pitch>
): Array<Pitch> => {
  return Array.from(
    new Set([
      availableNotes[getAvailableNote(key, availableNotes)],
      getSecond(key, availableNotes),
      getThird(key, availableNotes),
      getFifth(key, availableNotes),
      getSixth(key, availableNotes),
      getEighth(key, availableNotes),
      getNinth(key, availableNotes),
      getTenth(key, availableNotes),
      getTwelfth(key, availableNotes),
      getThirteenth(key, availableNotes),
    ])
  );
};
