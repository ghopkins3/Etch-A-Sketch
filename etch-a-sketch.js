
const gridContainer = document.querySelector("#grid-container");
const gridSizeButton = document.querySelector("#prompt");
const clearGridButton = document.querySelector("#clear");
const toggleGridButton = document.querySelector("#toggle-grid");
const colorSelector = document.querySelector("#color-selector");
const rainbowButton = document.querySelector("#rainbow");
const eraserButton = document.querySelector("#eraser");
const containerWidth = 800;
const containerHeight = 600;
let color = "#242424";

gridSizeButton.addEventListener("click", event => {
    var gridSize = window.prompt("Enter grid size (e.g. 16 = 16x16, maximum 100)");
    if(gridSize === "" || gridSize === null || isNaN(gridSize)) {
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

let gridLines = true;
toggleGridButton.addEventListener("click", event => {
    gridItems.forEach(gridItem => {
        if(gridItem.style.border === "1px solid black") {
            gridItem.style.border = "none";
            gridLines = false;
        } else {
            gridItem.style.border = "1px solid black";
            gridLines = true;
        }
    });

    if(!gridLines) {
        gridContainer.style.border = "1px solid black";
    } else {
        gridContainer.style.border = "none";
    }

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
    gridContainer.innerHTML = "";

    const gridItemWidth = containerWidth / gridSize;
    const gridItemHeight = containerHeight / gridSize;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("gridItem");
        gridItem.style.width = `${gridItemWidth}px`;
        gridItem.style.height = `${gridItemHeight}px`;

        if (!gridLines) {
            gridItem.style.border = "none";
        } else {
            gridItem.style.border = "1px solid black";
        }

        gridContainer.appendChild(gridItem);
    }
    
    gridItems = document.querySelectorAll(".gridItem");
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
    gridItems = document.querySelectorAll(".gridItem");
}

let isDrawing = false;
gridContainer.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("gridItem")) {
        isDrawing = true;
    }
});
    
gridContainer.addEventListener("mouseover", (event) => {
    if (isDrawing && event.target.classList.contains("gridItem")) {
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
    