import ElectricGuitar from "tonejs-instrument-guitar-electric-mp3";
import Violin from "tonejs-instrument-violin-mp3";
import * as Tone from "tone";
import type { BaseDuration, Chord, Pitch, ToneJSDuration } from "@/music/types";
import { bassNotes, middleNotes } from "@/music/constants";
import {
  getDiminishedSeventh,
  getMajorFifth,
  getMajorFourth,
  getMinorSecond,
  getMinorSixth,
  getMinorThird,
  getRootMajor,
  getMajorThird,
  getThird,
  getFifth,
  getFlatThird,
  getFlatFifth,
  getNormalChords,
  includesChord,
  getFourth,
  getMajorPentatonicScale,
  getMinorPentatonicScale,
  getRootPower,
  getPowerSecond,
  getPowerThird,
  getPowerFourth,
  getPowerFifth,
  getPowerSixth,
} from "@/music/keysAndChords";
import { tonejsDurationTo16thCount } from "@/music/durations";

export const addToneJSDurations = (
  durationObject1: ToneJSDuration,
  durationObject2: ToneJSDuration
) => {
  const newObject: ToneJSDuration = { ...durationObject1 };
  for (const [key, value] of Object.entries(durationObject2)) {
    const based = key as BaseDuration;
    newObject[based] = (newObject[based] || 0) + value;
  }
  return newObject;
};

export const addDurationObjects = (
  durationObject: ToneJSDuration,
  durations: Array<BaseDuration>
) => {
  const newObject: ToneJSDuration = { ...durationObject };
  for (let i = 0; i < durations.length; i++) {
    const based = durations[i] as BaseDuration;
    newObject[based] = (newObject[based] || 0) + 1;
  }
  return newObject;
};

const volumeSlider = document.querySelector("#volumeSlider");
volumeSlider?.addEventListener("change", (event) => {
  primaryInstrument.volume.value = (event.target as any).value;
  if (primaryInstrument.volume.value == -50) {
    primaryInstrument.volume.value = -5000;
  }
});

const instrumentVolume = -24;
let allowAudio = true;

const isCreepy = Math.random() > 0.8;

const primaryInstrument = isCreepy
  ? new Violin({
      minify: true,
    }).toDestination("main")
  : new ElectricGuitar({
      minify: true,
    }).toDestination("main");
primaryInstrument.volume.value = instrumentVolume;

const handleKeypress = (event: any) => {
  if (allowAudio) {
    Tone.start();
    Tone.Transport.start();
  } else {
    allowAudio = true;
  }
};

document
  .querySelector("#musical-box")
  ?.addEventListener("keypress", handleKeypress);

const getPitches = ({ rootNote, chordType }: Chord) => {
  const pitches = [rootNote];
  if (chordType === "major") {
    pitches.push(getThird(rootNote));
    pitches.push(getFifth(rootNote));
  }
  if (chordType === "minor") {
    pitches.push(getFlatThird(rootNote));
    pitches.push(getFifth(rootNote));
  }
  if (chordType === "power") {
    pitches.push(getFifth(rootNote));
  }
  if (chordType === "diminished") {
    pitches.push(getFlatThird(rootNote));
    pitches.push(getFlatFifth(rootNote));
  }
  return pitches;
};

const getAndPushMelody = (
  key: Pitch,
  chord: Chord,
  currentTime: ToneJSDuration,
  chordDuration: ToneJSDuration,
  lastNote: Pitch,
  allowAudio: boolean,
  availableNotes: Pitch[] = middleNotes,
  skippiness: number = 1,
  rapidity: number = 1
) => {
  let pitch = chord.rootNote;
  let lastDuration = "8n";
  if (allowAudio && primaryInstrument.loaded) {
    for (let i = 0; i < tonejsDurationTo16thCount(chordDuration); i++) {
      const pitchRadomiser = Math.random();
      const jazzRandomiser = Math.random();
      const skipRandomiser = Math.random();
      if (skipRandomiser < 0.15 * skippiness && lastDuration === "16n") {
        currentTime = addToneJSDurations(currentTime, { "16n": 1 });
        lastDuration = "16n";
        continue;
      }
      if (skipRandomiser < 0.55 * skippiness && lastDuration !== "16n") {
        if (jazzRandomiser < 0.12 * skippiness) {
          currentTime = addToneJSDurations(currentTime, { "8n": 1 });
        } else if (jazzRandomiser < 0.2 * skippiness) {
          currentTime = addToneJSDurations(currentTime, { "8n.": 1 });
        } else {
          currentTime = addToneJSDurations(currentTime, { "16n": 1 });
        }
        lastDuration = "16n";
        continue;
      }
      let pentatonicScale = [];
      if (jazzRandomiser < 1) {
        pentatonicScale = getMajorPentatonicScale(key, availableNotes);
        pitch =
          pentatonicScale[Math.floor(pitchRadomiser * pentatonicScale.length)];
      } else {
        pentatonicScale = getMinorPentatonicScale(
          chord.rootNote,
          availableNotes
        );
        pitch =
          pentatonicScale[Math.floor(pitchRadomiser * pentatonicScale.length)];
      }
      let duration = "8n";
      const durationRandomiser = Math.random();
      if (durationRandomiser < 0.25 * rapidity) {
        duration = "16n";
      } else if (durationRandomiser < 0.45 * rapidity) {
        duration = "8n";
      } else if (durationRandomiser < 0.6 * rapidity) {
        duration = "8n.";
      } else if (durationRandomiser < 0.7 * rapidity) {
        duration = "4n";
      } else if (durationRandomiser < 0.8 * rapidity) {
        duration = "4n.";
      } else {
        duration = "2n";
      }
      primaryInstrument.triggerAttackRelease(pitch, duration, currentTime);
      lastDuration = duration;
      currentTime = addToneJSDurations(currentTime, { "16n": 1 });
    }
  }
  return pitch;
};

