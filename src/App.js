import { useState } from "react";
export default function App() {
  document.body.classList.add("flex");
  document.body.classList.add("justify-center");
  document.body.classList.add("m-31.5");
  document.body.classList.add("bg-gray-700");

  const [currentInput, setCurrentInput] = useState("");
  const [previousInput, setPreviousInput] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState(null);

  const operatorsArray = ["+", "-", "*", "/", "="];

  const handleNumberClick = (number) => {
    if (previousInput !== null && selectedOperator === null) {
      // Reset when starting a new operation
      setCurrentInput(number.toString());
      setPreviousInput(null);
    } else if (currentInput === "0" || currentInput === "Error") {
      setCurrentInput(number.toString());
    } else if (currentInput.length < 8) {
      setCurrentInput(currentInput + number);
    }
  };

  // Handler for operator button clicks
  const handleOperatorClick = (operator) => {
    if (selectedOperator && operator === "=") {
      // Perform calculation
      const result = calculate(
        parseFloat(previousInput),
        parseFloat(currentInput),
        selectedOperator
      );
      setCurrentInput(result.toString());
      setSelectedOperator(null);
      setPreviousInput(null);
    } else if (selectedOperator && operator !== "=") {
      // Update operator without calculating
      setSelectedOperator(operator);
    } else {
      // Start new operation
      setPreviousInput(currentInput);
      setSelectedOperator(operator);
      setCurrentInput("");
    }
  };

  // Handler for functional buttons (C, AC)
  const handleFunctionalClick = (action) => {
    if (action === "C") {
      setCurrentInput(currentInput.slice(0, -1) || "0");
    } else if (action === "AC") {
      setCurrentInput("0");
      setPreviousInput(null);
      setSelectedOperator(null);
    }
  };

  // Perform calculation based on operator
  const calculate = (a, b, operator) => {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        if (b === 0) return "Error";
        return a / b;
      default:
        return b;
    }
  };

  return (
    <div className="border-4 border-black p-2 h-120 w-110 flex flex-col justify-evenly gap-5 text-white font-bold text-3xl">
      <Display currentInput={currentInput} setCurrentInput={setCurrentInput} />
      <div className="bg-white h-full w-full flex justify-evenly">
        <div className="flex flex-wrap bg-white justify-evenly gap-2 p-1.5">
          {Array.from({ length: 10 }, (_, index) => index).map((number) => {
            return (
              <NumButton
                number={number}
                handleNumberClick={handleNumberClick}
                key={number}
              />
            );
          })}
          <FunctionalButtons
            functionalChar={"C"}
            handleFunctionalClick={handleFunctionalClick}
          />
          <FunctionalButtons
            functionalChar={"AC"}
            handleFunctionalClick={handleFunctionalClick}
          />
        </div>
        <div className="flex flex-col justify-evenly bg-white gap-2 p-1.5">
          {operatorsArray.map((operator, index) => {
            return (
              <OperatorsButtons
                operator={operator}
                key={index}
                handleOperatorClick={handleOperatorClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Display(props) {
  return (
    <div>
      <input
        type="text"
        className="bg-gray-500 w-full h-10 p-2 rounded-2xl text-end text-2xl "
        value={props.currentInput}
        readOnly
      />
    </div>
  );
}

function NumButton(props) {
  return (
    <div
      className="bg-gray-500 w-20 h-20 text-center p-6.5 cursor-pointer rounded-2xl"
      onClick={() => props.handleNumberClick(props.number)}
    >
      {props.number}
    </div>
  );
}

function OperatorsButtons(props) {
  return (
    <div
      className="bg-orange-400 w-17 h-17 text-center p-4.5 cursor-pointer rounded-2xl"
      onClick={() => props.handleOperatorClick(props.operator)}
    >
      {props.operator}
    </div>
  );
}

function FunctionalButtons(props) {
  return (
    <div
      className="bg-gray-500 w-20 h-20 text-center p-6.5 cursor-pointer rounded-2xl"
      onClick={() => props.handleFunctionalClick(props.functionalChar)}
    >
      {props.functionalChar}
    </div>
  );
}
