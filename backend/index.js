require('dotenv').config();
const express = require("express");
const http = require("http");
const MQTT = require("mqtt");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const client = MQTT.connect(process.env.CONNECT_URL, {
  clientId: "frontend",
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
  clean: true,
  connectTimeout: 3000,
  reconnectPeriod: 10000,
  rejectUnauthorized: false
});


io.on("connection", (socket) => {
  // Establishing React -> Node connection
  socket.on('text', (message) => {
    console.log('Backend received message:', message);
    //Node -> MQTT
    client.publish("text", message.toString());
  });
});

// Establishing MQTT -> Node connection
client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("response", (err) => {
    if (err) {
      console.error("Subscription error:", err);
    } else {
      console.log("Subscribed to 'response'");
    }
  });
});

// MQTT -> Node
client.on("message", (topic, payload) => {
  if (topic === "response") {
    //Node -> Frontend
    io.emit("response", payload.toString());
  }
});



server.listen(8000, () => {
  console.log('Server is running on port 8000');
});
