
fetch('https://api.teleport.org/api/cities')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  let searchButton = document.getElementById("search");
  let cityInput = document.getElementById("city-input");
  searchButton.addEventListener("click", () => {
    //let cityName = cityInput.value;
    //let finalURL = `https://api.teleport.org/api/cities`;
  });



