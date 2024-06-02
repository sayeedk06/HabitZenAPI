# HabitZenAPI
This project complements the [HabitZen app](https://github.com/sayeedk06/HabitZen)

**Tech Stack**
- Express
- JWT


**Features**
- Registration
- authentication using Json Web token(JWT)
- POST, PUT, UPDATE, GET routes for habits 

**Structure**

- bin
- docs
- middleware
- public
- routes

**API endpoints**
- 
- GET -    http://localhost:8000/api/habits
- GET -    http://localhost:8000/api/habits/:userId
- GET -    http://localhost:8000/api/habits?habitId=
- PUT -    http://localhost:8000/api/habits/update/:habitId
- DELETE - http://localhost:8000/api/habits/delete/:habitId
- POST -   http://localhost:8000/api/habits
- POST -   http://localhost:8000/api/habits/users/login
- POST -   http://localhost:8000/api/habits/users/register
- GET -    http://localhost:8000/api/habits/users/
- GET -    http://localhost:8000/api/habits/users/:email

Swagger documentation runs in http://localhost:8000/docs/

### Running the API
>npm run dev

This will start the nodemon server in http://localhost:8000

