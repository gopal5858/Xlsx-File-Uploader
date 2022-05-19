<template>
  
  <div class="container">
      <h1>Get Data</h1>


      <table id = "table">
      <thead>
        <tr>
          <th class="center">id</th>
          <th class="center">Title</th>
          <th class="center">Author</th>
          <th class="center">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in User" v-bind:key="user._id" >
          <td class="text-left"> {{ user.id }}</td>
          <td class="text-left"> {{ user.title }}</td>
          <td class="text-left"> {{ user.author }}</td>
          <td class="text-left"> {{ user.date}}</td>
        </tr>
      </tbody>
    </table>
      </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
export default {
    name:'display',
    data() {
        return {
            User: [],
        }
    },
        mounted() {
        axios.get('http://localhost:5000/uploadfile')
            .then((response) => {
              this.User = response.data.data;
              console.log(response.data.data);
              console.log(this.User);
              // console.log(this.User[0].title);
            })
            .catch((error) => {
                console.log(error);
            });
    },
}
</script>

<style>
  #table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#table td, #table th {
  border: 1px solid rgb(120, 120, 120);
  padding: 8px;
}

#table tr:nth-child(even){background-color: #e8e8e8;}

#table tr:hover {background-color: #ddd;}

#table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #1f86ee;
  color: white;
}
</style>