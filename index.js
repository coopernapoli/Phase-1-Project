

  let searchButton = document.getElementById("search");
  let cityInput = document.getElementById("city-input");
  let populationContainer = document.getElementById("populationContainer");
  let populationDivision = document.getElementById("")
  
  searchButton.addEventListener("click", () => {
    let citySlug = cityInput.value.toLowerCase();
    let finalURL = `https://api.teleport.org/api/urban_areas/slug:${citySlug}/details`;
populationContainer.innerHTML = "";
    fetch(finalURL)
    .then(response => response.json())
    .then(data => {
    let populationData = data.categories.find(category => category.id === "CITY-SIZE").data.find(data => data.id === "POPULATION-SIZE").float_value * 1000000;
      populationContainer.textContent = populationData;
      console.log(data)
    })
    .catch(error => {
      console.error('Error:', error)
    });
  });
  
  


