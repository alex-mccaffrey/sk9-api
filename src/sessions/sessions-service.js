const SessionsService = {
    getAllSessions(knex) {
      return knex.select("*").from("sk9_sessions");
    },
    insertSession(knex, newSession) {
      return knex
         .insert(newSession)
         .into('sk9_sessions')
         .returning('*')
         .then(rows => {
           console.log(rows)
          return rows[0]
        })
    },
    getById(knex, id) {
      return knex.from("sk9_sessions").select("*").where("id", id).first();
    },
    deleteSession(knex, id) {
      return knex("sk9_sessions").where({ id }).delete();
    },
    updateSession(knex, id, newSessionFields) {
      return knex("sk9_sessions").where({ id }).update(newSessionFields);
    },
  };
  
  module.exports = SessionsService;