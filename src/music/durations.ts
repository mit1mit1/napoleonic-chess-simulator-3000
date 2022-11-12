import type { BaseDuration, ToneJSDuration } from "./types";

const durationToNumber = (duration: BaseDuration) => {
  switch (duration) {
    case "16n":
      return 1;
    case "8n":
      return 2;
    case "8n.":
      return 3;
    case "4n":
      return 4;
    case "4n.":
      return 6;
    case "2n":
      return 8;
    case "2n.":
      return 12;
    case "1n":
      return 16;
    case "1n.":
      return 24;
    case "2t":
      return 12;
    case "4t":
      return 16;
    case "8t":
      return 24;
    case "16t":
      return 24;
  }
};

export const durationsTo16thCount = (durations: Array<BaseDuration>) => {
  let current16s = 0;
  for (let i = 0; i < durations.length; i++) {
    current16s += durationToNumber(durations[i] as BaseDuration);
  }
  return current16s;
};

export const tonejsDurationTo16thCount = (duration: ToneJSDuration) => {
  let current16s = 0;
  for (const [key, value] of Object.entries(duration)) {
    current16s += durationToNumber(key as BaseDuration) * value;
  }
  return current16s;
};
