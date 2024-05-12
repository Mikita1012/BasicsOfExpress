const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');


router.get('/', movieController.findAllMovies);

router.get('/', (req, res) => {
    req.query.status = 'PUBLISHED';
    movieController.findAllMovies(req, res);
});


router.get('/', (req, res) => {
    req.query.status = 'RELEASED';
    movieController.findAllMovies(req, res);
});

router.get('/movies/:movieId', movieController.findOne);


router.get('/', (req, res) => {
    const { status, title, genres, artists, start_date, end_date } = req.query;
    const queryParams = {};
    if (status) queryParams.status = status;
    if (title) queryParams.title = title;
    if (genres) queryParams.genres = genres;
    if (artists) queryParams.artists = artists;
    if (start_date) queryParams.start_date = start_date;
    if (end_date) queryParams.end_date = end_date;
    
    
});

module.exports = router;
