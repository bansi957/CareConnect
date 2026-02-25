const express = require("express");
const db = require("./database/mongodb");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.listen(port, () => {
    db()
    console.log(`serverv started on port ${port}`)
})  