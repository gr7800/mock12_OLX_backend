require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/db");

const PORT = process.env.PORT;
const post = require("./routes/post.route");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", post);

app.listen(PORT, async () => {
    try {
        await connect;
        console.log(`Listening at http://localhost:${PORT}`)
    } catch (error) {
        console.log(error);
    }
})