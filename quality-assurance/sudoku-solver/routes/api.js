'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;
      
      // Validate input
      const coordinateRegex = /^[a-iA-I][1-9]$/;
      const valueRegex = /^[1-9]$/;
      const checkPuzzle = solver.validate(puzzle);

      if (!puzzle || !coordinate || !value) {
        return res.json({ error: "Required field(s) missing" });
      }
      
      if (checkPuzzle.error) {
        return res.json(checkPuzzle);
      }

      if (!coordinateRegex.test(coordinate)) {
        return res.json({ error: "Invalid coordinate" });
      }

      if (!valueRegex.test(value)) {
        return res.json({ error: "Invalid value" });
      }

      // Split coordinate input and convert row letter to a number for the function
      const rowLetter = coordinate.split("")[0].toUpperCase();;
      const row = rowLetter.charCodeAt(0) - 65;
      const column = parseFloat(coordinate.split("")[1] - 1);
      const valueToNum = parseFloat(value);

      const checkRow = solver.checkRowPlacement(puzzle, row, column, valueToNum);
      const checkCol = solver.checkColPlacement(puzzle, row, column, valueToNum);
      const checkRegion = solver.checkRegionPlacement(puzzle, row, column, valueToNum);

      // Check for conflicts and return
      if (checkRow && checkCol && checkRegion) {
        return res.json({ valid: true })
      }

      let conflictsArr = [];

      if (!checkRow) {
        conflictsArr.push("row");
      }

      if (!checkCol) {
        conflictsArr.push("column");
      }

      if (!checkRegion) {
        conflictsArr.push("region");
      }

      return res.json({ 
        valid: false,
        conflict: conflictsArr
       });

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzleString = req.body.puzzle;

      // Validate input
      const validation = solver.validate(puzzleString);

      if (validation.error) {
        return res.json(validation);
      }
      
      // Solve puzzle
      const solution = solver.solve(puzzleString);

      if (solution.error) {
        return res.json(solution);
      }
      
      return res.json({
        solution: solution
      });
    });
};
