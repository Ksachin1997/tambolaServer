# tambolaServer

Total 6 endpoints

# http://localhost:3000/api/game/create

This creates a new game with a new game id.

# http://localhost:3000/api/game/:gameId/ticket/:userName/generate

This generates a new ticket for a particular game for a new player.

# http://localhost:3000/api/game/:gameId/number/random

This throws unique random number everytime for a particular game.

# http://localhost:3000/api/game/:gameId/numbers

This shows what all numbers are drawn till now for a particular game.

# http://localhost:3000/api/game/:gameId/stats

This shows stats for a particular game like number of tickets, users, numbers drawn till now.

# http://localhost:3000/ticket/:ticketId

This shows the username for the given ticket id.

# Tech used: Mongodb, Node.js
# Third party Libraries: Express, Mongoose, Nodemon

# Steps to run application

clone this repository
start mongodb server localy
Open the downloaded project with vs code
Type command 'npm init'
Type one more command 'npm i express nodemon mongoose'
Type 'npm start' to start the server
Now test endpoints in postman
