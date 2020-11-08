<template>
  <div class="cars-index">
    <h1>All Cars</h1>
    <div class="row">
    <div v-for="car in cars" class="col-lg-3 col-md-6 mb-4">
        <div class="card h-100">
          <img class="card-img-top" v-bind:src="car.images[0][`url`]" alt="">
          <div class="card-body">
            <h5 class="card-title">{{ car.make }} {{ car.model }}</h5>
            <p class="card-text">Year: {{ car.year}}</p>
            <p class="card-text">Miles: {{ car.miles}}</p>
            <p class="card-text">Color: {{ car.color}}</p>
            <p class="card-text">Current Bid: {{ car.current_bid }}</p>
            <p>Categories: </p>
            <div v-for="category in car.categories">
              <p class="card-text">{{ category.name}}</p>
            </div>
          </div>
          <div class="card-footer">
            <a :href="`/cars/${car.id}`" class="btn btn-primary">Find Out More!</a>
          </div>
        </div>
      </div>
  </div>
    </div>
</template>

<style>
  .card-text {
    max-height: 125px;
    overflow: scroll;
  }
  /* .card-img-top {
    height: 180px;
  } */
</style>

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