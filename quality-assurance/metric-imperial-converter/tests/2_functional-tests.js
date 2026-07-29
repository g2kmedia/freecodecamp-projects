const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test("convert a valid input", (done) => {
        chai.request(server)
        .get("/api/convert")
        .query({ input: "10L" })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.deepEqual(res.body,
                {
                    initNum: 10,
                    initUnit: "L",
                    returnNum: 2.64172,
                    returnUnit: "gal",
                    string: "10 liters converts to 2.64172 gallons"
                }
            );

            done();
        });
    });

    test("convert an invalid unit", (done) => {
        chai.request(server)
        .get("/api/convert")
        .query({ input: "32g" })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body, "invalid unit")
            
            done();
        });
    });

    test("convert an invalid number", (done) => {
        chai.request(server)
        .get("/api/convert")
        .query({ input: "3/7.2/4kg" })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body, "invalid number");

            done();
        });
    });

    test("convert an invalid number AND unit", (done) => {
        chai.request(server)
        .get("/api/convert")
        .query({ input: "3/7.2/4g" })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body, "invalid number and unit");

            done();
        });
    });

    test("convert with no number", (done) => {
        chai.request(server)
        .get("/api/convert")
        .query({ input: "kg" })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.deepEqual(res.body,
                {
                    initNum: 1,
                    initUnit: "kg",
                    returnNum: 2.20462,
                    returnUnit: "lbs",
                    string: "1 kilograms converts to 2.20462 pounds"
                }
            );

            done();
        });
    });
});
