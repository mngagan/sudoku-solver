import { Box, Button, Container, Grid, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { solveSudoku } from "./utils/solveSudoku";
import { validateSudoku } from "./utils/validateSudoku";
/**
 * 
 * 6	9	4	7	2	3	1	5	8
5	2	3	8	9	1	7	4	6
8	7	1	4	6	5	2	3	9
2	5	8	9	3	7	6	1	4
4	3	9	6	1	8	5	2	7
7	1	6	5	4	2	9	8	3
1	8	7	3	5	6	4	9	2
9	6	5	2	8	4	3	7	1
3	4	2	1	7	9	8	6	5
 */

/**
 * Sudoku grid2
 5,,2,8,,7
 4,1,,6,,2,9
 ,2,,9,,8,
 1,,,,6,,2
 ,4,5,,,6,3,
 9,,8,,,,1
 ,7,,8,,5,
 8,9,,5,,1,3
 3,,9,4,,6
 */

interface Error {
  row: number;
  col: number;
}

function App() {
  // const [gridValues, setGridValues] = useState(
  //   Array(9).fill(Array(9).fill(""))
  // );
  // const [gridValues, setGridValues] = useState([
  //   ["6", "9", "", "7", "2", "3", "1", "5", "8"],
  //   ["5", "2", "3", "8", "9", "1", "7", "4", "6"],
  //   ["8", "7", "1", "4", "6", "5", "2", "3", "9"],
  //   ["2", "5", "8", "9", "3", "7", "6", "1", "4"],
  //   ["4", "3", "9", "6", "1", "8", "5", "2", "7"],
  //   ["7", "1", "6", "5", "4", "2", "9", "8", "3"],
  //   ["1", "8", "7", "3", "5", "6", "4", "9", "2"],
  //   ["9", "6", "5", "2", "8", "4", "3", "7", "1"],
  //   ["3", "4", "2", "1", "7", "9", "8", "6", "5"],
  // ]);

  // const [gridValues, setGridValues] = useState([
  //   ["5", "", "", "2", "", "8", "", "", "7"],
  //   ["4", "1", "", "", "6", "", "", "2", "9"],
  //   ["", "2", "", "", "9", "", "", "8", ""],
  //   ["1", "", "", "", "", "6", "", "", "2"],
  //   ["", "4", "5", "", "", "", "6", "3", ""],
  //   ["9", "", "", "8", "", "", "", "", "1"],
  //   ["", "7", "", "", "8", "", "", "5", ""],
  //   ["8", "9", "", "", "5", "", "", "1", "3"],
  //   ["3", "", "", "9", "", "4", "", "", "6"],
  // ]);

  // const [gridValues, setGridValues] = useState([
  //   ["5", "3", "", "", "7", "", "", "", ""],
  //   ["6", "", "", "1", "9", "5", "", "", ""],
  //   ["", "9", "8", "", "", "", "", "6", ""],
  //   ["8", "", "", "", "6", "", "", "", "3"],
  //   ["4", "", "", "8", "", "3", "", "", "1"],
  //   ["7", "", "", "", "2", "", "", "", "6"],
  //   ["", "6", "", "", "", "", "2", "8", ""],
  //   ["", "", "", "4", "1", "9", "", "", "5"],
  //   ["", "", "", "", "8", "", "", "7", "9"],
  // ]);

  const [gridValues, setGridValues] = useState([
    ["8", "", "", "", "", "", "", "", ""],
    ["", "", "3", "6", "", "", "", "", ""],
    ["", "7", "", "", "9", "", "2", "", ""],
    ["", "5", "", "", "", "7", "", "", ""],
    ["", "", "", "", "4", "5", "7", "", ""],
    ["", "", "", "1", "", "", "", "3", ""],
    ["", "", "1", "", "", "", "", "6", "8"],
    ["", "", "8", "5", "", "", "", "1", ""],
    ["", "9", "", "", "", "", "4", "", ""],
  ]);

  /**
   * solution = [
    ["8", "1", "2", "7", "5", "3", "6", "4", "9"],
    ["9", "4", "3", "6", "8", "2", "1", "7", "5"],
    ["6", "7", "5", "4", "9", "1", "2", "8", "3"],
    ["1", "5", "4", "2", "3", "7", "8", "9", "6"],
    ["3", "6", "9", "8", "4", "5", "7", "2", "1"],
    ["2", "8", "7", "1", "6", "9", "5", "3", "4"],
    ["5", "2", "1", "9", "7", "4", "3", "6", "8"],
    ["4", "3", "8", "5", "2", "6", "9", "1", "7"],
    ["7", "9", "6", "3", "1", "8", "4", "5", "2"]
]
   */

  const [error, setError] = useState<Error>({
    row: -1,
    col: -1,
  });

  // window["validateSudoku"] = validateSudoku(gridValues);

  const validate = () => {
    const error: Error = validateSudoku(gridValues);
    if (error.row !== -1 && error.col !== -1) {
      setError(error);
    }
  };

  const handleInputChange = (row: number, col: number, value: string) => {
    const newGridValues = gridValues.map((rowArray, rowIndex) =>
      rowIndex === row
        ? rowArray.map((cellValue: string, colIndex: number) =>
            colIndex === col ? value : cellValue
          )
        : rowArray
    );
    setGridValues(newGridValues);
  };

  const handleSolve = () => {
    const result = solveSudoku(gridValues);
    setGridValues(result);
    console.log("result", result);
  };

  useEffect(() => {
    console.log("gridValues", gridValues);
  }, [gridValues]);
  const renderSubGrid = (startRow: number, startCol: number) => (
    <Box sx={{ border: 1, borderColor: "lightgrey" }}>
      <Grid container spacing={0}>
        {[0, 1, 2].map((rowOffset) =>
          [0, 1, 2].map((colOffset) => {
            const row = startRow + rowOffset;
            const col = startCol + colOffset;
            return (
              <Grid
                item
                key={`${row}-${col}`}
                xs={4}
                sx={{
                  p: 0.5,
                }}
              >
                <TextField
                  value={gridValues[row][col]}
                  onChange={(e) => handleInputChange(row, col, e.target.value)}
                  error={error.row === row && error.col === col}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: "center",
                      fontSize: "1.2rem",
                      padding: "8px 0",
                    },
                  }}
                />
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth="lg">
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100%"
      >
        <Stack>
          <Grid container spacing={1} width={500}>
            <Grid container spacing={0}>
              {[0, 3, 6].map((startRow) =>
                [0, 3, 6].map((startCol) => (
                  <Grid item xs={4} key={`${startRow}-${startCol}`}>
                    {renderSubGrid(startRow, startCol)}
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        </Stack>
        <Button onClick={validate}>validate</Button>
        <Button onClick={handleSolve}>solve</Button>
      </Stack>
    </Container>
  );
}

export default App;
