<template>
  <div id="home">

    <div id="notSelect" v-if="this.locationTitle == ''" >

      <h2> Please select an Area!</h2>

    </div>

    <div id="selected" v-if="this.locationTitle != ''" >

    <div id = "search"><select v-model="selectedYear">
      <option disabled value="">Please select an Year</option>
      <option v-for="year in years"> {{ year.year }}</option>
    </select>
      <br>
      <br>
      <select v-model="selectedMonth">
        <option disabled value="">Please select an Month</option>
        <option value = "01"> January</option>
        <option value = "02"> February</option>
        <option value = "03"> March </option>
        <option value = "04"> April </option>
        <option value = "05"> May</option>
        <option value = "06"> June</option>
        <option value = "07"> July</option>
        <option value = "08"> August</option>
        <option value = "09"> September</option>
        <option value = "10"> October</option>
        <option value = "11"> November</option>
        <option value = "12"> December </option>
      </select>
      <br><br>
      <a href="#" class="btn btn-info btn-lg" v-on:click="getData()">
        <span class="glyphicon glyphicon-search"></span> Search
      </a>
    </div>

    <br>
    <br>
    {{ noResult }}

    <table class="table" v-if="this.metrics != ''">
      <thead class="thead-dark">
      <tr>
        <th scope="col">Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="metric in metrics" >
        <a href="#" v-on:click="getDay(metric.timeDate)" >
          <th>{{ date1(metric.timeDate) }}</th>
        </a>
      </tr>
      </tbody>
    </table>
    </div>

  </div>
</template>

<script>

  import axios from "axios";
  import moment from 'moment'

  export default {
    props: ['years', 'locationID', 'locationTitle'],
    name: 'home',
    data () {
      return {
        selectedYear: '',
        selectedMonth: '',
        metrics: [],
        noResult:''
      }
    },
    methods: {
      date1(date2) {
        return moment(String(date2)).format('DD MMM')
      },
      getDay (day){
        this.$emit('setDay', day);
        console.log(day)
      },
      getData(){
        this.noResult=''

        console.log('hi')

        var Object = {
          "id": this.locationID,
          "date": this.selectedYear + '-' + this.selectedMonth
        }

        axios({
          url: 'https://server-killian.cfapps.io/getData',
          method: 'post',
          contentType: 'application/json',
          data: Object,
        }).then(result => {


          if(result.data.status == 'none'){
            this.noResult='No Records Found'
            console.log('no records')
          }

          console.log(result)
          var results = [];
          var i = 0;

          for (i = 0; i < result.data.length; i++) {

            var metric = {
              "locationID": result.data[i].locationID,
              "timeDate": result.data[i].timeDate,
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

  #home{
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
    width: 40%;
    margin: auto;
  }
</style>
