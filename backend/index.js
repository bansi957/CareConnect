const express = require("express");
const db = require("./database/mongodb");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const cors = require("cors");
const user_router = require("./routes/user_routes");
const doctor_router = require("./routes/doctor_routes");
const hospital_router = require("./routes/hospital_routes");
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", user_router)
app.use("/api/auth", doctor_router)
app.use("/api/hospital", hospital_router);

app.listen(port, () => {
    db()
    console.log(`serverv started on port ${port}`)
})  