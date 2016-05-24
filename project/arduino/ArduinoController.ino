/*
 * MQTT Led Example
 * Brunno Cunha
 * 23/05/2016
 * Versao 2.0
 */
#include <stdio.h>
#include <string.h>
#include <SPI.h>
#include <Ethernet.h>
#include <MQTTClient.h>

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
byte ip[] = { 192, 168, 1, 175 };
byte gateway[] = { 192, 168, 1, 1 };
byte subnet[] = { 255, 255, 255, 0 };

int SDcard_SSpin= 4;  // for Uno anyway


#define Limite_Topicos 10

EthernetClient net;
MQTTClient client;

int Led1, Led2, Led3;

void setup() {
  pinMode(SDcard_SSpin, OUTPUT);
  digitalWrite(SDcard_SSpin, HIGH);
  
  Serial.begin(9600);
  Ethernet.begin(mac, ip);
  client.begin("192.168.1.6", net);

  Led1 = 5; //Red
  Led2 = 6; //Green
  Led3 = 7; //Yellow

  pinMode(Led1, OUTPUT);
  pinMode(Led2, OUTPUT);
  pinMode(Led3, OUTPUT);

  connect();
}

void connect() {
  Serial.print("connecting...");
  while (!client.connect("arduino")) {
    Serial.print(".");
  }
  Serial.println("\nconnected!");
  client.subscribe("/brunno/#");
}

void loop() {
  client.loop();

  if (!client.connected()) {
    connect();
  }

  // publish a message roughly every second.
  /*if(millis() - lastMillis > 1000) {
    lastMillis = millis();
    client.publish("/hello", "world");
  }*/
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

  if ((sTopicos[1] == "brunno") && (sTopicos[2] == "sala")
    && (sTopicos[3] == "switch")){
    switchTopic(sTopicos, payload);
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
    Serial.println("Atencao!! Topico: " + sTopicos[4] + " nao configurado!");} 
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

void printTopics(String sTopicos[]) {
  int count;
  for (count = 1; count <= 4; count ++) {
    Serial.print(count);
    Serial.println(" " + sTopicos[count]);
  }
}

