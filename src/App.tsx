import { Box, Button, Container, Grid, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
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

interface Error {
  row: number;
  col: number;
}

function App() {
  // const [gridValues, setGridValues] = useState(
  //   Array(9).fill(Array(9).fill(""))
  // );
  const [gridValues, setGridValues] = useState([
    ["6", "9", "4", "7", "2", "3", "1", "5", "8"],
    ["5", "2", "3", "8", "9", "1", "7", "4", "6"],
    ["8", "7", "1", "4", "6", "5", "2", "3", "9"],
    ["2", "5", "8", "9", "3", "7", "6", "1", "4"],
    ["4", "3", "9", "6", "1", "8", "5", "2", "7"],
    ["7", "1", "6", "5", "4", "2", "9", "8", "3"],
    ["1", "8", "7", "3", "5", "6", "4", "9", "2"],
    ["9", "6", "5", "2", "8", "4", "3", "7", "1"],
    ["3", "4", "2", "1", "7", "9", "8", "6", "5"],
  ]);
  const [error, setError] = useState<Error>({
    row: -1,
    col: -1,
  });

  window["validateSudoku"] = validateSudoku(gridValues);

  const validate = () => {
    const error: Error = validateSudoku(gridValues);
    if (error.row !== -1 && error.col !== -1) {
      setError(error);
    }
  };

  // useEffect(() => {
  //   validateSudoku();
  // }, [gridValues, validateSudoku]);

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

  useEffect(() => {
    console.log("in error", error);
  }, [error]);

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
      </Stack>
    </Container>
  );
}

export default App;
