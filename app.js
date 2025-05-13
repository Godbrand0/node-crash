const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.listen(3000);

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
