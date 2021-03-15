const knex = require("knex");
const { makeSessionsArray } = require("./sessions.fixtures");
const app = require("../src/app");
const store = require("../src/store");
const supertest = require("supertest");
const { makeFoldersArray } = require("./folders.fixtures");


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

  before("cleanup", () => db("sk9_folders").delete());
  before("cleanup", () => db("sk9_sessions").truncate());

  afterEach("cleanup", () => db("sk9_folders").delete());
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
        return (
          supertest(app)
            .get("/api/sessions")
            //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
            .expect(200, [])
        );
      });
    });
  });

  describe("GET /api/sessions/:id", () => {
    context(`Given no sessions`, () => {
      it(`responds 404 when session doesn't exist`, () => {
        return (
          supertest(app)
            .get(`/api/sessions/123`)
            //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
            .expect(404, {
              error: { message: `Session Not Found` },
            })
        );
      });
    });
    context("Given there are sessions in the database", () => {
      const testSessions = makeSessionsArray();
      const testFolders = makeFoldersArray();

      beforeEach("insert folders", () => {
        return db.into("sk9_folders").insert(testFolders);
      });

      beforeEach("insert session", () => {
        return db.into("sk9_sessions").insert(testSessions);
      });

      it("responds with 200 and the specified session", () => {
        const sessionId = 2;
        const expectedSession = testSessions[sessionId - 1];
        return (
          supertest(app)
            .get(`/api/sessions/${sessionId}`)
            //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
            .expect(200, expectedSession)
        );
      });
    });
  });

  // These are the POST tests

  describe("POST /api/sessions", () => {
    it(`responds with 400 missing 'title' if not supplied`, () => {
      const newSessionMissingTitle = {
        // title: 'test-title',
        modified: "2021-03-01T14:07:31.292Z",
        folder_id: 2,
        details: "this is some test content",
        drill_type: "Single",
      };
      return (
        supertest(app)
          .post(`/api/sessions`)
          .send(newSessionMissingTitle)
          //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(400, {
            error: { message: `'title' is required` },
          })
      );
    });

    it(`responds with 400 missing 'folder_id' if not supplied`, () => {
      const newSessionMissingFolder = {
        title: "test-title",
        modified: "2021-03-01T14:07:31.292Z",
        //folder_id: 2,
        details: "this is some test content",
        drill_type: "Single",
      };
      return (
        supertest(app)
          .post(`/api/sessions`)
          .send(newSessionMissingFolder)
          //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(400, {
            error: { message: `'folder_id' is required` },
          })
      );
    });

    it(`responds with 400 missing 'details' if not supplied`, () => {
      const newSessionMissingDetails = {
        title: "test-title",
        modified: "2021-03-01T14:07:31.292Z",
        folder_id: 2,
        //details: "this is some test content",
        drill_type: "Single",
      };
      return (
        supertest(app)
          .post(`/api/sessions`)
          .send(newSessionMissingDetails)
          //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(400, {
            error: { message: `'details' is required` },
          })
      );
    });
    it(`responds with 400 missing 'drill_type' if not supplied`, () => {
      const newSessionMissingDrillType = {
        title: "test-title",
        modified: "2021-03-01T14:07:31.292Z",
        folder_id: 2,
        details: "this is some test content",
        // drill_type: "Single"
      };
      return (
        supertest(app)
          .post(`/api/sessions`)
          .send(newSessionMissingDrillType)
          //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(400, {
            error: { message: `'drill_type' is required` },
          })
      );
    });
  });

  describe("DELETE /api/sessions/:id", () => {
    context(`Given no sessions`, () => {
      it(`responds 404 when session doesn't exist`, () => {
        return supertest(app)
          .delete(`/api/sessions/123`)
          //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(404, {
            error: { message: `Session Not Found` },
          });
      });
    });

    context("Given there are sessions in the database", () => {
        const testSessions = makeSessionsArray();
        const testFolders = makeFoldersArray();

        beforeEach("insert folders", () => {
          return db.into("sk9_folders").insert(testFolders);
        });
        beforeEach("insert sessions", () => {
          return db.into("sk9_sessions").insert(testSessions);
        });
  
        it("removes the folder by ID from the store", () => {
          const idToRemove = 2;
          const expectedSessions = testSessions.filter((nt) => nt.id !== idToRemove);
          return supertest(app)
            .delete(`/api/sessions/${idToRemove}`)
            //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
            .expect(204)
            .then(() =>
              supertest(app)
                .get(`/api/sessions`)
                //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
                .expect(expectedSessions)
            );
        });
      });
    });

    describe(`PATCH /api/sessions/:session_id`, () => {
        context(`Given no sessions`, () => {
          it(`responds with 404`, () => {
            const sessionId = 123456;
            return supertest(app)
              .patch(`/api/sessions/${sessionId}`)
              //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
              .expect(404, { error: { message: `Session Not Found` } });
          });
        });
        context("Given there are sessions in the database", () => {
          const testSessions = makeSessionsArray();
          const testFolders = makeFoldersArray();

          beforeEach("insert folders", () => {
            return db.into("sk9_folders").insert(testFolders);
          });
          beforeEach("insert sessions", () => {
            return db.into("sk9_sessions").insert(testSessions);
          });
    
          it("responds with 204 and updates the session", () => {
            const idToUpdate = 2;
            const updateSession = {
              title: "updated session title",
              folder_id: 1,
              details: "this is some updated test content",
              drill_type: "Multiple"
            };
            const expectedSession = {
              ...testSessions[idToUpdate - 1],
              ...updateSession,
            };
            return supertest(app)
              .patch(`/api/sessions/${idToUpdate}`)
              .send(updateSession)
              //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
              .expect(204)
              .then((res) =>
                supertest(app)
                  .get(`/api/sessions/${idToUpdate}`)
                  //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
                  .expect(expectedSession)
              );
          });
    
          it(`responds with 400 when no required fields supplied`, () => {
            const idToUpdate = 2;
            return supertest(app)
              .patch(`/api/sessions/${idToUpdate}`)
              //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
              .send({ irrelevantField: "foo" })
              .expect(400, {
                error: {
                  message: `Request body must contain either 'title', 'folder_id', 'details', or 'drill_type'`,
                },
              });
          });
    
          it(`responds with 204 when updating only a subset of fields`, () => {
            const idToUpdate = 2;
            const updateSession = {
                title: "Just updated session title",
              };
            const expectedSession = {
              ...testSessions[idToUpdate - 1],
              ...updateSession,
            };
    
            return supertest(app)
              .patch(`/api/sessions/${idToUpdate}`)
              .send({
                ...updateSession,
                fieldToIgnore: "should not be in GET response",
              })
              //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
              .expect(204)
              .then((res) =>
                supertest(app)
                  .get(`/api/sessions/${idToUpdate}`)
                  //.set("Authorization", `Bearer ${process.env.API_TOKEN}`)
                  .expect(expectedSession)
              );
          });
        });
      });
  });
