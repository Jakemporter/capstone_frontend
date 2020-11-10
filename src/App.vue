<template>
  <div id="app">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <img id="logo" src="./assets/logo.png">
      <a class="navbar-brand" href="/cars">Car Auction</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/cars">All Cars
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a v-if="isLoggedIn()" class="nav-link" href="/cars/new">New Car</a>
          </li>
          <li v-if="!isLoggedIn()" class="nav-item">
            <a class="nav-link" href="/signup">Signup</a>
          </li>
          <li v-if="!isLoggedIn()" class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>
          <li v-if="isLoggedIn()" class="nav-item">
            <a class="nav-link" href="/logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view/>
  </div>
      <footer class="py-5 bg-dark">
    <div class="container">
      <p class="m-0 text-center text-white">Copyright &copy; Car Auction 2020</p>
    </div>
    <!-- /.container -->
  </footer>
  </div>
</template>

<style>
#logo {
  width: 100px;
}
</style>

<script>
export default {
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
  },
};
</script>