# SK9 - API

Search and Rescue K9 Training Journal 

Live version: (https://sk9.vercel.app)

## Introduction 

A well trained dog is one that that respects their human. A well trained human is one that respects their dog. The foundation for successfully training a search and rescue dog is having an unbreakable bond. From day 1, it is important to track training efforts for all aspects of life. Knowing what works and what doesn't. Every dog team is different. SK9 provides a resource to track your training sessions, from obedience and SAR sessions, to random life events. This helps focus training efforts and improve the quality of future training sessions. All of this leads to an unbreakable bond and an unstoppable canine.

The main features include 
* Summary of application features 
* View Folders 
* View Sessions for a specific folder
* Add Sessions
* Add Folders 

The key to SAR dog training is to consistently document your progress and pitfalls so that you can recognize patterns. SK9 provides a simple interface to track training sessions to recognize those patterns.

## Technologies

* Node and Express  
  * RESTful API 
* Testing 
  * Supertest (integration) 
  * Mocha and Chai (unit)
* Database 
  * Postgres
  * Knex.js 
  
## Production 

Deployed via Heroku

## API Endpoints


### Folders Router
```
- /api/folders
- - GET - gets all folders 
- - POST - creates a new folder
```

### folders/:folderId Router 
```
- /api/folders/:folderId
- - GET - gets fodlers by id 
- - DELETE - deletes folder by id 
```

### Sessions Router
```
- /api/sessions 
- - GET - gets all sessions 
- - POST - creates a new sessions
```

### Sessions/:id Router
```
- /api/sessions/:sessionId
- - GET - gets sessions by id 
```
