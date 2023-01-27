

  let searchButton = document.getElementById("search");
  let cityInput = document.getElementById("city-input");
  let populationContainer = document.getElementById("populationContainer");
  let headerTwo = document.getElementById("headerTwo");
  let startupSalaryContainer = document.getElementById("startupSalaryContainer")
  populationContainer.style.display = "none";
  startupSalaryContainer.style.display = "none";

  let populationDivision = document.getElementById("populationDivision");
  let startupSalaryDivision = document.getElementById("startupSalaryDivision");

  searchButton.addEventListener("click", () => {
    let citySlug = cityInput.value.toLowerCase();
    let finalURL = `https://api.teleport.org/api/urban_areas/slug:${citySlug}/details`;
    
    populationContainer.innerHTML = "";

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

  
    startupSalaryContainer.innerHTML = "";

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
