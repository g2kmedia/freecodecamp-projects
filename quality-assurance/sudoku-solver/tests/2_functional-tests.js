const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

// Strings for testing
const puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
const solvedPuzzle = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
const invalidPuzzleChars = "7sdf7";
const invalidPuzzleLength = "1.5..2.84..63.12.7.2..5.....9..1....8.2.";
const invalidPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.44...8..1..16....926914.37.";

suite("SOLVE - Functional Tests", () => {
    test("SOLVE a valid puzzle", (done) => {
        chai.request(server)
            .post("/api/solve")
            .send({ puzzle: puzzleString })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, { solution: solvedPuzzle });
                done();
            });
    });

    test("SOLVE puzzle with a missing string", (done) => {
        chai.request(server)
            .post("/api/solve")
            .send({})
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, { error: "Required field missing" });
                done();
            });
    });

    test("SOLVE puzzle with invalid character/s", (done) => {
        chai.request(server)
            .post("/api/solve")
            .send({ puzzle: invalidPuzzleChars })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, { error: "Invalid characters in puzzle" });
                done();
            });
    });

    test("SOLVE puzzle with incorrect length", (done) => {
        chai.request(server)
            .post("/api/solve")
            .send({ puzzle: invalidPuzzleLength })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, { error: "Expected puzzle to be 81 characters long" });
                done();
            });
    });

    test("SOLVE puzzle that CANNOT be solved", (done) => {
        chai.request(server)
            .post("/api/solve")
            .send({ puzzle: invalidPuzzle })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, { error: "Puzzle cannot be solved" });
                done();
            });
    });
});

suite("CHECK - Functional Tests", () => {
    test("CHECK valid placement", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({ puzzle: puzzleString, coordinate: "A2", value: "3" })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, { valid: true });
                done();
            });
    });

    test("CHECK single placement conflict", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({ puzzle: puzzleString, coordinate: "A2", value: "4" })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, { valid: false, conflict: ["row"] });
                done();
            });
    });

    test("CHECK placement with two conflicts", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({ puzzle: puzzleString, coordinate: "A2", value: "1" })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, { valid: false, conflict: ["row", "region"] });
                done();
            });
    });

    test("CHECK placement with all three conflicts", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({ puzzle: puzzleString, coordinate: "A2", value: "2" })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, { valid: false, conflict: ["row", "column", "region"] });
                done();
            });
    });

    test("CHECK placement with missing required field", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({ puzzle: puzzleString, coordinate: "", value: "3" })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, { error: "Required field(s) missing" });
                done();
            });
    });

    test("CHECK placement with invalid coordinate", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({ puzzle: puzzleString, coordinate: "Z2", value: "4" })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, { error: "Invalid coordinate" });
                done();
            });
    });

    test("CHECK placement with invalid value", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({ puzzle: puzzleString, coordinate: "A2", value: "23" })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, { error: "Invalid value" });
                done();
            });
    });

    test("CHECK placement with incorrect puzzle length", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({ puzzle: invalidPuzzleLength, coordinate: "A2", value: "3" })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, { error: "Expected puzzle to be 81 characters long" });
                done();
            });
    });

    test("CHECK placement with invalid character/s", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({ puzzle: invalidPuzzleChars, coordinate: "A2", value: "3" })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, { error: "Invalid characters in puzzle" });
                done();
            });
    });
});
