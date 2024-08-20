export const validateSudoku = (gridValues: string[][]) => {
  const error = {
    row: -1,
    col: -1,
  };
  const [rows, cols] = getRowsAndCols(gridValues);
  rows.every((row, rowIndex) => {
    if (!checkIfStripValid(row)) {
      error.row = rowIndex;
      return false;
    }
    return true;
  });
  cols.every((col, colIndex) => {
    if (!checkIfStripValid(col)) {
      error.col = colIndex;
      return false;
    }
    return true;
  });
  const isGridsValid = checkIfGridsAreValid(gridValues);
  return error;
};

const checkIfGridsAreValid = (gridValues: string[][]) => {
  return getAll3x3Grids(gridValues).every((grid) =>
    grid.every((innerGrid) => {
      return checkIfStripValid(innerGrid.flat());
    })
  );
};

const getRowsAndCols = (gridValues: string[][]) => {
  const rows = gridValues.map((row) => row.map((col) => col));
  const cols = Array(9)
    .fill(0)
    .map((_, colIndex) => {
      const colData = Array(9)
        .fill(0)
        .map((_, rowIndex) => {
          return gridValues[rowIndex][colIndex];
        });
      return colData;
    });
  return [rows, cols];
};

const checkIfStripValid = (strip: string[]) => {
  return (
    strip.reduce((acc, curr) => {
      return acc + parseInt(curr);
    }, 0) === 45
  );
};
const get3x3Grid = (
  gridValues: string[][],
  startRow: number,
  startCol: number
): string[][] => {
  return [0, 1, 2].map((rowOffset) => {
    return [0, 1, 2].map((colOffset) => {
      const row = startRow + rowOffset;
      const col = startCol + colOffset;
      return gridValues[row][col];
    });
  });
};
const getAll3x3Grids = (gridValues: string[][]) => {
  return [0, 3, 6].map((startRow) => {
    return [0, 3, 6].map((startCol) =>
      get3x3Grid(gridValues, startRow, startCol)
    );
  });
};
