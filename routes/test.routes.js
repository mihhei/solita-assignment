const { Router } = require("express");
const router = Router();
const fs = require("fs");
const path = require("path");
const mySql = require("mysql");
const ms = require("microseconds");

const dbConnect = mySql.createConnection({
  host: "database-mysql-solita.csd1sfnytfxc.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "JnpyC7G84FXtfaJ",
  database: "database_mysql_solita1",
});

router.get("/", async (req, res) => {
  const resultArray = [];
  const dataSource = ["Antiqua", "SolarBuddhica", "Zerpfy"];
  for (source of dataSource) {
    const vaccineArray = fs
      .readFileSync(
        path.join(__dirname, "..", "resources", `${source}.source`),
        "utf8"
      )
      .split("\n");
    vaccineArray.pop();

    vaccineArray.forEach((item) => {
      resultArray.push(JSON.parse(item));
    });
  }
  dbConnect.query(
    "INSERT into vaccine (id, orderNumber, responsiblePerson, healthCareDistrict, vaccine, injections, arrived) VALUES ?",
    [
      resultArray.map((item) => [
        item.id,
        item.orderNumber,
        item.responsiblePerson,
        item.healthCareDistrict,
        item.vaccine,
        item.injections,
        item.arrived,
      ]),
    ],
    (err, response, fields) => {
      if (err) throw err;
      console.log(response);
    }
  );

  const vaccinations = fs
    .readFileSync(
      path.join(__dirname, "..", "resources", "vaccinations.source"),
      "utf8"
    )
    .split("\n");
  vaccinations.pop();
  const modifiedArray = vaccinations.map((item) => {
    return JSON.parse(item.replace("vaccination-id", "vaccinationId"));
  });
  dbConnect.query(
    "INSERT into vaccination (vaccinationId, sourceBottle, gender, vaccinationDate) VALUES ?",
    [
      modifiedArray.map((item) => [
        item.vaccinationId,
        item.sourceBottle,
        item.gender,
        item.vaccinationDate,
      ]),
    ],
    (err, response, fields) => {
      if (err) throw err;
      console.log(response);
      res.json({ message: "Data added to DB" });
    }
  );
});

module.exports = router;
