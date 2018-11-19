/*
 * Splash: Arduino Code 
 * 
 * based on an example by Kate Hartman / Nick Puckett
 * 
 * 
 */
#include <ArduinoJson.h>
//*****BE SURE TO INSTALL VERSION 5.13.3 OF THE LIBRARY IT INSTALL V6BETA BY DEFAULT 


const int paintPin1 = 4;                         //paintPints are digital pins
const int paintPin2 = 5;
const int paintDelay = 500; // ms, how long to maintain a high signal after receiving one 

int p5Input1;                                   //these variables hold the input values
int p5Input2;

int lastRead;

void setup() 
{
  Serial.begin(9600);                                     //turn on the serial port
  pinMode(paintPin1,OUTPUT);                       // paintPins are digital outputs. 
  pinMode(paintPin2,OUTPUT);
}

void loop() 

{
  // Serial Input
  DynamicJsonBuffer messageBuffer(200);                   //create the Buffer for the JSON object        
  JsonObject& p5Read = messageBuffer.parse(Serial);      //create a JsonObject variable and attach it to incoming Serial messages     
 
  p5Input1 = p5Read["somethingsomething"];              //blue user on the network clicked
  p5Input2 = p5Read["led2"];                            //red user on the network clicked

  // Paint Bucket 1
  if (p5Input1 == "makePaintGo") {                        //close the valve after half a second
    analogWrite(paintPin1, HIGH);//copypaste this function and change the numbering to add new paint buckets
  } else {
    if (millis() - lastRead >= 500) {
        analogWrite(paintPin1, LOW); 
    }
  }
  
  // Paint Bucket 2
  if (p5Input2=="makePaintGo") {                        //close the valve after half a second
      analogWrite(paintPin2, HIGH);
  } else {
    if (millis() - lastRead >= 500) {
      analogWrite(paintPin2, LOW); 
    }
  }    
  
 lastRead = millis();
}
