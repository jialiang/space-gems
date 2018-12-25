class Game extends React.Component {
  constructor(props) {
    super(props);

    this.types = ["red", "green", "blue", "yellow", "purple"];
    this.points = {
      3: 50,
      4: 150,
      5: 700,
      6: 2000,
      7: 3000
    };

    this.time = React.createRef();
    this.board = React.createRef();
    this.score = React.createRef();

    this.state = {
      intro: true,
      outro: false,
      showMenu: false,
      menuMessage: "Goal: 8000 points",
      key: Date.now()
    };

    this.bgmVolume = localStorage.getItem("bgmVolume") || 0.5;
  }

  gameStart() {
    this.time.current.startCountdown();
  }

  playBgm() {
    var self = this;
    var index = Math.floor(Math.random() * 3 + 1);

    this.bgm = document.getElementById("bgm" + index);
    this.bgm.volume = 0;
    this.bgm.addEventListener("ended", onAudioEnd);
    this.bgm.addEventListener("play", () => {
      var fadeAudio = setInterval(() => {
        if (this.bgm.volume < this.bgmVolume) this.bgm.volume += this.bgmVolume / 50;
        if (this.bgm.volume >= this.bgmVolume) clearInterval(fadeAudio);
      }, 100);
    });

    this.bgm.play();

    function onAudioEnd() {
      index = ((index + 1) % 3) + 1;
      self.bgm = document.getElementById("bgm" + index);
      self.bgm.volume = self.bgmVolume;
      self.bgm.play();
      self.bgm.addEventListener("ended", onAudioEnd);
    }
  }

  timeUp() {
    this.board.current.gameEnded();

    setTimeout(() => {
      var currentScore = this.score.current.state.value || 0;

      if (currentScore < 80000) {
        this.setState({
          showMenu: true,
          menuMessage: "Game Over!"
        });
      } else {
        if ((localStorage.getItem("highscore") || 0) < currentScore) localStorage.setItem("highscore", currentScore);

        this.setState({
          outro: true
        });
      }
    }, 500);
  }

  changeScore(s) {
    var total = 0;

    for (var i = 0; i < s.length; i++) total += this.points[s[i]] || 0;

    this.score.current.changeScore(total);
  }

  changeVolume(v) {
    this.bgm.volume = v.target.value;
    this.bgmVolume = v.target.value;

    localStorage.setItem("bgmVolume", v.target.value);
  }

  toggleMenu() {
    if (!this.state.showMenu) {
      this.time.current.pauseCountdown();
    } else {
      this.time.current.startCountdown();
    }

    this.setState({
      showMenu: !this.state.showMenu
    });
  }

  newGame() {
    this.time = React.createRef();
    this.board = React.createRef();
    this.score = React.createRef();

    this.setState({
      outro: false,
      showMenu: false,
      menuMessage: "Goal: 8000 points",
      key: Date.now()
    });
  }

  afterIntro() {
    this.setState({
      intro: false
    });

    this.playBgm();
  }

  render() {
    var a = this.state.intro ? (
      <div id="intro">
        <h1>Intro</h1>
        <p> Greetings! You were exploring a nice planet when aliens boarded your ship!</p>
        <p>
          After a chain of bizarre events, you now find yourself in a situation where you have 2 minutes to score 8000 points in a tile-matching game over
          relaxing ambient music if you want to save your ship and crew.
        </p>
        <button onClick={this.afterIntro.bind(this)}>Start Game</button>
      </div>
    ) : null;

    var b = this.state.outro ? (
      <div id="outro">
        <h1>Congratulations!</h1>
        <p>You've managed to escape!</p>
        <p>High score: {localStorage.getItem("highscore") || 0} </p>
        <p>Your score: {this.score.current.state.value || 0} </p>
        <button onClick={this.newGame.bind(this)}>Play Again</button>
      </div>
    ) : null;

    var c =
      !a && !b ? (
        <div id="game">
          <Menu onToggleMenu={this.toggleMenu.bind(this)} />
          <Time key={this.state.key} ref={this.time} value="120" onTimeUp={this.timeUp.bind(this)} />
          <Score key={this.state.key + 1} ref={this.score} />
          <Board
            key={this.state.key + 2}
            ref={this.board}
            rows="8"
            columns="8"
            types={this.types}
            onGameStart={this.gameStart.bind(this)}
            onScoreChange={this.changeScore.bind(this)}
          />
          {this.state.showMenu && (
            <MenuBox
              bgmVolume={this.bgmVolume}
              menuMessage={this.state.menuMessage}
              onToggleMenu={this.toggleMenu.bind(this)}
              onVolumeChange={this.changeVolume.bind(this)}
              onNewGame={this.newGame.bind(this)}
            />
          )}
        </div>
      ) : null;

    return a || b || c;
  }
}

