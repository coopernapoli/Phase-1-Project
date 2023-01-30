// //One fetch request to avoid rate limit issues.
// //Separate functions within one fetch requests that call the function.
// //Use spread operator to copy the object.

// //Starting with variable declaration to initialize manipulatable HTML elements.

//   let searchButton = document.getElementById("search");
//   let cityInput = document.getElementById("city-input");
//   let populationContainer = document.getElementById("populationContainer");
//   let headerTwo = document.getElementById("headerTwo");
//   let startupSalaryContainer = document.getElementById("startupSalaryContainer");
//   let crimeRateContainer = document.getElementById("crimeRateContainer")

//   //Allows the container elements to only display when called by their respective functions, not before.
//   populationContainer.style.display = "none";
//   startupSalaryContainer.style.display = "none";
//   crimeRateContainer.style.display = "none";

// //Likely will not need to use them, but may need these divisions for styling or informational purposes.

//   let populationDivision = document.getElementById("populationDivision");
//   let startupSalaryDivision = document.getElementById("startupSalaryDivision");
//   let crimeRateDivision = document.getElementById("crimeRateDivision");

// //Created the search button event listener. Utilized .toLowerCase() as this was the only way to work with the slug functionality on the API.

//   searchButton.addEventListener("click", () => {
//     let citySlug = cityInput.value.toLowerCase();
//     let finalURL = `https://api.teleport.org/api/urban_areas/slug:${citySlug}/details`;

// //This allows for multiple intputs to the container with a repopulation of new data, as oppsed to stacking each search on top of each other.
//     populationContainer.innerHTML = "";


// //Created a fetch function to access the API, create conditional responses based on whether or not the city exists, and return a float value of the 
// //population size multiplied by one million so as to provide an acurate, easily readable number.
//     fetch(finalURL)
//     .then(response => {
//         if (response.status === 404) {
//             populationContainer.innerHTML = "Urban Area does not exist";
//         return;
//       }
//       return response.json();
//     })
    
        
//     .then(data => {
        
//          let populationData = data.categories.find(category => category.id === "CITY-SIZE")
//             .data.find(data => data.id === "POPULATION-SIZE").float_value * 1000000;

//             populationContainer.textContent = populationData;
            
//             populationContainer.style.display = "block";
        
        
//             console.log(data)
            
//     })
//     .catch(error => {
//       console.error('Error:', error)
//     });

// //This allows for multiple intputs to the container with a repopulation of new data, as oppsed to stacking each search on top of each other.
//     startupSalaryContainer.innerHTML = "";

// //Created a fetch request to access a different part of the API using a similar template as above. This calculates average salary data in the region
// //and it uses the native currency.
//     fetch(finalURL)
//     .then(response => {
//         if (response.status === 404) {
//             startupSalaryContainer.innerHTML = "Urban Area does not exist";
//         return;
//       }
//       return response.json();
//     })
    
        
//     .then(data => {
        
//          let startupSalaryData = data.categories.find(category => category.id === "JOB-MARKET")
            
//             .data.find(data => data.id === "STARTUP-SALARIES-DETAIL").currency_dollar_value;

//             startupSalaryContainer.textContent = startupSalaryData;
            
//             startupSalaryContainer.style.display = "block";
        
        
//             console.log(data)
            
//     })
//     .catch(error => {
//       console.error('Error:', error)
//     });

//     crimeRateContainer.innerHTML = "";

// //With crime data being difficult to explain numerically, I created arbitrary value windows to return a few conditional returns after iterating over
// // the float value of the crime data.  These numbers may not necessarily be indicative of what actually constitutes the return strings, 
// //but for the sake of the exercise, it was done in this manner. The if else if notation creates the width of the possible returns.
//     fetch(finalURL)
//     .then(response => {
//         if (response.status === 404) {
//             crimeRateContainer.innerHTML = "Urban Area does not exist";
//         return;
//       }
//       return response.json();
//     })

//     .then(data => {
//         let crimeData = data.categories.find(category => category.id === "SAFETY")
//         .data.find(data => data.id === "CRIME-RATE-TELESCORE").float_value;
//       let crimeRate;
      
//       if (crimeData > 0.85) {
//         crimeRate = "Low crime rate.";
//       } else if (crimeData <= 0.85 && crimeData >= 0.6) {
//         crimeRate = "Medium crime rate.";
//       } else if (crimeData < 0.6 && crimeData >= 0.38) {
//         crimeRate = "High crime rate.";
//       } else if (crimeData < 0.38) {
//         crimeRate = "Very high crime rate.";
//       }

//       crimeRateContainer.textContent = crimeRate;
            
//       crimeRateContainer.style.display = "block";
  
//       console.log(crimeRate);
//   })
        
    
//       .catch(error => {
//         console.error('Error:', error)
//       });
//     });
let searchButton = document.getElementById("search");
let cityInput = document.getElementById("city-input");
let populationContainer = document.getElementById("populationContainer");
let headerTwo = document.getElementById("headerTwo");
let startupSalaryContainer = document.getElementById("startupSalaryContainer");
let crimeRateContainer = document.getElementById("crimeRateContainer");

populationContainer.style.display = "none";
startupSalaryContainer.style.display = "none";
crimeRateContainer.style.display = "none";

searchButton.addEventListener("click", async () => {
    let citySlug = cityInput.value.toLowerCase();
    let finalURL = `https://api.teleport.org/api/urban_areas/slug:${citySlug}/details`;
  
    populationContainer.innerHTML = "";
    startupSalaryContainer.innerHTML = "";
    crimeRateContainer.innerHTML = "";
  
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
      if (crimeData <= 10) {
        crimeRate = "Very Low";
      } else if (crimeData > 10 && crimeData <= 20) {
        crimeRate = "Low";
      } else if (crimeData > 20 && crimeData <= 30) {
        crimeRate = "Moderate";
      } else {
        crimeRate = "High";
      }
  
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