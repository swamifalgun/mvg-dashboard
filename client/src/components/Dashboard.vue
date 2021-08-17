<template>
  <div>
    <!-- {{ dateFormatter(getTrams[0]["departureTime"]) }} -->

    <!-- <h1 v-if="getUbahns.length > 0">got ubahns</h1> -->
    <div class="header">
      <h3 class="date">{{ getDate }}</h3>
      <h3 class="time">{{ time }}</h3>
    </div>

    <div class="canvas">
      <table class="tram">
        <tr>
          <th>Departure</th>
          <th>Transport</th>
          <th>Destination</th>
        </tr>
        <tr v-for="tram in getTrams" v-bind:key="tram.departureId">
          <td>
            {{ dateFormatter(tram["departureTime"]) }}
            <span class="delay" v-if="tram['delay'] > 0">
              + {{ tram["delay"] }}</span
            >
          </td>
          <td>{{ tram["product"] }}</td>
          <td>{{ tram["destination"] }}</td>
        </tr>
      </table>

      <table class="ubahn">
        <tr>
          <th>Departure</th>
          <th>Transport</th>
          <th>Destination</th>
        </tr>
        <tr v-for="ubahn in getUbahns" v-bind:key="ubahn.departureId">
          <td>
            {{ dateFormatter(ubahn["departureTime"]) }}
            <span class="delay" v-if="ubahn['delay'] > 0">
              + {{ ubahn["delay"] }}</span
            >
          </td>
          <td>{{ ubahn["product"] }}</td>
          <td>{{ ubahn["destination"] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import "vue2-datepicker/index.css";

export default {
  components: {},
  name: "Dashboard",

  data() {
    return {
      time: "",
      error: "",
      date: null,
      showCurrent: true,
    };
  },

  computed: {
    ...mapState(["trams, ubahns"]),

    getTrams() {
      return this.$store.getters.getTrams;
    },
    getUbahns() {
      return this.$store.getters.getUbahns;
    },

    getDate() {
      let date = new Date();
      return (
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
    },
  },

  created() {
    setInterval(() => {
      this.$store.dispatch("fetchTramStatus");
    }, 5000);

    setInterval(() => {
      this.$store.dispatch("fetchUbahnStatus");
    }, 5000);

    setInterval(this.getTime, 1000);
  },
  methods: {
    dateFormatter(timestamp) {
      let unix_timestamp = timestamp;
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(unix_timestamp);
      // Hours part from the timestamp
      var hours = "0" + date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      // var seconds = "0" + date.getSeconds();
      // Will display time in 10:30:23 format
      var formattedTime = hours.slice(-2) + ":" + minutes.substr(-2);

      return formattedTime;
    },
    getTime() {
      let date = new Date();
      var hours = "0" + date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      return (this.time =
        hours.slice(-2) + ":" + minutes.substr(-2) + ":" + seconds.substr(-2));
    },
  },
};
</script>

<style scoped>
body {
  background-color: #fff;
  text-align: center;
  margin: 0;
  padding: 0;
  font-family: "Courier New", Courier, monospace;
  height: 100vh;
}

.delay {
  color: red;
  font-weight: bold;
}

.tram {
  /* border: 1px solid black; */
}

table tr:nth-child(odd) td {
  background-color: #a4a6ac;
}
table tr:nth-child(even) td {
  background-color: #f6f6f7;
}

.ubahn {
  /* border: 1px solid black; */
}

th:nth-child(1) {
  text-align: left;
  padding-left: 10px;
}

td:nth-child(1) {
  text-align: left;
  padding-left: 10px;
}

th:nth-child(2) {
  text-align: center;
}

td:nth-child(2) {
  text-align: center;
}

th:nth-child(3) {
  text-align: left;
  padding-left: 10px;
}

td:nth-child(3) {
  text-align: left;
  padding-left: 10px;
}

.canvas {
  display: flex;
  flex-direction: row !important;
  justify-content: space-between !important;
  padding: 20px;
}

.header {
  background-color: #a4a6ac;
  font-size: 32px;
  font-weight: bold;
  padding: 20px;
}

.main-content {
  display: flex;
  flex-direction: row;
  margin: 30px;
  border-radius: 15px 15px 15px 15px;
  box-shadow: 0 0 13px #a4a6ac;
}

.metric {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.2;
}
.today {
  cursor: pointer;
}

.today :hover {
  cursor: pointer !important;
}

.thisWeek {
  padding-left: 20px;
}

.right-column {
  display: flex;
  flex: 4;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f6f6f7;
  height: 80vh;
  padding: 30px 30px 30px 30px;
  border-radius: 0 15px 15px 0;
}
.left-column {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #fff;
  height: 80vh;
  padding: 30px 30px 30px 30px;
  border-radius: 15px 0 0 15px;
  justify-content: center;
}

.card {
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  font-size: 24px;
}

.small-card {
  background-color: #fff;
  padding: 15px;
  border-radius: 15px;
  height: 90px;
  width: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.small-card:hover {
  box-shadow: 0 0 15px #a4a6ac;
}

.small-card-value {
  font-family: "Courier New", Courier, monospace;
  font-size: 24px;
  color: #1e1714;
  font-weight: bold;
}
.small-card-title {
  font-family: "Courier New", Courier, monospace;
  font-size: 16px;
  color: #a4a6ac;
}

.bottom-banner {
  background-color: #a4a6ac;
  height: 30px;
  padding: 20px;
}

.temp {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.temp-value {
  font-family: "Courier New", Courier, monospace;
  font-size: 100px;
  font-weight: bold;
}

.degree {
  font-family: "Courier New", Courier, monospace;
  font-size: 50px;
  font-weight: bold;
}

.temp-label {
  font-family: "Courier New", Courier, monospace;
  color: #a4a6ac;
  font-weight: bold;
  font-size: 32px;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.loadingText {
  font-family: "Courier New", Courier, monospace;
  color: #1e1714;
  font-size: 36px;
}

.canvas {
  display: flex;
  flex-direction: column;
  justify-content: center;
  vertical-align: center;
}

.text {
  margin-left: 10px;
}
.mx-datepicker {
  margin: 0 5px 0 5px;
  border: 1px solid white;
}

.button {
  background-color: white;
  border-radius: 15px;
  border: 1px solid white;
  height: 40px;
  box-shadow: 0 0 15px #a4a6ac;
  margin-left: 5px;
  width: 150px;
  cursor: pointer;
}
</style>
