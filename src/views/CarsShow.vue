<template>
  <div class="cars-show">
    <h4>{{ car.make }} {{ car.model }}</h4>
    <p>Time Left: {{ car.time_left }}</p>
    <p>Owner: {{ car.username }}</p>
    <p>Color: {{ car.color }}</p>
    <p>Year: {{ car.year }}</p>
    <p>Miles: {{ car.miles }}</p>
    <p>Description: {{ car.description }}</p>
    <p>VIN: {{ car.VIN }}</p>
    <h5>Categories:</h5>
    <div v-for="category in car.categories">
      <p>{{ category["name"] }}</p>
    </div>
    <h5>Current Bid: {{ car.current_bid }}</h5>

    <div class="accordion" id="accordionExample">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h2 class="mb-0">
            <button
              class="btn btn-link"
              type="button"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Comments:
            </button>
          </h2>
        </div>

        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
          <div class="card-body">
            <div v-for="comment in car.comments">
              <p>{{ comment["comment"] }} | User: {{ comment["user"] }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingTwo">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Previous Bids:
            </button>
          </h2>
        </div>
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
          <div class="card-body">
            <div class="bids" v-for="bid in car.bids">
              <p>{{ bid["bid"] }} | User: {{ bid["user"] }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingThree">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              More Info From Car VIN
            </button>
          </h2>
        </div>
        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
          <div class="card-body">
            <div v-if="car_vin.auction_values">
              <h5>Current Auction Values:</h5>
              <p>Low Auction Value: {{ car_vin.auction_values["lowAuctionValue"] }}</p>
              <p>Average Auction Value: {{ car_vin.auction_values["averageAuctionValue"] }}</p>
              <p>High Auction Value: {{ car_vin.auction_values["highAuctionValue"] }}</p>
              <p>==============================================</p>
            </div>
            <h5>Vehicle Info</h5>
            <p>Avgerage Trade In Value: {{ car_vin.avg_trade_in }}</p>
            <p>Engine: {{ car_vin.engine }}</p>
            <p>Engine Cylinders: {{ car_vin.engine_cylinders }}</p>
            <p>Transmission: {{ car_vin.transmission }}</p>
            <p>DriveTrain: {{ car_vin.drivetrain }}</p>
            <p>Trim: {{ car_vin.trim }}</p>
            <p>Doors: {{ car_vin.doors }}</p>
            <p>Standard Towing: {{ car_vin.standard_towing }}</p>
            <p>Maximum Towing: {{ car_vin.maximum_towing }}</p>
            <p>Cargo Volume: {{ car_vin.cargo_volume }}</p>
            <p>City MPG: {{ car_vin.city_mileage }}</p>
            <p>Highway MPG: {{ car_vin.highway_mileage }}</p>
            <p>Fuel Type: {{ car_vin.fuel_type }}</p>
            <p>Fuel Tank: {{ car_vin.fuel_capacity }}</p>
            <p>Seating: {{ car_vin.standard_seating }}</p>
            <p>Curb Weight: {{ car_vin.curb_weight }}</p>
            <p>Original MSRP: {{ car_vin.original_msrp }}</p>
            <p>Made In: {{ car_vin.made_in }}</p>
            <p>==============================================</p>
            <h5>Size:</h5>
            <p>Height: {{ car_vin.overall_height }}</p>
            <p>Width: {{ car_vin.overall_width }}</p>
            <p>Length: {{ car_vin.overall_length }}</p>
          </div>
        </div>
      </div>
    </div>

    <br />
    <h6>Images:</h6>
    <div v-for="image in car.images">
      <img v-bind:src="image[`url`]" v-bind:alt="car.model" />
      <router-link id="edit" v-if="isLoggedIn()" class="btn btn-primary" v-bind:to="`/images/${image.id}/edit`">
        Edit image
      </router-link>
    </div>
    <div v-if="isLoggedIn()" class="form-group">
      <label>Comment:</label>
      <input type="text" class="form-control" v-model="newComment" />
      <br />
      <button class="btn btn-primary" v-on:click="createComment()">Submit Comment</button>
    </div>
    <div v-if="isLoggedIn()" class="form-group">
      <label>Create Bid:</label>
      <input type="text" class="form-control" v-model="newBid" />
      <br />
      <button class="btn btn-primary" v-on:click="createBid()">Submit Bid</button>
    </div>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <br />
    <router-link v-if="isLoggedIn()" class="btn btn-primary" v-bind:to="`/cars/${car.id}/edit`">Edit car</router-link>
    <br />
    <router-link class="btn btn-primary" to="/cars">Back to all cars</router-link>
    <br />
    <button v-if="isLoggedIn()" class="btn btn-primary" v-on:click="destroyCar(car)">Destroy car</button>
  </div>
</template>

<style>
img {
  max-height: 200px;
  max-width: 400px;
  padding: 1em;
}
.bid {
  padding: 1em;
  float: left;
  margin: 5px;
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
      car: { images: [{}], comments: [{}], bids: [{}], categories: [{}], auction_values: [] },
      car_vin: { auction_values: [] },
      bid: [],
      newBid: "",
      newComment: "",
      errors: [],
      loading: true,
    };
  },
  created: function() {
    axios
      .get("/api/cars/" + this.$route.params.id)
      .then(response => {
        console.log("Cars Show", response);
        console.log("Lots of data. Please be patient.");
        this.car = response.data;
        this.loading = false;
      })
      .catch(error => {
        console.log("photos create error", error.response);
      });
    axios
      .get("/api/cars_vin/" + this.$route.params.id)
      .then(response => {
        console.log("Cars Show", response);
        console.log("Lots of data. Please be patient.");
        this.car_vin = response.data;
        this.loading = false;
      })
      .catch(error => {
        console.log("photos create error", error.response);
      });
  },
  methods: {
    destroyCar: function(car) {
      axios.delete("/api/cars/" + car.id).then(response => {
        console.log("cars destroy", response);
        this.$parent.flashMessage = "Car Deleted!";
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
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
  },
};
</script>
