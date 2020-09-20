# Reflections on earlier projects and implications for this one
 
## TinyApp

- In this project, we processed all of the data in the back end.
- Our server file contained lots of code, with many routes.
- Within each route we queried the database and then used this data to pass into template variables  server side. 
- This also prevented a single page experience and meant writing lots of HTML EJS templates.

## Tweeter
- This project had an index.js file with a clean and simple server set up.
- The index.js file brings in two important modules: a data-helpers module and a tweetsRoutes. 
- tweetsRoutes is a router file with all of the routes.
- The db interaction is an example of the dependency injection approach. 
- Data-helpers is a function that returns an object containing methods such as getTweets and saveTweets. It's job is to help us read and insert into the database. The other CRUD/BREAD operations are handled in the tweets route
- tweetRoutes is an exported as an object which takes the db as a parameter and contains the other BREAD operations
- The db is pulled in in a separate file of its own, where it is exported as an object to be required by other files.  
- Importantly, the router object and the data helper object can take in the db as a parameter.
- See user-helper too for how we managed the users database
- In the index.js file, we bring in the db, and pass it as a parameter to the data helpers object. 

#### Tweeter Front End
- Rather than writing masses of html content and styling it, or filling in EJS templates, we used jQuery to dynamically render elements. 
- After loading the whole db and styles, we used client-side rendering to show the user the correct content based on the route they have accessed and their login credentials. 

## LightBnb

- One main server.js file. This file brings in a database.js file, apiRoutes for handling data, userRoutes for user routes. 
- the database.js file contains all db queries where query strings are passed in as params to db queries. Contains queries as template literals.
- The routes pages are functions that take in a router and a db as a parameter. 
- We can then call e.g. router.get(whatever), database.showXhavingY() etc... within the routes pages
- Lots and lots of jquery and template literals
- Querying method doesn't feel ideal. 

## BootcampX 

- 

