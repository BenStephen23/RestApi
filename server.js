const express  = require('express');
const mongoose = require('mongoose');
const  dotenv  = require('dotenv');
const { log } = require('console');
dotenv.config()

const PORT = process.env.PORT || 5000;

// connect to mongoDB

mongoose.connect(process.env.URI).then(() => log('connected to mongoDB'))
.catch((err) => console.log(err));