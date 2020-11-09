export const handleGemMouseDown = ({ isLocked, setSelectedGem }) => {
  return (gemId) => {
    if (isLocked()) return;

    setSelectedGem(gemId);
  };
};

export const handleGemMouseEnter = ({ getGem, setSelectedGem, setUndo, swapGems }) => {
  return (hoveredGemId) => {
    const selectedGem = getGem("selectedGem");

    if (!selectedGem) return;

    const hoveredGem = getGem(hoveredGemId);

    // Make sure we swap only neighbouring gems
    if (Math.abs(selectedGem.row - hoveredGem.row) + Math.abs(selectedGem.col - hoveredGem.col) !== 1) {
      setSelectedGem(null);
      return;
    }

    setUndo(selectedGem.id, hoveredGem.id);
    swapGems(selectedGem.id, hoveredGem.id);
    setSelectedGem(null);
  };
};

export const handleTouchMove = ({ getGem, handleGemMouseEnter }) => {
  return (e) => {
    const target = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    const selectedGem = getGem("selectedGem");

    if (!selectedGem || !target || selectedGem.id === target.id) return;

    handleGemMouseEnter(target.id);
  };
};

export const handleChangePage = ({ prepareNewGame, setPage }) => {
  return (page) => {
    if (page === "newPlayingPage") return prepareNewGame();

    setPage(page);
  };
};
