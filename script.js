// Set the number of rows and columns for the board
let numberOfRows = 16;
let numberOfColumns = numberOfRows;
let sizeOfField = 600;

// Function to create the field container
function createField(sizeOfField) {
    const boxContainer = document.querySelector("#box-container");
    boxContainer.style.flexBasis = `${sizeOfField}px`;
    boxContainer.style.height = `${sizeOfField}px`;
    return boxContainer;
}

// Function to create the game board with rows and columns
function createBoard(numberOfRows, numberOfcolumns, field) {
    for (let i = 0; i < numberOfRows; i++) {
        const newRow = document.createElement("div");
        newRow.classList.add("row");
        field.append(newRow);
    }

    const rows = document.querySelectorAll(".row");
    // Create columns within each row
    rows.forEach((row) => {
        for (let i = 0; i < numberOfcolumns; i++) {
            const newColumn = document.createElement("div");
            newColumn.classList.add("column");
            row.append(newColumn);
        }
    });

    const columns = document.querySelectorAll(".column");

    // Set column sizes and attach hover-effect on mouseover
    columns.forEach((column) => {
        column.style.flexBasis = `${sizeOfField / numberOfRows}px`;
        column.style.height = `${sizeOfField / numberOfColumns}px`;
    });
}

// Function to enable drawing on the board
function drawOnBoard() {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const columns = document.querySelectorAll(".column");
    let isEraseClicked = false; // Start with erase mode OFF
    let isRainbowClicked = false;
    let isColorClicked = true;

    columns.forEach((column) => {
        column.addEventListener("mouseover", function () {
            if (isEraseClicked) {
                column.classList.remove("color-hover-effect");
                column.classList.remove("rainbow-hover-effect");
            } else if (isColorClicked){
                column.classList.remove("color-hover-effect");
                column.classList.remove("rainbow-hover-effect");
                let color = document.getElementById("color-picker").value;
                column.classList.add("color-hover-effect");
                column.style.setProperty("--hover-color", `${color}`)
            }
            if (isRainbowClicked && !isEraseClicked) {
                column.classList.remove("color-hover-effect");
                column.classList.remove("rainbow-hover-effect");
                column.classList.add("rainbow-hover-effect");
                column.style.setProperty("--hover-rainbow", `rgb(${getRandomInt(256)}, ${getRandomInt(256)}, ${getRandomInt(256)})`);
            }
        });
    });

    const eraseButton = document.getElementById("eraser-button");
    const rainbowButton = document.getElementById("rainbow-button");
    const clearButton = document.getElementById("clear-button");
    const colorButton = document.getElementById("color-button");

    colorButton.classList.add('clicked');

    colorButton.addEventListener("click", function () {
        colorButton.classList.add('clicked');
        isColorClicked = true;
        if (isEraseClicked || isRainbowClicked) {
            isRainbowClicked = false;
            rainbowButton.classList.remove('clicked');
            isEraseClicked = false;
            eraseButton.classList.remove('clicked');
        }
    })

    eraseButton.addEventListener("click", function () {
        isEraseClicked = true;
        eraseButton.classList.add('clicked');
        if (isEraseClicked) {
            isRainbowClicked = false;
            rainbowButton.classList.remove('clicked');
            isColorClicked = false;
            colorButton.classList.remove('clicked');

        }
    });

    rainbowButton.addEventListener("click", function () {
        isRainbowClicked = true;
        rainbowButton.classList.add('clicked');
        if (isRainbowClicked) {
            isEraseClicked = false;
            eraseButton.classList.remove('clicked');
            isColorClicked = false;
            colorButton.classList.remove('clicked');
        }
    });

    clearButton.onclick = function () {
        if (isEraseClicked) {
            isRainbowClicked = false;
            rainbowButton.classList.remove('clicked');
        }
        if (isRainbowClicked) {
            isEraseClicked = false;
            eraseButton.classList.remove('clicked');
        }
        columns.forEach((column) => {
            column.classList.remove("color-hover-effect");
            column.classList.remove("rainbow-hover-effect");
        }
    )
};

slider.onchange = function () {
        output.innerHTML = this.value;
        numberOfRows = parseInt(output.innerHTML);
        numberOfColumns = numberOfRows;

        // TODO: You might want to update the board based on the new size here
        const fieldContents = document.querySelectorAll(".row");
        fieldContents.forEach((content) => {
            content.remove();
        });
        let field = createField(sizeOfField);
        createBoard(numberOfRows, numberOfColumns, field);
        drawOnBoard();
    };
}


function editBoxSize() {

    const slider = document.querySelector("#boxSizeSlider");
    const output = document.getElementById("demo");

    output.innerHTML = slider.value; // Display the default slider value
    const boxCountButton = document.querySelector("#box-count");

    slider.onchange = function () {

        output.innerHTML = this.value;

        let newNumberOfRows;
        let newNumberOfColumns;

        newNumberOfRows = parseInt(output.innerHTML);
        newNumberOfColumns = newNumberOfRows;


        if (newNumberOfRows < numberOfRows) {

        } 
        else if (newNumberOfRows > newNumberOfRows) {
            
        }


        // TODO: You might want to update the board based on the new size here
        const fieldContents = document.querySelectorAll(".row");
        fieldContents.forEach((content) => {
            content.remove();
        });
        let field = createField(sizeOfField);
        createBoard(numberOfRows, numberOfColumns, field);
        drawOnBoard();
    };
}

// Create the field and board
let field = createField(sizeOfField);
createBoard(numberOfRows, numberOfColumns, field);

const slider = document.querySelector("#boxSizeSlider");
const output = document.getElementById("demo");

output.innerHTML = slider.value; // Display the default slider value
const boxCountButton = document.querySelector("#box-count");

// const hoverEffect = document.getElementsByClassName("hover-effect")
// hoverEffect.style.backgroundColor = 'white';

drawOnBoard();
