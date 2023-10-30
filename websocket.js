const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 }); // WebSocket server port

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  // Send data to the connected client (e.g., when data is received from the background task)
  ws.send('Hello from WebSocket server');

  ws.on('message', (message) => {
    console.log(`Received message from client: ${message}`);
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});