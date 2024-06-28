import { AudioPlayer } from "./audio.js";

export const data = [
  {
    color: ["#ff6a00", "#720400"],
    name: "EMBER",
    alt: "엠버 포스터",
    audio: new AudioPlayer("./assets/audio/ember.m4a"),
  },
  {
    color: ["#1ca9f8", "#000054"],
    name: "WADE",
    alt: "웨이드 포스터",
    audio: new AudioPlayer("./assets/audio/wade.m4a"),
  },
  {
    color: ["#98d00f", "#002906"],
    name: "CLOD",
    alt: "클로드 포스터",
    audio: new AudioPlayer("./assets/audio/clod.m4a"),
  },
  {
    color: ["#d968e6", "#30003c"],
    name: "GALE",
    alt: "게일 포스터",
    audio: new AudioPlayer("./assets/audio/gale.m4a"),
  },
];
