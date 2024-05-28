<template>
  <div class="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white"> <!-- Changed background to darker gray and centered content -->
    <div class="text-center font-mitr mb-8">
      <h1 class="text-4xl">Web Test IOT API</h1>
    </div>
    <div class="gradient-text text-9xl font-bebas text-transparent animate-gradient tracking-tight mb-8">
      <h1>ESP 32 DATA</h1>
    </div>
    <div class="bg-slate-100 p-8 rounded-lg shadow-lg"> <!-- Added rounded corners and shadow for better aesthetics -->
      <div class="font-mitr text-blue-600">
        <p class="text-xl mb-2">Temperature: {{ temperature }}°C</p>
        <p class="text-xl mb-2">Humidity: {{ humidity }}%</p>
        <p class="text-xl">Ultrasonic Distance: {{ ultrasonic_distance }} m</p>
      </div>
    </div>
    <div class="p-8 font-embed text-center mt-8">
      <p class="mb-2">
        Use @ MQTT_netpie & SimArduno_wokwi
      </p>
      <p class="italic">
        Credit: Sanpitch Phuvapaisankit
      </p>
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

</style>
