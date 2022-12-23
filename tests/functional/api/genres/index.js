import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Genre from "../../../../api/genres/genreModel";
import api from "../../../../index";
import genres from "../../../../seedData/genres";

const expect = chai.expect;
let db;
let user1token;

describe("Genres endpoint", () => {
    before(() => {
      mongoose.connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = mongoose.connection;
    });
  
    beforeEach(async () => {
      try {
        await Genre.deleteMany();
        await Genre.collection.insertMany(genres);
      } catch (err) {
        console.error(`failed to Load Genre Data: ${err}`);
      }
    });
    afterEach(() => {
      api.close(); // Release PORT 8080
    });

    describe("GET /api/genres ", () => {
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
        it("should return 4 genres and a status 200", (done) => {
        request(api)
          .get("/api/genres")
          .set({ "Authorization": `Bearer ${user1token}` })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.deep.equal(4);
            done();
          });
      });
    });
});