'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res) => {
    const input = req.query.input.toLowerCase();

    const initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if (!initNum && !initUnit) {
      return res.json("invalid number and unit");
    }

    if (!initNum) {
      return res.json("invalid number");
    }

    if (!initUnit) {
      return res.json("invalid unit");
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    const spelledUnit = convertHandler.spellOutUnit(returnUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    // Upper case "l" for liter
    if (initUnit === "l") {
      initUnit = "L";
    }

    if (returnUnit === "l") {
      returnUnit = "L"
    }

    return res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: string
    });
  });

};
