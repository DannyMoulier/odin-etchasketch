// Function to create the game board with rows and columns
function createBoard() {
    const slider = document.querySelector("#boxSizeSlider");
    const output = document.querySelector(".slider-output");
    const field = document.querySelector("#box-container");
    let sizeOfField = 600;

    output.textContent = slider.value;

    slider.addEventListener("input", () => {
        output.textContent = slider.value;
        updateBoard(parseInt(slider.value));
    });

    function updateBoard(newNumberOfRows) {
        field.innerHTML = ""; // Clear the existing content

        let numberOfColumns = newNumberOfRows;

        field.style.flexBasis = `${sizeOfField}px`;
        field.style.height = `${sizeOfField}px`;

        for (let i = 0; i < newNumberOfRows; i++) {
            const newRow = document.createElement("div");
            newRow.classList.add("row");
            field.append(newRow);
        }

        const rows = document.querySelectorAll(".row");

        rows.forEach((row) => {
            for (let i = 0; i < numberOfColumns; i++) {
                const newColumn = document.createElement("div");
                newColumn.classList.add("column");
                row.append(newColumn);
            }
        });

        const columns = document.querySelectorAll(".column");

        // Set column sizes and attach hover-effect on mouseover
        columns.forEach((column) => {
            column.style.flexBasis = `${sizeOfField / newNumberOfRows}px`;
            column.style.height = `${sizeOfField / numberOfColumns}px`;
        });

        drawOnBoard();
    }
    // Initialize the board
    const initialNumberOfRows = parseInt(output.innerHTML);
    updateBoard(initialNumberOfRows);
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
            } else if (isColorClicked) {
                column.classList.remove("color-hover-effect");
                column.classList.remove("rainbow-hover-effect");
                let color = document.getElementById("color-picker").value;
                column.classList.add("color-hover-effect");
                column.style.setProperty("--hover-color", `${color}`);
            }
            if (isRainbowClicked && !isEraseClicked) {
                column.classList.remove("color-hover-effect");
                column.classList.remove("rainbow-hover-effect");
                column.classList.add("rainbow-hover-effect");
                column.style.setProperty(
                    "--hover-rainbow",
                    `rgb(${getRandomInt(256)}, ${getRandomInt(
                        256
                    )}, ${getRandomInt(256)})`
                );
            }
        });
    });

    const colorButton = document.getElementById("color-button");
    const rainbowButton = document.getElementById("rainbow-button");
    const eraseButton = document.getElementById("eraser-button");
    const clearButton = document.getElementById("clear-button");
    const slider = document.getElementById("boxSizeSlider");

    colorButton.classList.add("clicked");

    colorButton.addEventListener("click", function () {
        colorButton.classList.add("clicked");
        isColorClicked = true;
        if (isEraseClicked || isRainbowClicked) {
            isRainbowClicked = false;
            rainbowButton.classList.remove("clicked");
            isEraseClicked = false;
            eraseButton.classList.remove("clicked");
        }
    });

    eraseButton.addEventListener("click", function () {
        isEraseClicked = true;
        eraseButton.classList.add("clicked");
        if (isEraseClicked) {
            isRainbowClicked = false;
            rainbowButton.classList.remove("clicked");
            isColorClicked = false;
            colorButton.classList.remove("clicked");
        }
    });

    rainbowButton.addEventListener("click", function () {
        isRainbowClicked = true;
        rainbowButton.classList.add("clicked");
        if (isRainbowClicked) {
            isEraseClicked = false;
            eraseButton.classList.remove("clicked");
            isColorClicked = false;
            colorButton.classList.remove("clicked");
        }
    });

    clearButton.onclick = function () {
        if (isEraseClicked) {
            isRainbowClicked = false;
            rainbowButton.classList.remove("clicked");
        }
        if (isRainbowClicked) {
            isEraseClicked = false;
            eraseButton.classList.remove("clicked");
        }
        columns.forEach((column) => {
            column.classList.remove("color-hover-effect");
            column.classList.remove("rainbow-hover-effect");
        });
    };

    slider.addEventListener("input", () => {
        if (isEraseClicked || isRainbowClicked) {
            isRainbowClicked = false;
            rainbowButton.classList.remove("clicked");
            isEraseClicked = false;
            eraseButton.classList.remove("clicked");
        }
    });
}

createBoard();
