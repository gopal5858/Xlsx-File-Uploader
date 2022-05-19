<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1 v-if="error">{{masg}}</h1>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">
    <input type="file" name="file" ref="file" @change="uploadFile" accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'>
    </form>
    <button @click="submitFile">Upload!</button>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      file: "",
      error: false,
      masg : ""
    }
  },
  
  methods: {
    uploadFile() {
        const File = this.$refs.file.files[0];
        const maxSize = 100000;
        const Large = File.size>maxSize;
        if(!Large){
          this.file = File
        }
        else{
          this.error = true,
          this.masg = `Maximum allowed size is ${maxSize/1000} Kb`
        }
      },
      async submitFile() {
        const formData = new FormData();
        formData.append('file', this.File);
        try{
          await axios.post('http://localhost:5000/uploadfile', formData);
        }
        catch(err){
          console.log(err);
        }
      }
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
