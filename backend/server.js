const express = require('express');
const pokemonRoute = require('./routes/pokemonRoutes');
const newsRoute = require('./routes/newsRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db');
require('./jobs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json())
app.use('/api/pokemon', pokemonRoute);
app.use('/api/news', newsRoute);

app.listen(PORT, (error) => {
    if(!error) {
        console.log("Server is successfully running, listening on port " + PORT);
    }
    else {
        console.log("Error occured", error);
    }
})



