require("dotenv").config({ path: "./.env" });

const express = require("express");
const app = express();

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views/"));

app.use(express.static(path.join(__dirname, "public")));

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

app.set("layout", path.join(__dirname, "./views/layouts/layouts"));

// ============= Routing ==============
const jokesRouter = require("./routes/jokesRouter");
app.use("/jokes", jokesRouter);

app.get("/", (req, res) => {
  console.log("you call me i m root");
  res.redirect("/jokes/all");
});

// Optional: catch-all 404 handler (must be last)
app.get("/*splat", (req, res) => {
  console.log("you call me i m chyata 1");
  res.redirect("/jokes/all"); // to expermiment
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(` The Server is running on http://127.0.0.1:${port}`);
});
