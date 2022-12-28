import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import api from "../../../../index";
import Review from "../../../../api/reviews/reviewModel";
import reviews from "../../../../seedData/reviews";

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
          await Review.deleteMany();
          await Review.collection.insertMany(reviews);
        } catch (err) {
          console.error(`failed to Load review Data: ${err}`);
        }
      });
  
    afterEach(() => {
      api.close(); // Release PORT 8080
    });

    describe("POST /api/reviews ", () => {
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
          .post(`/api/reviews/user1/movie/590706/reviews`)
          .send({
            author: "user1",
            review: "Test review content",
            rating: 3, 
            movie_id: 590706
          })
          .expect(201)
      });
    });
});