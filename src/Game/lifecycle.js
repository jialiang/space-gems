import { createBoard, createGem } from "./utilities";
import { TRANSITION_DURATION, START_GEM_DROP_DURATION } from "./constants";

export const startGame = ({ rowCount, colCount, typeCount, dispatchGems, setStep, startCountDown, soundManager }) => {
  return () => {
    dispatchGems({
      type: "update",
      data: createBoard({
        rowCount,
        colCount,
        typeCount,
        rowOffset: -rowCount,
      }),
    });

    setStep("create");

    setTimeout(() => {
      soundManager.playSfx("gamestart");
      requestAnimationFrame(startCountDown);
    }, TRANSITION_DURATION + START_GEM_DROP_DURATION * rowCount * colCount);
  };
};

export const startCountDown = ({
  timeLimit,
  setRemainingTime,
  setTotalElapsed,
  setLastTimestamp,
  getPage,
  getTotalElapsed,
  getLastTimestamp,
  soundManager,
}) => {
  let reportedFiveSecondsLeft = false;

  const updateTime = () => {
    let lastTimestamp = getLastTimestamp();
    let totalElapsed = getTotalElapsed();

    if (totalElapsed && totalElapsed >= timeLimit) return;

    if (getPage() !== "playingPage") return setLastTimestamp(null);

    const now = performance.now();

    if (!totalElapsed && !lastTimestamp) reportedFiveSecondsLeft = false;
    if (!totalElapsed) totalElapsed = 0;
    if (!lastTimestamp) lastTimestamp = now;

    totalElapsed += now - lastTimestamp;
    lastTimestamp = now;

    const remaining = Math.max(timeLimit - totalElapsed, 0);

    if (!reportedFiveSecondsLeft && remaining <= 5500) {
      soundManager.playSfx("5secondsleft");
      reportedFiveSecondsLeft = true;
    }

    setTotalElapsed(totalElapsed);
    setLastTimestamp(lastTimestamp);
    setRemainingTime(remaining, () => requestAnimationFrame(updateTime));
  };

  return () => requestAnimationFrame(updateTime);
};

export const swapGems = ({ getGem, setStep, dispatchGems, setUndo }) => {
  return (firstGemId, secondGemId, isUndo) => {
    const firstGem = getGem(firstGemId);
    const secondGem = getGem(secondGemId);

    dispatchGems({
      type: "update",
      data: {
        [firstGemId]: {
          row: secondGem.row,
          col: secondGem.col,
        },
        [secondGemId]: {
          row: firstGem.row,
          col: firstGem.col,
        },
      },
    });

    if (isUndo) setUndo(null);

    setStep(isUndo ? "unswap" : "swap");
  };
};

export const findMatches = ({ getGemFromBoard, rowCount, colCount }) => {
  return () => {
    const matches = [];

    for (let k = 0; k < 2; k++) {
      for (let i = 0; i < (k === 0 ? rowCount : colCount); i++) {
        const keyGroups = [];
        let lastValue = null;

        for (let j = 0; j < (k === 0 ? colCount : rowCount); j++) {
          const gem = getGemFromBoard(k === 0 ? i : j, k === 0 ? j : i);

          if (gem.value !== lastValue || gem.destroyed) {
            keyGroups.push([gem.id]);
          } else {
            keyGroups[keyGroups.length - 1].push(gem.id);
          }

          lastValue = gem ? gem.value : null;
        }

        keyGroups.forEach((group) => {
          if (group.length >= 3) matches.push(group);
        });
      }
    }

    return matches;
  };
};

export const destroyGems = ({ setStep, dispatchScore, dispatchGems, dispatchStats, soundManager }) => {
  return (matches) => {
    const updateGems = {};
    const stats = {
      match3: 0,
      match4: 0,
      match5: 0,
    };
    let addScore = 0;

    matches.forEach((match) => {
      addScore += (match.length - 2) * match.length * 100;
      stats[`match${match.length}`] += 1;

      match.forEach((gemId) => {
        updateGems[gemId] = {
          destroyed: true,
        };
      });
    });

    dispatchScore({
      type: "increment",
      value: addScore,
    });
    dispatchGems({
      type: "update",
      data: updateGems,
    });
    dispatchStats({
      type: "increment",
      data: stats,
    });

    soundManager.playSfx("ding");
    setStep("destroy");
  };
};

export const replaceDestroyedGems = ({ getGemFromBoard, setStep, dispatchGems, rowCount, colCount, typeCount }) => {
  return () => {
    const updateGems = {};

    for (let col = 0; col < colCount; col++) {
      let gap = 0;

      for (let row = rowCount - 1; row >= 0; row--) {
        const gem = getGemFromBoard(row, col);

        if (!gem || gem.destroyed) {
          gap += 1;

          const newGem = createGem({ row: gap * -1, col, selection: typeCount });
          updateGems[newGem.id] = newGem;
        }
      }
    }

    dispatchGems({
      type: "update",
      data: updateGems,
    });

    setStep("create");
  };
};

export const dropGems = ({ getGemFromBoard, setStep, dispatchGems, rowCount, colCount }) => {
  return () => {
    const updateGems = {};

    for (let col = 0; col < colCount; col++) {
      let gap = 0;
      let toMoveCount = rowCount;

      for (let row = rowCount - 1; toMoveCount > 0; row--) {
        const gem = getGemFromBoard(row, col);

        if (!gem || gem.destroyed) {
          gap += 1;
          continue;
        }

        if (gap > 0) {
          updateGems[gem.id] = {
            row: gem.row + gap,
            col: gem.col,
          };
        }

        toMoveCount -= 1;
      }
    }

    dispatchGems({
      type: "update",
      data: updateGems,
    });

    setStep("drop");
  };
};

export const cleanupGems = ({ dispatchGems }) => {
  return () => {
    dispatchGems({
      type: "cleanup",
    });
  };
};

export const next = ({
  getStep,
  setStep,

  startGame,
  findMatches,
  swapGems,
  getUndo,
  destroyGems,
  replaceDestroyedGems,
  dropGems,
  cleanupGems,
}) => {
  return () => {
    const step = getStep();
    const undo = getUndo();

    if (step === "starting") return startGame();

    if (step === "drop") cleanupGems();

    // Check matches only if previous action was swapping gems or dropping gems
    let matches = [];

    if (step === "swap" || step === "drop") matches = findMatches();

    // If last step was swap gems and no matches, undo swap
    if (step === "swap" && matches.length === 0 && undo) return swapGems(undo.firstGemId, undo.secondGemId, true);

    // If there's match, destroy gems
    if (matches.length !== 0) return destroyGems(matches);

    // If last step was destroy, create new gems to replace
    if (step === "destroy") return replaceDestroyedGems();

    // If last step was creating new gems, start dropping gems to fill space
    if (step === "create") return dropGems();

    setStep("default");
  };
};
