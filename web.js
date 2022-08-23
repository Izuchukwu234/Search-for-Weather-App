const API_KEY = '0cd5da12e1afdb18b8b8f65f348b3538';
const formElement = document.querySelector('form');
const details = document.querySelector('.details');

formElement.addEventListener('submit', function(e){
    e.preventDefault();
    details.innerHTML = '<h1>Loading...</h1>';
    const location = e.target.location.value;

    weatherApp(location)
});

async function weatherApp(location){
    const data = await fetchAPI(location);
    generateHTML(data);
}

async function fetchAPI(location){
    const baseURL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${location}`;
    const res = await fetch(baseURL);
    const data = await res.json();
    console.log(data);
    return data;
}


function generateHTML(data){
    const html = `
    <h1 style="font-size: 40px;" class="temp">${data.current.temperature}°C</h1>
    <h1 class="status">${data.current.weather_descriptions.map(item => item).join (' ')}</h1>
        <div class="more-info">
            <img src="${data.current.weather_icons}" alt="weather icons">
            <p>Humidity- ${data.current.humidity}%</p>
            <p>Pressure- ${data.current.pressure}MB</p>
            <p>Wind Speed- ${data.current.wind_speed}km/h</p>
            <p>Wind Direction- ${data.current.wind_dir}</p>
        </div>
        <br>
        <i><div>${data.request.query}</div></i>
    `;

    details.innerHTML = html;
}