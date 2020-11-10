import { START_GEM_DROP_DURATION } from "./constants";

const formatTime = (time) => ((time || 0) / 1000).toFixed(1);

const formatScore = (score) => score.toLocaleString("en-us");

export const startPage = ({ handleChangePage, targetScore, timeLimit }) => {
  return () => (
    <section id="intro">
      <h1>Intro</h1>

      <p>Greetings! You were exploring a nice planet when aliens boarded your ship!</p>

      <p>
        After a chain of bizarre events, you now find yourself in a situation where you have{" "}
        <b>{timeLimit / 1000} seconds </b>
        to <b>score {formatScore(targetScore)} points</b> in a tile-matching game over relaxing ambient music if you
        want to save your ship and crew.
      </p>

      <button onClick={() => handleChangePage("newPlayingPage")}>Start Game</button>
    </section>
  );
};

export const playingPage = ({
  timeLimit,
  getRemainingTime,
  handleGemMouseDown,
  handleGemMouseEnter,
  handleTouchMove,
  setSelectedGem,
  handleChangePage,
}) => {
  return ({ gems, score }) => {
    const remainingTime = getRemainingTime();

    const table = gems.gemsKeys.map((val, index, arr) => {
      const id = arr[arr.length - 1 - index];

      if (!gems[id]) return null;

      const { value, row, col, destroyed } = gems[id];

      const style = {
        transform: `translate3d(${col * 100}%, ${row * 100}%, 0)`,
      };

      if (remainingTime === timeLimit) style.transitionDelay = `${(index * START_GEM_DROP_DURATION) / 1000}s`;

      if (destroyed) style.transform += " scale(0)";

      return (
        <span
          id={id}
          className="gem"
          key={id}
          style={style}
          onMouseDown={() => handleGemMouseDown(id)}
          onMouseEnter={() => handleGemMouseEnter(id)}
          onTouchStart={() => handleGemMouseDown(id)}
          data-value={value}
        >
          {value}
        </span>
      );
    });

    const timeCritical = remainingTime < 5000;
    const time = formatTime(remainingTime).split(".");

    return (
      <section id="game">
        <div className="top-bar">
          <span className="score">
            Score <b>{formatScore(score)}</b>
          </span>
          <span className="menu">
            <button onClick={() => handleChangePage("menuPage")}>Menu</button>
          </span>
          <span className="time" style={{ color: timeCritical ? "red" : "" }}>
            Time{" "}
            <b>
              {time[0]}
              <small>{time[1]}</small>
            </b>
          </span>
        </div>
        <div
          className="board"
          onMouseUp={() => setSelectedGem(null)}
          onMouseLeave={() => setSelectedGem(null)}
          onTouchMove={handleTouchMove}
        >
          {table}
        </div>
        <div className="time-s-up" style={{ display: remainingTime ? "none" : "" }}>
          Time's up!
        </div>
      </section>
    );
  };
};

export const menuPage = ({ handleChangePage, targetScore, getRemainingTime, isWin, getBgmVolume, setBgmVolume }) => {
  return ({ score, highscore, stats }) => {
    const remainingTime = getRemainingTime();
    const winStatus = isWin();

    const title = winStatus === null ? "Game Paused" : winStatus ? "Congratulations!" : "You lost";

    return (
      <section id="menu">
        <div>
          <h1>{title}</h1>

          {winStatus === null && (
            <div>
              Time Left: <b>{formatTime(remainingTime)}s</b>
            </div>
          )}
          <div>
            Target Score: <b>{formatScore(targetScore)}</b>
          </div>
          <div>
            Your Score: <b>{formatScore(score)}</b>
          </div>
          <div>
            High Score: <b>{formatScore(highscore)}</b>
          </div>

          <div className="button-container">
            <button onClick={() => handleChangePage("newPlayingPage")}>New Game</button>

            {winStatus === null && <button onClick={() => handleChangePage("playingPage")}>Resume Game</button>}
          </div>

          <div>
            Volume:
            <input
              type="range"
              defaultValue={getBgmVolume()}
              onInput={(e) => setBgmVolume(e.target.value)}
              min="0"
              max="0.5"
              step="0.05"
            />
          </div>

          <div className="stats-container">
            <b>Stats This Round:</b>
            <div>3 of a Kind: {stats.match3 || 0}</div>
            <div>4 of a Kind: {stats.match4 || 0}</div>
            <div>5 of a Kind: {stats.match5 || 0}</div>
          </div>

          <div className="button-container">
            <button onClick={() => handleChangePage("creditsPage")}>Credits</button>
          </div>
        </div>
      </section>
    );
  };
};

export const creditsPage = ({ handleChangePage }) => {
  return () => (
    <section id="credits">
      <h1>Credits</h1>

      <ul>
        <li>
          The music "Ethereal Eternity", "Piano at Night" and "Space Harmony" by{" "}
          <a href="https://www.purple-planet.com/" target="_blank" rel="noopener noreferrer">
            Purple Planet Music
          </a>{" "}
          used under the{" "}
          <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer">
            Creative Commons Attribution License 3.0
          </a>
          .
        </li>
        <li>
          The background image "Landscape Mountains Sun" by{" "}
          <a href="https://pixabay.com/users/8385-8385/" target="_blank" rel="noopener noreferrer">
            Reimund Bertrams
          </a>{" "}
          used under the{" "}
          <a href="https://pixabay.com/service/license/" target="_blank" rel="noopener noreferrer">
            Pixabay License
          </a>
          .
        </li>
      </ul>

      <div className="button-container">
        <button onClick={() => handleChangePage("menuPage")}>Back to Menu</button>
      </div>
    </section>
  );
};
