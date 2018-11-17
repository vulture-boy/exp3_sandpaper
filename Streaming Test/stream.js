function setup() {
	var canv = createCanvas(windowWidth, windowHeight); // Init Canvas
	canv.position(0,0);
	fr = 30; // Frames per second 
	frameRate(fr); 
	getAudioContext().resume(); // Overrides sound setting
	
	// Twitch
	var player = embed.getPlayer();
    player.play(); // Plays video 
}

function draw() {
	// STUB: Draw UI Here
}

function windowResized() { // Triggered when window is resized
	resizeCanvas(windowWidth,windowHeight);
}