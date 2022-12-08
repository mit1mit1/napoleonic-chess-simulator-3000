import type { pitchLineParameters, Vibe } from "./types";

export const getBPM = (currentVibe: Vibe) => {
  if (currentVibe === "pleasentlypicky") {
    return 100;
  }
  if (currentVibe === "basicpicky") {
    return 100;
  }
  if (currentVibe === "funkypicky") {
    return 120;
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
  if (currentVibe === "pleasentlypicky" || currentVibe === "basicpicky") {
    return {
      melodyInstrument: availableInstruments.electricGuitar,
      playMelodyInstrument: true,

      countermelodyInstrument: availableInstruments.electricGuitar,
      playCountermelodyInstrument: true,

      chordsInstrument: availableInstruments.electricGuitar,
      playChordsInstrument: true,
    };
  }
  if (currentVibe === "funkypicky") {
    return {
      melodyInstrument: availableInstruments.electricGuitar,
      playMelodyInstrument: true,

      countermelodyInstrument: availableInstruments.electricGuitar,
      playCountermelodyInstrument: true,

      chordsInstrument: availableInstruments.electricGuitar,
      playChordsInstrument: false,
    };
  } 
  if (currentVibe === "creepy") {
    return {
      melodyInstrument: availableInstruments.violin,
      playMelodyInstrument: true,

      countermelodyInstrument: availableInstruments.violin,
      playCountermelodyInstrument: true,

      chordsInstrument: availableInstruments.electricGuitar,
      playChordsInstrument: false,
    };
  } 
  if (currentVibe === "bumpish") {
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
  if (currentVibe === "pleasentlypicky") {
    return {
      skippiness: 1.9,
      maxSkippiness: 2.2,
      minSkippiness: 1.4,
      skippinessDelta: 0,
      rapidity: 0.5,
      maxRapidity: 0.75,
      minRapidity: 0.44,
      rapidityDelta: 0,
      jazziness: 0,
      maxJazziness: 0.05,
      minJazziness: 0,
      jazzinessDelta: 0,
      jumpiness: 0.3,
      maxJumpiness: 0.45,
      minJumpiness: 0.2,
      jumpinessDelta: 0,
    };
  }

  if (currentVibe === "funkypicky") {
    return {
      skippiness: 1.9,
      maxSkippiness: 2.2,
      minSkippiness: 1.4,
      skippinessDelta: 0,
      rapidity: 0.7,
      maxRapidity: 0.9,
      minRapidity: 0.40,
      rapidityDelta: 0,
      jazziness: 0.1,
      maxJazziness: 0.35,
      minJazziness: 0.05,
      jazzinessDelta: 0,
      jumpiness: 0.3,
      maxJumpiness: 0.5,
      minJumpiness: 0.1,
      jumpinessDelta: 0,
    };
  }

  if (currentVibe === "basicpicky") {
    return {
      skippiness: 1,
      maxSkippiness: 1,
      minSkippiness: 1,
      skippinessDelta: 0,
      rapidity: 1,
      maxRapidity: 1,
      minRapidity: 1,
      rapidityDelta: 0,
      jazziness: 0,
      maxJazziness: 0,
      minJazziness: 0,
      jazzinessDelta: 0,
      jumpiness: 0.3,
      maxJumpiness: 0.3,
      minJumpiness: 0.3,
      jumpinessDelta: 0,
    };
  }

  return {
    skippiness: 1.9,
    maxSkippiness: 1.9,
    minSkippiness: 1.9,
    skippinessDelta: 0.05,
    rapidity: 0.5,
    maxRapidity: 0.5,
    minRapidity: 0.5,
    rapidityDelta: 0.05,
    maxJazziness: 0,
    minJazziness: 0,
    jazziness: 0,
    jazzinessDelta: 0,
    jumpiness: 0.3,
    maxJumpiness: 0.3,
    minJumpiness: 0.3,
    jumpinessDelta: 0,
  };
};

export const getInitialCountermelodyParameters = (
  currentVibe: Vibe
): pitchLineParameters => {
  if (currentVibe === "pleasentlypicky") {
    return {
      skippiness: 1.9,
      maxSkippiness: 2.2,
      minSkippiness: 1.4,
      skippinessDelta: 0,
      rapidity: 0.5,
      maxRapidity: 0.75,
      minRapidity: 0.44,
      rapidityDelta: 0,
      jazziness: 0,
      maxJazziness: 0.15,
      minJazziness: 0,
      jazzinessDelta: 0,
      jumpiness: 0.3,
      maxJumpiness: 0.45,
      minJumpiness: 0.2,
      jumpinessDelta: 0,
    };
  }

  if (currentVibe === "funkypicky") {
    return {
      skippiness: 1.9,
      maxSkippiness: 2.4,
      minSkippiness: 1,
      skippinessDelta: 0,
      rapidity: 0.75,
      maxRapidity: 0.95,
      minRapidity: 0.3,
      rapidityDelta: 0,
      jazziness: 0.2,
      maxJazziness: 0.6,
      minJazziness: 0.1,
      jazzinessDelta: 0.05,
      jumpiness: 0.3,
      maxJumpiness: 0.45,
      minJumpiness: 0.2,
      jumpinessDelta: 0,
    };
  }

  if (currentVibe === "basicpicky") {
    return {
      skippiness: 1,
      maxSkippiness: 1,
      minSkippiness: 1,
      skippinessDelta: 0,
      rapidity: 1,
      maxRapidity: 1,
      minRapidity: 1,
      rapidityDelta: 0,
      jazziness: 0,
      maxJazziness: 0,
      minJazziness: 0,
      jazzinessDelta: 0,
      jumpiness: 0.3,
      maxJumpiness: 0.3,
      minJumpiness: 0.3,
      jumpinessDelta: 0,
    };
  }

  return {
    skippiness: 1.4,
    maxSkippiness: 1.4,
    minSkippiness: 1.4,
    skippinessDelta: 0,
    rapidity: 0.9,
    maxRapidity: 0.9,
    minRapidity: 0.9,
    rapidityDelta: 0.05,
    jazziness: 0.01,
    maxJazziness: 0.01,
    minJazziness: 0.01,
    jazzinessDelta: 0,
    jumpiness: 0.3,
    maxJumpiness: 0.3,
    minJumpiness: 0.3,
    jumpinessDelta: 0,
  };
};

const getNextDelta = (currentDelta: number, currentVibe: Vibe) => {
  const nextDelta = currentDelta + (Math.floor(Math.random() * 3) - 1) * 0.05;
  if (nextDelta > 0.15) {
    return 0.15;
  }
  if (nextDelta < -0.15) {
    return -0.15;
  }
  return nextDelta;
};

const getNextSkippiness = (currentParameters: pitchLineParameters) => {
  const nextSkippiness =
    currentParameters.skippiness + currentParameters.skippinessDelta;
  if (nextSkippiness > currentParameters.maxSkippiness) {
    return currentParameters.maxSkippiness;
  }
  if (nextSkippiness < currentParameters.minSkippiness) {
    return currentParameters.minSkippiness;
  }
  return nextSkippiness;
};

const getNextRapidity = (currentParameters: pitchLineParameters) => {
  const nextRapidity =
    currentParameters.rapidity +
    currentParameters.rapidityDelta -
    0.5 * currentParameters.skippinessDelta;
  if (nextRapidity > currentParameters.maxRapidity) {
    return currentParameters.maxRapidity;
  }
  if (nextRapidity < currentParameters.minRapidity) {
    return currentParameters.minRapidity;
  }
  return nextRapidity;
};

const getNextJazziness = (currentParameters: pitchLineParameters) => {
  const nextJazziness =
    currentParameters.jazziness + currentParameters.jazzinessDelta;
  if (nextJazziness > currentParameters.maxJazziness) {
    return currentParameters.maxJazziness;
  }
  if (nextJazziness < currentParameters.minJazziness) {
    return currentParameters.minJazziness;
  }
  return nextJazziness;
};

const getNextJumpiness = (currentParameters: pitchLineParameters) => {
  const nextJumpiness =
    currentParameters.jumpiness + currentParameters.jumpinessDelta;
  if (nextJumpiness > currentParameters.maxJumpiness) {
    return currentParameters.maxJumpiness;
  }
  if (nextJumpiness < currentParameters.minJumpiness) {
    return currentParameters.minJumpiness;
  }
  return nextJumpiness;
};

export const incrementParameters = (
  currentParameters: pitchLineParameters,
  currentVibe: Vibe
): pitchLineParameters => {
  return {
    minSkippiness: currentParameters.minSkippiness,
    maxSkippiness: currentParameters.maxSkippiness,
    minRapidity: currentParameters.minRapidity,
    maxRapidity: currentParameters.maxRapidity,
    minJazziness: currentParameters.minJazziness,
    maxJazziness: currentParameters.maxJazziness,
    minJumpiness: currentParameters.minJumpiness,
    maxJumpiness: currentParameters.maxJumpiness,
    skippiness: getNextSkippiness(currentParameters),
    skippinessDelta: getNextDelta(
      currentParameters.skippinessDelta,
      currentVibe
    ),
    rapidity: getNextRapidity(currentParameters),
    rapidityDelta: getNextDelta(currentParameters.rapidityDelta, currentVibe),
    jazziness: getNextJazziness(currentParameters),
    jazzinessDelta: getNextDelta(currentParameters.jazzinessDelta, currentVibe),
    jumpiness: getNextJumpiness(currentParameters),
    jumpinessDelta: getNextDelta(currentParameters.jumpinessDelta, currentVibe),
  };
};
