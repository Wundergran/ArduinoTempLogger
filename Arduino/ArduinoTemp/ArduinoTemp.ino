#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
double temp;
float avgRawTemp;
double tempAvg;
int offset = -3;
double arrayCnt = 0;
int tempArrayCnt = 0;

float temps = 0.0;

void setup(){
  
  pinMode(7, INPUT);
  
  lcd.begin(16, 2);
  lcd.clear();
  Serial.begin(57600);
}

void loop(){

  if(arrayCnt < 400000){
    temps = temps + (analogRead(A0) + offset);
    arrayCnt++;
    tempArrayCnt++;
  }else{
    setTemp();
    arrayCnt = 0;
    printToSerial();
    temps = 0.0;
  }
  if(tempArrayCnt > 30000) {
    printTemp();
    tempArrayCnt = 0;
  }
}

void printTemp(){
    setTemp();
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Temperature:");
    lcd.setCursor(0, 1);
    lcd.print(temp);
    lcd.print("c");
}

void printToSerial() {
  Serial.print(temp);
}

void setTemp() {
  avgRawTemp = temps/arrayCnt;
  float voltage = (avgRawTemp/1024.0)*5;
  temp = (voltage - .5)*100;
}

