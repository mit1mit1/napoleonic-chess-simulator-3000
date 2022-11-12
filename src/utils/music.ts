import PianoMp3 from "tonejs-instrument-piano-mp3";
import * as Tone from "tone";

const quarterDurations: Array<BaseDuration> = [
  // "16n",
  "8n",
  "8n.",
  "4n",
  "4n.",
  "2n",
  "2n.",
  "1n",
  "1n.",
  // "16t",
  // "8t",
  // "4t",
  // "2t",
];

const tritoneScale: Array<Pitch> = [
  "A3",
  // "A#3",
  // "B3",
  "C4",
  // "C#4",
  // "D4",
  "D#4",
  // "E4",
  // "F4",
  "F#4",
  // "G4",
  // "G#4",
  "A4",
  // "A#4",
  // "B4",
  "C5",
  // "C#5",
  // "D5",
  "D#5",
  // "E5",
  // "F5",
  "F#5",
  // "G5",
  // "G#5",
  "A5",
  // "A#5",
  // "B5",
];

const pentatonicScale: Array<Pitch> = [
  // "A3",
  "A#3",
  // "B3",
  // "C4",
  "C#4",
  // "D4",
  "D#4",
  // "E4",
  // "F4",
  "F#4",
  // "G4",
  "G#4",
  // "A4",
  "A#4",
  // "B4",
  // "C5",
  "C#5",
  // "D5",
  "D#5",
  // "E5",
  // "F5",
  "F#5",
  // "G5",
  "G#5",
  // "A5",
  "A#5",
  // "B5",
];

interface Note {
  pitch: Pitch;
  durations: Array<BaseDuration>;
  staccato?: boolean;
  rest?: boolean;
}

type ToneJSDuration = {
  [key in typeof durationNames[number]]?: number;
};

const pitchNames = [
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
  "A5",
  "A#5",
  "B5",
] as const;

