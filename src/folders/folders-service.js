const FoldersService = {
    getAllFolders(knex) {
      return knex.select("*").from("sk9_folders");
    },
    insertFolder(knex, newFolder) {
      return knex
         .insert(newFolder)
         .into('sk9_folders')
         .returning('*')
         .then(rows => {
           console.log(rows)
          return rows[0]
        })
    },
    getById(knex, id) {
      return knex.from("sk9_folders").select("*").where("id", id).first();
    },
    deleteFolder(knex, id) {
      return knex("sk9_folders").where({ id }).delete();
    },
    updateFolder(knex, id, newFolderFields) {
      return knex("sk9_folders").where({ id }).update(newFolderFields);
    },
  };
  
  module.exports = FoldersService;