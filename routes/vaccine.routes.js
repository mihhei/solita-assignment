const { Router } = require("express");
const router = Router();
const fs = require("fs");
const path = require("path");
const mySql = require("mysql");

const dbConnect = mySql.createConnection({
  host: "database-mysql-solita.csd1sfnytfxc.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "JnpyC7G84FXtfaJ",
  database: "database_mysql_solita1",
});

router.get("/:name?", (req, res) => {
  const name = req.params.name;
  const sorter = "responsiblePerson";
  const sql =
    "SELECT orderNumber, responsiblePerson, healthCareDistrict, injections, arrived FROM vaccine WHERE vaccine = ? ORDER BY " +
    dbConnect.escapeId(sorter);
  dbConnect.query(sql, [name], (err, response, fields) => {
    if (err) throw err;

    result = JSON.parse(JSON.stringify(response));
    console.log("search done", result.length);
    console.log(response[0]);
    res.json(result);
  });
});

router.post("/orders/fromtodate", function (req, res) {
  const dateTo = new Date(req.body.state.dateTo);
  const dateFrom = new Date(req.body.state.dateFrom);
  if (dateTo < dateFrom) {
    res.json([
      {
        arrived: "select",
      },
    ]);
  } else {
    const selectedVaccine = [];
    if (req.body.state.selectAntiqua) {
      selectedVaccine.push("Antiqua");
    }
    if (req.body.state.selectSolar) {
      selectedVaccine.push("SolarBuddhica");
    }
    if (req.body.state.selectZerpfy) {
      selectedVaccine.push("Zerpfy");
    }
    if (!selectedVaccine.length) {
      res.json([
        {
          vaccine: "select",
        },
      ]);
    } else {
      const sorter = "arrived";
      const sql =
        "SELECT orderNumber, responsiblePerson, healthCareDistrict, vaccine, injections, arrived FROM vaccine WHERE arrived < ? AND arrived > ? AND vaccine IN (?) ORDER BY " +
        dbConnect.escapeId(sorter);
      dbConnect.query(
        sql,
        [dateTo, dateFrom, selectedVaccine],
        (err, response, fields) => {
          if (err) throw err;

          result = JSON.parse(JSON.stringify(response));
          console.log("search done", result.length);
          res.json(
            !result.length
              ? [
                  {
                    id: "",
                    vaccine: "",
                    arrived: "",
                    injections: 0,
                  },
                ]
              : result
          );
        }
      );
    }
  }
});

router.post("/orders/expired", function (req, res) {
  const dateTo = new Date(req.body.state.dateTo - 2592000000);
  const dateFrom = new Date(req.body.state.dateFrom);
  if (dateTo < dateFrom) {
    res.json([
      {
        arrived: "select",
      },
    ]);
  } else {
    const selectedVaccine = [];
    if (req.body.state.selectAntiqua) {
      selectedVaccine.push("Antiqua");
    }
    if (req.body.state.selectSolar) {
      selectedVaccine.push("SolarBuddhica");
    }
    if (req.body.state.selectZerpfy) {
      selectedVaccine.push("Zerpfy");
    }
    if (!selectedVaccine.length) {
      res.json([
        {
          vaccine: "select",
        },
      ]);
    } else {
      const sorter = "arrived";
      const sql =
        "SELECT orderNumber, responsiblePerson, healthCareDistrict, vaccine, injections, arrived FROM vaccine WHERE arrived < ? AND arrived > ? AND vaccine IN (?) ORDER BY " +
        dbConnect.escapeId(sorter);
      dbConnect.query(
        sql,
        [dateTo, dateFrom, selectedVaccine],
        (err, response, fields) => {
          if (err) throw err;

          result = JSON.parse(JSON.stringify(response));
          console.log("search done", result.length);
          res.json(
            !result.length
              ? [
                  {
                    id: "",
                    vaccine: "",
                    arrived: "",
                    injections: 0,
                  },
                ]
              : result
          );
        }
      );
    }
  }
});

