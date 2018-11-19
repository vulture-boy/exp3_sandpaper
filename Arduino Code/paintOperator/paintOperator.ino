/*
 * Splash: Arduino Code 
 * 
 * based on an example by Kate Hartman / Nick Puckett
 * 
 * written by Tyson Moll / Nicholas Alexander
 */
#include <ArduinoJson.h> // Use v5.13.3, avoid beta builds

// Paints
int paints = 3; // Number of paints in use
int paintPins[3] = {4,5,6}; // Paint Pins (Red, Yellow, Blue ?)
unsigned long paintTime[3]; // Time track for each paint
const int paintDelay = 500; // ms, how long to maintain a high signal after receiving one 

// Debug Buttons
const int buttonSwap = 7;     // Switches target for dispense button
const int buttonDispense = 8; // Dispenses for target paint solenoid
int buttonTarget = 0; // Current button target
int buttonStateD = 0; // Dispense button state
int buttonStateS = 0; // Swap button state

// Serial
int p5Input[3]; // P5 Input streams //these variables hold the input values

void setup() 
{
  Serial.begin(9600);                                     //turn on the serial port
  for (int i=0;i<paints;i++) {
    pinMode(paintPins[i],OUTPUT);                       // paintPins are digital outputs. 
    paintTime[i] = 0;  // Initialize with zero
  }
  // Buttons
  pinMode(buttonSwap,INPUT_PULLUP);       
  pinMode(buttonDispense,INPUT_PULLUP);
}

void loop() 

{
  // Serial Input
  DynamicJsonBuffer messageBuffer(200);                   //create the Buffer for the JSON object        
  JsonObject& p5Read = messageBuffer.parse(Serial);      //create a JsonObject variable and attach it to incoming Serial messages     

  // JSON objects 
  p5Input[0] = p5Read["solenoid1"];  // Red
  p5Input[1] = p5Read["solenoid2"];  // Yellow      
  p5Input[2] = p5Read["solenoid3"];  // Blue

  // Swap Target Button
  if (digitalRead(buttonSwap) == HIGH) { // Target Swap Button Active
    // Button Pressed  
    if (buttonStateS == 0) { // Check that button is not being pressed
      buttonStateS = 1; // Button is now being pressed
      buttonTarget++; // Increment target
      if (buttonTarget >= paints) { // Loop back to first paint
        buttonTarget = 0;  
      }  
    }
  } else { // TS Button Inactive
    // Button Released
    buttonStateS = 0;
  }

  // Paint Operation
  for (int i=0;i<paints;i++) { // Loop through all paint dispensers

    // Check Dispense Button State
    if (buttonTarget == i && digitalRead(buttonDispense)) {
      buttonStateD = 1;
    } else {buttonStateD = 0;}

    if (p5Input[i] == 1 || buttonStateD == 1) {                 
      digitalWrite(paintPins[i], HIGH);
      paintTime[i] = millis() + paintDelay;
    } else if (p5Input[i] == 0) {
      if (millis() >= paintTime[i]) {
          digitalWrite(paintPins[i], LOW); 
      }
    } 
  }
}
