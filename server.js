// Import required packages
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Create an Express app
const app = express();
app.use(cors()); // Enable CORS for front-end communication

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://belloyay.github.io/Chat-Front/", // Allow your front-end domain
        methods: ["GET", "POST"]
    }
});

// Serve a simple API endpoint
app.get("/", (req, res) => {
    res.send("Chat backend is running!");
});

// Socket.IO connection handling
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Listen for incoming messages
    socket.on("send-message", (message) => {
        console.log("Message received:", message);

        // Broadcast the message to all connected users
        io.emit("receive-message", message);
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
