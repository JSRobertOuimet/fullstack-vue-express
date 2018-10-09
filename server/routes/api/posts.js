const
  express = require("express"),
  mongodb = require("mongodb"),
  router = express.Router();

router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();

  res.send(await posts.find({}).toArray());
});

router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();

  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });

  res.status(201).send();
});

router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();

  await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});

  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect("mongodb://admin456:admin456@ds239681.mlab.com:39681/fullstack-vue-express", {
    useNewUrlParser: true
  });

  return client.db("fullstack-vue-express").collection("posts");
}

module.exports = router;