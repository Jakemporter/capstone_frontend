<template>
  <div class="photos-edit">
    <h1>Edit image</h1>
    <form v-on:submit.prevent="updateImage(image)">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Url: <input type="text" v-model="image.url" />
      <input class="btn btn-primary" type="submit" value="Update" />
      <br>
      <button class="btn btn-primary" v-on:click="destroyImage(image)">Destroy Image</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      image: {},
      errors: [],
    };
  },
  created: function() {
    axios.get("/api/images/" + this.$route.params.id).then(response => {
      console.log("images show", response);
      this.image = response.data;
    });
  },
  methods: {
    updateImage: function(image) {
      var params = {
        url: image.url,
      };
      axios
        .patch("/api/images/" + image.id, params)
        .then(response => {
          console.log("images update", response);
          this.$router.push("/cars/" + image.car.id);
        })
        .catch(error => {
          console.log("images update error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyImage: function(image) {
      axios.delete("/api/images/" + image.id).then(response => {
        console.log("images destroy", response);
        this.$router.push("/cars/" + image.car.id);
      });
    },
  },
};
</script>