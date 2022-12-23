import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";
import Movie from "../../../../api/movies/movieModel";
import movies from "../../../../seedData/movies";
import api from "../../../../index";

const expect = chai.expect;
let db;
let user1token;
let userName = "user1"

describe("Users endpoint", () => {
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

  describe("POST /api/:username/favourites ", () => {
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
    it("Should add a favourite and return a status of 201", () => {
      return request(api)
        .post(`/api/users/${userName}/favourites`)
        .send({
          userName: userName,
          newFavourite: movies[0],
          user: "user1",
          movie: movies[0].id
        })
        .expect(201)
    });
  });
  describe("DELETE /api/:username/favourites ", () => {
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
    it("Should remove a favourite and return a status of 201", () => {
      return request(api)
        .delete(`/api/users/${userName}/favourites`)
        .send({
          userName: userName,
          newFavourite: movies[0],
          user: "user1",
          movie: movies[0].id
        })
        .expect(201)
    });
  });

  describe("GET /api/:username/favourites ", () => {
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
    it("should return user favourites and a status 200", (done) => {
      request(api)
        .get(`/api/users/${userName}/favourites`)
        .set({ "Authorization": `Bearer ${user1token}` })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.deep.equal(0);
          done();
        });
    });
  });
});
