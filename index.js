

  let searchButton = document.getElementById("search");
  let cityInput = document.getElementById("city-input");
  let populationContainer = document.getElementById("populationContainer");
  let headerTwo = document.getElementById("headerTwo");
  let startupSalaryContainer = document.getElementById("startupSalaryContainer")
  populationContainer.style.display = "none";
  startupSalaryContainer.style.display = "none";l

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
        
         let startupSalaryData = data.categories.find(category => category.id === "CITY-SIZE")
            .data.find(data => data.id === "POPULATION-SIZE").float_value;

            startupSalaryContainer.textContent = startupSalaryData;
            
            startupSalaryContainer.style.display = "block";
        
        
            console.log(data)
            
    })
    .catch(error => {
      console.error('Error:', error)
    });

});
