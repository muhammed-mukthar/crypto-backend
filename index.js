const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./config/db");
const cors = require("cors");
db();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_VARS.split(", ") }));

// app.use(cors());
// app.use(express.static(__dirname + "/uploads"));

app.use(express.static(`${__dirname}`));
app.get("/", (req, res) => {
  res.send("Home");
});

app.use("/user", require("./routes/userRoutes"));
app.use("/banner", require("./routes/bannerRoutes"));
app.use("/category", require("./routes/categoryRoutes"));
app.use("/query", require("./routes/queryRoutes"));
app.use("/common", require("./routes/appConstantsRoutes"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("APP is running"));
