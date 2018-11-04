#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// Data wire is conntec to the Arduino digital pin 2
#define ONE_WIRE_BUS 13

// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);

const char* ssid     = "YOUR_SSID";
const char* password = "*******";

const char* host = "consapi.azurewebsites.net";
const uint16_t port = 80;

ESP8266WiFiMulti WiFiMulti;

void setup() {
  Serial.begin(115200);

  sensors.begin();

  wifiBegin();
}

void wifiBegin() {
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(ssid, password);

  Serial.print("\n\nWait for WiFi... ");

  while (WiFiMulti.run() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  delay(500);
}

void loop() {

  float temp1 = readTemp(0);
  float temp2 = readTemp(1);

  connectAndSendTemp(temp1, 1);
  delay(500);
  connectAndSendTemp(temp2, 2);

  Serial.println("wait 15 sec...");
  delay(15000);
}

void connectAndSendTemp(float temp, int meterId) {
  Serial.print("Sending to ");
  Serial.print(host);
  Serial.print(':');
  Serial.print(port);
  Serial.print(" temperature: ");
  Serial.println(temp);
  
  // Use WiFiClient class to create TCP connections
  WiFiClient client;

  if (!client.connect(host, port)) {
    Serial.println("connection failed");
    Serial.println("wait 5 sec...");
    delay(5000);
    return;
  }

  // This will send the post request to the server
   String postStr = "{\"value\": \"";
   postStr += String(temp);
   postStr += "\", \"meterid\": ";
   postStr += String(meterId);
   postStr += "}\r\n\r\n";

   client.print("POST /api/v1/consumption HTTP/1.1\n");
   client.print("Host: ");
   client.print(host);
   client.print("\n");
   client.print("Connection: close\n");
   client.print("Content-Type: application/json\n");
   client.print("Content-Length: ");
   client.print(postStr.length());
   client.print("\n\n");
   client.print(postStr);
   
  // read back one line from server
  //Serial.println("receiving from remote server");
  String line = client.readStringUntil('\r');
  if (line.indexOf("OK") == 0) {
    // Error
    Serial.print("Error receiving server repsonse: ");
    Serial.println(line);
  }

  //Serial.println("closing connection");
  client.stop();
}

float readTemp(int index){ 
  // Call sensors.requestTemperatures() to issue a global temperature and Requests to all devices on the bus
  sensors.requestTemperatures(); 
  
  // Why "byIndex"? You can have more than one IC on the same bus. 0 refers to the first IC on the wire
  float temp = sensors.getTempCByIndex(index);

  return temp;
}
