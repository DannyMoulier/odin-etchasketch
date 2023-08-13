// Set the number of rows and columns for the board
let numberOfRows = 16;
let numberOfColumns = numberOfRows;
let sizeOfField = 600;

// Function to create the field container
function createField(sizeOfField) {
    const boxContainer = document.querySelector('#box-container');
    boxContainer.style.flexBasis = `${sizeOfField}px`;
    boxContainer.style.height = `${sizeOfField}px`;
    return boxContainer;
}

// Function to create the game board with rows and columns
function createBoard(numberOfRows, numberOfcolumns, field) {
    for (let i = 0; i < numberOfRows; i++) {
        const newRow = document.createElement('div');
        newRow.classList.add('row');
        field.append(newRow);
    }

    const rows = document.querySelectorAll('.row');
    // Create columns within each row
    rows.forEach(row => {
        for (let i = 0; i < numberOfcolumns; i++) {
            const newColumn = document.createElement('div');
            newColumn.classList.add('column');
            row.append(newColumn);
        }
    });
}

// Function to enable drawing on the board
function drawOnBoard() {
    const columns = document.querySelectorAll('.column');

    // Set column sizes and attach hover-effect on mouseover
    columns.forEach(column => {
        column.style.flexBasis = `${sizeOfField / numberOfRows}px`;
        column.style.height = `${sizeOfField / numberOfColumns}px`;
        column.addEventListener('mouseover', function() {
            this.classList.add('hover-effect');
        });
    });
}

// Create the field and board
let field = createField(sizeOfField);
createBoard(numberOfRows, numberOfColumns, field);

const slider = document.querySelector("#boxSizeSlider");
const output = document.getElementById("demo");

output.innerHTML = slider.value; // Display the default slider value
const boxCountButton = document.querySelector('#box-count');


slider.oninput = function() {
    output.innerHTML = this.value;
    numberOfRows = parseInt(output.innerHTML)
    numberOfColumns = numberOfRows;

    // TODO: You might want to update the board based on the new size here
    const fieldContents = document.querySelectorAll('.row');
    fieldContents.forEach(content => {
        content.remove();
    })
    let field = createField(sizeOfField);
    createBoard(numberOfRows, numberOfColumns, field);

    drawOnBoard();
}

const clearButton = document.getElementById("clear-button");
clearButton.onclick = function() {
    const fieldContents = document.querySelectorAll('.row');
    fieldContents.forEach(content => {
        content.remove();
    })
    let field = createField(sizeOfField);
    createBoard(numberOfRows, numberOfColumns, field);

    drawOnBoard();
}

const hoverEffect = document.getElementsByClassName("hover-effect")
hoverEffect.style.backgroundColor = 'white';



drawOnBoard();
