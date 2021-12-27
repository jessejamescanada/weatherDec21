const weatherBtn = document.querySelector('.weatherBtn')
const apiKey = 'cbdb06c75c00a30fb0a8d241f1ef5392'
const userInputCity = document.getElementById('userInput')
const userInputState = document.getElementById('userInputState')
const cityName = document.querySelector('.cityName')
const stateName = document.querySelector('.state')
const temp = document.querySelector('.temp')
const humidity = document.querySelector('.humidity')
const desc = document.querySelector('.description')
const wind = document.querySelector('.wind')
const feelsLike = document.querySelector('.feelsLike')
const currentDate = document.querySelector('.currentDate')
const date1 = document.querySelector('.date1')
const date2 = document.querySelector('.date2')
const date3 = document.querySelector('.date3')

const temp2 = document.querySelector('.temp2')
const humidity2 = document.querySelector('.humidity2')
const desc2 = document.querySelector('.description2')
const wind2 = document.querySelector('.wind2')
const feelsLike2 = document.querySelector('.feelsLike2')

const temp3 = document.querySelector('.temp3')
const humidity3 = document.querySelector('.humidity3')
const desc3 = document.querySelector('.description3')
const wind3 = document.querySelector('.wind3')
const feelsLike3 = document.querySelector('.feelsLike3')

const temp4 = document.querySelector('.temp4')
const humidity4 = document.querySelector('.humidity4')
const desc4 = document.querySelector('.description4')
const wind4 = document.querySelector('.wind4')
const feelsLike4 = document.querySelector('.feelsLike4')

const iconMain = document.querySelector('.iconMain')
const iconDay1 = document.querySelector('.iconDay1')
const iconDay2 = document.querySelector('.iconDay2')
const iconDay3 = document.querySelector('.iconDay3')

const chevronRight = document.querySelector('.fa-chevron-right')
const chevronLeft = document.querySelector('.fa-chevron-left')
const day5 = document.querySelector('.day5')

// For arrows and horizontal scroll
chevronRight.addEventListener('click', () => {
    day5.scrollBy({
        top: 0,
        left: 300,
        behavior: 'smooth'
    })
})

chevronLeft.addEventListener('click', () => {
    day5.scrollBy({
        top: 0,
        left: -300,
        behavior: 'smooth'
    })
})

