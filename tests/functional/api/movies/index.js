import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Movie from "../../../../api/movies/movieModel";
import api from "../../../../index";
import movies from "../../../../seedData/movies";

const expect = chai.expect;
let db;
let user1token;

describe("Movies endpoint", () => {
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
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
  });
  describe("GET /api/movies ", () => {
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
      it("should return 20 movies and a status 200", (done) => {
      request(api)
        .get("/api/movies")
        .set({ "Authorization": `Bearer ${user1token}` })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.deep.equal(20);
          done();
        });
    });
  });

  describe("GET /api/movies/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        return request(api)
          .get(`/api/movies/${movies[0].id}`)
          .set({ "Authorization": `Bearer ${user1token}` })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", movies[0].title);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        return request(api)
          .get("/api/movies/9999")
          .set({ "Authorization": `Bearer ${user1token}` })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(404)
          .expect({
            status_code: 404,
            message: "The resource you requested could not be found.",
          });
      });
    });
  });
});
