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

const CONTAINERWIDTH = 600;
const CONTAINERHEIGHT = 600;

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
  if (confirm("Are you sure?")) {
    removeGrid(sketchpad);
    createGrid(gridSizeInput.value);
  }
});

const subtractLight = function (color, amount) {
  let cc = parseInt(color, 16) - amount;
  let c = cc < 0 ? 0 : cc;
  c = c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
  return c;
};

const darken = (color, amount = 10) => {
  color = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color;
  amount = parseInt((255 * amount) / 100);
  return (color = `#${subtractLight(
    color.substring(0, 2),
    amount
  )}${subtractLight(color.substring(2, 4), amount)}${subtractLight(
    color.substring(4, 6),
    amount
  )}`);
};

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
      // change current color to darker color by converting rgb to hex
      e.target.style.backgroundColor = darken(
        e.target.style.backgroundColor === "rgb(255, 255, 255)"
          ? colorInput.value
          : "#" +
              e.target.style.backgroundColor
                .slice(4, -1)
                .split(",")
                .map((x) => (+x).toString(16).padStart(2, 0))
                .join("")
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

function createGrid(gridSize) {
  //create grid
  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement("div");
    //style the square
    square.style.width = `${CONTAINERWIDTH / gridSize}px`;
    square.style.height = `${CONTAINERHEIGHT / gridSize}px`;
    square.style.backgroundColor = "#ffffff";
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
