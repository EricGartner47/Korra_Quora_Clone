# Korra - A Quora Clone
[Korra](https://korra-quora-clone.herokuapp.com/)

## At A Glance
Korra is a full stack web application that allows logged users to:
 - Post a question by topic
 - Edit a posted question only by the posting user
 - Delete a posted question only by the posting user
 - Post an answer to a posted question
 - Edit an answer to a posted question
 - Delete an answer to a posted question
 - Post a comment to an answer
 - Edit a comment to an answer
 - Delete a comment to an answer

## Application Architecture
Korra is built with a PUG frontend and an Express backend. PostgreSQL is also used as a database.

## Frontend Technologies Used 
Korra uses PUG to generate the HTML elements, and then we use CSS to handling the styling of those elements.

## Backend Technologies Used
We used an Express server to handle the backend communication because we have the most experience with this language for backend development. We used PostgreSQL because it is easy for us to use and manipulate with sequelize. Again, we used sequelize because of the ease of use as well as our familiarity with the language.

## Key Features
### User Authorization
User authorization is handling in JS using BCrypt for passowrd hasing. When users log in, the password they provide is rehashed and checked agains the original password. 
!(https://github.com/EricGartner47/QuoraClone-GroupProject/tree/main/images)

### Post a Question
An authorized user can post a question with a topic that can then be seen by any logged in user. Only the authorized user may then edit or delete the posted question.
!(https://github.com/EricGartner47/QuoraClone-GroupProject/blob/main/images/add%20question.png)

### Search Questions
A user can search questions by keyword in the search bar. The search will generate questions found by keyword. 

### Topics
A user can pull up questions by topic that is located to the right of the questions. A user can click on the list of topics that will generate questions by those topics.
!(https://github.com/EricGartner47/QuoraClone-GroupProject/blob/main/images/topics.png)

### Post an Answer and a Comment
An authorized user may post an answer to a posted question. Only the authorized user can then edit or delete the answer to the posted question. An authorized user may also post a comment to an answer. The user may also delete the posted comment.
!(https://github.com/EricGartner47/QuoraClone-GroupProject/blob/main/images/answers.png)

## Conclusion and Next Steps
We are happy with the functionality, but we would like to add more to the styling.
