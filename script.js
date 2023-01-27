async function getCoordinates(callback) {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    callback({lat, long});
  })
}
async function getWeather(lat, long) {
  const URL = "https://api.openweathermap.org/data/2.5/weather?lat="
  const ApiKey = "6b4ef5b00c51bf760d49cf97433a9ea7";
  const lang = "pt_br"
  const units = "metric"
  
  const response =  await fetch(`${URL}${lat}&lon=${long}&units=${units}&lang=${lang}&appid=${ApiKey}`)
    const responseJson = await response.json();
    console.log(responseJson);

  const cityName = responseJson.name;
  const description = responseJson.weather[0].description
  const maxTemperature = responseJson.main.temp;
  const feelingTemperature = responseJson.main.feels_like;
}
getCoordinates((coordinates) => {
   let {lat,long} =  coordinates;
  getWeather(lat,long)
});

function createWeatherContainer(name, description) {
  let container = document.createElement('div');
  container.className = name;
  container.textContent = name;
  document.querySelector('body').append(container)
}