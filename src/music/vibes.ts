import type { pitchLineParameters, Vibe } from "./types";

export const getBPM = (currentVibe: Vibe) => {
  if (currentVibe === "picky") {
    return 100;
  }
  if (currentVibe === "creepy") {
    return 60;
  }
  return 70;
};

export const getInstruments = (
  currentVibe: Vibe,
  availableInstruments: { electricGuitar: any; violin: any }
) => {
  if (currentVibe === "picky") {
    return {
      melodyInstrument: availableInstruments.electricGuitar,
      playMelodyInstrument: true,

      countermelodyInstrument: availableInstruments.electricGuitar,
      playCountermelodyInstrument: true,

      chordsInstrument: availableInstruments.electricGuitar,
      playChordsInstrument: true,
    };
  } else if (currentVibe === "creepy") {
    return {
      melodyInstrument: availableInstruments.violin,
      playMelodyInstrument: true,

      countermelodyInstrument: availableInstruments.violin,
      playCountermelodyInstrument: true,

      chordsInstrument: availableInstruments.electricGuitar,
      playChordsInstrument: false,
    };
  } else if (currentVibe === "bumpish") {
    return {
      melodyInstrument: availableInstruments.violin,
      playMelodyInstrument: true,

      countermelodyInstrument: availableInstruments.electricGuitar,
      playCountermelodyInstrument: true,

      chordsInstrument: availableInstruments.electricGuitar,
      playChordsInstrument: false,
    };
  }
  return {
    melodyInstrument: availableInstruments.electricGuitar,
    playMelodyInstrument: true,

    countermelodyInstrument: availableInstruments.electricGuitar,
    playCountermelodyInstrument: true,

    chordsInstrument: availableInstruments.electricGuitar,
    playChordsInstrument: true,
  };
};

export const getInitialMelodyParameters = (
  currentVibe: Vibe
): pitchLineParameters => {
  return {
    skippiness: 1.9,
    skippinessDelta: 0.05,
    rapidity: 0.5,
    rapidityDelta: 0.05,
    jazziness: 0,
    jazzinessDelta: 0,
    jumpiness: 0.3,
    jumpinessDelta: 0,
  };
};

export const getInitialCountermelodyParameters = (
  currentVibe: Vibe
): pitchLineParameters => {
  return {
    skippiness: 1.4,
    skippinessDelta: 0,
    rapidity: 0.9,
    rapidityDelta: 0.05,
    jazziness: 0.01,
    jazzinessDelta: 0,
    jumpiness: 0.3,
    jumpinessDelta: 0,
  };
};

const getNextDelta = (currentDelta: number) => {
  const nextDelta = currentDelta + (Math.floor(Math.random() * 3) - 1) * 0.05;
  if (nextDelta > 0.15) {
    return 0.15;
  }
  if (nextDelta < -0.15) {
    return -0.15;
  }
  return nextDelta;
};

export const incrementParameters = (
  currentParameters: pitchLineParameters,
  currentVibe: Vibe
): pitchLineParameters => {
  return {
    skippiness:
      currentParameters.skippiness + currentParameters.skippinessDelta,
    skippinessDelta: getNextDelta(currentParameters.skippinessDelta),
    rapidity:
      currentParameters.rapidity +
      currentParameters.rapidityDelta -
      0.5 * currentParameters.skippinessDelta,
    rapidityDelta: getNextDelta(currentParameters.rapidityDelta),
    jazziness: currentParameters.jazziness + currentParameters.jazzinessDelta,
    jazzinessDelta: getNextDelta(currentParameters.jazzinessDelta),
    jumpiness: currentParameters.jumpiness + currentParameters.jumpinessDelta,
    jumpinessDelta: getNextDelta(currentParameters.jumpinessDelta),
  };
};
