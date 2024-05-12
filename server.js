const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require("./config/db.config");

const artistRoutes = require('./routes/artist.routes');
const genreRoutes = require('./routes/genre.routes');
const movieRoutes = require('./routes/movie.routes');


const app = express();

app.use(cors());

app.use('/api/artists', artistRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/movies', movieRoutes);

app.get("/api", (req, res) => {
    res.json({ message: "Welcome to Upgrad Movie booking application development." });
});


mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
  }).then(() => {
    console.log("Connected to the database!");
  }).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const PORT  = process.env.PORT || 8085;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})