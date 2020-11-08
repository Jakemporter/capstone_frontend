<template>
  <div class="cars-edit">
    <h1>Edit Car</h1>
    <form v-on:submit.prevent="updateCar(car)">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
        <div class="form-group">
        <label>Make:</label> 
        <input type="text" class="form-control" v-model="car.make">
      </div>
      <div class="form-group">
        <label>Model:</label> 
        <input type="text" class="form-control" v-model="car.model">
      </div>
      <div class="form-group">
        <label>Color:</label> 
        <input type="text" class="form-control" v-model="car.color">
      </div>
      <div class="form-group">
        <label>Year:</label> 
        <input type="text" class="form-control" v-model="car.year">
      </div>
      <div class="form-group">
        <label>Description:</label> 
        <input type="text" class="form-control" v-model="car.description">
      </div>
      <div class="form-group">
        <label>Miles:</label> 
        <input type="text" class="form-control" v-model="car.miles">
      </div>
      <div class="form-group">
        <label>New Image URL:</label>
        <input type="text" class="form-control" v-model="newImage">
      </div>
      <button id="button" class="btn btn-primary" v-on:click="createImage()">Add Image</button>
      <input id="button" class="btn btn-primary" type="submit" value="Update" />
    </form>
  </div>
</template>

<style>
  #button {
    margin: 5px;
  }
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      car: {images: [{}]},
      newImage: "",
      errors: [],
    };
  },
  created: function() {
    axios.get("/api/cars/" + this.$route.params.id).then(response => {
      console.log("cars show", response);
      this.car = response.data;
    });
  },
  methods: {
    updateCar: function(car) {
      var params = {
        make: car.make,
        model: car.model,
        color: car.color,
        year: car.year,
        miles: car.miles,
        description: car.description,
        url: car.images[0]["url"]
      };
      axios
        .patch("/api/cars/" + car.id, params)
        .then(response => {
          console.log("cars update", response);
          this.$router.push("/cars");
        })
        .catch(error => {
          console.log("cars update error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    createImage: function() {
      this.errors = [];
      var params = {
        url: this.newImage,
        car_id: this.car.id,
      };
      axios
        .post("/api/images", params)
        .then(response => {
          console.log("Image Create", response);
          this.newImage = "";
          this.$router.push("/cars/" + this.car.id);
        })
        .catch(error => {
          console.log("Image Create Error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>