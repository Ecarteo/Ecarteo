const screenText = document.getElementById("screen")
const buttons = document.getElementsByClassName("buttons")
const mathOperators = ["+", "-", "×", "÷"]

let alreadyHasOperator = false
let mathOperatorToUse = ""
let firstNumber = ""
let secondNumber = ""
let firstDecimal = false
let secondDecimal = false

function isMathOperator(operator) {
    return mathOperators.includes(operator)
}

function writeScreen(character) {
    screenText.innerHTML += character
}

function addNumber(number) {
    if (!alreadyHasOperator) {
        firstNumber += number
        writeScreen(number)
    } else {
        secondNumber += number
        writeScreen(number)
    }
}

function setOperator(operator) {
    if (!alreadyHasOperator && firstNumber !== "") {
        mathOperatorToUse = operator
        alreadyHasOperator = true
        writeScreen(operator)
    }
}

function addDecimal() {
    if (!alreadyHasOperator && !firstDecimal) {
        if (firstNumber === "") {
            firstNumber = "0."
        } else {
            firstNumber += "."
        }
        firstDecimal = true
        writeScreen(".")
    } else if (alreadyHasOperator && !secondDecimal) {
        if (secondNumber === "") {
            secondNumber = "0."
        } else {
            secondNumber += "."
        }
        secondDecimal = true
        writeScreen(".")
    }
}

function cleanScreen() {
    if (screenText.innerHTML !== "") {
        screenText.innerHTML = ""
        mathOperatorToUse = ""
        firstNumber = ""
        secondNumber = ""
        alreadyHasOperator = false
        firstDecimal = false
        secondDecimal = false
    }
}

function giveAnswer() {
    if (alreadyHasOperator && firstNumber !== "" && secondNumber !== "") {
        let answer
        const num1 = parseFloat(firstNumber)
        const num2 = parseFloat(secondNumber)
        if (mathOperatorToUse === "+") {
            answer = num1 + num2
        } else if (mathOperatorToUse === "-") {
            answer = num1 - num2
        } else if (mathOperatorToUse === "×") {
            answer = num1 * num2
        } else if (mathOperatorToUse === "÷") {
            answer = num1 / num2
        }
        
        cleanScreen()
        writeScreen(answer.toString())
        firstNumber = answer.toString()

        firstDecimal = answer.toString().includes(".")
    } else {
        console.log("Put a math expression please.")
    }
}

function pressedButton(button) {
    if (!isNaN(button)) {
        addNumber(button)
    } else if (isMathOperator(button)) {
        setOperator(button)
    } else if (button === "•") {
        addDecimal()
    } else if (button === "←") {
        cleanScreen()
    } else if (button === "=") {
        giveAnswer()
    }

    let primero = null, operador = null, segundo = null
    if (firstNumber !== "") {
        primero = firstNumber
    }
    if (mathOperatorToUse !== "") {
        operador = mathOperatorToUse
    }
    if (secondNumber !== "") {
        segundo = secondNumber
    }
    console.log(primero + " " + operador + " " + segundo)
}

// assigns functions to all buttons
for (let index = 0; index < buttons.length; index++) {
    buttons[index].onclick = function fireFunction() {
        pressedButton(buttons[index].innerHTML)
    }
}