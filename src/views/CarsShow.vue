<template>
  <div class="cars-show">
    <h4>{{ car.make }} {{ car.model }}</h4>
    <p>Owner: {{car.username}}</p>
    <p>Color: {{ car.color }}</p>
    <p>Year: {{ car.year }}</p>
    <p>Miles: {{car.miles }}</p>
    <p>Description: {{ car.description }}</p>
    <p>VIN: {{ car.VIN }}</p>
    <h5>Categories:</h5>
    <div v-for="category in car.categories">
    <p>{{ category["name"] }}</p>
    </div>

    <div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Comments:
        </button>
      </h2>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
        <div v-for="comment in car.comments">
        <p>{{ comment["comment"] }} | User: {{comment["user"]}}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h2 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Bids:
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
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          More Info From Car VIN
        </button>
      </h2>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
      <div class="card-body">
        
        <p>Engine: {{ car.engine }} </p>
        <p>Engine Cylinders: {{ car.engine_cylinders }}</p>
        <p>Transmission: {{ car.transmission }}</p>
        <p>DriveTrain: {{ car.drivetrain }}</p>
        <p>Trim: {{ car.trim }}</p>
        <p>Doors: {{ car.doors }}</p>
        <p>Standard Towing: {{ car.standard_towing }}</p>
        <p>Maximum Towing: {{ car.maximum_towing }}</p>
        <p>Cargo Volume: {{ car.cargo_volume }}</p>
        <p>City MPG: {{ car.city_mileage }}</p>
        <p>Highway MPG: {{ car.highway_mileage }}</p>
        <p>Fuel Type: {{ car.fuel_type }}</p>
        <p>Fuel Tank: {{ car.fuel_capacity }}</p>
        <p>Seating: {{ car.standard_seating }}</p>
        <p>Curb Weight: {{ car.curb_weight }}</p>
        <p>Original MSRP: {{ car.original_msrp }}</p>
        <p>Made In: {{ car.made_in }}</p>
        <h5>Size:</h5>
        <p>   Height: {{ car.overall_height }}</p>
        <p>   Width: {{ car.overall_width }}</p>
        <p>   Length: {{ car.overall_length }}</p>

      </div>
    </div>
  </div>
</div>


    <h5>Highest Bidder: {{ car.username }} Bid: {{ car.current_bid }} </h5>
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
  .bid {
    padding: 1em;
    float: lefy;
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