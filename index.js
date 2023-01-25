

  let searchButton = document.getElementById("search");
  let cityInput = document.getElementById("city-input");
  let populationDivision = document.createElement("div");
  searchButton.addEventListener("click", () => {
    let citySlug = cityInput.value.toLowerCase();
    let finalURL = `https://api.teleport.org/api/urban_areas/slug:${citySlug}/details`;
populationDivision.innerHTML = "";
    fetch(finalURL)
    .then(response => response.json())
    .then(data => {
      let populationData=data.population;
      populationDivision.innerHTML = populationData;
      document.body.appendChild(populationDivision);
      console.log(data)
    })
    .catch(error => {
      console.error('Error:', error)
    });
  });
  
  


