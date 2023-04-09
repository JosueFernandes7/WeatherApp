const dataAtual = new Date()
const dataContainer = document.querySelector('.dataAtual')

const dia =
  dataAtual.getDate() < 10 ? `0${dataAtual.getDate()}` : dataAtual.getDate()
const mes =
  dataAtual.getMonth() + 1 < 10
    ? `0${dataAtual.getMonth() + 1}`
    : dataAtual.getMonth() + 1
const ano = dataAtual.getFullYear()

dataContainer.textContent = `${dia}/${mes}/${ano}`

async function getCoordinates(callback) {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude
    let long = position.coords.longitude
    callback({ lat, long })
  })
}

async function getWeather(lat, long) {
  const URL = 'https://api.openweathermap.org/data/2.5/weather?lat='
  const ApiKey = '6b4ef5b00c51bf760d49cf97433a9ea7'
  const lang = 'pt_br'
  const units = 'metric'
  console.log(lat)
  const response = await fetch(
    `${URL}${lat}&lon=${long}&units=${units}&lang=${lang}&appid=${ApiKey}`
  )

  const responseJson = await response.json()
  const { name, weather, main, sys } = responseJson
  const { temp} = main

  const description = weather[0].description
  const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]['icon']}.svg`
  const country = sys.country
  createWeatherContainer(name, country, temp, icon, description)
}
getCoordinates((coordinates) => {
  const { lat, long } = coordinates
  getWeather(lat, long)
})

function createWeatherContainer(name, country, temp, icon, description) {
  const container = document.createElement('div')
  container.className = 'weather';
  
  container.innerHTML = `
    <h2>${name} <span>${country}</span></h2>
    <h1>${parseInt(temp)}°C</h1>
    <img src="${icon}" alt="temp">
    <p>${description}</p>
  `
  document.querySelector('body').append(container)
}
