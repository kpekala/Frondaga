import useSound from 'use-sound';



export const AudioService = (() => {
  let audioEnabled = true;
  const clickSfx = '../sounds/Cak.mp3';
  const click = new Audio(clickSfx)
  click.type("audio/mp3")

  return {
      playClick() {
        if (audioEnabled) {
          click.play()
        }
      },

      disableAllSounds() {
        audioEnabled = false
      },

      enableAllSounds() {
        audioEnabled = true
      }
  };
})();

