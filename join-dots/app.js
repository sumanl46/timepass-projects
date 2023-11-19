// Import required modules
const express = require("express");

// Create an instance of Express
const app = express();
const PORT = 3000; // Define a PORT number

const PUBLIC_DIR = "public";

// Serve static files from the 'public' directory
app.use(express.static(PUBLIC_DIR));

// Define a route
app.get("/", (req, res) => {
	res.sendFile(__dirname + PUBLIC_DIR + "/index.html");
	// res.send("Hello, this is my Node.js project!");
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
