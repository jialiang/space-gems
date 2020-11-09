import React from "react";

import { gemsReducer, scoreReducer, statsReducer } from "./reducers";
import { handleGemMouseDown, handleGemMouseEnter, handleTouchMove, handleChangePage } from "./handlers";
import { dispatchCreator, soundManager } from "./utilities";
import {
  startCountDown,
  startGame,
  swapGems,
  findMatches,
  destroyGems,
  replaceDestroyedGems,
  dropGems,
  cleanupGems,
  next,
} from "./lifecycle";
import { startPage, playingPage, menuPage, creditsPage } from "./pages";
import { TRANSITION_DURATION, TIMES_UP_SCREEN_DURATION } from "./constants";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.initGameParameters(props);

    this.state = { page: "startPage" };

    this.initDispatchers();
    this.initSetterGetters();
    this.initLifecycleStages();
    this.initUserEventHandlers();
    this.initPages();
  }

  initGameParameters = (props) => {
    this.rowCount = Math.max(props.rowCount || 8, 3);
    this.colCount = Math.max(props.colCount || 8, 3);
    this.typeCount = Math.max(props.typeCount || 5, 3);
    this.targetScore = props.targetScore || 20000;
    this.timeLimit = (props.timeLimit || 60) * 1000;

    this.highscore = parseInt(localStorage.getItem("highscore") || 0);
    this.soundManager = soundManager();
  };

  initDispatchers = () => {
    this.dispatchGems = dispatchCreator.call(this, "gems", gemsReducer);
    this.dispatchScore = dispatchCreator.call(this, "score", scoreReducer);
    this.dispatchStats = dispatchCreator.call(this, "stats", statsReducer);
  };

  initSetterGetters = () => {
    this.getGem = (id) => this.state.gems[id === "selectedGem" ? this.selectedGemId : id];
    this.getGemFromBoard = (row, col) => this.getGem(this.state.gems.board[`${row}_${col}`]);
    this.setSelectedGem = (id) => (this.selectedGemId = id);

    this.getRemainingTime = () => this.state.remainingTime;
    this.setRemainingTime = (remainingTime, callback) => this.setState({ remainingTime }, callback);

    this.isLocked = () => this.state.step !== "default";
    this.isWin = () => {
      if (this.getTotalElapsed() < this.timeLimit) return null;

      return this.state.score >= this.targetScore;
    };

    this.getPage = () => this.state.page;
    this.setPage = (value) => {
      this.setState({ page: value });

      if (value !== "startPage") this.soundManager.play();
    };

    this.getStep = () => this.state.step;
    this.setStep = (value) => this.setState({ step: value });

    this.getUndo = () => this.undo;
    this.setUndo = (firstGemId, secondGemId) => (this.undo = firstGemId ? { firstGemId, secondGemId } : null);

    this.getTotalElapsed = () => this.totalElapsed;
    this.setTotalElapsed = (time) => (this.totalElapsed = time);

    this.getLastTimestamp = () => this.lastTimestamp;
    this.setLastTimestamp = (timestamp) => (this.lastTimestamp = timestamp);

    this.getBgmVolume = this.soundManager.getVolume;
    this.setBgmVolume = this.soundManager.setVolume;
  };

  initLifecycleStages = () => {
    this.startCountDown = startCountDown(this);
    this.startGame = startGame(this);

    this.prepareNewGame = () => {
      this.setSelectedGem(null);
      this.setUndo(null);
      this.setTotalElapsed(null);
      this.setLastTimestamp(null);

      this.dispatchGems({ type: "set", data: {} });
      this.dispatchScore({ type: "reset" });
      this.dispatchStats({ type: "reset" });

      this.setStep("starting");
      this.setPage("playingPage");
      this.setRemainingTime(this.timeLimit);
    };

    this.swapGems = swapGems(this);
    this.findMatches = findMatches(this);
    this.destroyGems = destroyGems(this);
    this.replaceDestroyedGems = replaceDestroyedGems(this);
    this.dropGems = dropGems(this);
    this.cleanupGems = cleanupGems(this);

    this.next = next(this);
  };

  initUserEventHandlers = () => {
    this.handleGemMouseDown = handleGemMouseDown(this);
    this.handleGemMouseEnter = handleGemMouseEnter(this);
    this.handleChangePage = handleChangePage(this);
    this.handleTouchMove = handleTouchMove(this);
  };

  initPages = () => {
    this.startPage = startPage(this);
    this.playingPage = playingPage(this);
    this.menuPage = menuPage(this);
    this.creditsPage = creditsPage(this);
  };

  componentWillUnmount() {
    this.soundManager.pause();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.step !== prevState.step && this.state.step !== "default") {
      if (this.state.step === "create" || this.state.step === "starting") {
        requestAnimationFrame(this.next);
      } else {
        setTimeout(() => requestAnimationFrame(this.next), TRANSITION_DURATION);
      }
    }

    if (this.state.page !== prevState.page && this.state.page === "playingPage" && this.state.step !== "starting") {
      this.startCountDown();
    }

    // Detect time's up
    if (
      (this.state.remainingTime !== prevState.remainingTime || this.state.step !== prevState.step) &&
      this.state.remainingTime <= 0 &&
      this.state.step === "default"
    ) {
      if (this.state.score > this.highscore) {
        this.highscore = this.state.score;
        localStorage.setItem("highscore", this.state.score);
      }

      this.soundManager.playSfx("timesup");

      setTimeout(() => {
        if (this.isWin()) this.soundManager.playSfx("congratulations");
        else this.soundManager.playSfx("gameover");

        this.handleChangePage("menuPage");
      }, TIMES_UP_SCREEN_DURATION);
    }
  }

  render = () =>
    this[this.state.page]({
      gems: this.state.gems,
      score: this.state.score,
      highscore: this.highscore,
      targetScore: this.targetScore,
      stats: this.state.stats,
    });
}

export default Game;
