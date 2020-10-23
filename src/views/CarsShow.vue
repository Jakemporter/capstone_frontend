<template>
  <div class="cars-show">
    <h4>{{ car.make }}</h4>
    <p>{{ car.model }}</p>
    <p>Color: {{ car.color }}</p>
    <p>Year: {{ car.year }}</p>
    <p>Miles: {{car.miles }}</p>
    <p>Description: {{ car.description }}</p>
    <p>Current Bid: {{ car.current_bid }}</p>
    <p>Categories: {{ car.categories[0]["name"] }}</p>
    <p>Bids: {{ car.bids[0]["bid"] }}</p>
    <p>Comments: {{ car.comments[0]["comment"] }} User: {{car.comments[0]["user"]}}</p>
    <img v-bind:src="car.images[0][`url`]" v-bind:alt="car.model" />
    <br>
    <router-link to="/cars">Back to all cars</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      car: {images: [{}], comments: [{}], bids: [{}], categories: [{}]},
    };
  },
  created: function() {
    axios.get("/api/cars/" + this.$route.params.id).then(response => {
      console.log("cars show", response);
      this.car = response.data;
    });
  },
  methods: {},
};
</script>