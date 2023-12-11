const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes');
const passport = require('./configs/passport.config')
const session = require("express-session");

const app = express();
app.use(express.json())
// Setup session and passport
app.use(session({
    secret: process.env.PASSPORT_KEY,
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(3000, () => {
            console.log(`Server is running on port ` + port);
        })
    }).catch((error) => {
    console.log(error)
});
