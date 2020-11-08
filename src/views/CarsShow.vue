<template>
  <div class="cars-show">
    <h4>{{ car.make }}</h4>
    <p>{{ car.model }}</p>
    <p>Owner: {{car.username}}</p>
    <p>Color: {{ car.color }}</p>
    <p>Year: {{ car.year }}</p>
    <p>Miles: {{car.miles }}</p>
    <p>Description: {{ car.description }}</p>
    <p>Current Bid: {{ car.current_bid }}</p>
    <h5>Categories:</h5>
    <div v-for="category in car.categories">
    <p>{{ category["name"] }}</p>
    </div>
    <h5>Bids:</h5>
    <div class="bids" v-for="bid in car.bids">
    <p>{{ bid["bid"] }} | User: {{ bid["user"] }}</p>
    </div>
    <br>
    <h5 class="comment">Comments:</h5>
    <div v-for="comment in car.comments">
    <p>{{ comment["comment"] }} | User: {{comment["user"]}}</p>
    </div>
    <h6>Images:</h6>
    <div v-for="image in car.images">
    <img v-bind:src="image[`url`]" v-bind:alt="car.model" />
    <router-link id="edit" v-if="isLoggedIn()" class="btn btn-primary" v-bind:to="`/images/${image.id}/edit`">Edit image</router-link>
    </div>
    <div v-if="isLoggedIn()" class="form-group">
        <label>Comment:</label>
        <input type="text" class="form-control" v-model="newComment">
        <br>
        <button class="btn btn-primary" v-on:click="createComment()">Submit Comment</button>
    </div>
    <div v-if="isLoggedIn()" class="form-group">
        <label>Create Bid:</label>
        <input type="text" class="form-control" v-model="newBid">
        <br>
        <button class="btn btn-primary" v-on:click="createBid()">Submit Bid</button>
    </div>
    <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    <br>
    <router-link v-if="isLoggedIn()" class="btn btn-primary" v-bind:to="`/cars/${car.id}/edit`">Edit car</router-link>
    <br>
    <router-link class="btn btn-primary" to="/cars">Back to all cars</router-link>
    <br>
    <button v-if="isLoggedIn()" class="btn btn-primary" v-on:click="destroyCar(car)">Destroy car</button>
  </div>
</template>

<style>
  img {
    max-height: 200px;
    max-width: 400px;
    padding: 1em;
  }
  .bids {
    padding: 1em;
    float: left;
  }
  .comment {
    clear: both;
  }
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      car: {images: [{}], comments: [{}], bids: [{}], categories: [{}]},
      bid: [],
      newBid: "",
      newComment: "",
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
          this.car.current_bid = response.data.bid;
          this.newBid = "";
        })
        .catch(error => {
          console.log("Bid Create Error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    createComment: function() {
      this.errors = [];
      var params = {
        comment: this.newComment,
        car_id: this.car.id,
      };
      axios
        .post("/api/comments", params)
        .then(response => {
          console.log("Comment Create", response);
          this.car.comments.push(response.data);
          this.newComment = "";
        })
        .catch(error => {
          console.log("Comment Create Error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
  },
};
</script>