let cTool = "pencil";
let canvasBoard = document.querySelector("canvas");
let tool = canvasBoard.getContext("2d");
let body = document.querySelector("body");
canvasBoard.height = window.innerHeight;
canvasBoard.width = window.innerWidth;
let boardLeft = canvasBoard.getBoundingClientRect().left;
let boardTop = canvasBoard.getBoundingClientRect().top;
let iX, iY, fX, fY;
let drawingMode = false;
let eraserMode = false;
body.addEventListener("mousedown", function (e) {
  iX = e.clientX - boardLeft;
  iY = e.clientY - boardTop;
  if (cTool == "pencil" || cTool == "eraser") {
    drawingMode = true;
    tool.beginPath();
    tool.moveTo(iX, iY);
  }
});
body.addEventListener("mouseup", function (e) {
  if (cTool == "pencil" || cTool == "eraser") {
    drawingMode = false;
  } else if (cTool == "rect" || cTool == "line") {
    // rect, line
    fX = e.clientX + boardLeft;
    fY = e.clientY - boardTop;
    let width = fX - iX;
    let height = fY - iY;
    if (cTool == "rect") {
      tool.strokeRect(iX, iY, width, height);
    } else if (cTool == "line") {
      tool.beginPath();
      tool.moveTo(iX, iY);
      tool.lineTo(fX, fY);
      tool.stroke();
      console.log("line tool is pending");
    }
  }
});
body.addEventListener("mousemove", function (e) {
  if (drawingMode == false && eraserMode == false) return;
  else if (drawingMode == true) {
    fX = e.clientX - boardLeft;
    fY = e.clientY - boardTop;
    tool.lineTo(fX, fY);
    tool.stroke();
    iX = fX;
    iY = fY;
  } else if (eraserMode == true) {
    tool.strokeStyle = "white";
    fX = e.clientX - boardLeft;
    fY = e.clientY - boardTop;
    tool.lineTo(fX, fY);
    tool.stroke();
    iX = fX;
    iY = fY;
  }
});

let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let rect = document.querySelector("#rect");
let line = document.querySelector("#line");
let options = document.querySelectorAll(".size-box");
// identify -> click  -> again click
pencil.addEventListener("click", function (e) {
  if (cTool == "pencil") {
    // second click
    // options show
    options[0].style.display = "flex";
  } else {
    for (let i = 0; i < options.length; i++) {
      options[i].style.display = "none";
    }

    cTool = "pencil";
  }
});
eraser.addEventListener("click", function (e) {
  if (cTool == "eraser") {
    // second click
    // options show
    options[1].style.display = "flex";
  } else {
    // eraser.style.border = "1px solid red";

    cTool = "eraser";
    tool.strokeStyle = "white";
    for (let i = 0; i < options.length; i++) {
      options[i].style.display = "none";
    }
  }
});
rect.addEventListener("click", function (e) {
  if (cTool == "rect") {
    options[2].style.display = "flex";
  } else {
    for (let i = 0; i < options.length; i++) {
      options[i].style.display = "none";
    }

    cTool = "rect";
    tool.strokeStyle = "black";
    // console.log(cTool);
    // console.log(eraserMode);
    // console.log(drawingMode);
    // console.log("rectangle selected");
  }
});
line.addEventListener("click", function (e) {
  if (cTool == "line") {
    // second click
    // options show
    options[3].style.display = "flex";
  } else {
    for (let i = 0; i < options.length; i++) {
      options[i].style.display = "none";
    }
    cTool = "line";
  }
});

let redColor = document.querySelector(".red");
let greenColor = document.querySelector(".green");
let blueColor = document.querySelector(".blue");
let blackColor = document.querySelector(".black");
redColor.addEventListener("click", function () {
  tool.strokeStyle = "lightpink";
});
greenColor.addEventListener("click", function () {
  tool.strokeStyle = "lightgreen";
});
blueColor.addEventListener("click", function () {
  tool.strokeStyle = "lightblue";
});

blackColor.addEventListener("click", () => {
  tool.strokeStyle = "black";
});

let pencilSize = 5;
let eraserSize = 5;
let lineSize = 5;
let rectSize = 5;
let sizeBoxArr = document.querySelectorAll(".size-box");
// currentTarget
sizeBoxArr[0].addEventListener("click", function (e) {
  // actual event  occur -> target
  let elems = ["size1", "size2", "size3", "size4"];

  // console.log(e.target);
  let allTheClasses = e.target.classList;
  let firstClass = allTheClasses[0];
  let test = elems.includes(firstClass);
  if (test) {
    // size waale button click;
    if (firstClass == "size1") {
      pencilSize = 5;
    } else if (firstClass == "size2") {
      pencilSize = 10;
    } else if (firstClass == "size3") {
      pencilSize = 15;
    } else if (firstClass == "size4") {
      pencilSize = 20;
    }
  }
  console.log("pencilsize" + pencilSize);
  tool.lineWidth = pencilSize;

  // console.log(e.currentTarget)
});
sizeBoxArr[1].addEventListener("click", function (e) {
  // actual event  occur -> target
  let elems = ["size1", "size2", "size3", "size4"];
  // class
  // jispe
  // console.log(e.target);
  let allTheClasses = e.target.classList;
  let firstClass = allTheClasses[0];
  let test = elems.includes(firstClass);

  if (test) {
    // size waale button click;
    if (firstClass == "size1") {
      eraserSize = 5;
    } else if (firstClass == "size2") {
      eraserSize = 10;
    } else if (firstClass == "size3") {
      eraserSize = 15;
    } else if (firstClass == "size4") {
      eraserSize = 20;
    }
  }
  // console.log("eraser" + eraserSize);
  tool.lineWidth = eraserSize;

  // event listener -> currentTarget
  // console.log(e.currentTarget)
});
sizeBoxArr[2].addEventListener("click", function (e) {
  // actual event  occur -> target
  let elems = ["size1", "size2", "size3", "size4"];
  // class
  // jispe
  // console.log(e.target);
  let allTheClasses = e.target.classList;
  let firstClass = allTheClasses[0];
  let test = elems.includes(firstClass);

  if (test) {
    // size waale button click;
    if (firstClass == "size1") {
      rectSize = 5;
    } else if (firstClass == "size2") {
      rectSize = 10;
    } else if (firstClass == "size3") {
      rectSize = 15;
    } else if (firstClass == "size4") {
      rectSize = 20;
    }
  }
  tool.lineWidth = rectSize;

  // event listener -> currentTarget
  // console.log(e.currentTarget)
});
sizeBoxArr[3].addEventListener("click", function (e) {
  // actual event  occur -> target
  let elems = ["size1", "size2", "size3", "size4"];
  // class
  // jispe
  // console.log(e.target);
  let allTheClasses = e.target.classList;
  let firstClass = allTheClasses[0];
  let test = elems.includes(firstClass);

  if (test) {
    // size waale button click;
    if (firstClass == "size1") {
      lineSize = 5;
    } else if (firstClass == "size2") {
      lineSize = 10;
    } else if (firstClass == "size3") {
      lineSize = 15;
    } else if (firstClass == "size4") {
      lineSize = 20;
    }
  }
  tool.lineWidth = lineSize;

  // event listener -> currentTarget
  // console.log(e.currentTarget)
});

//hiding the size baar after selection
canvasBoard.addEventListener("mousemove", () => {
  for (let i = 0; i < options.length; i++) {
    options[i].style.display = "none";
  }
});
