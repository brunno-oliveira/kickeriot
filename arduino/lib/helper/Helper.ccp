/*
 * Classe com funções para ajudar 
 * a utilização de MQTT
 * Brunno Cunha
 * 29/04/2016
 * Versão 0.1
 */

#include "Arduino.h"
#include "Helper.h"

void Helper::getTopics(String sTopicoOriginal, String sTopicos[]){
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

