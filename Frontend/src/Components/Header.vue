<template>
  <div id="header">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#/" @click="reset()">Metrics</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active" v-for="location in locations" >
            <a class="nav-link" href="#/" @click="setLocationTitle(location.name, location.id)" >{{ location.name }}</a>
          </li>
        </ul>
      </div>
    </nav>

  </div>
</template>

<script>

  import axios from "axios";

  export default {
    name: 'header',
    data () {
      return {
        locations: ''
      }
    },
    mounted() {
    this.searchLocations()
    },
    methods: {
      searchLocations() {
        axios({method: "GET", "url": "https://server-killian.cfapps.io/locationMap"}).then(result => {
          var results = [];
          var i = 0;

          for (i = 0; i < result.data.length; i++) {

              var locations = {
                "id": result.data[i].id,
                "name": result.data[i].location,
              }

              if (result.data[i].id == 'M4-Archive'){
                locations.name= result.data[i].location + ' archived'
              }
              results.push(locations);
            }
          this.locations = results;

        }).catch(error => {
          console.log(error);
        });
      },
      setLocationTitle(title, id){
        this.reset()
        this.$emit('setLocationTitle', title, id);
      },
      reset(){
        this.$emit('reset');
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
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
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
