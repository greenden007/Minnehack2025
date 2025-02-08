const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://rcherukuri10:0aLj4vyyOjmrBP2U@voluntier.i8pxd.mongodb.net/?retryWrites=true&w=majority&appName=VolunTier");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB");
})