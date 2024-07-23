const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Query = require("./models/Query");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const mongoURI =
  "mongodb+srv://ruth:chinnu77@issue-tracker.r6ey9mn.mongodb.net/";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Login endpoint 
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log(
    `Received login request with username: ${username} and password: ${password}`
  );

  try {
    const user = await User.findOne({ username, password });
    console.log(`Found user: ${user}`);
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Endpoint(create a new query) 
app.post("/queries", async (req, res) => {
  const { name, department, type, media, description } = req.body;

  const newQuery = new Query({
    date: new Date().toLocaleString(),
    name,
    department,
    type,
    media: media ? "View Media" : "",
    description,
    status: "open",
  });

  try {
    await newQuery.save();
    res.json({ success: true, query: newQuery });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Endpoint(get all queries)
app.get("/queries", async (req, res) => {
  try {
    const queries = await Query.find();
    res.json({ success: true, queries });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
