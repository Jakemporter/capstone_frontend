<template>
  <div class="bids-index">
    <h1>All Your Bids</h1>
    <div class="row">
    <div v-for="bid in bids" class="col-lg-3 col-md-6 mb-4">
      <div class="card h-100">
          <img class="card-img-top" v-bind:src="bid.image" alt="">
          <div class="card-body">
            <h5 class="card-title">Your Bid: {{ bid.bid }}</h5>
            <h6 class="card-text">Car: {{bid.car_make }} {{ bid.car_model }} </h6>
            <p class="card-text">Expired?: {{ bid.expired }}</p>
            <p class="card-text">Highest Bid?: {{ bid.highest }}</p>
          </div>
      </div>
    </div>
  </div>
  </div>


</template>

<style>

</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      bids: [],
    };
  },
  created: function() {
    axios.get("/api/bids").then(response => {
      console.log("bids index", response);
      this.bids = response.data;
    });
  },
  methods: {},
};
</script>