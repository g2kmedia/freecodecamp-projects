const chai = require('chai');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver()

// Strings for testing
const puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
const solvedPuzzle = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
const invalidPuzzleChars = "7sdf7";
const invalidPuzzleLength = "1.5..2.84..63.12.7.2..5.....9..1....8.2.";
const invalidPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.44...8..1..16....926914.37.";

suite('Unit Tests', () => {
    test("Solve a valid puzzle", () => {
        assert.deepEqual(solver.validate(puzzleString), { valid: true }, "Puzzle should be considered valid");
    });

    test("Handle puzzle string with invalid characters", () => {
        assert.deepEqual(solver.validate(invalidPuzzleChars), { error: "Invalid characters in puzzle" }, "Error obj expected");
    });

    test("Handle puzzle that is not 81 characters in length", () => {
        assert.deepEqual(solver.validate(invalidPuzzleLength), { error: "Expected puzzle to be 81 characters long" }, "Error obj expected");
    });

    test("Handle a valid row placement", () => {
        assert.isTrue(solver.checkRowPlacement(puzzleString, 0, 1, 3), "Placement should be valid");
    });

    test("Handle an invalid row placement", () => {
        assert.isFalse(solver.checkRowPlacement(puzzleString, 0, 1, 2), "Placement should NOT be valid");
    });

    test("Handle a column column placement", () => {
        assert.isTrue(solver.checkColPlacement(puzzleString, 0, 1, 3), "Placement should be valid");
    });

    test("Handle an invalid column placement", () => {
        assert.isFalse(solver.checkColPlacement(puzzleString, 0, 1, 2), "Placement should NOT be valid");
    });

    test("Handle a region column placement", () => {
        assert.isTrue(solver.checkRegionPlacement(puzzleString, 0, 1, 3), "Placement should be valid");
    });

    test("Handle an invalid region placement", () => {
        assert.isFalse(solver.checkRegionPlacement(puzzleString, 0, 1, 2), "Placement should NOT be valid");
    });

    test("Valid puzzle should be pass the validation in the solver", () => {
        assert.isString(solver.solve(puzzleString));
    });

    test("Invalid puzzle should fail the solving", () => {
        assert.deepEqual(solver.solve(invalidPuzzle), { error: "Puzzle cannot be solved" }, "Expecter error obj");
    });

    test("Valid puzzle should be solved", () => {
        assert.deepEqual(solver.solve(puzzleString), solvedPuzzle, "Puzzle should be solved")
    });
});
