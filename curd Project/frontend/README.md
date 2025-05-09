User Management App
This is a User Management application built with the following technologies:

Backend: Node.js with Express and MongoDB (Mongoose)
Frontend: React
Database: MongoDB


Features

CRUD operations: Create, Read, Update, and Delete users.
Search functionality: Search users by name or email.
Pagination: Display users in pages (10 users per page).


Backend SetUp:
1.Install Dependencies:
cd backend
npm install

2.Set up MongoDB:
mongod --dbpath=/path/to/db

3.Run server
node server.js

Frontend Setup
1.Install Dependencies:
cd frontend
npm install

2.Run the React App:
npm start


API Routes
1. POST /api/users
Description: Create a new user.

Request Body:
{
    "_id": "681de2c8499c7b9c6b0060e6",
    "name": "Bala",
    "email": "bala@gmail.com",
    "phone": "8976543789",
    "__v": 0
  },

2. GET /api/users?search=<query>

Description: Get all users with search functionality (search by name or email).
Query Parameters: search (optional)


3. PUT /api/users/:id => 681de310499c7b9c6b0060ef

Description: Update an existing user.
Request Body:

  {
    "_id": "681de310499c7b9c6b0060ef",
    "name": "Indhu",
    "email": "indhu@gmail.com",
    "phone": "8767564534",
    "__v": 0
  },

4. DELETE /api/users/:id
Description: Delete a user by ID.

