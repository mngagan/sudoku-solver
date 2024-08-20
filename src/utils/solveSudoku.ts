export const solveSudoku = (__gridValues: string[][]): string[][] => {
  const gridValues = __gridValues;
  console.clear();
  const emptyCells: { row: number; col: number; possibleValues?: string[] }[] =
    [];
  const rows: { [key: number]: string[] } = {};
  const cols: { [key: number]: string[] } = {};
  console.log("in solving sudoku");
  Array(9)
    .fill("")
    .map((_, rowIndex) => {
      rows[rowIndex] = gridValues[rowIndex];
      Array(9)
        .fill("")
        .map((_, colIndex) => {
          if (cols[colIndex]) {
            cols[colIndex].push(gridValues[rowIndex][colIndex]);
          } else {
            cols[colIndex] = [gridValues[rowIndex][colIndex]];
          }
          if (gridValues[rowIndex][colIndex] === "") {
            emptyCells.push({ row: rowIndex, col: colIndex });
          }
        });
    });
  let countOfCellsFilled = 0;
  emptyCells.forEach((emptyCell) => {
    const possibleValuesForRow = getMissingNumberaFrom1THrough9(
      rows[emptyCell.row]
    );
    const possibleValuesForCol = getMissingNumberaFrom1THrough9(
      cols[emptyCell.col]
    );
    const possibleValuesForSubGrid = getMissingNumberaFrom1THrough9(
      getGridBasedOnRowAndCol(emptyCell.row, emptyCell.col, gridValues)
    );
    const possibleValues = possibleValuesForRow
      .filter((value) => possibleValuesForCol.includes(value))
      .filter((value) => possibleValuesForSubGrid.includes(value));
    emptyCell.possibleValues = possibleValues;
    if (possibleValues.length === 1) {
      countOfCellsFilled = countOfCellsFilled + 1;
      gridValues[emptyCell.row][emptyCell.col] = possibleValues[0];
    }
  });
  if (countOfCellsFilled === 0) {
    if (emptyCells.length > 0) {
      console.log("Failed to solve sudoku", emptyCells);
      return gridValues;
    }
    console.log("Successfully solved sudoku");
    return gridValues;
  }
  return solveSudoku(gridValues);
};

const getMissingNumberaFrom1THrough9 = (arr: string[]) => {
  return Array(9)
    .fill("")
    .map((_, index) => `${index + 1}`)
    .filter((num) => !arr.includes(num.toString()));
};

const getGridBasedOnRowAndCol = (
  row: number,
  col: number,
  gridValues: string[][]
) => {
  const rowIndexToStart = row < 3 ? 0 : row >= 3 && row < 6 ? 3 : 6;
  const colIndexToStart = col < 3 ? 0 : col >= 3 && col < 6 ? 3 : 6;
  const grid: string[] = [];
  for (let i = rowIndexToStart; i < rowIndexToStart + 3; i++) {
    for (let j = colIndexToStart; j < colIndexToStart + 3; j++) {
      grid.push(gridValues[i][j]);
    }
  }
  return grid;
};
