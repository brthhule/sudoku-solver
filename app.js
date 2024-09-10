const puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const solutionDisplay = document.querySelector('#solution')
const squares = 81;

let isNewBoard = true;

let submission = "";

function initBoard () {
    for (let x = 0; x < squares; x++) {
        //Create new element
        const inputElement = document.createElement('input')
        //Only allow numerical input
        inputElement.setAttribute('type', 'number')
        inputElement.setAttribute('min', 1)
        inputElement.setAttribute('max', 9)
        inputElement.style.textAlign = 'center'
        inputElement.style.fontFamily = "Roboto Slab";
        
        
        let modulus = x % 9;
        //Top and bottom rows grey
        let condition1 = (modulus < 3 || modulus > 5) && (x < 27 || x >= 54);
        //Middle row grey
        let condition2 = (modulus >= 3 && modulus < 6) && x < 54 && x > 26;
    
    
        if (condition1 || condition2) {
            inputElement.classList.add('grey-section')
        }
    
    
    
        puzzleBoard.appendChild(inputElement);
    }
}

initBoard();

const joinValues = () => {
    const inputs = document.querySelectorAll('input');
    let index = 0;
    inputs.forEach(input => {
        if (input.value) {
            submission = submission.concat(input.value);
        } else {
            submission = submission.concat('.');
        }
        index++;
    })
    console.log(submission)
}

const populateValues = (response) => {
    console.log('populateValues')
    const inputs = document.querySelectorAll('input');

    isNewBoard = false;

    solveButton.innerHTML = "Reset board"
    if(!(response.solvable && response.solution)) {
        console.log('nope')
        solutionDisplay.innerHTML = 'This is not solvable';
        return; 
    }

    inputs.forEach((input, i) => {
        if (!input.value) {
            input.style.color = 'blue';
        }
        input.value = response.solution[i]
    })

    solutionDisplay.innerHTML = 'Solution: ';
}

async function solve () {
    submission = "";
    joinValues();
    
    const data = {submission}

    fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })  .then(response => response.json())
        .then(data => {
            console.log(data)
            populateValues(data)
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}

function newBoard() {
    while (puzzleBoard.firstChild) {
        puzzleBoard.firstChild.remove()
    }
    initBoard();
    solutionDisplay.innerHTML = "Enter the board that you want to solve:"
    solveButton.innerHTML = "Solve"
    isNewBoard = true;
}



function pickAction() {
    if(isNewBoard) {
        solve();
    } else {
        newBoard();
    }
}
solveButton.addEventListener('click', pickAction);