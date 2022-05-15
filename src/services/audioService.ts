import { Logger } from '../log';

/* disable eslint */
// import clickSfx from "../sounds/click.wav"

// Legend
// DUR - duration in seconds   SPS - sample per second (default 44100)
// NCH - number of channels    BPS - bytes per sample

// t - is number from range [0, DUR), return number in range [0, 1]

// export const AudioService = (() => {
//     let audioEnabled = true;
//     const WAV = new Audio( genWAVUrl(5) ); // 5s
//     WAV.setAttribute("controls", "controls");
//     WAV.loop = true;
    
//     return {
//         setAudioEnabled(enabled: boolean): void {
//           audioEnabled = enabled;
//           Logger.debug("audio set to" + audioEnabled)
//         },

//         playClick() {
//             if (audioEnabled) {
//                 WAV.play()
//             }
//             Logger.debug("click played")
//         }
//     };
// })();