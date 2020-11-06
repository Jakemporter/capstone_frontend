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
    <p>Images:</p>
    <div v-for="image in car.images">
    <img v-bind:src="image[`url`]" v-bind:alt="car.model" />
    <br>
    </div>
    <div class="form-group">
        <label>Create Bid:</label> 
        <input type="text" class="form-control" v-model="newBid">
    </div>
    <button v-on:click="createBid()">Submit Bid </button>
    <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    <br>
    <router-link class="btn btn-primary" v-bind:to="`/cars/${car.id}/edit`">Edit car</router-link>
    <br>
    <router-link class="btn btn-primary" to="/cars">Back to all cars</router-link>
    <br>
    <button v-on:click="destroyCar(car)">Destroy car</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      car: {images: [{}], comments: [{}], bids: [{}], categories: [{}]},
      bid: [],
      newBid: "",
      errors: [],
    };
  },
  created: function() {
    axios.get("/api/cars/" + this.$route.params.id).then(response => {
      console.log("Cars Show", response);
      this.car = response.data;
    });
  },
  methods: {
    destroyCar: function(car) {
      axios.delete("/api/cars/" + car.id).then(response => {
        console.log("cars destroy", response);
        this.$router.push("/cars");
      });
    },
    createBid: function() {
      this.errors = [];
      var params = {
        bid: this.newBid,
        car_id: this.car.id,
      };
      axios
        .post("/api/bids", params)
        .then(response => {
          console.log("Bid Create", response);
          this.car.bids.push(response.data);
          this.newBid = "";
        })
        .catch(error => {
          console.log("Bid Create Error", error.response);
          this.errors = error.response.data.errors;
        });
    }
  },
};
</script>