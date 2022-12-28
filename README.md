# Assignment 2 - Agile Software Practice.

Name: Evan casey

## API endpoints.

[List the Web API's endpoints and state the purpose of each one. Indicate those that require authentication.]

+ GET /api/movies (Auth) - Get all movies.
+ GET /api/movies/:id (Auth) - get the details of a specific movie.
+ GET /api/genres/ - get all genres.
+ GET /api/actors (Auth) - Get all actors.
+ GET /api/actors/:id (Auth) - get the details of a specific actor.
+ GET /api/shows (Auth) - Get all shows.
+ GET /api/shows/:id (Auth) - get the details of a specific show.
+ GET /api/upcoming (Auth) - Get all upcoming movies.
+ GET /api/upcoming/:id (Auth) - get the details of a specific upcoming movie.
+ POST /api/reviews/:username/movie/:id/reviews - Add a review for a movie.
+ GET /api/users - Get all users.
+ POST /api/users?action=action - Register or authenticate a user - set action to register or login. 
+ POST /api/users/:username/favourites (Auth) - add a favourite to user account.
+ DELETE /api/users/:username/favourites (Auth) - remove a favourite from user account.
+ GET /api/users/:username/favourites (Auth) - Get all user favourites.

## Test cases.

[In this section, include a listing of the response from running your tests locally (npm run test). Simply copy the output from your terminal and paste it into a fenced block (the triple tilda markup, i.e. ~~~ ), as shown below - do not use a screenshot.]

e.g. 
~~~
   Shows endpoint
    GET /api/shows
database connected to test on ac-6rsgntt-shard-00-00.ocb0too.mongodb.net
      √ should return a 200 status and a generated token (236ms)
      √ should return 20 shows and a status 200 (156ms)
    GET /api/shows/:id
      when the id is valid
        √ should return the matching show
      when the id is invalid
        √ should return the NOT found message (112ms)

  Reviews endpoint
    POST /api/shows
      √ should return a 200 status and a generated token (232ms)
      √ Should add a review and return a status of 201 (50ms)

  Actors endpoint
    GET /api/actors
      √ should return a 200 status and a generated token (235ms)
      √ should return 20 actors and a status 200 (171ms)
    GET /api/actors/:id
      when the id is valid
        √ should return the matching actor
      when the id is invalid
        √ should return the NOT found message (56ms)

  Upcoming movies endpoint
    GET /api/upcoming
      √ should return a 200 status and a generated token (231ms)
      √ should return 20 upcoming movies and a status 200 (45ms)
    GET /api/upcoming/:id
      when the id is valid
        √ should return the matching upcoming movie
      when the id is invalid
        √ should return the NOT found message

  Genres endpoint
    GET /api/genres
      √ should return a 200 status and a generated token (232ms)
      √ should return 4 genres and a status 200

  Users endpoint
    POST /api/:username/favourites
      √ should return a 200 status and a generated token (233ms)
      √ Should add a favourite and return a status of 201 (87ms)
    DELETE /api/:username/favourites 
      √ should return a 200 status and a generated token (231ms)
      √ Should remove a favourite and return a status of 201 (87ms)
    GET /api/:username/favourites 
      √ should return a 200 status and a generated token (234ms)
      √ should return user favourites and a status 200

  22 passing (12s)

~~~

## Independent Learning (if relevant)

State the options from the Excellent grade band you attempted. 

Vercel deployment github repository: https://github.com/EvanCasey13/acs-2-vercel-platform
