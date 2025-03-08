const express = require("express");
const sequelize = require("./db.config");
const User = require("./user.schema");
const path = require("path");
const app = express();
const port = 3001;
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Home Route
app.get("/", (req, res) => {
  res.send(
    `<h1>Welcome to My Express App</h1>
    <p>Use /name?id=yourname to see your name.</p>`
  );
});

// Name Route
app.get("/name", (req, res) => {
  const name = req.query.id || "No name provided";
  console.log(req.query);

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Name Display</title>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
        <div class="container">
            <h1>Name Viewer</h1>
            <p>Your Name: <span class="highlight">${name}</span></p>
            <form action="/name" method="get">
                <label for="id">Enter your name:</label>
                <input type="text" id="id" name="id" required>
                <button type="submit">Submit</button>
            </form>
        </div>
    </body>
    </html>
  `);
});

// ✅ CREATE User API
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create user
    const newUser = await User.create({ name, email, password });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Sync Database & Start Server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
