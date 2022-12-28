import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import api from "../../../../index";
import Movie from "../../../../api/movies/movieModel";
import movies from "../../../../seedData/movies";

const expect = chai.expect;
let db;
let user1token;

describe("Reviews endpoint", () => {
    before(() => {
      mongoose.connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = mongoose.connection;
    });

    beforeEach(async () => {
        try {
          await Movie.deleteMany();
          await Movie.collection.insertMany(movies);
        } catch (err) {
          console.error(`failed to Load show Data: ${err}`);
        }
      });

    afterEach(() => {
      api.close(); // Release PORT 8080
    });

    describe("POST /api/shows ", () => {
        it("should return a 200 status and a generated token", () => {
          return request(api)
            .post("/api/users?action=authenticate")
            .send({
              username: "user1",
              password: "test1",
            })
            .expect(200)
            .then((rest) => {
              expect(rest.body.success).to.be.true;
              expect(rest.body.token).to.not.be.undefined;
              user1token = rest.body.token.substring(7);
            });
          });
        it("Should add a review and return a status of 201", () => {
        return request(api)
          .post(`/api/reviews/user1/movie/${movies[0].id}/reviews`)
          .send({
            author: "user1",
            review: "Test review content",
            rating: 3, 
            movie_id: movies[0].id
          })
          .expect(201)
      });
    });
});