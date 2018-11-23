/*
 * Splash: Client Code
 * for Experiment 4 - Creation & Computation
 *
 * Uses PubNub example code
 */

//input variables
var sendText;
var whoAreYou;
var sendButton;

let paintNumber = 0;
let counter = 0; // Your total clicks
let totalCounter = [0,0,0]; // Total clicks recorded for paint colours
// e.g. totalCounter[0] = red drops
//			totalCounter[1] = yella darapssss
// 			totalCounter[2] = blue drops 


const h1Tag1 = document.querySelector("h1")
const h1Tag2 = document.querySelector("div.totalPlates h1")
const h1Tag3 = document.querySelector("div.live h1")
const divLeftTag = document.querySelector("#left")
const divRightTag = document.querySelector("#right")
const divTopTag = document.querySelector("#top")
const divBottomTag = document.querySelector("#bottom")

const counterTag = document.querySelector(".totalClicks span")
const buttonTag = document.querySelector("a.paintChange")
const paintTag = document.querySelector("a.paintBucket")
const paintColors = [ 	{ background: "rgb(255, 0, 0)"}, // RED
						            { background: "rgb(255, 255, 0)"}, // YELLOW
                        { background: "rgb(0, 0, 255)"} // BLUE
                    ]

buttonTag.addEventListener("mousedown", function() {

  buttonTag.innerHTML = `<img src="assets/Paint-clicked.jpg">`
  counter++;
  counterTag.innerHTML = totalCounter + " "
  console.log(counter);
  sendTheMessage();

  setTimeout(function(){
    buttonTag.innerHTML = `<img src="assets/Paint-unpressed.jpg">`
  }, 75);
})

paintTag.addEventListener("click", function() {
  random()
})

// server variables
var dataServer;
var pubKey = 'pub-c-1d984e5a-8522-46fb-8b86-de8ac913e1e9';
var subKey = 'sub-c-86c0e61c-ea81-11e8-91a4-7e00ddddd7aa';
var channelName = 'splash';


function preload() { // Preload graphical assets
	// STUB
}

function setup() {
	/*
	var canv = createCanvas(windowWidth, windowHeight); // Init Canvas
	canv.position(0,0);
	fr = 30; // Frames per second
	frameRate(fr);
	getAudioContext().resume(); // Overrides sound setting
	*/
	// PubNub
	dataServer = new PubNub( {
		publish_key   : pubKey,  //get these from the pubnub account online
		subscribe_key : subKey,
		ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
		}
		);

	//attach callbacks to the pubnub object to handle messages and connections
	dataServer.addListener({ message: readIncoming, presence: whoisconnected })
	dataServer.subscribe({channels: [channelName]});

	// Twitch
	var player = embed.getPlayer();
    player.play(); // Plays video
}

function draw() {
	// STUB: Draw Particles Here
}

///uses built in mouseClicked function to send the data to the pubnub server
function sendTheMessage() {


  // Send Data to the server to draw it in all other canvases
  dataServer.publish(
    {
      channel: channelName,
	  message: {
		paintCol: paintNumber
	  }

    });

console.log("published");

}

function readIncoming(inMessage) //when new data comes in it triggers this function,
{                               // this works becsuse we subscribed to the channel in setup()

  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName)
  {
	  totalCounter[inMessage.message.paintCol]++;
	// STUB: Create instance of "+1" colour particle object here
	// - need a list of particle objects
	// - need a particle constructor function
	// https://p5js.org/examples/simulate-particle-system.html
	// particle.color = inMessage.paintCol;
  }
}

function windowResized() { // Triggered when window is resized
	resizeCanvas(windowWidth,windowHeight);
}

function whoisconnected(connectionInfo) {
	// STUB: Investigate
}

const random = function() {
  paintNumber = Math.floor(Math.random() * paintColors.length)
  updateSection()
}

const updateSection = function() {
	divRightTag.style.background = paintColors[paintNumber].background
	divLeftTag.style.background = paintColors[paintNumber].background
	divBottomTag.style.background = paintColors[paintNumber].background
	divTopTag.style.background = paintColors[paintNumber].background
  h1Tag1.style.color = paintColors[paintNumber].background
  h1Tag2.style.color = paintColors[paintNumber].background
  h1Tag3.style.color = paintColors[paintNumber].background
}
