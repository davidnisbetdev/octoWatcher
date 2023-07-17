const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const port = 2701;

// Set up Handlebars as the template engine
const hbs = exphbs.create({
  defaultLayout: false,
  extname: ".hbs",
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

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