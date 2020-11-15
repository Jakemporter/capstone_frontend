<template>
  <div class="bids-index">
    <h1>All Your Bids</h1>
    <div class="bid" v-for="bid in bids">
      <p>ID: {{ bid.id }}</p>
      <p>Bid: {{ bid.bid }}</p>
      <p>Make: {{ bid.car_make }}</p>
      <p>Model: {{ bid.car_model }}</p>
      <p>Expired? {{ bid.expired }}</p>
      <img :src="bid.image" alt="">
    </div>
    <div class="end"></div>
  </div>
    
</template>

<style>
  .bid {
    float: left;
  }
  .end {
    clear: both;
  }
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