router.post("/orders/expiredandused", function (req, res) {
  const dateTo = new Date(req.body.state.dateTo - 2592000000);
  console.log("dateTo", dateTo);
  const dateFrom = new Date(req.body.state.dateFrom);
  if (dateTo < dateFrom) {
    res.json([
      {
        arrived: "select",
      },
    ]);
  } else {
    const selectedVaccine = [];
    if (req.body.state.selectAntiqua) {
      selectedVaccine.push("Antiqua");
    }
    if (req.body.state.selectSolar) {
      selectedVaccine.push("SolarBuddhica");
    }
    if (req.body.state.selectZerpfy) {
      selectedVaccine.push("Zerpfy");
    }
    if (!selectedVaccine.length) {
      res.json([
        {
          vaccine: "select",
        },
      ]);
    } else {
      const sorter = "arrived";
      const sql =
        "SELECT * FROM vaccine WHERE arrived < ? AND arrived > ? AND vaccine IN (?) ORDER BY " +
        dbConnect.escapeId(sorter);
      dbConnect.query(
        sql,
        [dateTo, dateFrom, selectedVaccine],
        (err, response, fields) => {
          if (err) throw err;
          let allVaccine = 0;
          response.forEach((item) => {
            allVaccine += item.injections;
          });
          console.log(
            "all vaccine",
            allVaccine,
            "all bottles",
            response.length
          );
          dbConnect.query(
            "SELECT * FROM vaccination INNER JOIN vaccine ON vaccination.sourceBottle = vaccine.id AND vaccine.arrived < ? AND vaccine.arrived > ? AND vaccine.vaccine IN (?)",
            [dateTo, dateFrom, selectedVaccine],
            (err, response, fields) => {
              if (err) throw err;

              const usedVaccine = response.length;
              const expiredVaccine = allVaccine - usedVaccine;
              res.json({ usedVaccine, expiredVaccine });
            }
          );
        }
      );
    }
  }
});

router.post("/orders/expiretendays", function (req, res) {
  const dateTo = new Date(req.body.state.dateTo - 1728000000);
  console.log("dateTo", dateTo);
  const date30daysBefore = new Date(req.body.state.dateTo - 2592000000);
  const dateFromDatePicker = new Date(req.body.state.dateFrom);
  const dateFrom =
    dateFromDatePicker < date30daysBefore
      ? date30daysBefore
      : dateFromDatePicker;
  if (dateTo < dateFromDatePicker) {
    res.json({ message: "Date FROM must be at least 20 days before date TO" });
  } else {
    const selectedVaccine = [];
    if (req.body.state.selectAntiqua) {
      selectedVaccine.push("Antiqua");
    }
    if (req.body.state.selectSolar) {
      selectedVaccine.push("SolarBuddhica");
    }
    if (req.body.state.selectZerpfy) {
      selectedVaccine.push("Zerpfy");
    }
    if (!selectedVaccine.length) {
      res.json({
        message: "Select any vaccine!",
      });
    } else {
      const sorter = "arrived";
      const sql =
        "SELECT * FROM vaccine WHERE arrived < ? AND arrived > ? AND vaccine IN (?) ORDER BY " +
        dbConnect.escapeId(sorter);
      dbConnect.query(
        sql,
        [dateTo, dateFrom, selectedVaccine],
        (err, response, fields) => {
          if (err) throw err;
          let allVaccine = 0;
          response.forEach((item) => {
            allVaccine += item.injections;
          });
          console.log(
            "all vaccine",
            allVaccine,
            "all bottles",
            response.length
          );
          dbConnect.query(
            "SELECT * FROM vaccination INNER JOIN vaccine ON vaccination.sourceBottle = vaccine.id AND vaccination.vaccinationDate < ? AND vaccine.arrived < ? AND vaccine.arrived > ? AND vaccine.vaccine IN (?)",
            [
              new Date(req.body.state.dateTo),
              dateTo,
              dateFrom,
              selectedVaccine,
            ],
            (err, response, fields) => {
              if (err) throw err;

              const usedVaccine = response.length;
              const expiredVaccine = allVaccine - usedVaccine;
              res.json({ message: "", usedVaccine, expiredVaccine });
            }
          );
        }
      );
    }
  }
});

module.exports = router;
