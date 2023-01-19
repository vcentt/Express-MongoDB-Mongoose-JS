const express = require("express");
const app = express();
port = process.env.PORT || 9000;
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./routers/allRoutes")

app.use(express.json())
app.use('/players', router)


// Connection with mongoose:
mongoose
    .connect(process.env.MONGOURI)
    .then(() => console.log("Connection with MONGODB is succesfully"))
    .catch((error) => console.error(error));

app.listen(port, () => console.log(`Port: ${port} is walking on foot`));