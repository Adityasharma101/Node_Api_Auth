# superscholar-phase2
Super Scholar phase 2 screening test projects
[LINK TO THE PROBLEM STATEMENTS](https://docs.google.com/document/d/1nm77thFbVlkTTAHe6-ooV6DODSphAIlxv6jTjokfOVo/edit?usp=sharing)

## Baisc Commands 
Run  `npm run dev`for the developement server.

Run `npm run test` for testing the API's.  


## Project 1 Implement a REST service that exposes the /boards endpoint.  - by using NodeJs Express Js
API Route start from `/boards`

Run `npm run test` so that all the integration tests in `test` folder will start running.  

#### Tools and technologies used
- Node js (Javascript Runtime)
- Express (Minimal and flexible Node js web application framework)
- mysql (Relational Database Management System)
- sequelize (ORM for mysql)
- cors (cross origin resource sharing)
- helmet (for securing HTTP headers)
- mocha and chai (for writing integration tests for our API)

## Project 2 Extension of Project 1-  Authentication Module

API Route start from `/auth`
Run `npm run test` so that all the integration tests in `test` folder will start running.  

#### Tools and technologies used
- Node js (Javascript Runtime)
- Express (Minimal and flexible Node js web application framework)
- mysql (Relational Database Management System)
- sequelize (ORM for mysql)
- passport (authentication middleware for Node.js)
- Joi (A library which helps to validate the data) 
- jwt (open standard used to share security information between two parties)
- bcrypt (A library to help you hash passwords)
- axios (Promise based HTTP client for the browser and node.js)
- cors (cross origin resource sharing)
- helmet (for securing HTTP headers)
- mocha and chai (for writing integration tests for our API)

## Part 3 : Integration of External API using axios

API Route start from `/api`

[Link to external API]  "`https://jsonmock.hackerrank.com/api/articles?page=<pageNumber>`"

where pageNumber is an integer where 1 <= pageNumber <= total_pages. total_pages is one of the fields in the JSON data.  
`routes/extApi.js` contains the code to fetch all the articles by sending a HTTP get request to the API by going through all of the pages. The number of pages will be known once we got the result from the first page.
 And sorts all the retrieved articles based on **no.of comments** and if tie occurs, then **title(title || story_title)** and returns the top **limit** most results where limit is the parameter to the function. 

Unit tests for this function can be found in `test/extApi.test.js`

