const knex = require("knex");
const { makeSessionsArray } = require("./sessions.fixtures");
const app = require("../src/app");
const store = require("../src/store");
const supertest = require("supertest");

describe("Sessions Endpoints", () => {
  let sessionsCopy, db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => db("sk9_sessions").truncate());

  afterEach("cleanup", () => db("sk9_sessions").truncate());

  beforeEach("copy the sessions", () => {
    sessionsCopy = store.sessions.slice();
  });

  afterEach("restore the sessions", () => {
    store.sessions = sessionsCopy;
  });

  describe("GET /api/sessions", () => {
    context(`Given no sessions`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/api/sessions")
          //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(200, []);
      });
    });
  });

  describe("GET /api/sessions/:id", () => {
    context(`Given no sessions`, () => {
      it(`responds 404 when session doesn't exist`, () => {
        return supertest(app)
          .get(`/api/sessions/123`)
          //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(404, {
            error: { message: `Session Not Found` },
          });
      });
    });
    context("Given there are sessions in the database", () => {
        const testSessions = makeSessionsArray();
  
        beforeEach("insert session", () => {
          return db.into("sk9_sessions").insert(testSessions);
        });
  
        it("responds with 200 and the specified session", () => {
          const sessionId = 2;
          const expectedSession = testSessions[sessionId - 1];
          return supertest(app)
            .get(`/api/sessions/${sessionId}`)
            //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
            .expect(200, expectedSession);
        });
      });
    });




});