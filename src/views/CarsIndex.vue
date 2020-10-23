<template>
  <div class="cars-index">
    <h1>All Cars</h1>
    <div v-for="car in cars">
      <h4>{{ car.make }}</h4>
      <p>{{ car.model }}</p>
      <p>Color: {{ car.color }}</p>
      <p>Year: {{ car.year }}</p>
      <p>Miles: {{ car.miles }}</p>
      <p>Current Bid: {{ car.current_bid }}</p>
      <img v-bind:src="car.images[0][`url`]" v-bind:alt="car.model" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      cars: [],
    };
  },
  created: function() {
    axios.get("/api/cars").then(response => {
      console.log("cars index", response);
      this.cars = response.data;
    });
  },
  methods: {},
};
</script>