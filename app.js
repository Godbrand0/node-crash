const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();

const dbURI =
  "mongodb+srv://godd:test123@cluster0.dqlozn7.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog",
    snippet: "about my new blog",
    body: "more about my new blog",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.use((req, res, next) => {
//   console.log("new request mode:");
//   console.log("host:", req.hostname);
//   console.log("path:", req.path);
//   console.log("method:", req.method);
//   next();
// });

// app.use((req, res, next) => {
//   console.log("in the next middleware");

//   next();
// });

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Youshi finds eggs",
      snippet: "lorem hhiffdd dbfvdhfhs fdbfhdbfh fdhfh",
    },
    {
      title: "mario finds star",
      snippet: "lorem hhiffdd dbfvdhfhs fdbfhdbfh fdhfh",
    },
    {
      title: "How to defeat bowser",
      snippet: "lorem hhiffdd dbfvdhfhs fdbfhdbfh fdhfh",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

// app.get("/", (req, res) => {
//   // res.send("<p>phone page</p>");
//   // res.sendFile("./views/index.html", { root: __dirname });

// });

app.get("/about", (req, res) => {
  // res.send("<p>about page</p>");
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "about" });
});

// app.get("/about-us", (req, res) => {
//   res, redirect("/about");
// });

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "create" });
});

app.use((req, res) => {
  // res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
