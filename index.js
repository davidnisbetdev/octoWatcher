const axios = require("axios");

function updateItems(
  GasUnitToday,
  GasUnitTomorrow,
  ElecUnitToday,
  ElecUnitTomorrow
) {
  // Implement the logic to update the items here
  // e.g., GasUnit0.postUpdate(GasUnitToday);
}

async function TrackerGetRates() {
  const baseUrl = "https://octopus.energy/api/v1/tracker";
  const tariff = "G-1R-SILVER-2017-1-N";
  const endpoint = "daily/current/0/1";

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDateString = tomorrow.toISOString().split("T")[0];

  try {
    const [gasToday, elecToday, gasTomorrow, elecTomorrow] = await Promise.all([
      axios.get(`${baseUrl}/${tariff}/${endpoint}`),
      axios.get(`${baseUrl}/E-1R-SILVER-2017-1-N/${endpoint}`),
      axios.get(`${baseUrl}/${tariff}/${endpoint}`),
      axios.get(`${baseUrl}/E-1R-SILVER-2017-1-N/${endpoint}`),
    ]);

    const GasUnitToday = parseFloat(
      gasToday.data.periods.find((period) => period.date === today).unit_rate
    );
    const ElecUnitToday = parseFloat(
      elecToday.data.periods.find((period) => period.date === today).unit_rate
    );
    const GasUnitTomorrow = parseFloat(
      gasTomorrow.data.periods.find(
        (period) => period.date === tomorrowDateString
      ).unit_rate
    );
    const ElecUnitTomorrow = parseFloat(
      elecTomorrow.data.periods.find(
        (period) => period.date === tomorrowDateString
      ).unit_rate
    );

    console.log("Gas unit rate today: " + GasUnitToday);
    document.querySelector('#trackerGasToday').innerText = GasUnitToday
    console.log("Elec unit rate today: " + ElecUnitToday);
    console.log("Gas unit rate tomorrow: " + GasUnitTomorrow);
    console.log("Elec unit rate tomorrow: " + ElecUnitTomorrow);

    // Update the items
    updateItems(GasUnitToday, GasUnitTomorrow, ElecUnitToday, ElecUnitTomorrow);
  } catch (error) {
    console.error("HTTP request error:", error);
  }
}

// Run the rule
TrackerGetRates();


