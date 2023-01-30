//Initialize variables, specifically the containers, button, and any titles to manipulate.

let searchButton = document.getElementById("search");
let cityInput = document.getElementById("city-input");
let populationContainer = document.getElementById("populationContainer");
let headerTwo = document.getElementById("headerTwo");
let startupSalaryContainer = document.getElementById("startupSalaryContainer");
let crimeRateContainer = document.getElementById("crimeRateContainer");

//Ensure that the containers do not display while empty on page load.

populationContainer.style.display = "none";
startupSalaryContainer.style.display = "none";
crimeRateContainer.style.display = "none";


//Create the search button listener with asynchronous functionality to allow all of this to run code in the background while making 
//error requests if needed.

searchButton.addEventListener("click", async () => {
    let citySlug = cityInput.value.toLowerCase();
    let finalURL = `https://api.teleport.org/api/urban_areas/slug:${citySlug}/details`;

//Insures the ability to run multiple searches without stacking populated data.

    populationContainer.innerHTML = "";
    startupSalaryContainer.innerHTML = "";
    crimeRateContainer.innerHTML = "";
//This allows for all of the functions to run while separately and return independent results, even if one portion returns an error code.
    try {
      const response = await fetch(finalURL);
      if (response.status === 404) {
        populationContainer.innerHTML = "Urban Area does not exist";
        return;
      }
  
      const data = await response.json();
      let populationData = data.categories.find(category => category.id === "CITY-SIZE")
        .data.find(data => data.id === "POPULATION-SIZE").float_value * 1000000;
  
      let startupSalaryData = data.categories.find(category => category.id === "JOB-MARKET")
        .data.find(data => data.id === "STARTUP-SALARIES-DETAIL").currency_dollar_value;
  
      let crimeData = data.categories.find(category => category.id === "SAFETY")
      .data.find(data => data.id === "CRIME-RATE-TELESCORE").float_value;
      let crimeRate;
      if (crimeData > 0.85) {
        crimeRate = "Low crime rate.";
      } else if (crimeData <= 0.85 && crimeData >= 0.6) {
        crimeRate = "Medium crime rate.";
      } else if (crimeData < 0.6 && crimeData >= 0.38) {
        crimeRate = "High crime rate.";
      } else if (crimeData < 0.38) {
        crimeRate = "Very high crime rate.";
      }
//Tells us what to populate into the containers based on the data.

      populationContainer.textContent = populationData;
      populationContainer.style.display = "block";
  
      startupSalaryContainer.textContent = startupSalaryData;
      startupSalaryContainer.style.display = "block";
  
      crimeRateContainer.textContent = crimeRate;
      crimeRateContainer.style.display = "block";
    } catch (error)  {
      console.error('Error:', error)
    }
});