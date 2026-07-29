const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
        // Array elements are in specific order for testing
        const allValidUnitInputs = ["kg", "KG", "lbs", "LBS", "km", "KM", "mi", "MI", "l", "L", "gal", "GAL"];
        const validUpperCaseUnitInputs = ["KG", "LBS", "KM", "MI", "L", "GAL"];
        const spelledOutUnits = ["kilograms", "pounds", "kilometers", "miles", "liters", "gallons"];

        test("whole number input", () => {
            assert.strictEqual(convertHandler.getNum("16L"), 16);
        });

        test("decimal number input", () => {
            assert.strictEqual(convertHandler.getNum("16.2KG"), 16.2);
        });

        test("fractional input", () => {
            assert.strictEqual(convertHandler.getNum("16/2gal"), 8);
        });

        test("fractional input with a decimal", () => {
            assert.strictEqual(convertHandler.getNum("16/2.5kg"), 6.4);
        });

        test("error on a double-fraction", () => {
            assert.isUndefined(convertHandler.getNum("3/2/3km"));
        });

        test("default to a numerical input of 1 when no numerical input", () => {
            assert.strictEqual(convertHandler.getNum("lbs"), 1);
        });

        test("read each valid input unit", () => {;
            allValidUnitInputs.forEach(unit => {
                assert.strictEqual(convertHandler.getUnit(unit), unit.toLocaleLowerCase());
            });
        });

        test ("return an error for an invalid input unit", () => {
            assert.isUndefined(convertHandler.getUnit("min"));
        });

        test("correct return unit for each valid input unit", () => {
            validUpperCaseUnitInputs.forEach(unit => {
                assert.strictEqual(convertHandler.getUnit(unit), unit.toLocaleLowerCase());
            });
        });

        test("return the spelled-out string unit for each valid input unit", () => {
            validUpperCaseUnitInputs.forEach((unit, index) => {
                assert.strictEqual(convertHandler.spellOutUnit(unit.toLocaleLowerCase()), spelledOutUnits[index]);
            });
        });

        test("correctly convert gal to L", () => {
            assert.strictEqual(convertHandler.convert(2, "gal"), 7.57082);
        });

        test("correctly convert L to gal", () => {
            assert.strictEqual(convertHandler.convert(3, "l"), 0.79252);
        });

        test("correctly convert mi to km", () => {
            assert.strictEqual(convertHandler.convert(3, "mi"), 4.82802);
        });

        test("correctly convert km to mi", () => {
            assert.strictEqual(convertHandler.convert(3, "km"), 1.86412);
        });

        test("correctly convert lbs to kg", () => {
            assert.strictEqual(convertHandler.convert(3, "lbs"), 1.36078);
        });

        test("correctly convert kg to lbs", () => {
            assert.strictEqual(convertHandler.convert(3, "kg"), 6.61387);
        });
});