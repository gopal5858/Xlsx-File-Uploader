
<template>
  <div class="control">
    <h3 v-if="error">{{msg}}</h3>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">
        <label for="file" >File Uploader!!!</label>
        <br><br><input type="file" class="custom-file-upload" name="file" ref="file" @change="selectFile" accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'>

      <button class="button" >Upload</button>
    </form>
    <br>
    <display/>
  </div>
</template>

<script>

import axios from "axios";
import display from './components/display';
export default {
  name: 'App',
  components: {
    display
  },

  data(){
    return{
      file: "",
      error: false,
      msg: ""
    }
  },

  methods:{
    selectFile(){
      const file=this.$refs.file.files[0];
      const maxSize = 10000;
      const Large = file.size>maxSize;
      if(!Large){
        this.file = file
      }
      else{
        this.error = true,
        this.msg = `File size is too large. Maximum allowed size is ${maxSize/1000} Kb`
      }

      
    },
    async sendFile(){
      const formData=new FormData();
      formData.append('file',this.file);

      try{
        await axios.post("http://localhost:5000/uploadfile", formData);
      } catch(err){
        console.log(err);
      }  
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h3 {
  margin: 40px 0 0;
}

button {
  background-color: #0943e3; /* Green */
  border: none;
  color: white;
  padding: 5px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
}

.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 1px 12px;
    cursor: pointer;
}


</style>
