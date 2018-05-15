<template>
  <div id="app">
    <div>
      <!-- As a heading -->
      <div class="navbar">
          <img src="./assets/title.png" class="logo" alt="newstter">
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};

</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: auto;
}

.navbar {
  background: linear-gradient(to right,#30303d , #660066);
  height: 64px;
}

img.logo {
  height: 48px !important;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0px;
}
a {
  color: #42b983;
}
a:hover {
  color: rgb(150, 219, 185);
  text-decoration: none;
}


</style>
