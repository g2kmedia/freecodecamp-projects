import React from "react"
import Display from "./Display"
import InfoBox from "./InfoBox"
import Toggle from "./Toggle"
import * as calculatorUtils from "../utils/calculatorUtils"
import { INITIAL_CALCULATOR_STATE } from "../constants/calculatorConstants"

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_CALCULATOR_STATE;

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getNumber = this.getNumber.bind(this);
    this.getOperator = this.getOperator.bind(this);
    this.equals = this.equals.bind(this);
    this.clear = this.clear.bind(this);
    this.immediateCalculation = this.immediateCalculation.bind(this);
    this.toggleInfoBox = this.toggleInfoBox.bind(this);
    this.toggleCalcLogic = this.toggleCalcLogic.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event) {
    const callbacks = {
      getNumber: this.getNumber,
      getOperator: this.getOperator,
      equals: this.equals,
      clear: this.clear
    };
    
    const result = calculatorUtils.handleKeyPress(event, this.state, callbacks);
    
    if (typeof result === 'function') {
      this.setState(result);
    }
  }

  getNumber(number) {
    const newState = calculatorUtils.getNumber(number, this.state);
    if (newState) {
      this.setState(newState);
    }
  }

  getOperator(operator) {
    const newState = calculatorUtils.getOperator(operator, this.state, this.immediateCalculation);
    if (newState) {
      this.setState(newState);
    }
  }

  equals() {
    const newState = calculatorUtils.equals(this.state, this.immediateCalculation);
    if (newState) {
      this.setState(newState);
    }
  }

  clear() {
    const newState = calculatorUtils.clear();
    this.setState(newState);
  }

  immediateCalculation(currentOperator, isEquals) {
    const newState = calculatorUtils.immediateCalculation(this.state, currentOperator, isEquals);
    this.setState(newState);
  }

  toggleInfoBox(state) {
    const newState = calculatorUtils.toggleInfoBox(state);
    this.setState(newState);
  }

  toggleCalcLogic() {
    const newState = calculatorUtils.toggleCalcLogic(this.state);
    this.setState(newState);
  }

  render() {
    const getNumbersKeys = Object.keys(this.state.numbers);
    const getOperationsKeys = Object.keys(this.state.operations);
    const getFunctionsKeys = Object.keys(this.state.functions);

    return (
      <div id="calculator-container">
        <div id="calculator">
          <Display
            historyDisplay={this.state.historyDisplay}
            primaryDisplay={this.state.primaryDisplay}
          />

          <div id="inputs">
            <div className="number-buttons">
              {getNumbersKeys.map((key) => (
                <button
                  key={key}
                  id={key}
                  value={this.state.numbers[key]}
                  onClick={() => this.getNumber(this.state.numbers[key])}
                >
                  {this.state.numbers[key]}
                </button>
              ))}
            </div>

            <div className="operation-buttons">
              {getOperationsKeys.map((key) => (
                <button
                  key={key}
                  id={key}
                  onClick={() => this.getOperator(this.state.operations[key])}
                >
                  {this.state.operations[key]}
                </button>
              ))}
            </div>
          </div>

          <div className="function-buttons">
            {getFunctionsKeys.map((key) => (
              <button key={key} id={key} onClick={this[key]}>
                {this.state.functions[key]}
              </button>
            ))}
          </div>
        </div>
        <div id="info-config">
          <button id="info-button" onClick={() => this.toggleInfoBox(true)}>
            <i className="fa-solid fa-circle-info"></i>
          </button>
          <Toggle toggleCalcLogic={this.toggleCalcLogic} />
          {this.state.showInfoBox ? (
            <InfoBox toggleInfoBox={this.toggleInfoBox} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Calculator
