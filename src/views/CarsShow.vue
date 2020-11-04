<template>
  <div class="cars-show">
    <h4>{{ car.make }}</h4>
    <p>{{ car.model }}</p>
    <p>Color: {{ car.color }}</p>
    <p>Year: {{ car.year }}</p>
    <p>Miles: {{car.miles }}</p>
    <p>Description: {{ car.description }}</p>
    <p>Current Bid: {{ car.current_bid }}</p>
    <div v-for="category in car.categories">
    <p>Categories: {{ category["name"] }}</p>
    </div>
    <div v-for="bid in car.bids">
    <p>Bids: {{ bid["bid"] }}</p>
    </div>
    <div v-for="comment in car.comments">
    <p>Comments: {{ comment["comment"] }} User: {{comment["user"]}}</p>
    </div>
    <div v-for="image in car.images">
    <img v-bind:src="image[`url`]" v-bind:alt="car.model" />
    <br>
    </div>
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