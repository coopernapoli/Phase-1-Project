

  let searchButton = document.getElementById("search");
  let cityInput = document.getElementById("city-input");
  
  searchButton.addEventListener("click", () => {
    let citySlug = cityInput.value;
    let finalURL = `https://api.teleport.org/api/urban_areas/?embed=${citySlug}/details`;

    fetch(finalURL)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error)
    });
  });
  
  


