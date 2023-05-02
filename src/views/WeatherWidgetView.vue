<script setup>
import { onMounted, ref } from 'vue'
import keys from '../config'          // Import API keys  from config.js
import axios from 'axios'

const search = ref('Barcelona')
const city = ref('Barcelona')
const region = ref('Catalonia')
const country = ref('Spain')
const temperature = ref('25')
const weather = ref('Sunny')

/**
 * Get weather from API and updates values
 * and color of the temperature circle.
 */
const getWeather = async () => {
  const instance = axios.create({
    baseURL: keys.api.weather.url,
    timeout: 1000
  })

  instance({
    method: 'post',
    url: '/current.json',
    params: {
      q: search.value,
      key: keys.api.weather.key
    }
  })
    .then((response) => {
      console.log(response.data)
      city.value = response.data.location.name
      region.value = response.data.location.region
      country.value = response.data.location.country
      temperature.value = response.data.current.temp_c
      weather.value = response.data.current.condition.text
    }).then(() => {
      updateColor()
    })
    .catch((error) => {
      console.log(error)
    })
}

/**
 * Updates the color of the temperature circle
 * depending on the temperature.
 */
const updateColor = async () => {
  const color_green = '#B5FFA4'
  const color_blue = '#A4F0FF'
  const color_red = '#FFA4A4'

  let actual_temp = parseInt(temperature.value)
  console.log(actual_temp)

  if (actual_temp > 30) {
    document.querySelector('.circle').style.backgroundColor = color_red
  } else if (actual_temp > 20) {
    document.querySelector('.circle').style.backgroundColor = color_green
  } else {
    document.querySelector('.circle').style.backgroundColor = color_blue
  }
}

/**
 * Changes the city to search for.
 * @param {*} event
 */
const changeCity = (event) => {
  search.value = event.target.value
  getWeather()
}

onMounted(() => {
  getWeather()
})
</script>

<template>
  <div class="card">
    <div id="city">
      <p class="title">{{ city }}</p>
      <p class="subtitle">{{ country }} | {{ region }}</p>
      <input class="text-input" type="text" @change="changeCity" placeholder="Search your city"/>
    </div>
    <div class="circle">
      <p class="title">{{ temperature }} ºC</p>
    </div>
    <div id="weather">
      <p>{{ weather }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 400px;
  height: 600px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  margin: 0 auto;
}

#city {
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
}

.circle {
  width: 200px;
  height: 200px;
  background-color: #83cdf0;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.title {
  font-size: 35px;
  font-weight: bold;
}

.subtitle {
  font-size: 20px;
  font-weight: light;
}

#weather {
  font-size: 30px;
  font-weight: light;
}

.text-input {
    text-align: center;
    font-size: 16px;
    height: 40px;
    width: 300px;
    border: solid;
    border-width: 1px;
    border-color: #83cdf0;
    border-radius: 6px;
}

/* Remove highligh at focus */
.text-input:focus {
    outline: none;

}

</style>