class Gem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: this.props.initial
    };
  }

  componentDidMount() {
    var { row, col, maxRows, maxColumns } = this.props;
    var { initial } = this.state;

    if (!initial) return;

    var duration = initial == 1 ? row * maxColumns * 20 + (row % 2 ? col : maxRows - col) * 20 : 150;

    setTimeout(() => {
      this.setState({
        initial: 0
      });
    }, duration);
  }

  render() {
    var { row, col, maxRows, destroy, type } = this.props;
    var { initial } = this.state;

    var x = col;
    var y = initial ? row + (initial == 1 ? maxRows : 5) : row;

    var translate3d = "translate3d(" + x + "00%, -" + y + "00%, 0)";
    translate3d += destroy ? " scale(0)" : " scale(1)";

    return <div row={row} col={col} className={"gems " + type} style={{ transform: translate3d }} />;
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.activeGem = null;
    this.lock = true;
    this.end = false;

    var gemsRender = [];
    var gemsIndex = [];

    var { rows, columns, types } = this.props;
    var row, col, type, g1, g2, g3, g4;

    for (var i = 0; i < rows * columns; i++) {
      row = Math.floor(i / columns);
      col = i % rows;
      type;

      if (col === 0) gemsIndex.push(new Array(columns));

      while (true) {
        type = types[Math.floor(Math.random() * types.length)];

        var g1 = row > 1 ? gemsRender[i - columns] : null;
        var g2 = row > 1 ? gemsRender[i - columns * 2] : null;
        var g3 = col > 1 ? gemsRender[i - 1] : null;
        var g4 = col > 1 ? gemsRender[i - 2] : null;

        if (g1 && g2 && g1.props.type === type && g2.props.type === type) continue;
        if (g3 && g4 && g3.props.type === type && g4.props.type === type) continue;

        break;
      }

      gemsRender.push(<Gem key={i} row={row} col={col} maxRows={rows} maxColumns={columns} type={type} initial="1" />);
      gemsIndex[row][col] = i;
    }

    this.gemsIndex = gemsIndex;
    this.state = {
      gemsRender: gemsRender
    };
  }

  componentDidMount() {
    this.addListeners();

    setTimeout(() => {
      this.props.onGameStart();
      this.lock = false;
    }, 1250);
  }

  addListeners() {
    var self = this;

    this.ref.current.addEventListener("dragstart", e => {
      e.preventDefault();
    });

    this.ref.current.addEventListener("touchstart", e => {
      if (!this.end) self.activeGem = e.target;
    });

    this.ref.current.addEventListener("touchmove", e => {
      self.moveGem(e, 1);
    });

    self.ref.current.addEventListener("touchend", e => {
      self.activeGem = null;
    });

    this.ref.current.addEventListener("mousedown", e => {
      if (!this.end) self.activeGem = e.target;
    });

    this.ref.current.addEventListener("mousemove", e => {
      self.moveGem(e);
    });

    self.ref.current.addEventListener("mouseup", e => {
      self.activeGem = null;
    });
  }

  moveGem(e, touch) {
    var target = e.target;

    if (touch) target = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);

    if (!this.activeGem || target === this.activeGem || this.lock) return;
    if (!target.classList.contains("gems")) return (this.activeGem = null);

    var r1 = this.activeGem.getAttribute("row");
    var c1 = this.activeGem.getAttribute("col");

    var r2 = target.getAttribute("row");
    var c2 = target.getAttribute("col");

    if (Math.abs(r1 - r2) + Math.abs(c1 - c2) !== 1) return (this.activeGem = null);

    this.lock = true;

    var i1 = this.gemsIndex[r1][c1];
    var i2 = this.gemsIndex[r2][c2];

    var gemsRender = this.state.gemsRender.slice();
    gemsRender[i1] = <Gem key={i1} {...gemsRender[i1].props} row={r2} col={c2} />;
    gemsRender[i2] = <Gem key={i2} {...gemsRender[i2].props} row={r1} col={c1} />;

    this.gemsIndex[r1][c1] = i2;
    this.gemsIndex[r2][c2] = i1;

    this.setState(
      {
        gemsRender: gemsRender
      },
      () => {
        setTimeout(() => {
          this.checkMatch() || this.undoMove(i1, i2, r1, r2, c1, c2);
        }, 150);
      }
    );

    this.activeGem = null;
  }

  undoMove(i1, i2, r1, r2, c1, c2) {
    var gemsRender = this.state.gemsRender.slice();

    gemsRender[i1] = <Gem key={i1} {...gemsRender[i1].props} row={r1} col={c1} />;
    gemsRender[i2] = <Gem key={i2} {...gemsRender[i2].props} row={r2} col={c2} />;

    this.gemsIndex[r1][c1] = i1;
    this.gemsIndex[r2][c2] = i2;

    this.setState(
      {
        gemsRender: gemsRender
      },
      () => {
        this.lock = false;
      }
    );
  }

  checkMatch() {
    var gr = this.state.gemsRender.slice();
    var gi = this.gemsIndex;
    var match = [];
    var m, l1, l2, r1, r2, t1, t2, b1, b2;
    var total = [],
      subtotal = 0;

    for (var i = 0; i < gi.length; i++) {
      for (var j = 0; j < gi[i].length; j++) {
        m = gi[i][j];

        if (isNaN(m)) continue;

        l1 = gi[i][j - 1];
        l2 = gi[i][j - 2];
        r1 = gi[i][j + 1];
        r2 = gi[i][j + 2];

        t1 = gi[i + 1] && gi[i + 1][j];
        t2 = gi[i + 2] && gi[i + 2][j];
        b1 = gi[i - 1] && gi[i - 1][j];
        b2 = gi[i - 2] && gi[i - 2][j];

        subtotal = 0;

        if (!isNaN(l1) && !isNaN(r1) && gr[l1].props.type === gr[m].props.type && gr[r1].props.type === gr[m].props.type) {
          match.push([i, j]);
          match.push([i, j - 1]);
          match.push([i, j + 1]);

          subtotal += 3;

          if (!isNaN(l2) && gr[l2].props.type === gr[m].props.type) match.push([i, j - 2]) && (subtotal += 1);
          if (!isNaN(r2) && gr[r2].props.type === gr[m].props.type) match.push([i, j + 2]) && (subtotal += 1);
        }

        if (subtotal > 0) total.push(subtotal);
        subtotal = 0;

        if (!isNaN(t1) && !isNaN(b1) && gr[t1].props.type === gr[m].props.type && gr[b1].props.type === gr[m].props.type) {
          match.push([i, j]);
          match.push([i + 1, j]);
          match.push([i - 1, j]);

          subtotal += 3;

          if (!isNaN(t2) && gr[t2].props.type === gr[m].props.type) match.push([i + 2, j]) && (subtotal += 1);
          if (!isNaN(b2) && gr[b2].props.type === gr[m].props.type) match.push([i - 2, j]) && (subtotal += 1);
        }

        if (subtotal > 0) total.push(subtotal);
      }
    }

    for (var i = 0; i < match.length; i++) {
      m = gi[match[i][0]][match[i][1]];
      gr[m] = <Gem key={m} {...gr[m].props} destroy="1" />;
    }

    if (total.length > 0) this.props.onScoreChange(total);

    this.setState(
      {
        gemsRender: gr
      },
      () => {
        setTimeout(() => {
          this.moveDown(match);
        }, 150);
      }
    );

    return match.length > 0;
  }

  moveDown(match) {
    var gemsRender = this.state.gemsRender.slice();
    var i, j, i1, i2, sorted;

    if (match.length === 0) return;

    for (i = 0; i < match.length; i++) this.gemsIndex[match[i][0]][match[i][1]] = null;

    for (i = 0; i < this.gemsIndex[0].length; i++) {
      sorted = false;

      while (!sorted) {
        sorted = true;

        for (j = 0; j < this.gemsIndex.length - 1; j++) {
          i1 = this.gemsIndex[j][i];
          i2 = this.gemsIndex[j + 1][i];

          if (i1 === null && i2) {
            sorted = false;

            gemsRender[i2] = <Gem key={i2} {...gemsRender[i2].props} row={j} />;
            this.gemsIndex[j][i] = i2;
            this.gemsIndex[j + 1][i] = null;
          }
        }
      }
    }

    this.setState(
      {
        gemsRender: gemsRender
      },
      () => {
        setTimeout(() => {
          this.refill();
        }, 150);
      }
    );
  }

  refill() {
    var gemsRender = this.state.gemsRender.slice();
    var { types, rows, columns } = this.props;

    for (var i = 0; i < this.gemsIndex.length; i++) {
      for (var j = 0; j < this.gemsIndex[i].length; j++) {
        if (this.gemsIndex[i][j] === null) {
          this.gemsIndex[i][j] = gemsRender.length;
          gemsRender.push(
            <Gem
              key={gemsRender.length}
              row={i}
              col={j}
              maxRows={rows}
              maxColumns={columns}
              type={types[Math.floor(Math.random() * types.length)]}
              initial="2"
            />
          );
        }
      }
    }

    this.setState(
      {
        gemsRender: gemsRender
      },
      () => {
        setTimeout(() => {
          if (!this.checkMatch()) {
            this.lock = false;
          }
        }, 350);
      }
    );
  }

  gameEnded() {
    this.end = true;

    var gemsRender = this.state.gemsRender.slice();
    var index;

    for (var i = 0; i < this.gemsIndex.length; i++) {
      for (var j = 0; j < this.gemsIndex[i].length; j++) {
        index = this.gemsIndex[i][j];
        if (!isNaN(index) && gemsRender[index]) gemsRender[index] = <Gem key={index} {...gemsRender[index].props} destroy="1" />;
      }
    }

    this.setState({
      gemsRender: gemsRender
    });
  }

  render() {
    return (
      <div id="board" draggable="false" ref={this.ref}>
        {this.state.gemsRender}
        <div id="shine" />
      </div>
    );
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="menu" className="top-bar" onClick={this.props.onToggleMenu}>
        Menu
      </div>
    );
  }
}

class MenuBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgmVolume: this.props.bgmVolume
    };
  }

  update(e) {
    this.setState({
      bgmVolume: e.target.value
    });
    this.props.onVolumeChange(e);
  }

  render() {
    return (
      <div id="menuBox">
        <div>
          <label>
            BGM Volume
            <input onInput={this.update.bind(this)} type="range" min="0" max="1" step="0.05" value={this.state.bgmVolume} />
          </label>
          <button onClick={this.props.onToggleMenu}>Back to Game</button>
          <button onClick={this.props.onNewGame}>New Game</button>
          <p>{this.props.menuMessage}</p>
        </div>
      </div>
    );
  }
}

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }

  startCountdown() {
    if (this.state.value <= 0) return;

    this.countdown = setInterval(() => {
      this.setState(
        {
          value: this.state.value - 1
        },
        () => {
          if (this.state.value <= 0) {
            window.clearInterval(this.countdown);
            this.props.onTimeUp();
          }
        }
      );
    }, 1000);
  }

  pauseCountdown() {
    if (this.countdown) window.clearInterval(this.countdown);
  }

  render() {
    return (
      <div id="time" className="top-bar">
        {this.state.value}
      </div>
    );
  }
}

class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  changeScore(change) {
    if (isNaN(change)) return;

    this.setState({
      value: this.state.value + change
    });
  }

  render() {
    return (
      <div id="score" className="top-bar">
        Score: {this.state.value}
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("app"));
