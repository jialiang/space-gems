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
  let volume = parseFloat(localStorage.getItem("volume") || 0.5);
  const publicUrl = process.env.PUBLIC_URL;

  const playlist = ["Ethereal Eternity", "Piano at Night", "Space Harmony"];
  let index = Math.floor(Math.random() * playlist.length);

  const playBgm = () => {
    let audio = playlist[index];

    if (!audio.play) {
      audio = new Audio(`${publicUrl}/music/${audio}.mp3`);
      audio.onended = () => {
        index = index + 1 === playlist.length ? 0 : index + 1;
        playBgm();
      };
      playlist[index] = audio;
    }

    audio.volume = volume;
    audio.play();
  };

  const pauseBgm = () => {
    if (playlist[index].pause) playlist[index].pause();
  };

  const sfx = ["5secondsleft", "congratulations", "ding", "gameover", "gamestart", "timesup"];
  sfx.forEach((filename) => {
    const audio = new Audio(`${publicUrl}/sfx/${filename}.mp3`);
    audio.preload = true;
  });

  return {
    playBgm,
    pauseBgm,
    setVolume: (value) => {
      const val = Math.pow(parseFloat(value) * 2, 2) / 2;

      if (playlist[index].play) playlist[index].volume = val;
      volume = val;
      localStorage.setItem("volume", val);
    },
    getVolume: () => Math.pow(volume * 2, 0.5) / 2,
    playSfx: (filename) => {
      const audio = new Audio(`${publicUrl}/sfx/${filename}.mp3`);
      audio.volume = volume * 1.5;
      audio.play();
    },
  };
};
