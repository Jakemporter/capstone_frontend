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
            <p class="card-text">Expires: {{ bid.expires }}</p>
            <p class="card-text" id="green" v-if=bid.highest >Highest Bid?: {{ bid.highest }}</p>
            <p class="card-text" id="red" v-if=!bid.highest >Highest Bid?: {{ bid.highest }}</p>
          </div>
          <div class="card-footer">
            <a :href="`/cars/${bid.car_id}`" class="btn btn-primary">Go To Car</a>
          </div>
      </div>
    </div>
  </div>
  </div>


</template>

<style>
  #green {
    color: green;
  }
  #red{
    color: red;
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