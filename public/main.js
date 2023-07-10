// document.addEventListener("DOMContentLoaded", function() {
//   async function getTrackerRates() {
//   const baseUrl = "https://octopus.energy/api/v1/tracker";
//   const tariff = "G-1R-SILVER-2017-1-N";
//   const endpoint = "daily/current/0/1";

//   const today = new Date().toISOString().split("T")[0];
//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);
//   const tomorrowDateString = tomorrow.toISOString().split("T")[0];

//   try {
//     const [gasToday, elecToday, gasTomorrow, elecTomorrow] = await Promise.all([
//       fetch(`${baseUrl}/${tariff}/${endpoint}`).then((response) =>
//         response.json()
//       ),
//       fetch(`${baseUrl}/E-1R-SILVER-2017-1-N/${endpoint}`).then((response) =>
//         response.json()
//       ),
//       fetch(`${baseUrl}/${tariff}/${endpoint}`).then((response) =>
//         response.json()
//       ),
//       fetch(`${baseUrl}/E-1R-SILVER-2017-1-N/${endpoint}`).then((response) =>
//         response.json()
//       ),
//     ]);

//     const gasUnitToday = parseFloat(
//       gasToday.periods.find((period) => period.date === today).unit_rate
//     );
//     const elecUnitToday = parseFloat(
//       elecToday.periods.find((period) => period.date === today).unit_rate
//     );
//     const gasUnitTomorrow = parseFloat(
//       gasTomorrow.periods.find((period) => period.date === tomorrowDateString)
//         .unit_rate
//     );
//     const elecUnitTomorrow = parseFloat(
//       elecTomorrow.periods.find((period) => period.date === tomorrowDateString)
//         .unit_rate
//     );

//     console.log("Gas unit rate today: " + gasUnitToday);
//     console.log("Elec unit rate today: " + elecUnitToday);
//     console.log("Gas unit rate tomorrow: " + gasUnitTomorrow);
//     console.log("Elec unit rate tomorrow: " + elecUnitTomorrow);
//     document.querySelector("#trackerGasToday").innerText = gasUnitToday;
//     document.querySelector("#trackerElecToday").innerText = elecUnitToday;
//     //document.querySelector("#trackerGasTomorrow").textContent =
//       //"Gas unit rate tomorrow: " + gasUnitTomorrow;
//     //document.querySelector("#trackerElecTomorrow").textContent =
//       //"Elec unit rate tomorrow: " + elecUnitTomorrow;
//   } catch (error) {
//     console.error("HTTP request error:", error);
//   }
// }

// getTrackerRates();
// });

//document.querySelector("button").addEventListener("click", getFetch);

function getTracker() {

  const baseUrl = "https://octopus.energy/api/v1/tracker";
  const tariff = "G-1R-SILVER-2017-1-N";
  const endpoint = "daily/current/0/1";
  const url = baseUrl + tariff + endpoint;

  fetch(url)
    // .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data)

    //   if (data.results[0].type === "" || data.results[0].type === null) {
    //     document.querySelector("#type").remove();
    //   } else {
    //     document.querySelector("#ty").innerText = data.results[0].type;
    //   }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
  }
