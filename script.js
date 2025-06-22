const apiKey = "weatherapp"; 

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weatherInfo");

  if (city === "") {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=weatherapp&units=metric`;
  console.log("Fetching:", apiUrl); // Debug URL

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found or API key issue");
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Debug response
      const icon = data.weather[0].icon;
      const html = `
        <h2>${data.name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Condition: ${data.weather[0].main}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      `;
      weatherDiv.innerHTML = html;
    })
    .catch(error => {
      console.error("Error:", error.message);
      weatherDiv.innerHTML = `<p style="color: yellow;">${error.message}</p>`;
    });
}