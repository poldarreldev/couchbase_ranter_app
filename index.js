// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://localhost', {
    username: "testUser",
    password: "P@ssw0rd",
});
const bucket = cluster.bucket("ranter", "e0f0c9e0777f62ea7eb71f6f5e4c55f8");
const collection = bucket.defaultCollection();
var rant = {
    "username": "YanivR2",
    "rantText": "JavaScript is the One True Language. Why can't people see that?",
    "id": "8b7a5f8b-f511-4c7e-9279-9304d06e6468",
    "type": "rant"
};
const upsertDocument = async (doc) => {
    try {
        // key will equal: "airline_8091"
        const key = `${doc.type}_${doc.id}`;
        const result = await collection.upsert(key, doc);
        console.log("Upsert Result: ");
        console.log(result);
    } catch (error) {
        console.error(error);
    }
};

const getRantByKey = async (key) => {
    try {
        const result = await collection.get(key);
        console.log("Get Result: ");
        console.log(result);
    } catch (error) {
        console.error(error);
    }
};

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
    getRantByKey("rant_8b7a5f8b-f511-4c7e-9279-9304d06e6468");

    res.status(200).send("Ranter: Hello, I'm from your code");
});

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});