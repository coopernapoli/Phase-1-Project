//Starting with variable declaration to initialize manipulatable HTML elements.

  let searchButton = document.getElementById("search");
  let cityInput = document.getElementById("city-input");
  let populationContainer = document.getElementById("populationContainer");
  let headerTwo = document.getElementById("headerTwo");
  let startupSalaryContainer = document.getElementById("startupSalaryContainer");

  //Allows the container elements to only display when called by their respective functions, not before.
  populationContainer.style.display = "none";
  startupSalaryContainer.style.display = "none";

//Likely will not need to use them, but may need these divisions for styling or informational purposes.

  let populationDivision = document.getElementById("populationDivision");
  let startupSalaryDivision = document.getElementById("startupSalaryDivision");

//Created the search button event listener. Utilized .toLowerCase() as this was the only way to work with the slug functionality on the API.

  searchButton.addEventListener("click", () => {
    let citySlug = cityInput.value.toLowerCase();
    let finalURL = `https://api.teleport.org/api/urban_areas/slug:${citySlug}/details`;

//This allows for multiple intputs to the container with a repopulation of new data, as oppsed to stacking each search on top of each other.
    populationContainer.innerHTML = "";


//Created a fetch function to access the API, create conditional responses based on whether or not the city exists, and return a float value of the 
//population size multiplied by one million so as to provide an acurate, easily readable number.
    fetch(finalURL)
    .then(response => {
        if (response.status === 404) {
            populationContainer.innerHTML = "Urban Area does not exist";
        return;
      }
      return response.json();
    })
    
        
    .then(data => {
        
         let populationData = data.categories.find(category => category.id === "CITY-SIZE")
            .data.find(data => data.id === "POPULATION-SIZE").float_value * 1000000;

            populationContainer.textContent = populationData;
            
            populationContainer.style.display = "block";
        
        
            console.log(data)
            
    })
    .catch(error => {
      console.error('Error:', error)
    });

//This allows for multiple intputs to the container with a repopulation of new data, as oppsed to stacking each search on top of each other.
    startupSalaryContainer.innerHTML = "";

//Created a fetch request to access a different part of the API using a similar template as above. This calculates average salary data in the region
//and it uses the native currency.
    fetch(finalURL)
    .then(response => {
        if (response.status === 404) {
            startupSalaryContainer.innerHTML = "Urban Area does not exist";
        return;
      }
      return response.json();
    })
    
        
    .then(data => {
        
         let startupSalaryData = data.categories.find(category => category.id === "JOB-MARKET")
            
            .data.find(data => data.id === "STARTUP-SALARIES-DETAIL").currency_dollar_value;

            startupSalaryContainer.textContent = startupSalaryData;
            
            startupSalaryContainer.style.display = "block";
        
        
            console.log(data)
            
    })
    .catch(error => {
      console.error('Error:', error)
    });

//With crime data being difficult to explain numerically, I created arbitrary value windows to return a few conditional returns after filtering over
// the float value of the crime data.  These numbers may not necessarily be indicative of what actually constitutes the return strings, but for the sake
// of the exercise, it was done in this manner.
    fetch(finalURL)
    .then(response => {
        if (response.status === 404) {
            populationContainer.innerHTML = "Urban Area does not exist";
        return;
      }
      return response.json();
    })
        
        
    .then(data => {
        let crimeData = data.categories.find(category => category.id === "SAFETY")
        .data.find(data => data.id === "CRIME-RATE-TELESCORE").float_value;
        let crimeRate = crimeData.filter(data => {
            if(data.float_value > 0.85) {
                return "very high crime rate";
            } else if(data.float_value <= 0.85 && data.float_value >= 0.6) {
                return "high crime rate";
            } else if(data.float_value < 0.6 && data.float_value >= 0.38) {
                return "medium crime rate";
            } else if(data.float_value < 0.38) {
                return "low crime rate";
            }
        });

        console.log(crimeRate);
    })
    .catch(error => {
        console.error('Error:', error)
    });

});
