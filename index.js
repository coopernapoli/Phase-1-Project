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

//Keypress function for the search function.

cityInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter')  {
        searchButton.click(); //Accesses the click listener to run the same code as when pressing search.
    }
});
    
function popupCreator(text) {
    const popup = document.createElement("div");
    popup.classList.add("popup-card");

    popup.innerHTML = text;

    return popup;
}
//Mouseover functions for each container.

    // Styling for each container.

populationContainer.addEventListener("mouseover", function(){

    const popup = popupCreator("Population data based off urban area data, not city data.")

        populationContainer.appendChild(popup);
    });
    //Mouseout function for the above mouseover.
    populationContainer.addEventListener("mouseout", function(){
        const populationPopUp = populationContainer.querySelector("div");
        populationContainer.removeChild(populationPopUp);
        });
  
startupSalaryContainer.addEventListener("mouseover", function() {
    // Create a new div to hold the additional data for the popup.
    const popup = popupCreator("Ex: Los Angeles = USD; London = GBP");

        startupSalaryContainer.appendChild(popup);
  });
  
    startupSalaryContainer.addEventListener("mouseout", function(){
        const salaryPopUp = startupSalaryContainer.querySelector("div");
        startupSalaryContainer.removeChild(salaryPopUp);
        });

  crimeRateContainer.addEventListener("mouseover", function() {
     // Create a new div to hold the additional data for the popup.
        const popup = popupCreator("Data created based off of arbitrary values for sake of practicing certain style of coding.")
     crimeRateContainer.appendChild(popup);
  });
  
    crimeRateContainer.addEventListener("mouseout", function(){
        const crimeRatePopUp = crimeRateContainer.querySelector("div");
        crimeRateContainer.removeChild(crimeRatePopUp);
        });

  climateDataContainer.addEventListener("mouseover", function() {
    // Create a new div to hold the additional data for the popup.
    const popup = popupCreator("Depending on the urban area, some data may not be available.  If fully up to date, it will have rainy and clear day data, temperature highs and lows, and weather type. If not available, a google search should fill in some of the missing data with relative ease.")
  
    climateDataContainer.appendChild(popup);
  });

  climateDataContainer.addEventListener("mouseout", function(){
    const climatePopUp = climateDataContainer.querySelector("div");
    climateDataContainer.removeChild(climatePopUp);
    });


//Create the search button listener with asynchronous functionality to allow all of this to run code in the background while making 
//error requests if needed.

searchButton.addEventListener("click", async () => { 
    let citySlug = cityInput.value.toLowerCase().replace(/ /g, "-");// Creates the necessary conditions to align with slug values.
    let finalURL = `https://api.teleport.org/api/urban_areas/slug:${citySlug}/details`; // Creates area-specific end-point.

    console.log(citySlug);

    console.log(finalURL);

//Insures the ability to run multiple searches without stacking populated data.

    populationContainer.innerHTML = "";
    startupSalaryContainer.innerHTML = "";
    crimeRateContainer.innerHTML = "";
    climateDataContainer.innerHTML = "";
//This allows for all of the functions to run while separately and return independent results, even if one portion returns an error code.
try {
      const response = await fetch(finalURL); //pauses other functions from running until a successful citySlug is called.

      if (response.status === 404) {

        populationContainer.textContent = "Urban Area does not exist";
        populationContainer.style.display = "block";

        startupSalaryContainer.textContent = "Urban Area does not exist";
        startupSalaryContainer.style.display = "block";

        crimeRateContainer.textContent = "Urban Area does not exist";
        crimeRateContainer.style.display = "block";

        climateDataContainer.textContent = "Urban Area does not exist";
        climateDataContainer.style.display = "block";
        return;  // Creating an error condition that will show if the urban area searched does not exist.
      }
     
      const data = await response.json();
        console.log(data)
//Finds population data and multiplies it by 1,000,000.

    const inputContainer = document.querySelector('.input-container');

        inputContainer.style.top = '15%';
        inputContainer.style.left = '50%';

        let populationData = data.categories.find(category => category.id === "CITY-SIZE")
            .data.find(data => data.id === "POPULATION-SIZE").float_value * 1000000; //Float value can be multiplied to create the desired number.

        console.log(populationData);
//Finds average salary data.

        let startupSalaryData = data.categories.find(category => category.id === "JOB-MARKET")
            .data.find(data => data.id === "STARTUP-SALARIES-DETAIL").currency_dollar_value; //Simple access of API data.
  
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
         crimeRate = "Very high crime rate."; // If else if allows for a variety of possible conditions to be met.

        console.log(crimeRate)
        console.log(crimeData)
      }

        let climateData = data.categories.filter(category => category.id === 'CLIMATE') //Filters through up to 22 possible categories for the climate data.
    .map(climateCategory=> climateCategory.data)[0].filter(dataPoint =>  ['WEATHER-AV-NUMBER-CLEAR-DAYS',
    'WEATHER-AV-NUMBER-RAINY-DAYS','WEATHER-AVERAGE-HIGH',
    'WEATHER-AVERAGE-LOW', 'WEATHER-TYPE'].includes(dataPoint.id)) //Maps over the data within the CLIMATE category's individual data points to return data in an array based on the filter of the category ID titles.
console.log(climateData)
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
            climateDataArray.push(`${climateObject.label}: ${value}`); //Based on the if else if statement loops, the data will be pushed into the empty array and displayed in a coherent manner for users.
    });
    


    
    
//Tells us what to populate into the containers based on the data.

    const climateDataLabel = document.createElement("strong"); //Bolds the title element.
    climateDataLabel.textContent = "Climate Data: ";
    climateDataContainer.appendChild(climateDataLabel);

    const climateDataValues = document.createElement("span"); //More dynammically show off the contents.
    climateDataValues.innerHTML = climateDataArray.join("<br>"); //Using .join() to joint all the elements inside the array as a string.
    climateDataContainer.append(climateDataValues);

    climateDataContainer.style.display = "block";

    const populationLabel = document.createElement("strong");
    populationLabel.textContent = "Population Size: ";
    populationContainer.appendChild(populationLabel);
        
    const populationValue= document.createElement("span");
    populationValue.textContent = populationData.toLocaleString(); //.toLocaleString() allows for better presentation of data.
    populationContainer.appendChild(populationValue);
        
    populationContainer.style.display = "block";

    const salaryLabel = document.createElement("strong");
    salaryLabel.textContent = "Average Salary in Native Currency: ";
    startupSalaryContainer.appendChild(salaryLabel);

    const salaryValue = document.createElement("span");
    salaryValue.textContent = startupSalaryData.toLocaleString(); //Same use case as population container.
    startupSalaryContainer.appendChild(salaryValue);

    startupSalaryContainer.style.display = "block";

    const crimeLabel = document.createElement("strong");
    crimeLabel.textContent = "Crime: ";
    crimeRateContainer.appendChild(crimeLabel);

    const crimeValue = document.createElement("span");
    crimeValue.textContent = crimeRate;
    crimeRateContainer.appendChild(crimeValue);

    crimeRateContainer.style.display = "block";

 
  
      

      
    
    } catch (error)  {
      console.error('Error:', error)
    }
});