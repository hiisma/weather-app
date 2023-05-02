<script setup>
import { ref} from 'vue';

const city = ref('Roses');
const temperature = ref('25ºC');
const weather = ref('Sunny')

const getWeather = async () => {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Roses&appid=2a3b0b7b0b0b0b0b0b0b0b0b0b0b0b0b');
    const data = await response.json();
    city.value = data.name;
    temperature.value = data.main.temp;
    weather.value = data.weather[0].main;
}

getWeather();

</script>

<template>
  <div class="card">
    <div id="city">
        <p>Roses</p>
    </div>
    <div class="circle">
        <p>25ºC</p>
    </div>
    <div id="weather">
        <p>Sunny</p>
    </div>
  </div>
</template>

<style scoped>
.card {
    width: 300px;
    height: 500px;
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

.circle > p {
    font-size: 50px;
    font-weight: bold;
}

#weather {
    font-size: 30px;
    font-weight: light;
}
</style>
