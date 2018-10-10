const
  express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),

  app = express(),
  port = process.env.PORT || 5000,

  posts = require("./routes/api/posts");

// Middleware
app
  .use(bodyParser.json())
  .use(cors());

app.use("/api/posts", posts);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public"));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

app.listen(port, () => console.log(`Server listening on port ${port}...`));