/*
 * Splash: Controller Code
 * for Experiment 4 - Creation & Computation
 *
 * Uses JSON Protocol and PubNub example code
 * 
 */

// server variables
var dataServer;
var pubKey = 'pub-c-1d984e5a-8522-46fb-8b86-de8ac913e1e9';
var subKey = 'sub-c-86c0e61c-ea81-11e8-91a4-7e00ddddd7aa';
var channelName = 'splash';
 
// Serial Vars
var serial;       //variable to hold the serial port object
var ardSend = {}; //uses {} to define it as a JSON variable
var solenoids = 3; // no. of solenoids
var sendVal[solenoids]; // Values to send to arduino (size = solenoids)
var serialPortName = "COM7";      //FOR PC it will be COMX on mac it will be something like "/dev/cu.usbmodemXXXX"
 
function preload() { // Preload graphical assets
	// STUB
}

function setup() {
	
	// Canvas Setup
	var canv = createCanvas(windowWidth, windowHeight); // Init Canvas
	canv.position(0,0);
	fr = 30; // Frames per second (for reference)
	frameRate(fr); 
	getAudioContext().resume(); // Overrides sound setting
	
	// Serial 
	serial = new p5.SerialPort();     //create the serial port object
	serial.open(serialPortName);      //open the serialport. determined 
	serial.on('open',ardCon);         //open the socket connection and execute the ardCon callback
	//setting the send rate
	// setInterval(sendData,50);         //built in javascript function that executes a funtion every XXXX milliseconds
										//in this case we use it to execute the sendData function we do this to stabilize the send function 
	
	for (i=0;i<solenoids;i++) {
		sendVal[i] = 0;
	}
	
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
}

function draw() {
	
	// Assign values for solenoids in place of an interval.
	sendData();

}

function readIncoming(inMessage) { //when new data comes in it triggers this function, 
  // this works becsuse we subscribed to the channel in setup()
  
	  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName) {
	sendVal[inMessage.paintCol-1] = 1;
	sendData();
  }
}

function sendData()
{
  
  // JSON object parameter assignment
	ardSend.solenoid1 = sendVal[0];    
	ardSend.solenoid2 = sendVal[1];  
	ardSend.solenoid3 = sendVal[2];     
  
	var sendString = JSON.stringify(ardSend);     //convert the json to a string  
	console.log(sendString)

	serial.write(sendString);                     //send it over the serial port    
	serial.write('\n');                           //write a new line character

	clearSendVal();
}

function clearSendVal() {
	for (i=0;i<solenoids;i++) {
		sendVal[i] = 0;
	}
}

function whoisconnected(connectionInfo) {
	// STUB: Investigate
}

function windowResized() { // Triggered when window is resized
	resizeCanvas(windowWidth,windowHeight);
}
 
function ardCon()
{
  console.log("connected to the arduino!! Listen UP");
}