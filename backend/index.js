const express = require("express");
const db = require("./database/mongodb");
const app = express();
const port = 3000;


app.listen(port, () => {
    db()
    console.log(`serverv started on port ${port}`)
})  