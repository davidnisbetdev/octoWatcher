// document.querySelector("button").addEventListener("click", getFetch);

// function getFetch() {
//   const choice = document.querySelector("input").value.toLowerCase();
//   // console.log(choice)
//   const url = `process.env.API_BASE_URL/${choice}`;

//   fetch(url)
//     .then((res) => res.json()) // parse response as JSON
//     .then((data) => {
//       document.querySelector("#outputs").style.visibility = "visible";
//       // console.log(data)
//       document.querySelector("#charName").innerText = data.results[0].name;
//       document.querySelector("#charImg").src = data.results[0].image;
//       document.querySelector("#stat").innerText = data.results[0].status;
//       document.querySelector("#species").innerText = data.results[0].species;
//       document.querySelector("#gender").innerText = data.results[0].gender;
//       document.querySelector("#orig").innerText = data.results[0].origin.name;
//       document.querySelector("#loc").innerText = data.results[0].location.name;

//       if (data.results[0].type === "" || data.results[0].type === null) {
//         document.querySelector("#type").remove();
//       } else {
//         document.querySelector("#ty").innerText = data.results[0].type;
//       }
//     })
//     .catch((err) => {
//       console.log(`error ${err}`);
//     });
// }

const axios = require("axios");

async function sendHttpGetRequest(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("HTTP request error:", error);
    return null;
  }
}

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
  // Get today's rates
  var today = new Date();
  var dateString = today.toISOString().split("T")[0];

  // Get Gas Rate Today
  var TrackerJSONgas = await sendHttpGetRequest(
    "https://octopus.energy/api/v1/tracker/G-1R-SILVER-2017-1-B/daily/current/0/1/"
  );
  var GasUnitToday = parseFloat(
    TrackerJSONgas.periods.find(function (period) {
      return period.date === dateString;
    }).unit_rate
  );
  console.log("Gas unit rate today: " + GasUnitToday);

  // Get Electricity Rate Today
  var TrackerJSONelec = await sendHttpGetRequest(
    "https://octopus.energy/api/v1/tracker/E-1R-SILVER-2017-1-B/daily/current/0/1/"
  );
  var ElecUnitToday = parseFloat(
    TrackerJSONelec.periods.find(function (period) {
      return period.date === dateString;
    }).unit_rate
  );
  console.log("Elec unit rate today: " + ElecUnitToday);

  // Get tomorrow's rates
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  var tomorrowDateString = tomorrow.toISOString().split("T")[0];

  // Get Gas Rate Tomorrow
  var GasUnitTomorrow = parseFloat(
    TrackerJSONgas.periods.find(function (period) {
      return period.date === tomorrowDateString;
    }).unit_rate
  );
  console.log("Gas unit rate tomorrow: " + GasUnitTomorrow);

  // Get Electricity Rate Tomorrow
  var ElecUnitTomorrow = parseFloat(
    TrackerJSONelec.periods.find(function (period) {
      return period.date === tomorrowDateString;
    }).unit_rate
  );
  console.log("Elec unit rate tomorrow: " + ElecUnitTomorrow);

  // Update the items
  updateItems(GasUnitToday, GasUnitTomorrow, ElecUnitToday, ElecUnitTomorrow);
}

// Run the rule
TrackerGetRates();