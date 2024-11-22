document.getElementById('getWeather').addEventListener('click', fetchWeather);
document.getElementById('city').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});

function fetchWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) {
        document.getElementById('result').innerHTML = '<p class="text-danger">Please enter a city name.</p>';
        return;
    }

    const apiKey = '10b66df7f93d65656305836e90f546a5'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const celsius = data.main.temp;
            const fahrenheit = (celsius * 9/5) + 32;
            const weather = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const feelsLikeC = data.main.feels_like;
            const feelsLikeF = (feelsLikeC * 9/5) + 32;

            document.getElementById('result').innerHTML = `
                <p><strong>City:</strong> ${data.name}</p>
                <p><strong>Weather:</strong> ${weather}</p>
                <p><strong>Temperature:</strong> <span id="temp">${celsius.toFixed(1)}</span><span id="tempUnit">°C</span></p>
                <p><strong>Feels Like:</strong> <span id="feelsLike">${feelsLikeC.toFixed(1)}</span><span id="feelsLikeUnit">°C</span></p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                <button id="toggleTemp" class="btn btn-secondary mt-3">Switch to °F</button>
            `;

            const toggleButton = document.getElementById('toggleTemp');
            toggleButton.addEventListener('click', function () {
                const tempSpan = document.getElementById('temp');
                const tempUnitSpan = document.getElementById('tempUnit');
                const feelsLikeSpan = document.getElementById('feelsLike');
                const feelsLikeUnitSpan = document.getElementById('feelsLikeUnit');
                const currentUnit = toggleButton.innerText.includes('°F') ? 'C' : 'F';

                if (currentUnit === 'C') {
                    tempSpan.textContent = fahrenheit.toFixed(1);
                    tempUnitSpan.textContent = '°F';
                    feelsLikeSpan.textContent = feelsLikeF.toFixed(1);
                    feelsLikeUnitSpan.textContent = '°F';
                    toggleButton.innerText = 'Switch to °C';
                } else {
                    tempSpan.textContent = celsius.toFixed(1);
                    tempUnitSpan.textContent = '°C';
                    feelsLikeSpan.textContent = feelsLikeC.toFixed(1);
                    feelsLikeUnitSpan.textContent = '°C';
                    toggleButton.innerText = 'Switch to °F';
                }
            });
        })
        .catch(error => {
            document.getElementById('result').innerHTML = `<p class="text-danger">${error.message}</p>`;
        });
}