window.onload = function(){
    // load localstorage on page load and use it
    let  loadLocation = JSON.parse(localStorage.getItem('location'))
    // set default location if localstorage is empty (ie first time visiting site)
    if(loadLocation == null){
        loadLocation = {city: 'Chicago', state: 'illinois'}
    }

    // localstorage with 5 day
    const load5D = JSON.parse(localStorage.getItem('5days'))
    // 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loadLocation.city},${loadLocation.state}&units=imperial&appid=${apiKey}`)
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        cityName.innerHTML = data.name
        stateName.innerHTML = loadLocation.state
        currentDate.innerHTML = moment.unix(data.dt).format('LLL')
        temp.innerHTML = data.main.temp.toFixed(0)
        humidity.innerHTML = data.main.humidity
        feelsLike.innerHTML = data.main.feels_like.toFixed(0)
        wind.innerHTML = data.wind.speed.toFixed(0)
        desc.innerHTML = data.weather[0].description
        iconMain.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    })

    // 5day fetch
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${loadLocation.city},${loadLocation.state}&units=imperial&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        console.log(data.list)
        date1.innerHTML = moment.unix(data.list[6].dt).format('LL')
        temp2.innerHTML = data.list[6].main.temp.toFixed(0)
        humidity2.innerHTML = data.list[6].main.humidity
        feelsLike2.innerHTML = data.list[6].main.feels_like.toFixed(0)
        wind2.innerHTML = data.list[6].wind.speed.toFixed(0)
        desc2.innerHTML = data.list[6].weather[0].description
        iconDay1.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[6].weather[0].icon}.png`)
        // day2
        date2.innerHTML = moment.unix(data.list[15].dt).format('LL')
        temp3.innerHTML = data.list[15].main.temp.toFixed(0)
        humidity3.innerHTML = data.list[15].main.humidity
        feelsLike3.innerHTML = data.list[15].main.feels_like.toFixed(0)
        wind3.innerHTML = data.list[15].wind.speed.toFixed(0)
        desc3.innerHTML = data.list[15].weather[0].description
        iconDay2.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[15].weather[0].icon}.png`)
        // day3
        date3.innerHTML = moment.unix(data.list[22].dt).format('LL')
        temp4.innerHTML = data.list[22].main.temp.toFixed(0)
        humidity4.innerHTML = data.list[22].main.humidity
        feelsLike4.innerHTML = data.list[22].main.feels_like.toFixed(0)
        wind4.innerHTML = data.list[22].wind.speed.toFixed(0)
        desc4.innerHTML = data.list[22].weather[0].description
        iconDay3.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[22].weather[0].icon}.png`)
    })
}

weatherBtn.addEventListener('click', weatherResults)

function weatherResults(e) {
    e.preventDefault()
    const myObject = {
        city: userInputCity.value.trim(),
        state: userInputState.value.trim()
    }
    // set local storage and read it
    localStorage.setItem('location', JSON.stringify(myObject))
    const parseLocalStorage = JSON.parse(localStorage.getItem('location'))
    // scroll back to start date for 5 day forecast when location changed
    day5.scrollBy({
        top: 0,
        left: -3000,
        behavior: 'smooth'
    })
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${parseLocalStorage.city},${parseLocalStorage.state}&units=imperial&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        // destructuring
        const {main : {temp_max}} = data
        const {main: {temp}} = data
        const {main: {humidity}} = data
        const {main: {feels_like}} = data
        const {wind: {speed}} = data
        const {weather: {0: {description}}} = data
       console.log(temp_max)

// WITHOUT DESTRUCTURING
        // cityName.innerHTML = data.name
        // stateName.innerHTML = parseLocalStorage.state
        // temp.innerHTML = data.main.temp.toFixed(0)
        // humidity.innerHTML = data.main.humidity
        // feelsLike.innerHTML = data.main.feels_like.toFixed(0)
        // wind.innerHTML = data.wind.speed.toFixed(0)
        // desc.innerHTML = data.weather[0].description
        // iconMain.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)

        cityName.innerHTML = data.name
        stateName.innerHTML = parseLocalStorage.state
        temp.innerHTML = temp.toFixed(0)
        humidity.innerHTML = humidity
        feelsLike.innerHTML = feels_like
        wind.innerHTML = speed.toFixed(0)
        desc.innerHTML = description
        iconMain.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    })
    userInputCity.value = ''
    userInputState.value = ''
    forecast5Days(parseLocalStorage)
}

// 5 day forecast
function forecast5Days(location) {
    const day5LS = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location.city},${location.state}&units=imperial&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        console.log(data.list)
        date1.innerHTML = moment.unix(data.list[6].dt).format('LL')
        temp2.innerHTML = data.list[6].main.temp.toFixed(0)
        humidity2.innerHTML = data.list[6].main.humidity
        feelsLike2.innerHTML = data.list[6].main.feels_like.toFixed(0)
        wind2.innerHTML = data.list[6].wind.speed.toFixed(0)
        desc2.innerHTML = data.list[6].weather[0].description
        iconDay1.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[6].weather[0].icon}.png`)

        date2.innerHTML = moment.unix(data.list[15].dt).format('LL')
        temp3.innerHTML = data.list[15].main.temp.toFixed(0)
        humidity3.innerHTML = data.list[15].main.humidity
        feelsLike3.innerHTML = data.list[15].main.feels_like.toFixed(0)
        wind3.innerHTML = data.list[15].wind.speed.toFixed(0)
        desc3.innerHTML = data.list[15].weather[0].description
        iconDay2.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[15].weather[0].icon}.png`)

        date3.innerHTML = moment.unix(data.list[22].dt).format('LL')
        temp4.innerHTML = data.list[22].main.temp.toFixed(0)
        humidity4.innerHTML = data.list[22].main.humidity
        feelsLike4.innerHTML = data.list[22].main.feels_like.toFixed(0)
        wind4.innerHTML = data.list[22].wind.speed.toFixed(0)
        desc4.innerHTML = data.list[22].weather[0].description
        iconDay3.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[22].weather[0].icon}.png`)
    })
//  localstorage with 5day
    localStorage.setItem('5days', JSON.stringify(day5LS))
    const parse5Day = JSON.parse(localStorage.getItem('5days'))
}










