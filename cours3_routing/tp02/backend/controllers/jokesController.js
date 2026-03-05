const fs = require("fs/promises"); // https://nodejs.org/api/fs.html

let jokes = undefined;
let path = __dirname + "/../data/jokes.json";

readJokes = async () => {
  data = await fs.readFile(path);
  jokes = JSON.parse(data);
};

module.exports.list = async (req, res, next) => {
  if (jokes == undefined) await readJokes();
  res.render("./pages/jokesList", { jokes });
};

module.exports.random = async (req, res, next) => {
  if (jokes == undefined) await readJokes();
  let index = Math.floor(Math.random() * jokes.length);
  let elem = jokes[index];
  res.render("./pages/joke", { joke: elem.joke });
};

module.exports.show = async (req, res, next) => {
  if (jokes == undefined) await readJokes();
  const id = req.params.id;
  const found = jokes.find((j) => j.id === id);
  if (!found) return res.status(404).send("Joke not found");
  res.render("./pages/joke", { joke: found.joke });
};
