import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import upcomingMoviesRouter from './api/upcomingmovies';
import genresRouter from './api/genres';
import usersRouter from './api/users';
import actorsRouter from './api/actors';
import showsRouter from './api/shows';
import reviewsRouter from './api/reviews';
import session from 'express-session';
import passport from './authenticate';
import './seedData'
import './db';

dotenv.config();

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
  
};

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use(passport.initialize());

app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);

app.use('/api/movies/:id', passport.authenticate('jwt', {session: false}), moviesRouter);

app.use('/api/genres', genresRouter);

app.use('/api/actors', passport.authenticate('jwt', {session: false}), actorsRouter);

app.use('/api/actors/:id', passport.authenticate('jwt', {session: false}), actorsRouter);

app.use('/api/shows', passport.authenticate('jwt', {session: false}), showsRouter);

app.use('/api/shows/:id', passport.authenticate('jwt', {session: false}), showsRouter);

app.use('/api/upcoming', passport.authenticate('jwt', {session: false}), upcomingMoviesRouter);

app.use('/api/upcoming/:id', passport.authenticate('jwt', {session: false}), upcomingMoviesRouter);

app.use('/api/users', usersRouter);

app.use('/api/reviews', reviewsRouter);

app.use(errHandler);

let server = app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
module.exports = server