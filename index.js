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
        searchButton.click();
    }
});
    

//Mouseover functions for each container.

populationContainer.addEventListener("mouseover", function(){
    // Create a new div to hold the additional data for the popup.
    let populationPopUp = document.createElement("div");
  
    // Set the content of the div
    populationPopUp.innerHTML = "Population data based off urban area data, not city data.";
 
    // Style the div
    populationPopUp.style.backgroundColor = "black";
    populationPopUp.style.color = "white";
    populationPopUp.style.padding = "1em";
    populationPopUp.style.borderRadius = "0.62em";
    populationPopUp.style.width = "100%"
    populationPopUp.style.position = "absolute";
    populationPopUp.style.left = "100%";
    populationPopUp.style.top = "0";
    populationPopUp.style.marginLeft = "1em";
    
    // Append the div to the populationContainer
    populationContainer.appendChild(populationPopUp);
    });
    //Mouseout function for the above mouseover.
    populationContainer.addEventListener("mouseout", function(){
        const populationPopUp = populationContainer.querySelector("div");
        populationContainer.removeChild(populationPopUp);
        });
  
startupSalaryContainer.addEventListener("mouseover", function() {
    // Create a new div to hold the additional data for the popup.
    let salaryPopUp = document.createElement("div");
  
    // Set the content of the div
    salaryPopUp.innerHTML = "Ex: Los Angeles = USD; London = GBP";
   
    // Style the div
    salaryPopUp.style.backgroundColor = "black";
    salaryPopUp.style.color = "white";
    salaryPopUp.style.padding = "1em";
    salaryPopUp.style.borderRadius = "0.62em";
    salaryPopUp.style.width = "100%"
    salaryPopUp.style.position = "absolute";
    salaryPopUp.style.left = "100%";
    salaryPopUp.style.top = "0";
    salaryPopUp.style.marginLeft = "1em";

    startupSalaryContainer.appendChild(salaryPopUp);
  });
  
    startupSalaryContainer.addEventListener("mouseout", function(){
        const salaryPopUp = startupSalaryContainer.querySelector("div");
        startupSalaryContainer.removeChild(salaryPopUp);
        });

  crimeRateContainer.addEventListener("mouseover", function() {
     // Create a new div to hold the additional data for the popup.
     let crimeRatePopUp = document.createElement("div");
  
     // Set the content of the div
     crimeRatePopUp.innerHTML = "Data not accurate, ranges simply used for coding process.";
  
     // Style the div
     crimeRatePopUp.style.backgroundColor = "black";
     crimeRatePopUp.style.color = "white";
     crimeRatePopUp.style.padding = "1em";
     crimeRatePopUp.style.borderRadius = "0.62em";
     crimeRatePopUp.style.width = "100%"
     crimeRatePopUp.style.position = "absolute";
     crimeRatePopUp.style.left = "100%";
     crimeRatePopUp.style.top = "0";
     crimeRatePopUp.style.marginLeft = "1em";

     crimeRateContainer.appendChild(crimeRatePopUp);
  });
  
    crimeRateContainer.addEventListener("mouseout", function(){
        const crimeRatePopUp = crimeRateContainer.querySelector("div");
        crimeRateContainer.removeChild(crimeRatePopUp);
        });

  climateDataContainer.addEventListener("mouseover", function() {
    // Create a new div to hold the additional data for the popup.
    let climatePopUp = document.createElement("div");
  
    // Set the content of the div
    climatePopUp.innerHTML = "Depending on the urban area, some data may not be available.  If fully up to date, it will have rainy and clear day data, temperature highs and lows, and weather type. If not available, a google search should fill in some of the missing data with relative ease.";
 
    // Style the div
    climatePopUp.style.backgroundColor = "black";
    climatePopUp.style.color = "white";
    climatePopUp.style.padding = "1em";
    climatePopUp.style.borderRadius = "0.62em";
    climatePopUp.style.width = "100%"
    climatePopUp.style.position = "absolute";
    climatePopUp.style.left = "100%";
    climatePopUp.style.top = "0";
    climatePopUp.style.marginLeft = "1em";

    climateDataContainer.appendChild(climatePopUp);
  });

  climateDataContainer.addEventListener("mouseout", function(){
    const climatePopUp = climateDataContainer.querySelector("div");
    climateDataContainer.removeChild(climatePopUp);
    });


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

    const inputContainer = document.querySelector('.input-container');

        inputContainer.style.top = '15%';
        inputContainer.style.left = '50%';

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
            climateDataArray.push(`${climateObject.label}: ${value}`); 
    });
    


    
    
//Tells us what to populate into the containers based on the data.

    const climateDataLabel = document.createElement("strong");
    climateDataLabel.textContent = "Climate Data: ";
    climateDataContainer.appendChild(climateDataLabel);

    const climateDataValues = document.createElement("span");
    climateDataValues.innerHTML = climateDataArray.join("<br>");
    climateDataContainer.append(climateDataValues);

    climateDataContainer.style.display = "block";

    const populationLabel = document.createElement("strong");
    populationLabel.textContent = "Population Size: ";
    populationContainer.appendChild(populationLabel);
        
    const populationValue= document.createElement("span");
    populationValue.textContent = populationData.toLocaleString();
    populationContainer.appendChild(populationValue);
        
    populationContainer.style.display = "block";

    const salaryLabel = document.createElement("strong");
    salaryLabel.textContent = "Average Salary in Native Currency: ";
    startupSalaryContainer.appendChild(salaryLabel);

    const salaryValue = document.createElement("span");
    salaryValue.textContent = startupSalaryData.toLocaleString();
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