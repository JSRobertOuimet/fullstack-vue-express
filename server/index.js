const
  express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),

  app = express(),
  port = process.env.PORT || 5000,

  posts = require("./routes/api/posts");

app
  .use(bodyParser.json())
  .use(cors())
  .use("/api/posts", posts)
  .listen(port, () => console.log(`Server listening on port ${port}...`));