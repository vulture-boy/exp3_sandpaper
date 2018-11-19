/*
 * Splash: Arduino Code 
 * 
 * based on an example by Kate Hartman / Nick Puckett
 * 
 * 
 */
#include <ArduinoJson.h>
//*****BE SURE TO INSTALL VERSION 5.13.3 OF THE LIBRARY IT INSTALL V6BETA BY DEFAULT 

int paints = 3;
int paintPins[3] = {4,5,6}; // Paint Pins
const int buttonSwap = 7;     // Switches target for dispense button
const int buttonDispense = 8; // 

int p5Input[3]; // P5 Input streams //these variables hold the input values

// Control variables
const int paintDelay = 500; // ms, how long to maintain a high signal after receiving one 

int lastRead;

void setup() 
{
  Serial.begin(9600);                                     //turn on the serial port
  pinMode(paintPins[0],OUTPUT);                       // paintPins are digital outputs. 
  pinMode(paintPins[1],OUTPUT);
  pinMode(paintPins[2],OUTPUT);
  pinMode(buttonSwap,INPUT_PULLUP);       
  pinMode(buttonDispense,INPUT_PULLUP);
}

void loop() 

{
  // Serial Input
  DynamicJsonBuffer messageBuffer(200);                   //create the Buffer for the JSON object        
  JsonObject& p5Read = messageBuffer.parse(Serial);      //create a JsonObject variable and attach it to incoming Serial messages     
 
  p5Input[0] = p5Read["somethingsomething"];              //blue user on the network clicked
  p5Input[1] = p5Read["led2"];                            //red user on the network clicked

  for (int i=0;i<paints;i++) { // Loop through all paint dispensers

    if (p5Input[i] == 1) {                 
      digitalWrite(paintPins[i], HIGH);
    } else if (p5Input[i] == 0) {
      if (millis() - lastRead >= 500) {
          digitalWrite(paintPins[i], LOW); 
      }
    } 
  }
  
 lastRead = millis();
}
