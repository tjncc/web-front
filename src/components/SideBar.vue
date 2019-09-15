<template>
    <div class="sidebar">
        <div class="sideHeader">
            <h3>Kategorije:</h3>
        </div>
        <div class="sideContent">
        <ul>
            <li v-for="kat in kategorije" v-bind:key="kat.naziv" >{{ kat.naziv }}</li>
        </ul>
        </div>
    </div>


</template>

<script>
export default {

  data () {
      return {
          kategorije: {}
          
      }
  },

  created(){
      this.$http.get('http://localhost:9090/WebProj/categoryinfo').then(response => {
          
          this.kategorije = response.body;
          
      }) 
  }

}
</script>

<style scoped>

.sidebar {

    width: 160px;
    position: fixed; 
    margin: 80px 0 0 10px;
    background-color: #ece9e2;
    padding: 0px 20px;
    max-height: 550px;

}

.sideHeader{
   
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-decoration: none;
    color: #4c464e;
    position: fixed;
    background: #ece9e2;
}

.sideContent{

    padding-top: 40px;
    overflow-y: auto;
    max-height: 500px;
    width: 180px;
    margin: 40px, 0, 10px, 0; 

}

ul{
    padding: 10px 0;
    
}

li{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #4c464e;
    list-style: none;
    padding: 10px;
    width: 100px;
    
}

li:hover {
    color: #b6b3b3;
    cursor: pointer;
}

</style>