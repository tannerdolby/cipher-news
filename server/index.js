const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = process.env.PORT || 8000;
const nyTyimesPopularUrl = "https://api.nytimes.com/svc/topstories/v2";
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const url = process.env.URL;

// Adds JSON parser as middleware to parse the bodies of incoming requests
var jsonParser = bodyParser.json();

// Specify mount path for static files (ie React build output)
app.use("/", express.static("./client/build"));

// Netlify lambda routes
// /.netlify/functions/index/:routes

const spare = require("../spare");
app.get("/news/:section", jsonParser, (req, res) => {
    const { section } = req.params;
    console.log(`Request received for '${req.url}'`);
    fetch(`${nyTyimesPopularUrl}/${section}.json?api-key=${process.env.API_KEY || spare.API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
            res.status(200).json(data);
        })
        .catch(err => res.status(404).json({ error: err }));
});

app.get("/.netlify/functions/index", (req, res) => {
    res.json({ statusCode: 200, body: "Welcome! =)"})
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

exports.handler = serverless(app);