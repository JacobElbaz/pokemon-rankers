const express = require('express');
const pokemonRoute = require('./routes/pokemonRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db');
require('./jobs');

const app = express();
const PORT = process.env.PORT || 5000;
const proxyDepth = parseInt(process.env.ADAPTABLE_TRUST_PROXY_DEPTH, 10);
if (proxyDepth > 0) {
    // 'trust proxy' is the number of IP addresses to trust in the
    // X-Forwarded-For header, so set to the number of proxies plus one for the
    // client IP address.
    app.set('trust proxy', proxyDepth + 1);
}

app.use(cors());
app.use(bodyParser.json())
app.use('/api/pokemon', pokemonRoute);

app.listen(PORT, (error) => {
    if(!error) {
        console.log("Server is successfully running, listening on port " + PORT);
    }
    else {
        console.log("Error occured", error);
    }
})



