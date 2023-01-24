

  let searchButton = document.getElementById("search");
  let cityInput = document.getElementById("city-input");
  searchButton.addEventListener("click", () => {
    let cityName = cityInput.value;
    let finalURL = `https://api.teleport.org/api/cities/?search=${cityName}`;
    
    fetch(finalURL)
    .then(response => response.json())
    .then(data => {
        if(data._embedded){
            let city = data._embedded["city:search-results"][0]
            console.log(city)
        }else{
            console.log("City not found")
        }
    })
    .catch(error => {
        console.error('Error:', error)
  });


});
