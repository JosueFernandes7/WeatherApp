const dataAtual = new Date();
const dataContainer = document.querySelector('.dataAtual');

const dia = dataAtual.getDate();
const mes = dataAtual.getMonth() + 1;
const ano = dataAtual.getFullYear();

dataContainer.textContent = `${dia}/${mes}/${ano}`

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
  const cityName = responseJson.name;
  const description = responseJson.weather[0].description
  const temperature = responseJson.main.temp;
  const Thermalsensation = responseJson.main.feels_like;

  createWeatherContainer(cityName, description, temperature, Thermalsensation)
}
getCoordinates((coordinates) => {
  const {lat,long} =  coordinates;
  getWeather(lat,long)
});

function createWeatherElement(item, type, className, textContent) {
  const element = document.createElement(type);
  element.className = className;
  
  if(textContent) {
    element.textContent = `${textContent} = ${item} °C`;
  } else element.textContent = item;
  
  return element;
}

function createWeatherContainer(cityName, cityDescription,temp,Thermalsensation) {
  
  const container = createWeatherElement("","div","weather");
  const nome = createWeatherElement(cityName, 'h1', 'weatherName');
  const descricao = createWeatherElement(cityDescription, 'p', 'weatherDescription');
  const temperatura = createWeatherElement(temp, 'h3', 'weatherTemperature',"Temperatura Atual");
  const sencacaoTermica = createWeatherElement(Thermalsensation, 'h3', 'weatherThermalsensation',"Sensação Térmica");

  container.append(nome,temperatura,sencacaoTermica,descricao)
  document.querySelector('body').append(container)
}