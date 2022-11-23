const sketchpad = document.querySelector("#sketchpad");

// Buttons
const eraserButton = document.querySelector(".eraser"),
  colorButton = document.querySelector(".color"),
  shadeButton = document.querySelector(".shade"),
  clearButton = document.querySelector(".clear");
// Inputs
const colorInput = document.querySelector("#selectedColor"),
  gridSizeInput = document.querySelector("#gridSize");

const gridSizeText = document.querySelector(".gridSizeText");

console.log(`Grid sizein su anki degeri budur: ${gridSizeInput.value}`);

let GRIDSIZE = 24;
const CONTAINERWIDTH = 600;
const CONTAINERHEIGHT = 600;
const TOTALSQUARES = GRIDSIZE * GRIDSIZE;
const colorShades = [
  "rgb(230, 230, 230)",
  "rgb(204, 204, 204)",
  "rgb(179, 179, 179)",
  "rgb(153, 153, 153)",
  "rgb(128, 128, 128)",
  "rgb(102, 102, 102)",
  "rgb(76, 76, 76)",
  "rgb(51, 51, 51)",
  "rgb(25, 25, 25)",
  "rgb(0, 0, 0)",
];

let currentMode = "color";
let isDragging = false;

// Event Listeners
document.body.onmousedown = () => {
  isDragging = true;
};
document.body.onmouseup = () => {
  isDragging = false;
};

gridSizeInput.addEventListener("input", () => {
  gridSizeText.innerHTML = `${gridSizeInput.value} x ${gridSizeInput.value}`;
  removeGrid(sketchpad);
  createGrid(gridSizeInput.value);
});

eraserButton.addEventListener("click", () => {
  changeMode("eraser");
});

colorButton.addEventListener("click", () => {
  changeMode("color");
});
shadeButton.addEventListener("click", () => {
  changeMode("shade");
});
clearButton.addEventListener("click", () => {
  removeGrid(sketchpad);
  createGrid(gridSizeInput.value);
});

function changeColor(e) {
  if (e.type === "mouseover" && !isDragging) return;

  switch (currentMode) {
    case "eraser":
      e.target.style.backgroundColor = "white";
      e.target.style.border = "1px solid gray";
      break;
    case "color":
      e.target.style.backgroundColor = colorInput.value;
      e.target.style.border = "none";
      break;
    case "shade":
      console.log(`this is shade color ${e.target}`);
      console.log(e.target);
      e.target.style.backgroundColor = selectShade(
        e.target.style.backgroundColor,
        colorShades
      );
      e.target.style.border = "none";
      break;
    default:
      break;
  }
}

function changeMode(mode) {
  currentMode = mode;
  //remove active class from all buttons
  console.log(eraserButton.classList);
  eraserButton.classList.remove("active");
  colorButton.classList.remove("active");
  shadeButton.classList.remove("active");
  clearButton.classList.remove("active");
  switch (currentMode) {
    case "eraser":
      eraserButton.classList.add("active");
      break;
    case "color":
      colorButton.classList.add("active");
      break;
    case "shade":
      shadeButton.classList.add("active");
      break;

    default:
      break;
  }
}

function selectShade(currentColor, colorShades) {
  console.log("currentColor", currentColor);
  // if current color is not in the shadeColor list return the first shade
  if (!colorShades.includes(currentColor)) return colorShades[0];
  // otherwise return the next shade
  const currentColorIndex = colorShades.indexOf(currentColor);
  if (currentColorIndex != colorShades.length - 1) {
    console.log(`Returning : ${colorShades[currentColorIndex + 1]}`);
    return colorShades[currentColorIndex + 1];
  }
  //if currentColor is the last color shade return it as it is
  console.log(`Returning : ${currentColor}`);

  return currentColor;
}

function createGrid(gridSize) {
  //create grid
  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement("div");
    //style the square
    square.style.width = `${CONTAINERWIDTH / gridSize}px`;
    square.style.height = `${CONTAINERHEIGHT / gridSize}px`;
    square.style.backgroundColor = "rgb(255, 255, 255)";

    square.addEventListener("mousedown", changeColor);
    square.addEventListener("mouseover", changeColor);

    square.classList.add("pixel");

    sketchpad.appendChild(square);
  }
}
function removeGrid(element) {
  console.log(element.innerHTML);
  element.innerHTML = "";
  return;
}
createGrid(24);
changeMode("color");
