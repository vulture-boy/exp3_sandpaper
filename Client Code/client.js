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
var filterText;
 
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
	
	// ARTIFACTS FROM EXAMPLE CODE:
	//create the text fields for the message to be sent
	whoAreYou = createInput('Write Your Name');
	whoAreYou.position(5,height);

	sendText = createInput('Write A Message');
	sendText.position(5,height+30);

	sendButton = createButton('Post Message');
	sendButton.position(sendText.x + sendText.width,height+30);
	sendButton.mousePressed(sendTheMessage);

	filterText = createInput('Who are you listening to?');
	filterText.position(5,height+60);
}

function draw() {
	// STUB: Draw UI Here
}

///uses built in mouseClicked function to send the data to the pubnub server
function sendTheMessage() {
 

  // Send Data to the server to draw it in all other canvases
  dataServer.publish(
    {
      channel: channelName,
      message: 
      {
        who: whoAreYou.value(),
        messageText: sendText.value()       //get the value from the text box and send it as part of the message   
      }
    });

}

function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  
  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName)
  {
    if(inMessage.message.who==filterText.value())
    {
    background(255);
    noStroke();
    fill(0);  //read the color values from the message
    textSize(30)
    text((inMessage.message.who+" says "+inMessage.message.messageText), 5, height/2);
    }
  }
}

function windowResized() { // Triggered when window is resized
	resizeCanvas(windowWidth,windowHeight);
}

function whoisconnected(connectionInfo)
{
	// STUB: Investigate
}