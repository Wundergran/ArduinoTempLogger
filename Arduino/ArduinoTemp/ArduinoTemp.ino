#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
double temp;
float avgRawTemp;
double tempAvg;
int offset = -3;
double arrayCnt = 0;

float temps = 0.0;

void setup(){
  
  pinMode(7, INPUT);
  
  lcd.begin(16, 2);
  lcd.clear();
  Serial.begin(57600);
}

void loop(){

  if(arrayCnt < 100000){
    temps = temps + (analogRead(A0) + offset);
    arrayCnt++;
  }else{
    arrayCnt = 0;
    avgRawTemp = temps/100000;
    printTemp();
    temps = 0.0;
  }
}

void printTemp(){
    float voltage = (avgRawTemp/1024.0)*5;
    temp = (voltage - .5)*100;
    
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Temperature:");
    lcd.setCursor(0, 1);
    lcd.print(temp);
    lcd.print("c");

    Serial.print(temp);
}

