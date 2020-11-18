<template>
  <div class="cars-index">
    <h1>All Cars</h1>
    Search: <input type="text" v-model="searchFilter" list="cars-make">
      <datalist id="cars-make">
        <option v-for="car in cars"> {{car.make }}</option>
      </datalist>
    <div class="row">
    <div v-for="car in filterBy(cars, searchFilter, 'make', 'model', 'categories', 'color', 'current_bid', 'year')" v-bind:key="car.id" class="col-lg-3 col-md-6 mb-4">
        <div v-if=!car.expired class="card h-100">
          <img class="card-img-top" v-bind:src="car.images[0][`url`]" alt="">
          <div class="card-body">
            <h5 class="card-title">{{ car.make }} {{ car.model }}</h5>
            <p class="card-text">Year: {{ car.year}}</p>
            <p class="card-text">Miles: {{ car.miles}}</p>
            <p class="card-text">Current Bid: {{ car.current_bid }}</p>
            <p class="card-text">Color: {{ car.color}}</p>
            <p class="card-text">Time Left: {{ car.time_left}}</p>
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
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  name: "CarsIndex",
  data: function() {
    return {
      searchFilter: "",
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