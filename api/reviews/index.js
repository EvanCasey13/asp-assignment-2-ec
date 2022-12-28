import express from 'express';
import uniqid from 'uniqid'
import reviewModel from './reviewModel';
import asyncHandler from 'express-async-handler';
import movieModel from '../movies/movieModel';

const router = express.Router(); 

//Post a movie review
router.post('/:username/movie/:id/reviews', asyncHandler(async (req, res) => {
    const newReview = req.body.movie_id;
    const author = req.body.author;
    const movie = await movieModel.findByMovieDBId(newReview);
    await movie.reviews.push(req.body);
    await movie.save(); 
    res.status(201).json(movie); 
  }));


export default router;