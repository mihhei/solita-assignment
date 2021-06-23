const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const readline = require("readline");
const cors = require("cors");
const mySql = require("mysql");
const bodyParser = require("body-parser");

const dbConnect = mySql.createConnection({
  host: "database-mysql-solita.csd1sfnytfxc.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "JnpyC7G84FXtfaJ",
  database: "database_mysql_solita1",
});

app.use(express.json({ extends: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/vaccine", require("./routes/vaccine.routes.js"));
app.use("/api/test", require("./routes/test.routes.js"));



/*app.use("/api/user", require("./routes/user.routes.js"));
 */

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

function start() {
  try {
    dbConnect.connect((err) => {
      if (err) throw err;
      console.log(
        "Connection to db is successful, connected as id " + dbConnect.threadId
      );
    });
    app.listen(PORT, () => console.log(`App started on port ${PORT}...`));
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
