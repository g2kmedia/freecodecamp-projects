class SudokuSolver {

  validate(puzzleString) {
    const regex = /^[1-9.\s]+$/;

    if (!puzzleString) {
      return { error: "Required field missing" };
    }

    if (!regex.test(puzzleString)) {
      return { error: "Invalid characters in puzzle" };
    }

    if (puzzleString.length !== 81) {
      return { error: "Expected puzzle to be 81 characters long" };
    }

    return { valid: true };
  }

  checkRowPlacement(puzzleString, row, column, value) {
    // Calculate the starting index of the row in the puzzle string
    const start = row * 9;

    // Get the current value at the position
    const currentValue = puzzleString[start + column];

    // If the value is already placed at this position, return true
    if (currentValue === value.toString()) {
     return true;
    }

    // Extract the row and check if the value already exists in it
    return !puzzleString.slice(start, start + 9).includes(value) 
      || puzzleString[start + column] === value;
  }

  checkColPlacement(puzzleString, row, column, value) {
    for (let r = 0; r < 9; r++) {
      const index = r * 9 + column; // Calculate the index of the current cell in the column
      
      if (r !== row && puzzleString[index] === value.toString()) return false; // Check if value exists elsewhere in the column
    }

    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // Find the starting row and column of the region
    const regionRow = Math.floor(row / 3) * 3;
    const regionCol = Math.floor(column / 3) * 3;
  
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const index = (regionRow + r) * 9 + (regionCol + c);
        
        if ((regionRow + r !== row || regionCol + c !== column) && puzzleString[index] === value.toString()) return false;
      }
    }
  
    return true;
  }

  solve(puzzleString) {
    const arr = [...puzzleString];
    
    // Use backtracking to solve and return solved puzzle or null if unsolvable
    return this.backtrack(arr) ? arr.join('') : { error: "Puzzle cannot be solved" };
  }

  // Recursive backtracking function to solve Sudoku puzzles
  backtrack(arr) {
    const empty = arr.indexOf('.'); // Find first empty cell ('.')
    
    if (empty === -1) return true; // If no empty cells remain, puzzle is solved
    
    const row = Math.floor(empty / 9), col = empty % 9; // Calculate row and column of empty cell
    
    for (let num = 1; num <= 9; num++) { // Try placing numbers from '1' to '9'
      const n = num.toString(); // Convert number to string
      
      // Check if placing this number violates Sudoku rules (row/column/region)
      if (this.checkRowPlacement(arr.join(''), row, col, n) &&
          this.checkColPlacement(arr.join(''), row, col, n) &&
          this.checkRegionPlacement(arr.join(''), row, col, n)) {
        arr[empty] = n; // Place number in empty cell
        
        if (this.backtrack(arr)) return true; // Recursively attempt to solve remaining cells
        
        arr[empty] = '.'; // Undo placement if it leads to an invalid state
      }
    }
    
    return false; // Return false if no valid numbers can be placed in this cell
  }
}

module.exports = SudokuSolver;

