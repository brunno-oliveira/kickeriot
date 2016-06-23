/*
 * MQTT Led Example
 * Brunno Cunha
 * 21/06/2016
 * Versao 3.0
 */
#include <stdio.h>
#include <string.h>
#include <SPI.h>
#include <Ethernet.h>
#include <MQTTClient.h>
#include "DHT.h"

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
byte ip[] = { 192, 168, 1, 177 };
byte gateway[] = { 192, 168, 1, 1 };
byte subnet[] = { 255, 255, 255, 0 };

//Endereço do Broker
const char *pi = "192.168.1.2";

#define Limite_Topicos 10

#define DHTTYPE DHT22 //Tipo do sensor
#define DHTPIN 8 //Pin do sensor
DHT dht(DHTPIN, DHTTYPE);

EthernetClient net;
MQTTClient client;

int SDcard_SSpin= 4;  
int Led1, Led2, Led3;

const char *topics = "/brunno/sala/switch/#";

unsigned long lastMillis = 0; //teste

void setup() {  
  //Para evitar uns bugs de rede causado pelo uno
  pinMode(SDcard_SSpin, OUTPUT);
  digitalWrite(SDcard_SSpin, HIGH);
  dht.begin();  

  Serial.begin(9600);
  Ethernet.begin(mac, ip);
  client.begin(pi, net);

  //Configuracao dos sensores tipo SWITCH
  Led1 = 5; //Red
  Led2 = 6; //Green
  Led3 = 7; //Yellow
  pinMode(Led1, OUTPUT);
  pinMode(Led2, OUTPUT);
  pinMode(Led3, OUTPUT);    
  connect();
}

void connect() {    
  Serial.print("Connecring to broker...");
  while (!client.connect("arduino")) {
    Serial.print("\n.");
  }
  Serial.println("\nConnected!");  
  client.subscribe(topics);  
  Serial.println("Subscribed to: ");  
  Serial.print(topics);  
}

void loop() {
  //Variaveis para conversao
  static char cTemp[10];
  static char cHum[10];
    
  client.loop();

  if (!client.connected()) {    
    connect();
  }
  
  //teste only 
  if(millis() - lastMillis > 20000) {
    lastMillis = millis();

    float fTemp = dht.readTemperature(); 
    float fHum = dht.readHumidity();    
    
    dtostrf(fTemp, 5, 2, cTemp);
    dtostrf(fHum, 5, 2, cHum);
    
    client.publish("brunno/sala/dht22/dht1/temp", cTemp);    
    client.publish("brunno/sala/dht22/dht1/hum", cHum);
  }
}

//Callback Method
void messageReceived(String topic, String payload, char * bytes, unsigned int length) {
  Serial.print("incoming: ");
  Serial.print(topic);
  Serial.print(" - ");
  Serial.print(payload);
  Serial.println();  
  controller(topic, payload);        
}

//Funcao que recebe o Topico e a mensagem
void controller(String topic, String payload) {
  String sTopicos[Limite_Topicos];
  getTopics(topic, sTopicos);

  //printTopics(sTopicos);
  //Serial.println("Message: " + payload);

  if (sTopicos[2] == "sala") {
    if (sTopicos[3] == "switch"){
      switchTopic(sTopicos, payload);
    }
  }     
}

void switchTopic(String sTopicos[], String payload){  
  if (sTopicos[4] == "led1") {
    doSwitchOnOff(payload, Led1);
  } 
  else if (sTopicos[4] == "led2") {
    doSwitchOnOff(payload, Led2);
  }
  else if (sTopicos[4] == "led3") {
    doSwitchOnOff(payload, Led3);
  }
  else {
    Serial.println("Atencao!! Topico: " + sTopicos[4] + " nao configurado!");
   }    
}

//Extrai os Topicos
void getTopics(String sTopicoOriginal, String sTopicos[]) {
  int count = 1;
  int iTopicoTamanho = sTopicoOriginal.length() + 1;
  char cTopicoriginal[iTopicoTamanho];

  sTopicoOriginal.toCharArray(cTopicoriginal, iTopicoTamanho);

  char *pTopicoQuebrado;
  char cLimite[2] = "/";

  pTopicoQuebrado = strtok(cTopicoriginal, cLimite);
  sTopicos[count] = String(pTopicoQuebrado);
  count++;

  do
  {
    pTopicoQuebrado = strtok(NULL, cLimite);
    sTopicos[count] = String(pTopicoQuebrado);
    count++;
  } while (pTopicoQuebrado != NULL);
}

void doSwitchOnOff(String sMessage, int iPin) {  
  Serial.println("Message: " + sMessage +
    " Pin: " + iPin);
  if (sMessage == "ON") {    
    digitalWrite(iPin, HIGH);
    Serial.println("State HIGH");
  } else if (sMessage == "OFF") {    
    digitalWrite(iPin, LOW);
    Serial.println("State LOW");
  }
  else {
    Serial.print("Atencao!! Instrucao para a mensagem " +
                 sMessage + " nao configurada!");
  }
}

void ReadDHT(){
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(t);
  Serial.print(" *C ");
}

//For debuggin
void printTopics(String sTopicos[]) {
  int count;
  for (count = 1; count <= 4; count ++) {
    Serial.print(count);
    Serial.println(" " + sTopicos[count]);
  }
}

