function ConvertHandler() {

  const conversionMap = {
    // Metric to Imperial
    kg: { target: "lbs", factor: 0.453592, fullName: "kilograms" },
    km: { target: "mi", factor: 1.60934, fullName: "kilometers" },
    l:  { target: "gal", factor: 3.78541, fullName: "liters" },
    
    // Imperial to Metric
    lbs: { target: "kg", factor: 2.20462, fullName: "pounds" },
    mi:  { target: "km", factor: 0.621371, fullName: "miles" },
    gal: { target: "l", factor: 0.264172, fullName: "gallons" },
  };
  
  this.getNum = function(input) {
    // Check for double fraction
    const doubleFraction = input.match(/^[^/]*\/[^/]*\/.*$/);

    if (doubleFraction) {
      return undefined;
    }

    const match = input.match(/^-?\d+(\.\d+)?(\/\/?\d+(\.\d+)?)?/);
    const numbers = match ? match[0] : "1";

    // Check for single fraction
    const fraction = numbers.split("/");

    if (fraction.length > 2) {
      return undefined;
    }

    const num1 = parseFloat(fraction[0]);
    const num2 = parseFloat(fraction[1]) || 1;

    if (isNaN(num1) || isNaN(num2)) {
      return undefined;
    }

    const result = num1 / num2;

    return parseFloat(result.toFixed(5));
  };
  
  this.getUnit = function(input) {
    const unit = input.match(/[a-zA-Z]+/g);

    if (!unit) {
      return undefined;
    }

    const result = unit.join("").toLowerCase();

    // Check if the unit is part of the conversionMap
    if (!(result in conversionMap)) {
      return undefined;
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const returnUnit = conversionMap[initUnit];
    
    return returnUnit.target;
  };

  this.spellOutUnit = function(unit) {
    const result = conversionMap[unit].fullName;;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    
    // IMPORTANT: Calculation needs to be done using multiplication and devision in order to pass the fCC tests, hence not using the conversionMap above
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let resuls;

    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break
      case "km":
        result = initNum / miToKm;
        break;
      default:
        return undefined;
    }
    
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
