const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect('mongodb://localhost:27017/tambolaDb', () => console.log("Connected to db"));

const tambolaSchema = new mongoose.Schema({
    _id: String,
    tickets : [],
    ticketIdNo : Number,
    usedNumbers : [],
    allNumbers : []
})

const Tambola = mongoose.model('Tambola',tambolaSchema);

let gameIdNo = 101;

const gameIdGen = () => {
    let id = 'G'+gameIdNo.toString();
    return id;
}

app.get("/api/game/create", (req,res) => {

    let gameId = gameIdGen()

    gameIdNo++;

    let numbers = [];

    for(let i=1;i<=90;i++){
        numbers.push(i);
    }

    const game = new Tambola({
        _id : gameId,
        tickets : [],
        ticketIdNo : 0,
        usedNumbers : [],
        allNumbers : numbers
    });

    game.save().then((game) => res.send(game)).catch((err) => {
        console.log("Data not saved",err);
    });
})

app.get("/api/game/:gameId/ticket/:userName/generate", (req,res) => {

    let gameId = req.params.gameId
    let userName = req.params.userName

    Tambola.findById(gameId).then((game) => {
        let tid = game.ticketIdNo;
        let generatedTicketId = 'T'+gameId+tid.toString();
        return generatedTicketId;
    }).then((generatedTicketId) => {

        let ticket = {
            ticketId : generatedTicketId,
            userName : userName
        }

        Tambola.updateOne({_id : gameId},{$inc: {ticketIdNo : 1}, usedNumbers: [], $push:  { tickets: ticket} }).then((game) => res.send("Ticket generated"))
        .catch((err) => {
            console.log("Data not found",err);
        });

    })
})

app.get("/api/game/:gameId/number/random", (req,res) => {

    let gameId = req.params.gameId

    Tambola.findById(gameId).then((game) => {
        let arr = game.allNumbers;
        let number = arr[Math.floor(Math.random() * arr.length)];
        return number;
    }).then((number) => {

        Tambola.updateOne({_id : gameId}, {$push:  { usedNumbers: number}, $pull: {allNumbers: number} }).then((game) => res.send(`Random number generated : ${number}`));

    }).catch((err) => {
        console.log("Data not found",err);
    })

})

app.get("/api/game/:gameId/numbers", (req,res) => {

    let gameId = req.params.gameId

    Tambola.findById(gameId).then((game) => {
        res.send(game.usedNumbers);
    }).catch((err) => {
        console.log("Data not found",err);
    })

})

app.get("/api/game/:gameId/stats", (req,res) => {

    let gameId = req.params.gameId

    Tambola.findById(gameId).then((game) => {

        let stats = {
            "numbers drawn" : game.usedNumbers,
            "no of tickets" : game.ticketIdNo,
            "users" : game.tickets
        }

        res.send(stats);
    }).catch((err) => {
        console.log("Data not found",err);
    })


})

app.get("/ticket/:ticketId", (req,res) => {

    let ticketId = req.params.ticketId

    let gameId = ticketId.substring(1,5);
    
    Tambola.findById(gameId).then((game) => {

        let tickets = game.tickets;

        const filteredTicket = tickets.filter((ticket) => ticket.ticketId === ticketId);

        res.send(filteredTicket);
    }).catch((err) => {
        console.log("Data not found",err);
    })

})

app.listen(3000);