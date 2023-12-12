const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {
  create,
  get,
  delete: deleteMovie,
  update,
} = require("./movieOperation");

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // or specify a specific origin
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  let database = mongoose.connect("mongodb://127.0.0.1/MovieMania");

  app.get ("/", (req, res) => {
    res.send("Hello World");
  });

  app.get("/api/movies", async (req, res) => {
    database.then(async () => {
      let movies = await get();
      res.send(movies);
    });
  });

  /* app.get("/api/movies/:id", async (req, res) => {
    database.then(async () => {
      let movie = await get(req.params.id);
      if (movie) {
        res.send(movie);
      } else {
        res.status(404).send("Movie not found");
      }
    });
  }); */

  app.put("/api/movies/:id", async (req, res) => {
    database.then(async () => {
      let movie = await update(req.params.id, req.body.title, req.body.Duration, req.body.Cast);
      if (movie) {
        res.send(movie);
      } else {
        res.status(404).send("Movie not added");
      }
    });
  });

    app.delete("/api/movies/:id", async (req, res) => {
      database.then(async () => {
        let movie = await deleteMovie(req.params.id);
        if (movie) {
          res.send(movie);
        } else {
          res.status(404).send("Movie not deleted");
        }
      });
    });

    app.post("/api/movies", async (req, res) => {
      database.then(async () => {
        let movie = await create(req.body.title, req.body.Duration, req.body.Cast);
        if (movie) {
          res.send(movie);
        } else {
          res.status(404).send("Movie not added");
        }
      });
    });

    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });