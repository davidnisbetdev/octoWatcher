// const axios = require("axios");

// function updateItems(
//   gasUnitToday,
//   gasUnitTomorrow,
//   elecUnitToday,
//   elecUnitTomorrow
// ) {
//   // Implement the logic to update the items here
//   // e.g., GasUnit0.postUpdate(GasUnitToday);
// }

// async function TrackerGetRates() {
//   const baseUrl = "https://octopus.energy/api/v1/tracker";
//   const tariff = "G-1R-SILVER-2017-1-N";
//   const endpoint = "daily/current/0/1";

//   const today = new Date().toISOString().split("T")[0];
//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);
//   const tomorrowDateString = tomorrow.toISOString().split("T")[0];

//   try {
//     const [gasToday, elecToday, gasTomorrow, elecTomorrow] = await Promise.all([
//       axios.get(`${baseUrl}/${tariff}/${endpoint}`),
//       axios.get(`${baseUrl}/E-1R-SILVER-2017-1-N/${endpoint}`),
//       axios.get(`${baseUrl}/${tariff}/${endpoint}`),
//       axios.get(`${baseUrl}/E-1R-SILVER-2017-1-N/${endpoint}`),
//     ]);

//     const GasUnitToday = parseFloat(
//       gasToday.data.periods.find((period) => period.date === today).unit_rate
//     );
//     const ElecUnitToday = parseFloat(
//       elecToday.data.periods.find((period) => period.date === today).unit_rate
//     );
//     const GasUnitTomorrow = parseFloat(
//       gasTomorrow.data.periods.find(
//         (period) => period.date === tomorrowDateString
//       ).unit_rate
//     );
//     const ElecUnitTomorrow = parseFloat(
//       elecTomorrow.data.periods.find(
//         (period) => period.date === tomorrowDateString
//       ).unit_rate
//     );

//     console.log("Gas unit rate today: " + GasUnitToday);
//     //document.querySelector('#trackerGasToday').innerText = GasUnitToday
//     console.log("Elec unit rate today: " + ElecUnitToday);
//     console.log("Gas unit rate tomorrow: " + GasUnitTomorrow);
//     console.log("Elec unit rate tomorrow: " + ElecUnitTomorrow);

//     // Update the items
//     updateItems(GasUnitToday, GasUnitTomorrow, ElecUnitToday, ElecUnitTomorrow);
//   } catch (error) {
//     console.error("HTTP request error:", error);
//   }
// }

// // Run the rule
// TrackerGetRates();

// function updateItems(
//   gasUnitToday,
//   gasUnitTomorrow,
//   elecUnitToday,
//   elecUnitTomorrow
// ) {
//   // Implement the logic to update the items here
//   // e.g., GasUnit0.postUpdate(GasUnitToday);
// }

// function getTrackerRates() {
//   const baseUrl = "https://octopus.energy/api/v1/tracker";
//   const tariff = "G-1R-SILVER-2017-1-N";
//   const endpoint = "daily/current/0/1";

//   const today = new Date().toISOString().split("T")[0];
//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);
//   const tomorrowDateString = tomorrow.toISOString().split("T")[0];

//   Promise.all([
//     fetch(`${baseUrl}/${tariff}/${endpoint}`).then((response) =>
//       response.json()
//     ),
//     fetch(`${baseUrl}/E-1R-SILVER-2017-1-N/${endpoint}`).then((response) =>
//       response.json()
//     ),
//     fetch(`${baseUrl}/${tariff}/${endpoint}`).then((response) =>
//       response.json()
//     ),
//     fetch(`${baseUrl}/E-1R-SILVER-2017-1-N/${endpoint}`).then((response) =>
//       response.json()
//     ),
//   ])
//     .then(([gasToday, elecToday, gasTomorrow, elecTomorrow]) => {
//       const gasUnitToday = parseFloat(
//         gasToday.periods.find((period) => period.date === today).unit_rate
//       );
//       const elecUnitToday = parseFloat(
//         elecToday.periods.find((period) => period.date === today).unit_rate
//       );
//       const gasUnitTomorrow = parseFloat(
//         gasTomorrow.periods.find((period) => period.date === tomorrowDateString)
//           .unit_rate
//       );
//       const elecUnitTomorrow = parseFloat(
//         elecTomorrow.periods.find(
//           (period) => period.date === tomorrowDateString
//         ).unit_rate
//       );

//       console.log("Gas unit rate today: " + gasUnitToday);
//       console.log("Elec unit rate today: " + elecUnitToday);
//       console.log("Gas unit rate tomorrow: " + gasUnitTomorrow);
//       console.log("Elec unit rate tomorrow: " + elecUnitTomorrow);

//       // Update the items
//       updateItems(
//         gasUnitToday,
//         gasUnitTomorrow,
//         elecUnitToday,
//         elecUnitTomorrow
//       );
//     })
//     .catch((error) => {
//       console.error("HTTP request error:", error);
//     });
// }

const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const port = 2701;

// Set up Handlebars as the template engine
app.engine(
  "html",
  exphbs({
    extname: ".html",
  })
);

// Static Folder
app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "html");
app.set("views", "./views");

app.get("/", async (req, res) => {
  const baseUrl = "https://octopus.energy/api/v1/tracker";
  const tariff = "G-1R-SILVER-2017-1-N";
  const endpoint = "daily/current/0/1";

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDateString = tomorrow.toISOString().split("T")[0];

  try {
    const [gasToday, elecToday] = await Promise.all([
      import("node-fetch").then((module) =>
        module.default(`${baseUrl}/${tariff}/${endpoint}`)
      ),
      import("node-fetch").then((module) =>
        module.default(`${baseUrl}/E-1R-SILVER-2017-1-N/${endpoint}`)
      ),
    ]).then((responses) => Promise.all(responses.map((res) => res.json())));

    const gasUnitToday = parseFloat(
      gasToday.periods.find((period) => period.date === today).unit_rate
    );
    const elecUnitToday = parseFloat(
      elecToday.periods.find((period) => period.date === today).unit_rate
    );

    res.render("index", {
      gasUnitToday,
      elecUnitToday,
    });
  } catch (error) {
    console.error("HTTP request error:", error);
    res.status(500).send("An error occurred while fetching the rates.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});