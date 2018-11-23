/* ~~~ ~~~ ~~~ ~~~ p5 ~~~ ~~~ ~~~ ~~~ */
/* Uncomment below for p5 version of interface */

// var unpressedImage;
// var clickedImage;
// var isOverRectangle;
// var buttonClicked;
// var counter = 0;
//
// function preload() {
//   unpressedImage = loadImage('Paint-unpressed.jpg')
//   clickedImage = loadImage('Paint-clicked.jpg')
// }
//
// function setup() {
//   createCanvas(window.innerWidth, window.innerHeight);
//   image(unpressedImage, window.innerWidth / 2 - 90, window.innerHeight - 136, 180, 68);
// }
//
// function draw () {
//
//
//   if (mouseX >= window.innerWidth/2 -90 && mouseX <= window.innerWidth/2 +90 && mouseY >= window.innerHeight - 136 && mouseY <= window.innerHeight - 68)
//   {
//     isOverRectangle = true;
//   } else {
//     isOverRectangle = false;
//   }
//
//   console.log(isOverRectangle);
//   console.log(counter)
//
// }
//
//
// function mousePressed()
// {
//   if(isOverRectangle == true)
//   {
//     counter ++;
//     image(clickedImage, window.innerWidth / 2 - 90, window.innerHeight - 136, 180, 68);
//   }
// }

/* Uncomment above for p5 version of interface */
/* ~~~ ~~~ ~~~ ~~~ p5 ~~~ ~~~ ~~~ ~~~ */




/* ~~~ ~~~ ~~~ ~~ JavaScript ~~~ ~~~ ~~~ ~~~ */
/* Uncomment below for JS,CSS + HTML version of interface */

let paintNumber = 0;
let counter = 0;

const divLeftTag = document.querySelector("#left")
const divRightTag = document.querySelector("#right")
const divTopTag = document.querySelector("#top")
const divBottomTag = document.querySelector("#bottom")

const counterTag = document.querySelector(".totalClicks span")
const buttonTag = document.querySelector("a.paintChange")
const paintTag = document.querySelector("a.paintBucket")
const paintColors = [ { background: "rgb(255, 255, 0)"},
                      { background: "rgb(255, 0, 0)"},
                      { background: "rgb(0, 0, 255)"}
                    ]

const random = function() {
  paintNumber = Math.floor(Math.random() * paintColors.length)
  updateSection()
}

const updateSection = function() {
divRightTag.style.background = paintColors[paintNumber].background
divLeftTag.style.background = paintColors[paintNumber].background
divBottomTag.style.background = paintColors[paintNumber].background
divTopTag.style.background = paintColors[paintNumber].background
}

buttonTag.addEventListener("click", function() {

  buttonTag.innerHTML = `<img src="assets/Paint-clicked.jpg">`
  counter++;
  counterTag.innerHTML = counter + " "
  console.log(counter);

  setTimeout(function(){
    buttonTag.innerHTML = `<img src="assets/Paint-unpressed.jpg">`
  }, 75);
})

paintTag.addEventListener("click", function() {
  random()
})


/* Uncomment above for JS, CSS + HTML version of interface */
/* ~~~ ~~~ ~~~ ~~~ JavaScript ~~~ ~~~ ~~~ ~~~ */