const pushChord = (
  chord: Chord,
  currentTime: ToneJSDuration,
  duration: ToneJSDuration,
  allowAudio: boolean
) => {
  if (allowAudio && primaryInstrument.loaded) {
    for (const pitch of getPitches(chord)) {
      primaryInstrument.triggerAttackRelease(pitch, duration, currentTime);
    }
  }
};

let isTransitioning = false;
const fadeIncrementDb = 1.4;
const fadeIncrementMilliseconds = 90;
const fadeIncrements = 22;

const fadeOutThenIn = async () => {
  for (let i = 0; i < fadeIncrements; i++) {
    primaryInstrument.volume.value =
      primaryInstrument.volume.value - fadeIncrementDb;
    await new Promise((r) => setTimeout(r, fadeIncrementMilliseconds));
  }
  Tone.start();
  primaryInstrument.releaseAll();
  Tone.Transport.cancel();
  primaryInstrument.sync();
  for (let i = 1; i < fadeIncrements + 1; i++) {
    setTimeout(
      () =>
        (primaryInstrument.volume.value =
          primaryInstrument.volume.value + fadeIncrementDb),
      fadeIncrementMilliseconds * i
    );
    if (i === 15) {
      setTimeout(
        () => (isTransitioning = false),
        (fadeIncrementMilliseconds * i) / 2
      );
    }
  }
};

const getChord = (key: Pitch, lastChord: Chord): Chord => {
  const random = Math.random();
  if (random < 0.1) {
    return getRootMajor(key);
  }
  if (random < 0.2) {
    return getRootPower(key);
  }
  if (random < 0.23) {
    return getMinorSecond(key);
  }
  if (random < 0.26) {
    return getPowerSecond(key);
  }
  if (random < 0.35) {
    return getPowerThird(key);
  }
  if (random < 0.4) {
    return getMinorThird(key);
  }
  if (random < 0.4) {
    return getPowerFourth(key);
  }
  if (random < 0.55) {
    return getMajorFourth(key);
  }
  if (random < 0.65) {
    return getPowerFifth(key);
  }
  if (random < 0.75) {
    return getMajorFifth(key);
  }
  if (random < 0.85) {
    return getMinorSixth(key);
  }
  if (random < 0.92) {
    return getPowerSixth(key);
  }
  if (random < 0.93) {
    return getDiminishedSeventh(key);
  }
  return getMajorThird(key);
};

const getChordLength = (index: number): ToneJSDuration => {
  const random = Math.random();

  if (random < 0.4) {
    return {
      "1n": 1,
    };
  }
  if (random < 0.6) {
    return {
      "2n": 1,
    };
  }
  if (random < 0.75) {
    return {
      "1n.": 1,
    };
  }
  if (random < 0.85) {
    return {
      "4n": 1,
    };
  }
  if (random < 0.9) {
    return {
      "2n.": 1,
    };
  }
  return {
    "1n": 2,
  };
};

const getKey = (key: Pitch, currentChord: Chord) => {
  const random = Math.random();
  if (includesChord(getNormalChords(key), currentChord)) {
    return key;
  }
  if (currentChord.chordType === "major") {
    if (random < 0.5) {
      return getFourth(currentChord.rootNote, bassNotes);
    }
  }
  return key;
};

export const startMusic = async () => {
  Tone.Transport.bpm.value = 100;
  Tone.Transport.position = "0:0:0";
  if (allowAudio && !isTransitioning) {
    isTransitioning = true;

    await fadeOutThenIn();
    let currentTime: ToneJSDuration = { "8n": 1 };

    let key: Pitch = "E2";
    let lastChord: Chord = {
      rootNote: "E2",
      chordType: "major",
    };
    let lastMelodyNote: Pitch = "B4";
    let lastCounterMelodyNote: Pitch = "E2";
    let i: number = 0;
    while (i < 50) {
      const currentChord = getChord(key, lastChord);
      const chordDuration = getChordLength(i);
      key = getKey(key, currentChord);
      pushChord(currentChord, currentTime, chordDuration, allowAudio);
      lastMelodyNote = getAndPushMelody(
        key,
        currentChord,
        currentTime,
        chordDuration,
        lastMelodyNote,
        allowAudio
      );
      lastCounterMelodyNote = getAndPushMelody(
        key,
        currentChord,
        currentTime,
        chordDuration,
        lastCounterMelodyNote,
        allowAudio,
        bassNotes,
        1.3
      );
      currentTime = addToneJSDurations(currentTime, chordDuration);
      lastChord = currentChord;
      i++;
    }

    Tone.Transport.start();
  }
};
