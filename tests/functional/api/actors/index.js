import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Actor from "../../../../api/actors/actorModel";
import api from "../../../../index";
import actors from "../../../../seedData/actors";

const expect = chai.expect;
let db;
let user1token;

describe("Actors endpoint", () => {
    before(() => {
      mongoose.connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = mongoose.connection;
    });
  
    beforeEach(async () => {
      try {
        await Actor.deleteMany();
        await Actor.collection.insertMany(actors);
      } catch (err) {
        console.error(`failed to Load Actor Data: ${err}`);
      }
    });
    afterEach(() => {
      api.close(); // Release PORT 8080
    });

    describe("GET /api/actors ", () => {
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
        it("should return 20 actors and a status 200", (done) => {
        request(api)
          .get("/api/actors")
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
    describe("GET /api/actors/:id", () => {
        describe("when the id is valid", () => {
          it("should return the matching actor", () => {
            return request(api)
              .get(`/api/actors/${actors[0].id}`)
              .set({ "Authorization": `Bearer ${user1token}` })
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(200)
              .then((res) => {
                expect(res.body).to.have.property("name", actors[0].name);
              });
          });
        });
        describe("when the id is invalid", () => {
          it("should return the NOT found message", () => {
            return request(api)
              .get("/api/actors/9999")
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