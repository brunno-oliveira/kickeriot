/*
 * MQTT Led Example
 * Brunno Cunha
 * 19/03/2016
 * Versão 0.1
 */
#include <stdio.h>
#include <string.h>
#include <SPI.h>
#include <Ethernet.h>
#include <MQTTClient.h>

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
byte ip[] = { 192, 168, 1, 177 };

EthernetClient net;
MQTTClient client;

int Red, Green, Yellow;

void setup() {
  Serial.begin(9600);
  Ethernet.begin(mac, ip);
  client.begin("192.168.1.6", net);

  Red = 5;
  Green = 6;
  Yellow = 7;

  pinMode(Red, OUTPUT);
  pinMode(Green, OUTPUT);
  pinMode(Yellow, OUTPUT);

  connect();
}

void connect() {
  Serial.print("connecting...");
  while (!client.connect("arduino")) {
    Serial.print(".");
  }
  Serial.println("\nconnected!");
  client.subscribe("/example/leds/#");
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

//Função que recebe o Topico e a mensagem
void controller(String topic, String payload) {
  String sTopicos[4];
  getTopics(topic, sTopicos);

  //printTopics(sTopicos);
  //Serial.println("Message: " + payload);

  //Entra no Topico 'leds'
  if ((sTopicos[1] == "example") && (sTopicos[2] == "leds")) {
    if (sTopicos[3] == "red") {
      doSwitchOnOff(payload, Red);
    }
    else if (sTopicos[3] == "green") {
      doSwitchOnOff(payload, Green);
    }

    else if (sTopicos[3] == "yellow") {
      doSwitchOnOff(payload, Yellow);
    }
    else {
      Serial.println("Atencao!! Topico: " + sTopicos[2] +
                     " nao configurado!");
    }
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

void printTopics(String sTopicos[]) {
  int count;
  for (count = 1; count <= 3; count ++) {
    Serial.print(count);
    Serial.println(" " + sTopicos[count]);
  }
}

