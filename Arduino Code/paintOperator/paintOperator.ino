/*
 * Splash: Arduino Code 
 * 
 * based on an example by Kate Hartman / Nick Puckett
 * 
 * 
 */
#include <ArduinoJson.h>
//*****BE SURE TO INSTALL VERSION 5.13.3 OF THE LIBRARY IT INSTALL V6BETA BY DEFAULT 


int LEDpin1 = 11;
int LEDpin2 = 10;

int p5Input1;                                   //these variables hold the input values
int p5Input2;

void setup() 
{
  Serial.begin(9600);                                     //turn on the serial port
  pinMode(LEDpin1,OUTPUT);                       //  
  pinMode(LEDpin2,OUTPUT);
}

void loop() 

{
  // Serial Input
  DynamicJsonBuffer messageBuffer(200);                   //create the Buffer for the JSON object        
  JsonObject& p5Read = messageBuffer.parse(Serial);      //create a JsonObject variable and attach it to incoming Serial messages     
 
  p5Input1 = p5Read["somethingsomething"];
  p5Input2 = p5Read["led2"];

  // Operation
  analogWrite(LEDpin1,p5Input1);
  analogWrite(LEDpin2,p5Input2); 
}
