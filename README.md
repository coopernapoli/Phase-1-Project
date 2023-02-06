# Phase-1-Project

README.md

This code initializes and manipulates variables, including buttons and containers for population, startup salary, crime rate, and climate data. The containers are set to not display on page load. There is a keypress function for the search button, allowing the user to search by pressing the enter key. Each container has a mouseover function that displays additional information in a popup, and a mouseout function that removes the popup. The search button has an asynchronous click event listener that fetches data from the Teleport API based on the city input. The code also ensures that data from previous searches does not stack.

Variables

searchButton: The search button element
cityInput: The input field for the city name
populationContainer: The container for population data
headerTwo: The header element
startupSalaryContainer: The container for startup salary data
crimeRateContainer: The container for crime rate data
climateDataContainer: The container for climate data
Functions

popupCreator(text): Creates a popup with the given text and returns the popup element.
cityInput.addEventListener('keypress', function(event)): Triggers the search button click event when the enter key is pressed.
populationContainer.addEventListener("mouseover", function()): Displays a popup with additional information when the mouse is over the population container.
populationContainer.addEventListener("mouseout", function()): Removes the popup when the mouse leaves the population container.
startupSalaryContainer.addEventListener("mouseover", function()): Displays a popup with additional information when the mouse is over the startup salary container.
startupSalaryContainer.addEventListener("mouseout", function()): Removes the popup when the mouse leaves the startup salary container.
crimeRateContainer.addEventListener("mouseover", function()): Displays a popup with additional information when the mouse is over the crime rate container.
crimeRateContainer.addEventListener("mouseout", function()): Removes the popup when the mouse leaves the crime rate container.
climateDataContainer.addEventListener("mouseover", function()): Displays a popup with additional information when the mouse is over the climate data container.
climateDataContainer.addEventListener("mouseout", function()): Removes the popup when the mouse leaves the climate data container.
searchButton.addEventListener("click", async () => {...}): Fetches data from the Teleport API based on the city input and updates the data containers.