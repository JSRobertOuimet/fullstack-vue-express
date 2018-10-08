const
  express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),

  posts = require("./routes/api/posts"),

  port = process.env.PORT || 5000,
  app = express();

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors())
  .use("/api/posts", posts)
  .listen(port, () => console.log(`Server listening on port ${port}...`));