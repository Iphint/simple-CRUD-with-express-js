const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./server/database/connection");

dotenv.config({ path: "config.env" });
const port = process.env.port || 5000;

// mongo DB connection
connectDB();

// log request
app.use(morgan("tiny"));

// req body parser
app.use(bodyParser.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"))
// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// load routers
app.use("/", require("./server/routes/route"));

// server
app.listen(port, (req, res) => {
  console.log(`serves is okai on http//localhost:${port}`);
});
