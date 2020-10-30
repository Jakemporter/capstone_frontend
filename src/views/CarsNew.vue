<template>
  <div class="photos-new">
    <h1>New Car</h1>
    <form v-on:submit.prevent="createCar()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Make: <input type="text" v-model="newcarMake" />
      Model: <input type="text" v-model="newcarModel" />
      Color: <input type="text" v-model="newcarColor" />
      Year: <input type="text" v-model="newcarYear" />
      Description: <input type="text" v-model="newcarDescription" />
      Miles: <input type="text" v-model="newcarMiles" />
      Image Url: <input type="text" v-model="newcarUrl" />
      Category ID: <input type="text" v-model="newcarcategoryId" />
      <br>
      <input type="submit" value="Create" />
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