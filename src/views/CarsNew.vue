<template>
  <div class="cars-new">
    <h1>New Car</h1>
    <form v-on:submit.prevent="createCar()" @submit="checkForm">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Make:</label>
        <input type="text" class="form-control" v-model="newcarMake" />
      </div>
      <div class="form-group">
        <label>Model:</label>
        <input type="text" class="form-control" v-model="newcarModel" />
      </div>
      <div class="form-group">
        <label>Color:</label>
        <input type="text" class="form-control" v-model="newcarColor" />
      </div>
      <div class="form-group">
        <label>Year:</label>
        <input type="text" class="form-control" v-model="newcarYear" />
      </div>
      <div class="form-group">
        <label>Description:</label>
        <input type="text" class="form-control" v-model="newcarDescription" />
      </div>
      <div class="form-group">
        <label>Miles:</label>
        <input type="text" class="form-control" v-model="newcarMiles" />
      </div>
      <div class="form-group">
        <label>Image Url:</label>
        <input type="text" class="form-control" v-model="newcarUrl" />
      </div>
      <div class="form-group">
        <label>VIN:</label>
        <input type="text" class="form-control" v-model="newcarVin" />
      </div>
      <div class="form-group">
        <label>Category:</label>
        <select v-model="newcarcategoryId" class="form-control">
          <option v-for="category in categories" v-bind:value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
      </p>
      <br>
      <h5>Auctions expire after 2 weeks</h5>
      <br>
      <input class="btn btn-primary" type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      newcarMake: "",
      newcarModel: "",
      newcarColor: "",
      newcarYear: "",
      newcarDescription: "",
      newcarMiles: "",
      newcarUrl: "",
      newcarVin: "",
      newcarcategoryId: "",
      categories: [],
      errors: [],
    };
  },
  created: function() {
    axios.get("/api/categories").then(response => {
      this.categories = response.data;
    });
  },
  methods: {
    createCar: function() {
      var params = {
        make: this.newcarMake,
        model: this.newcarModel,
        color: this.newcarColor,
        year: this.newcarYear,
        description: this.newcarDescription,
        miles: this.newcarMiles,
        image_url: this.newcarUrl,
        VIN: this.newcarVin,
        category_id: this.newcarcategoryId,
      };
      axios
        .post("/api/cars", params)
        .then(response => {
          console.log("cars create", response);
          this.$parent.flashMessage = "Car Added!";
          this.$router.push("/cars");
        })
        .catch(error => {
          console.log("cars create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    checkForm: function(e) {
      if (this.make && this.model && this.year) {
        return true;
      }
      this.errors = [];
      
      if (!this.newcarMake) {
        this.errors.push("Make Required");
      }
      if (!this.newcarModel) {
        this.errors.push("Model Required");
      }
      if (!this.newcarYear) {
        this.errors.push("Year Required");
      }
      
      e.preventDefault();
    },
  },
};
</script>
