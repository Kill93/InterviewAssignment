<template>
  <div id="app">
    <app-header @reset="reset" @setLocationTitle="setLocationTitle"></app-header>
<br>
    <h3> {{ locationTitle }}</h3>
    <br>
    <transition name="fade" mode="out-in">

    <router-view @reset="reset" @setDay="setDay" :years="years" :day="day" :locationID="locationID" :locationTitle="locationTitle" ></router-view>

    </transition>

    <app-footer></app-footer>
  </div>
</template>

<script>

  import axios from "axios";

export default {
  name: 'app',
  data () {
    return {
      locationTitle: '',
      locationID: '',
      day: '',
      years: [],
    }
  },
  methods: {
    setLocationTitle(name, id) {
      this.locationTitle = name
      this.locationID = id
      console.log(id)

      var idObject = {
        "id": id,
      }

      axios({
        url: 'https://server-killian.cfapps.io/locationYears',
        method: 'post',
        contentType: 'application/json',
        data: idObject,
      }).then(result => {
        var results = [];
        var i = 0;

        for (i = 0; i < result.data.length; i++) {

          var years = {
            "year": result.data[i].year,
          }
          results.push(years);
        }
        this.years = results;

        console.log(this.years)
      }).catch(error => {
        console.log(error);
      });

    },
    setDay(day){
      this.day = day.slice(0, 10);
      this.$router.push('/day')
    },
    reset(){
      this.day = '';
      this.locationTitle = ''
      this.locationID = ''
      this.years = ''
      this.$router.push('#/')
      console.log('reset')
    }
  }
}
</script>

<style>

  @import '../node_modules/bootstrap/dist/css/bootstrap.css';
  /*@import '/assets/css/weather-icons.css';*/
  /*@import '/assets/css/weather-icons-wind.css';*/

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

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .1s
  }

  .fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */

  {
    opacity: 0
  }

</style>
