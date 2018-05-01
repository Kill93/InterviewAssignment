<template>
  <div id="day">

    <img :src='imageSRC'>
    <br>
    <br>

    <table class="table">
      <thead class="thead-dark">
      <tr>
        <th scope="col"><i class="wi wi-time-1"></i></th>
        <th scope="col">Atmospheric Pressure</th>
        <th scope="col">Wind Direction </th>
        <th scope="col">Wind Speed</th>
        <th scope="col">Gust</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="metric in metrics" >
          <th>{{ date1(metric.timeDate) }}</th>
          <td>{{ metric.AtmosphericTitle}}</td>
          <td @mouseover="showDirection(metric.id)" @mouseleave="hideDirection((metric.id))"><i :class='metric.WindDirectionClass'></i>
          </td>
          <td>{{ metric.WindSpeedTitle}}</td>
          <td>{{ metric.Gust}}</td>
        <div class="direction" style="visibility: hidden" :id='metric.id'>
          <p> {{ metric.WindDirection}} Degrees</p>
          <p> {{ metric.WindDirectionTitle}} Direction</p>
        </div>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>

  import axios from "axios";
  import moment from 'moment'

  export default {
    props: ['years', 'locationID', 'locationTitle', 'day'],
    name: 'home',
    data () {
      return {
        selectedYear: '',
        selectedMonth: '',
        metrics: [],
        active: false,
        imageSRC: ''
      }
    },
    mounted() {
      this.getDayData()
      if (this.locationID == 'M1'){
        this.imageSRC = "./src/assets/images/kinsale.jpg"
      }
      else if (this.locationID == 'M2'){
        this.imageSRC = "./src/assets/images/crosshaven.jpg"
      }
      else if (this.locationID == 'M3'){
        this.imageSRC = "./src/assets/images/cobh.jpg"
      }
      else if (this.locationID == 'FS1'){
        this.imageSRC = "./src/assets/images/youghal.jpg"
      }
      else if (this.locationID == 'M4-Archive'){
        this.imageSRC = "./src/assets/images/skibereen.jpg"
      }
      else if (this.locationID == 'M5'){
        this.imageSRC = "./src/assets/images/bantry.jpg"
      }
      else if (this.locationID == 'M6'){
        this.imageSRC = "./src/assets/images/ballydehob.jpg"
      }
      else if (this.locationID == 'M4'){
        this.imageSRC = "./src/assets/images/skibereen.jpg"
      }
      else if (this.locationID == 'Belmullet-AMETS'){
        this.imageSRC = "./src/assets/images/rosscarbery.jpg"
      }
    },
    methods: {
      showDirection(id){
        var element = document.getElementById(id);
        document.getElementById(id).style.visibility = "visible";
        console.log(element)
      },
      hideDirection(id){
        document.getElementById(id).style.visibility = "hidden";
      },
      date1(date2) {
        return moment(String(date2)).format('HH:00')
      },
      getDayData(){
        console.log('hi')

        var Object = {
          "id": this.locationID,
          "day": this.day
        }

        axios({
          url: 'https://server-killian.cfapps.io/getDayData',
          method: 'post',
          contentType: 'application/json',
          data: Object,
        }).then(result => {
          console.log(result)
          var results = [];
          var i = 0;

          for (i = 0; i < result.data.length; i++) {

            var metric = {
              "id": i,
              "timeDate": result.data[i].timeDate,
              "AtmosphericPressure": result.data[i].AtmosphericPressure,
              "AtmosphericTitle": '',
              "WindDirection": result.data[i].WindDirection,
              "WindDirectionTitle": '',
              "WindDirectionClass": 'wi wi-wind towards-'+ result.data[i].WindDirection + '-deg',
              "WindSpeedTitle": '',
              "WindSpeed": result.data[i].WindSpeed,
              "Gust": result.data[i].Gust + ' knots',
            }

            //Atmosphere Title
              if (result.data[i].AtmosphericPressure > 1086){
                metric.AtmosphericTitle = "Very High"
              }
              else if (result.data[i].AtmosphericPressure >= 1030 && result.data[i].AtmosphericPressure <= 1085.99){
                metric.AtmosphericTitle = "High"
              }
              else if (result.data[i].AtmosphericPressure >= 1013 && result.data[i].AtmosphericPressure <= 1084.99){
                metric.AtmosphericTitle = "Average"
              }
              else if (result.data[i].AtmosphericPressure >= 1000 && result.data[i].AtmosphericPressure <= 1012.99){
                metric.AtmosphericTitle = "Low"
              }
              else if (result.data[i].AtmosphericPressure >= 980 && result.data[i].AtmosphericPressure <= 999.99){
                metric.AtmosphericTitle = "CAT 1 Hurricane"
              }
              else if (result.data[i].AtmosphericPressure >= 950 && result.data[i].AtmosphericPressure <= 979.99){
                metric.AtmosphericTitle = "CAT 3 Hurricane"
              }
              else if (result.data[i].AtmosphericPressure >= 870 && result.data[i].AtmosphericPressure <= 949){
                metric.AtmosphericTitle = "Lowest Recording"
              }
              else {
                metric.AtmosphericTitle = "No Data"
              }

              //WindTitle
            if (result.data[i].WindSpeed <= 1){
              metric.WindSpeedTitle = "Calm"
            }
            else if (result.data[i].WindSpeed >= 1 && result.data[i].WindSpeed <= 3.99){
              metric.WindSpeedTitle = "Light Air"
            }
            else if (result.data[i].WindSpeed >= 3 && result.data[i].WindSpeed <= 6.99){
              metric.WindSpeedTitle = "Light Breeze"
            }
            else if (result.data[i].WindSpeed >= 6 && result.data[i].WindSpeed <= 10.99){
              metric.WindSpeedTitle = "Gentle Breeze"
            }
            else if (result.data[i].WindSpeed >= 10 && result.data[i].WindSpeed <= 16.99){
              metric.WindSpeedTitle = "Moderate Breeze"
            }
            else if (result.data[i].WindSpeed >= 17 && result.data[i].WindSpeed <= 21.99){
              metric.WindSpeedTitle = "Fresh Breeze"
            }
            else if (result.data[i].WindSpeed >= 22 && result.data[i].WindSpeed <= 27.99){
              metric.WindSpeedTitle = "Strong Breeze"
            }
            else if (result.data[i].WindSpeed >= 28 && result.data[i].WindSpeed <= 33.99){
              metric.WindSpeedTitle = "High Wind, Moderate Gale"
            }
            else if (result.data[i].WindSpeed >= 34 && result.data[i].WindSpeed <= 40.99){
              metric.WindSpeedTitle = "Fresh Gale"
            }
            else if (result.data[i].WindSpeed >= 41 && result.data[i].WindSpeed <= 47.99){
              metric.WindSpeedTitle = "Strong/Severe Gale"
            }
            else if (result.data[i].WindSpeed >= 48 && result.data[i].WindSpeed <= 55.99){
              metric.WindSpeedTitle = "Storm"
            }
            else if (result.data[i].WindSpeed >= 56 && result.data[i].WindSpeed <= 63.99){
              metric.WindSpeedTitle = "Voilent Storm"
            }
            else if (result.data[i].WindSpeed >= 64){
              metric.WindSpeedTitle = "Hurricane Force"
            }
            if (result.data[i].WindSpeed == ''){
              metric.WindSpeedTitle = "No Data"
            }



            //Wind Direction Title
            if (result.data[i].WindDirection <= 11.25 && result.data[i].WindDirection <= 33.74){
              metric.WindDirectionTitle = "North - North East"
            }
            else if (result.data[i].WindDirection <= 33.75 && result.data[i].WindDirection <= 56.24){
              metric.WindDirectionTitle = "North East"
            }
            else if (result.data[i].WindDirection <= 56.25 && result.data[i].WindDirection <= 78.74){
              metric.WindDirectionTitle = "East - North East"
            }
            else if (result.data[i].WindDirection <= 78.75 && result.data[i].WindDirection <= 101.24){
              metric.WindDirectionTitle = "East"
            }
            else if (result.data[i].WindDirection <= 101.25 && result.data[i].WindDirection <= 123.74){
              metric.WindDirectionTitle = "East - South East"
            }
            else if (result.data[i].WindDirection <= 123.75 && result.data[i].WindDirection <= 146.24){
              metric.WindDirectionTitle = "South East"
            }
            else if (result.data[i].WindDirection <= 146.25 && result.data[i].WindDirection <= 168.74){
              metric.WindDirectionTitle = "South - South East"
            }
            else if (result.data[i].WindDirection <= 168.75 && result.data[i].WindDirection <= 191.24){
              metric.WindDirectionTitle = "South"
            }
            else if (result.data[i].WindDirection <= 191.25 && result.data[i].WindDirection <= 213.74){
              metric.WindDirectionTitle = "South - South West"
            }
            else if (result.data[i].WindDirection <= 213.75 && result.data[i].WindDirection <= 236.24){
              metric.WindDirectionTitle = "South West"
            }
            else if (result.data[i].WindDirection <= 236.25 && result.data[i].WindDirection <= 258.74){
              metric.WindDirectionTitle = "West - South West"
            }
            else if (result.data[i].WindDirection <= 258.75 && result.data[i].WindDirection <= 281.24){
              metric.WindDirectionTitle = "West"
            }
            else if (result.data[i].WindDirection <= 281.25 && result.data[i].WindDirection <= 303.74){
              metric.WindDirectionTitle = "West - North West"
            }
            else if (result.data[i].WindDirection <= 303.75 && result.data[i].WindDirection <= 326.24){
              metric.WindDirectionTitle = "North West"
            }
            else if (result.data[i].WindDirection <= 326.24 && result.data[i].WindDirection <= 348.75){
              metric.WindDirectionTitle = "North- North West"
            }
            else {
              metric.WindDirectionTitle = "North"
            }

            if (result.data[i].Gust ==0 ){
              metric.Gust = "No Data"
            }

            results.push(metric);
          }
          this.metrics = results;
          console.log(results)

        }).catch(error => {
          console.log(error);
        });
      }
    }
  }
</script>

<style>

  #day{
    min-height: 70vh;
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

  .table {
    width: 60%;
    margin: auto;
  }

  i {
    font-size: 3em;
  }

  th i {
    color: #00FFFF
  }

  img {
    height: 200px;
    width: 700px;
  }

  .direction {
    height: 100px;
    width: 200px;
    position: absolute;
    margin-left: -340px;
    background-color: #F0F8FF;
    border-style: double;
    border-color: #00FFFF;
  }
</style>
