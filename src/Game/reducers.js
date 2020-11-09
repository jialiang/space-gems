export const gemsReducer = (state = {}, action = {}) => {
  const newData = action.data;

  switch (action.type) {
    case "set":
      const board = {};
      const gemsKeys = [];

      Object.keys(newData).forEach((key) => {
        const gem = newData[key];

        board[`${gem.row}_${gem.col}`] = gem.id;
        gemsKeys.push(gem.id);
      });

      return {
        ...action.data,
        board,
        gemsKeys,
      };
    case "update":
      Object.keys(newData).forEach((key) => {
        const gem = newData[key];

        // Creating New Gem
        if (state[key] === undefined && key.indexOf("gem-") > -1) {
          state.board[`${gem.row}_${gem.col}`] = gem.id;
          state.gemsKeys.push(gem.id);
          state[key] = gem;

          return;
        }

        // Moving Gem
        if (gem.row != null && gem.col != null) {
          state[key].row = gem.row;
          state[key].col = gem.col;

          state.board[`${gem.row}_${gem.col}`] = key;
        }

        // Setting Destroyed Status
        if (gem.destroyed) state[key].destroyed = gem.destroyed;
      });

      return {
        ...state,
      };
    case "cleanup":
      state.gemsKeys.forEach((key) => {
        if (state[key] && state[key].destroyed) delete state[key];
      });

      Object.keys(state.board).forEach((key) => {
        if (key.indexOf("-") > -1) delete state.board[key];
      });

      state.gemsKeys = state.gemsKeys.filter((key) => state[key]);

      return {
        ...state,
      };
    default:
      throw new Error();
  }
};

export const scoreReducer = (state = 0, action = {}) => {
  switch (action.type) {
    case "increment":
      return state + action.value;
    case "reset":
      return 0;
    default:
      return state;
  }
};

export const statsReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case "increment":
      return {
        match3: (state.match3 || 0) + (action.data.match3 || 0),
        match4: (state.match4 || 0) + (action.data.match4 || 0),
        match5: (state.match5 || 0) + (action.data.match5 || 0),
      };
    case "reset":
      return {};
    default:
      return {};
  }
};
