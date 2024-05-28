<template>
  <div class="bg-gray-500 min-h-screen"> <!-- Changed to gray background -->
    <div class="text-center font-mitr">
      <div>
        <h1>Web Test IOT API</h1>
      </div>
      <div class="text-9xl font-bebas">
        <h1>ESP 32 DATA</h1>
      </div>
      <div class="font-mitr text-blue-600">
        <p>Temperature: {{ temperature }}°C</p>
        <p>Humidity: {{ humidity }}%</p>
        <p>Ultrasonic Distance: {{ ultrasonic_distance }} m</p>
      </div>
      <div class="font-mitr">
        <p>
          netpie / wokwi
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import "./assets/tailwind.css";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      temperature: 0,
      humidity: 0,
      ultrasonic_distance: 0,
    };
  },
  mounted() {
    this.fetchData();
    // Set up interval to fetch data every 5 seconds
    setInterval(this.fetchData, 5000);
  },
  methods: {
    fetchData() {
      let apiurl = "https://api.netpie.io/v2/device/shadow/data";
      let headers = {
        'content-type': 'application/json',
        "Authorization": "Device dbcd1612-6619-49cf-acc1-ded83aa82946:XeH8bm7UNCJHb2A4WZhQgZPNishUPKGc"
      };
      axios.get(apiurl, { headers })
        .then(response => {
          console.log(response.data);
          this.temperature = response.data.data.temperature;
          this.humidity = response.data.data.humidity;
          this.ultrasonic_distance = response.data.data.ultrasonic_distance;
        })
        .catch(error => { console.log(error) });
    },
    switchClicked(color, paramValue) {
      let _payload = `${color.toUpperCase()}_${paramValue === 1 ? 'ON' : 'OFF'}`;
      this[color + '_led_status'] = paramValue;
      console.log("Switch Clicked:", _payload);
      this.publishDataToNetpie(_payload);
    },
    publishDataToNetpie(payload) {
      let targetTopic = "topic=lab_ict_kps%2Fcommand";
      let apiurl = "https://api.netpie.io/v2/device/message" + "?" + targetTopic;
      let headers = {
        "Content-Type": "text/plain",
        "Authorization": "Device 93c35b34-a81f-460a-9f84-012b4d267221:99wVJvnLUaYN6RD8goHSwrZnCY3okhsF"
      };
      let data = payload;

      axios.put(apiurl, data, { headers })
        .then(response => {
          console.log("Data sent successfully:", response);
        })
        .catch(error => {
          console.error("Error sending data:", error);
        });
    },
  }
};
</script>

<style>
/* Your existing styles */
</style>
