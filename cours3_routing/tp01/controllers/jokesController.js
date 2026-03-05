const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "../data/jokes.json");

let jokes = undefined;

readJokes = async () => {
  data = await fs.readFile(filePath);
  jokes = JSON.parse(data);
}; 

module.exports.all = async (req, res, next) => {
  if (jokes == undefined) await readJokes();
  res.render("./pages/home", { jokes });
};

module.exports.random = async (req, res, next) => {
  if (jokes == undefined) await readJokes();
  let index = Math.floor(Math.random() * jokes.length);
  let elem = jokes[index];
  res.render("./pages/random", { joke: elem.joke });
};
