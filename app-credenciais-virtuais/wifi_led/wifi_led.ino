#include <ESP8266WiFi.h>
 
//const char* ssid = "Senior-Hackathon";
//const char* password = "senior@hackathon2017";

const char* ssid = "Vegeta";
const char* password = "br123456";
 
int ledPin = 13; // GPIO13
WiFiServer server(80);
 
void setup() {
  Serial.begin(115200);
  delay(10);
 
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);
 
  // Connect to WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
 
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
 
  // Start the server
  server.begin();
  Serial.println("Server started");
 
  // Print the IP address
  Serial.print("Use this URL to connect: ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/");
 
}
 
void loop() {
  // Check if a client has connected
  WiFiClient client = server.available();
  if (!client) {
    return;
  }
 
  // Wait until the client sends some data
  Serial.println("new client");
  while(!client.available()){
    delay(1);
  }
 
  // Read the first line of the request
  String request = client.readStringUntil('\r');
  Serial.println(request);
  client.flush();
 
  // Match the request
 
  int value = LOW;
  if (request.indexOf("/LED=ON") != -1)  {
    digitalWrite(ledPin, HIGH);
    value = HIGH;
  }
  if (request.indexOf("/LED=OFF") != -1)  {
    digitalWrite(ledPin, LOW);
    value = LOW;
  }
 
// Set ledPin according to the request
//digitalWrite(ledPin, value);
 
  // Return the response
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/html");
  client.println(""); //  do not forget this one

// start --- /////////////////////////////////////////
client.println("<!DOCTYPE html>");
client.println("<html>");
client.println("<head>");
client.println("<meta charset=\"UTF-8\">");
client.println("<style> ");
client.println(".off {");
client.println("    border: 5px solid red;");
client.println("  color: white;");
client.println("  background: red;");
client.println("    padding: 10px 40px; ");
client.println("    width: 300px;");
client.println("    border-radius: 25px;");
client.println("    display:inline-block;");
client.println("    text-align: center;");
client.println("    width: 100%;");
client.println("    line-height: 250px;");
client.println("    font-size: 250%;");
client.println("    text-decoration: inherit;");
client.println("}");
client.println(".on {");
client.println("    border: 5px solid green;");
client.println("  color: white;");
client.println("  background: green;");
client.println("    padding: 10px 40px;");
client.println("    width: 300px;");
client.println("    border-radius: 25px;");
client.println("    display:inline-block;");
client.println("    text-align: center;");
client.println("    width: 100%;");
client.println("    line-height: 250px;");
client.println("    margin-bottom: 10px;");
client.println("    font-size: 250%;");
client.println("    text-decoration: inherit;");
client.println("}");
client.println(".row {");
client.println(" display: inline-block;");
client.println("    position: fixed;");
client.println("    top: 0;");
client.println("    bottom: 0;");
client.println("    left: 0;");
client.println("    right: 0;");
client.println("    width: 500px;");
client.println("    height: 750px;");
client.println("    margin: auto;");
client.println("");
client.println("}");
client.println("</style>");
client.println("</head>");
client.println("<body>");
client.println("");
client.println("<div class=\"row\">");
client.println("<h1 style=\"text-align: center;\">Cristiano Franco</h1>");
client.println("<h1 style=\"text-align: center;\">R. São Paulo - Victor Konder, Blumenau - SC</h1>");
client.println("<a class=\"on\" href=\"/LED=ON\"\">ABRIR</a>");
client.println("<a class=\"off\" href=\"/LED=OFF\"\">FECHAR</a>");
client.println("</div>");
client.println("</body>");
client.println("</html>");
client.println("");
client.println("");
// end --- /////////////////////////////////////////
 
  delay(1);
  Serial.println("Client disonnected");
  Serial.println("");
 
}
