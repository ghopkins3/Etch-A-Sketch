
const gridContainer = document.querySelector("#grid-container");
const gridSizeButton = document.querySelector("#prompt");
const clearGridButton = document.querySelector("#clear");
const toggleGridButton = document.querySelector("#toggle-grid");
const colorSelector = document.querySelector("#color-selector");
const rainbowButton = document.querySelector("#rainbow");
const eraserButton = document.querySelector("#eraser");
let color = "#242424";

gridSizeButton.addEventListener("click", event => {
    var gridSize = window.prompt("Enter grid size (e.g. 16 = 16x16, maximum 100)");
    if(gridSize === "" || gridSize === null || isNaN(gridSize) || gridSize < 2 || gridSize > 100) {
        return;
    } else {
        changeGridSize(gridSize);
    }
});

clearGridButton.addEventListener("click", event => {
    gridItems.forEach(gridItem => {
        gridItem.style.backgroundColor = "";
    });
    eraser = false;
    eraserButton.style.backgroundColor = "";
});

toggleGridButton.addEventListener("click", event => {
    gridItems.forEach(gridItem => {
        if(gridItem.style.border === "1px solid rgba(0, 0, 0, 0.13)") {
            gridItem.style.border = "none";
        } else {
            gridItem.style.border = "1px solid rgba(0, 0, 0, 0.13)";
        }
    });
});

colorSelector.addEventListener("change", event => {
    color = event.target.value;
    rainbowMode = false;
    eraser = false;
})

colorSelector.addEventListener("click", event => {
    color = event.target.value;
    rainbowMode = false;
    eraser = false;
    rainbowButton.style.backgroundColor = "";
    eraserButton.style.backgroundColor = "";
    
})

let rainbowMode = false;
rainbowButton.addEventListener("click", event => {
    if(!rainbowMode) {
        rainbowButton.style.backgroundColor = "#83888f";
        eraserButton.style.backgroundColor = "";
        rainbowMode = true;
        eraser = false;
    } else {
        rainbowMode = false;
        rainbowButton.style.backgroundColor = "";
    }
});

let eraser = false;
eraserButton.addEventListener("click", event => {
    if(!eraser) {
        eraserButton.style.backgroundColor = "#83888f";
        rainbowButton.style.backgroundColor = "";
        rainbowMode = false;
        eraser = true;
    } else {
        eraserButton.style.backgroundColor = "";
        eraser = false;
    }
});

generateGrid(16);

function generateGrid(gridSize) {
    gridContainer.innerHTML = ""

    for(let i = 0; i < gridSize; i++) {
        let row = document.createElement("div");
        row.classList.add("grid-row");
        gridContainer.appendChild(row);
        for(let j = 0; j < gridSize; j++) {
            let col = document.createElement("div");
            col.classList.add("grid-column");
            col.style.border = "1px solid rgba(0, 0, 0, 0.13)"
            row.appendChild(col);
        }
    }
    gridItems = document.querySelectorAll(".grid-column");
}

function randomRGB() {
    const red = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    let randomRGB = `rgb(${red}, ${green}, ${blue})`;
    return randomRGB;
}

function changeGridSize(newGridSize) {
    generateGrid(newGridSize);
}

let isDrawing = false;
gridContainer.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("grid-column")) {
        isDrawing = true;
    }
});
    
gridContainer.addEventListener("mouseover", (event) => {
    if (isDrawing && event.target.classList.contains("grid-column")) {
        event.target.style.backgroundColor = color;

        if(rainbowMode) {
            event.target.style.backgroundColor = randomRGB();
        }
        
        if(eraser) {
            event.target.style.backgroundColor = "";
        }
    }
});
    
gridContainer.addEventListener("mouseup", () => {
    isDrawing = false;
});
    
gridContainer.addEventListener("mouseleave", () => {
    isDrawing = false;
});
    