let COUNTER = 0;

const createGemId = () => `gem-${(COUNTER += 1)}`;

const createRandomGemValue = (selection) => {
  if (Array.isArray(selection)) return selection[Math.floor(Math.random() * selection.length)];

  return Math.floor(Math.random() * selection);
};

export const createGem = ({ row, col, selection, board }) => {
  const value = createRandomGemValue(selection);
  const gemId = createGemId();

  if (board) board[`${row}_${col}`] = gemId;

  return {
    id: gemId,
    value,
    row,
    col,
  };
};

export const createBoard = ({ rowCount, colCount, typeCount, rowOffset = 0, colOffset = 0 }) => {
  const gems = {};
  const board = {};

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      let left = [];
      let top = [];

      if (col > 1) {
        const key1 = board[`${row}_${col - 1}`];
        const key2 = board[`${row}_${col - 2}`];

        left = [gems[key1].value, gems[key2].value];
      }

      if (row > 1) {
        const key1 = board[`${row - 1}_${col}`];
        const key2 = board[`${row - 2}_${col}`];

        top = [gems[key1].value, gems[key2].value];
      }

      const invalid = [left[0] === left[1] ? left[0] : null, top[0] === top[1] ? top[0] : null];
      const selection = [];

      for (let k = 0; k < typeCount; k++) {
        if (k !== invalid[0] && k !== invalid[1]) selection.push(k);
      }

      const gem = createGem({ row, col, selection, board });

      gem.row += rowOffset;
      gem.col += colOffset;

      gems[gem.id] = gem;
    }
  }

  return gems;
};

export function dispatchCreator(stateName, reducer) {
  return (action, callback) => this.setState({ [stateName]: reducer(this.state[stateName], action) }, callback);
}

export const soundManager = () => {
  const playlist = ["Ethereal Eternity", "Piano at Night", "Space Harmony"];

  let index = Math.floor(Math.random() * playlist.length);
  let volume = 0.5;

  const audios = playlist.map((filename) => {
    const audio = new Audio(`music/${filename}.mp3`);

    audio.volume = volume;
    audio.onended = () => {
      index = index === audios.length - 1 ? 0 : index + 1;
      audios[index].play();
    };

    return audio;
  });

  window.audios = audios;

  return {
    play: () => audios[index].play(),
    pause: () => audios[index].pause(),
    setVolume: (value) => {
      audios.forEach((audio) => (audio.volume = value));
      volume = value;
    },
    getVolume: () => audios[0].volume,
    playSfx: (filename) => {
      const audio = new Audio(`sfx/${filename}.mp3`);
      audio.volume = volume * 2;
      audio.play();
    },
  };
};