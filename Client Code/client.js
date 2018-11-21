/*
 * Splash: Client Code
 * for Experiment 4 - Creation & Computation
 *
 * Uses PubNub example code
 */
 
// server variables
var dataServer;
var pubKey = 'pub-c-1d984e5a-8522-46fb-8b86-de8ac913e1e9';
var subKey = 'sub-c-86c0e61c-ea81-11e8-91a4-7e00ddddd7aa';
var channelName = 'splash';

//input variables
var sendText;
var whoAreYou;
var sendButton;
 
function preload() { // Preload graphical assets
	// STUB
}

function setup() {
	var canv = createCanvas(windowWidth, windowHeight); // Init Canvas
	canv.position(0,0);
	fr = 30; // Frames per second 
	frameRate(fr); 
	getAudioContext().resume(); // Overrides sound setting
	
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
	
	// STUB: Replace these with GUI elements 
	paintType = createRadio();
	paintType.option('Red', 1);
	paintType.option('Yellow', 2);
	paintType.option('Blue', 3);
	paintType.value(1);
	paintType.position(40,height);

	sendButton = createButton('Send Command');
	sendButton.position(sendText.x + sendText.width,height+30);
	sendButton.mousePressed(sendTheMessage);
}

function draw() {
	// STUB: Draw UI & particles Here
}

///uses built in mouseClicked function to send the data to the pubnub server
function sendTheMessage() {
 

  // Send Data to the server to draw it in all other canvases
  dataServer.publish(
    {
      channel: channelName,
      paintCol: paintType.value();,
	  
    });

}

function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  
  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName)
  {
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

function whoisconnected(connectionInfo)
{
	// STUB: Investigate
}