const express = require("express");
const path = require("path");
const xss = require("xss");
const SessionsService = require("./sessions-service");
const sessionsRouter = express.Router();
const sessionStore = require("../store")
const jsonParser = express.json();

const serializeSession = (session) => ({
  id: session.id,
  title: xss(session.title),
  modified: session.modified,
  folder_id: session.folder_id,
  details: xss(session.details),
  drill_type: session.drill_type,
});

sessionsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    SessionsService.getAllSessions(knexInstance)
      .then((sessions) => {
        res.json(sessions.map(serializeSession));
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { details, title, modified, folder_id, drill_type } = req.body
    const newSession = { details, title, modified, folder_id, drill_type };
      for (const field of ['title', 'modified', 'folder_id', 'details', 'drill_type']) {
        if (!req.body[field]) {
          return res.status(400).send({
            error: { message: `'${field}' is required` }
          })
        }
      }
    SessionsService.insertSession(req.app.get("db"), newSession)
      .then((session) => {
        res
          .status(201)
          .location(`/sessions/${session.id}`)
          .json(serializeSession(session))
      })
      .catch(next)
  });

  sessionsRouter
  .route("/:session_id")
  .all((req, res, next) => {
    const { session_id } = req.params;
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

  .get((req, res) => {
    res.json(serializeSession(res.session))
  })

  .delete((req, res, next) => {
    SessionsService.deleteSession(req.app.get("db"), req.params.session_id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })

  .patch(jsonParser, (req, res, next) => {
    const { title, modified, folder_id, details, drill_type } = req.body;
    const sessionToUpdate = { title, modified, folder_id, details, drill_type };
    const numberOfValues = Object.values(sessionToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'title', 'folder_id', 'details', or 'drill_type'`,
        },
      });
    }
    
    SessionsService.updateSession(req.app.get("db"), req.params.session_id, sessionToUpdate)
      .then((numRowsAffected) => {
        res.status(201)
        .location(`/sessions/${sessionToUpdate.id}`)
        .json(serializeSession(sessionToUpdate))
      })
      .catch(next);
  });

  module.exports = sessionsRouter;