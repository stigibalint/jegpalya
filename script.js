const container = document.getElementById('container');
const stepButton = document.getElementById('stepButton');
const numberOfRows = 10;
const numberOfColumns = 20;
const totalCells = numberOfRows * numberOfColumns;
const numberOfGreenDivs = 50;
const numberOfYellowDivs = 15;

let cells = [];

function createGrid() {
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        container.appendChild(cell);
        cells.push(cell);
    }
}

function placeGreenDivs() {
    for (let i = 0; i < numberOfGreenDivs; i++) {
        let randomIndex;
        randomIndex = Math.floor(Math.random() * totalCells);
        const greenDiv = document.createElement('div');
        greenDiv.classList.add('green');
        greenDiv.textContent = i + 1;
        cells[randomIndex].appendChild(greenDiv);
    }
}

function moveGreenDivs() {
    const greenDivs = document.querySelectorAll('.green');
    greenDivs.forEach(greenDiv => {
        const currentCell = greenDiv.parentElement;
        const currentCellIndex = cells.indexOf(currentCell);
        let possibleMoves = [];

        if (currentCellIndex >= numberOfColumns && !cells[currentCellIndex - numberOfColumns].querySelector('.green')) {
            possibleMoves.push(currentCellIndex - numberOfColumns);
        }
        if (currentCellIndex < totalCells - numberOfColumns && !cells[currentCellIndex + numberOfColumns].querySelector('.green')) {
            possibleMoves.push(currentCellIndex + numberOfColumns);
        }
        if (currentCellIndex % numberOfColumns !== 0 && !cells[currentCellIndex - 1].querySelector('.green')) {
            possibleMoves.push(currentCellIndex - 1);
        }
        if ((currentCellIndex + 1) % numberOfColumns !== 0 && !cells[currentCellIndex + 1].querySelector('.green')) {
            possibleMoves.push(currentCellIndex + 1);
        }

        if (possibleMoves.length > 0) {
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            const destinationCell = cells[randomMove];
            if (destinationCell.querySelector('.yellow')) {
                currentCell.removeChild(greenDiv);
            } else {
                destinationCell.appendChild(greenDiv);
            }
        }
    });
}

function placeYellowDivs() {
    for (let i = 0; i < numberOfYellowDivs; i++) {
        let randomIndex;
        randomIndex = Math.floor(Math.random() * totalCells);
        const yellowDiv = document.createElement('div');
        yellowDiv.classList.add('yellow');
        yellowDiv.addEventListener('click', (event) => {
            const clickedCellIndex = cells.indexOf(event.target.parentElement);
            removeGreenDivFromCell(clickedCellIndex);
        });
        cells[randomIndex].appendChild(yellowDiv);
    }
}


stepButton.addEventListener('click', () => {
    moveGreenDivs();
});

createGrid();
placeGreenDivs();
placeYellowDivs();
