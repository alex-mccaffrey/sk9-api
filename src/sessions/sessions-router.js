const express = require("express");
const { Session } = require("inspector");
const path = require("path");
const xss = require("xss");
const SessionsService = require("./sessions-service");
const sessionsRouter = express.Router();
const sessionStore = require("../store")
const jsonParser = express.json();

const serializeSession = (session) => ({
  id: session.id,
  title: session.title,
  modified: session.modified,
  folder_id: session.folder_id,
  details: session.details,
  drill_type: session.drill_type,
});

sessionsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    SessionsService.getAllSessions(knexInstance)
      .then((sessions) => {
        res.json(session.map(serializeSession));
      })
      .catch(next);
  })

  sessionsRouter
  .route("/:session_id")
  .all((req, res, next) => {
    const { session_id } = req.params;
    console.log("session_id", note_id);
    console.log();
    SessionsService.getById(req.app.get("db"), session_id)
      .then((session) => {
        if (!session) {
          return res.status(404).json({
            error: { message: `Session Not Found` },
          });
        }
        res.session = session;
        next();
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { title, modified, folder_id, details, drill_type } = req.body
    const newSession = { title, modified, folder_id, details, drill_type };

    for (const [key, value] of Object.entries(newSession))
      if (value == null)
        return res.status(400).json({
          error: { message: `'${key}' is required` },
        });
    SessionsService.insertSession(req.app.get("db"), newSession)
      .then((session) => {
        res
          .status(201)
          .location(`/sessions/${session.id}`)
          .json(serializeSession(session))
      })
      .catch(next)
  });


  module.exports = sessionsRouter;