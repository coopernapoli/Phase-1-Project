//Initialize variables, specifically the containers, button, and any titles to manipulate.

let searchButton = document.getElementById("search");
let cityInput = document.getElementById("city-input");
let populationContainer = document.getElementById("populationContainer");
let headerTwo = document.getElementById("headerTwo");
let startupSalaryContainer = document.getElementById("startupSalaryContainer");
let crimeRateContainer = document.getElementById("crimeRateContainer");
let climateDataContainer = document.getElementById("climateDataContainer");

//Ensure that the containers do not display while empty on page load.

populationContainer.style.display = "none";
startupSalaryContainer.style.display = "none";
crimeRateContainer.style.display = "none";
climateDataContainer.style.display = "none";


//Create the search button listener with asynchronous functionality to allow all of this to run code in the background while making 
//error requests if needed.

searchButton.addEventListener("click", async () => {
    let citySlug = cityInput.value.toLowerCase().replace(/ /g, "-");;
    let finalURL = `https://api.teleport.org/api/urban_areas/slug:${citySlug}/details`;

    console.log(citySlug);

    console.log(finalURL);

//Insures the ability to run multiple searches without stacking populated data.

    populationContainer.innerHTML = "";
    startupSalaryContainer.innerHTML = "";
    crimeRateContainer.innerHTML = "";
    climateDataContainer.innerHTML = "";
//This allows for all of the functions to run while separately and return independent results, even if one portion returns an error code.
    try {
      const response = await fetch(finalURL);

      if (response.status === 404) {

        populationContainer.textContent = "Urban Area does not exist";
        populationContainer.style.display = "block";

        startupSalaryContainer.textContent = "Urban Area does not exist";
        startupSalaryContainer.style.display = "block";

        crimeRateContainer.textContent = "Urban Area does not exist";
        crimeRateContainer.style.display = "block";

        climateDataContainer.textContent = "Urban Area does not exist";
        climateDataContainer.style.display = "block";
        return;
      }
     
      const data = await response.json();
console.log(data)
//Finds population data and multiplies it by 1,000,000.

      let populationData = data.categories.find(category => category.id === "CITY-SIZE")
        .data.find(data => data.id === "POPULATION-SIZE").float_value * 1000000;

        console.log(populationData);
  //Finds average salary data.

      let startupSalaryData = data.categories.find(category => category.id === "JOB-MARKET")
        .data.find(data => data.id === "STARTUP-SALARIES-DETAIL").currency_dollar_value;
  
console.log(startupSalaryData);
//Finds crime rate data and returns the data conditionally based on arbitrary metrics I created.

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

        console.log(crimeRate)
        console.log(crimeData)
      }

    let climateData = data.categories.filter(category => category.id === 'CLIMATE')
    .map(climateCategory=> climateCategory.data)[0].filter(dataPoint =>  ['WEATHER-AV-NUMBER-CLEAR-DAYS',
    'WEATHER-AV-NUMBER-RAINY-DAYS','WEATHER-AVERAGE-HIGH',
    'WEATHER-AVERAGE-LOW', 'WEATHER-TYPE'].includes(dataPoint.id))

    let climateDataArray=[];
    climateData.forEach(climateObject => {
        let value = '';
        if (climateObject.float_value) {
            value = climateObject.float_value;
        } else if (climateObject.percent_value) {
            value = climateObject.percent_value;
        } else if (climateObject.string_value) {
            value = climateObject.string_value;
        }
    climateDataArray.push(`Climate Data: ${climateObject.label}: ${value}`); 
    });
    
    climateDataContainer.innerHTML = climateDataArray.join("<br>");
    climateDataContainer.style.display = "block";
    
//Tells us what to populate into the containers based on the data.

      populationContainer.textContent = `Population Size: ${populationData.toLocaleString()}`;
      populationContainer.style.display = "block";
  
      startupSalaryContainer.textContent = `Average Salary in Native Currency: ${startupSalaryData.toLocaleString()}`;
      startupSalaryContainer.style.display = "block";
  
      crimeRateContainer.textContent = `Crime: ${crimeRate}`;
      crimeRateContainer.style.display = "block";

      
      climateDataContainer.style.display = "block";
    } catch (error)  {
      console.error('Error:', error)
    }
});