const durationNames = [
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

export const addDurationObjects = (
  durationObject: ToneJSDuration,
  durations: Array<BaseDuration>
) => {
  let newObject: ToneJSDuration = { ...durationObject };
  for (let i = 0; i < durations.length; i++) {
    let based = durations[i] as BaseDuration;
    newObject[based] = (newObject[based] || 0) + 1;
  }
  return newObject;
};


const volumeSlider = document.querySelector("#volumeSlider");
volumeSlider?.addEventListener("change", (event) => {
  instrument.volume.value = (event.target as any).value;
  if (instrument.volume.value == -50) {
    instrument.volume.value = -5000;
  }
});

const instrumentVolume = -24;
let allowAudio = false;

const instrument = new PianoMp3({
  minify: true,
}).toDestination("main");
instrument.volume.value = instrumentVolume;

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





const pushNoteFromNumber = (
  indexNumber: number,
  currentTime: ToneJSDuration,
  allowAudio: boolean
) => {
  if (allowAudio && instrument.loaded) {
    let mandleNote: Note = {
      pitch: pentatonicScale[Math.abs(indexNumber) % pentatonicScale.length],
      durations: [
        quarterDurations[Math.abs(indexNumber) % quarterDurations.length],
      ],
    };
    if (!mandleNote.rest) {
      let holdNoteLength: ToneJSDuration | string = addDurationObjects(
        {},
        mandleNote.durations
      );
      if (mandleNote.staccato) {
        if (
          mandleNote.durations.length === 1 &&
          (mandleNote.durations[0] === "16n" ||
            mandleNote.durations[0] === "8n")
        ) {
          holdNoteLength = "32n";
        } else {
          holdNoteLength = "16n";
        }
      }
      let attackDuration = holdNoteLength;
      instrument.triggerAttackRelease(
        mandleNote.pitch,
        attackDuration,
        currentTime
      );
    }
  }
};

const calculateIndexNumber = (currentX, currentY, a, b, c) => {
  return currentX * 13 + currentY * 23;
}

let isTransitioning = false;
const fadeIncrementDb = 1.4;
const fadeIncrementMilliseconds = 90;
const fadeIncrements = 22;

const pushSounds = (
  xStart: number,
  yStart: number,
  iterationsToPush: number,
  getNextX: (
    currentX: number,
    currentY: number,
    currentIteration: number
  ) => number,
  getNextY: (
    currentX: number,
    currentY: number,
    currentIteration: number
  ) => number,
  startTime: ToneJSDuration,
  durationIncrement: BaseDuration,
  calculateDurationIncrease: (
    sinceDifferentNumber: number,
    mandleNumber: number
  ) => number
): ToneJSDuration => {
  let sinceDifferentNumber = 1;
  let prevIndexNumber = -2;
  let currentTime = startTime;
  let currentX = xStart;
  let currentY = yStart;

  for (let i = 0; i < iterationsToPush; i++) {
    let indexNumber = calculateIndexNumber(currentX, currentY, 0, 0, 0);
    if (indexNumber != prevIndexNumber) {
      pushNoteFromNumber(indexNumber, currentTime, true);
      currentTime[durationIncrement] =
        (currentTime[durationIncrement] ?? 0) +
        calculateDurationIncrease(sinceDifferentNumber, indexNumber);
      sinceDifferentNumber = 1;
      prevIndexNumber = indexNumber;
    } else {
      sinceDifferentNumber++;
    }
    currentX = getNextX(currentX, currentY, i);
    currentY = getNextY(currentY, currentY, i);
  }
  return currentTime;
};

const fadeOutThenIn = async () => {
  for (let i = 0; i < fadeIncrements; i++) {
    instrument.volume.value = instrument.volume.value - fadeIncrementDb;
    await new Promise((r) => setTimeout(r, fadeIncrementMilliseconds));
  }
  Tone.start();
  instrument.releaseAll();
  Tone.Transport.cancel();
  instrument.sync();
  for (let i = 1; i < fadeIncrements + 1; i++) {
    setTimeout(
      () =>
        (instrument.volume.value = instrument.volume.value + fadeIncrementDb),
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

const xResolution = 128;
const yResolution = 128;

export const getSounds = async (
  xStepDistance: number,
  centreX: number,
  yStepDistance: number,
  centreY: number,
  allowAudio: boolean
) => {
  Tone.Transport.bpm.value = 120;
  Tone.Transport.position = "0:0:0";
  if (allowAudio && !isTransitioning) {
    isTransitioning = true;

    await fadeOutThenIn();
    const startTimeOscillater: ToneJSDuration = { "8n": 1 };
    const startTimeTraverser: ToneJSDuration = { "16n": 1 };
    const startTimeTraverserPlusOne: ToneJSDuration = { "16n": 3 };

    const xCentreSquare = Math.floor(xResolution / 2);
    const yCentreSquare = Math.floor(yResolution / 2);

    const xStartOscillater = xCentreSquare + Math.floor(3 / 5) * (-1) ** 3;
    const yStartOscillater =
      yCentreSquare + Math.floor(3 / 3) * (-1) ** Math.floor(3 / 3);

    const getNextXOscillater = (
      currentX: number,
      currentY: number,
      currentIteration: number
    ) =>
      xCentreSquare +
      Math.floor((currentIteration + 4) / 5) * (-1) ** (currentIteration + 4) * xStepDistance * 4;
    const getNextYOscillater = (
      currentX: number,
      currentY: number,
      currentIteration: number
    ) =>
      yCentreSquare +
      Math.floor((currentIteration + 4) / 3) *
        (-1) ** Math.floor((currentIteration + 4) / 3) * yStepDistance * 4;

    const calculateDurationIncreaseOscillater = (
      sinceDifferentNumberOscillater: number,
      mandleNumberOscillater: number
    ) => sinceDifferentNumberOscillater * ((mandleNumberOscillater % 3) + 1);
    pushSounds(
      xStartOscillater,
      yStartOscillater,
      xResolution * yResolution,
      getNextXOscillater,
      getNextYOscillater,
      startTimeOscillater,
      "16n",
      calculateDurationIncreaseOscillater
    );

    // new Tone.Loop(() => {
    //   getSounds(
    //     xStepDistance / 2,
    //     centreX,
    //     yStepDistance / 2,
    //     centreY,
    //     allowAudio
    //   );
    // }, traverserEndTime).start(traverserEndTime);
    Tone.Transport.start();
  }
};