<template>
  <div class="photos-new">
    <h1>New Car</h1>
    <form v-on:submit.prevent="createCar()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Make:</label> 
        <input type="text" class="form-control" v-model="newcarMake">
      </div>
      <div class="form-group">
        <label>Model:</label> 
        <input type="text" class="form-control" v-model="newcarModel">
      </div>
      <div class="form-group">
        <label>Color:</label> 
        <input type="text" class="form-control" v-model="newcarColor">
      </div>
      <div class="form-group">
        <label>Year:</label> 
        <input type="text" class="form-control" v-model="newcarYear">
      </div>
      <div class="form-group">
        <label>Description:</label> 
        <input type="text" class="form-control" v-model="newcarDescription">
      </div>
      <div class="form-group">
        <label>Miles:</label> 
        <input type="text" class="form-control" v-model="newcarMiles">
      </div>
      <div class="form-group">
        <label>Image Url:</label> 
        <input type="text" class="form-control" v-model="newcarUrl">
      </div>
      <div class="form-group">
        <label>VIN:</label> 
        <input type="text" class="form-control" v-model="newcarVin">
      </div>
      <div class="form-group">
        <label>Category ID:</label> 
        <input type="text" class="form-control" v-model="newcarcategoryId">
      </div>
      <h5>Auctions expire after 2 weeks</h5>
      <br>
      <input class="btn btn-primary" type="submit" value="Create" />
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
      errors: [],
    };
  },
  created: function() {},
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
          this.$router.push("/cars");
        })
        .catch(error => {
          console.log("cars create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>