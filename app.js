const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();

const blogRoutes = require("./routes/blogRoutes");

const app = express();

const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "new blog",
//     snippet: "about my new blog",
//     body: "more about my new blog",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

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
  res.redirect("/blogs");
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

app.use(blogRoutes);

app.use((req, res) => {
  // res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
