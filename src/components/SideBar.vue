<template>
    <div>
        <div class="btndiv" v-if="this.$session.exists() && admin">
        <button class="katbtn" v-if="this.$session.exists() && admin" v-on:click="dodajKateg">Dodaj kategoriju</button>
        </div>
        <div class="sidebar">
        <div class="sideHeader">
            
            <h3>Kategorije:</h3>
        </div>
        <div class="sideContent">
        <ul>
            <li v-for="kat in kategorije" v-bind:key="kat.naziv" v-on:click="otvori(kat.naziv)">{{ kat.naziv }}</li>
        </ul>
        </div>
        </div>
    </div>


</template>

<script>
export default {

  data () {
      return {
          kategorije: {},

        kupac: false,
        admin: false,
        prodavac: false,
          
      }
  },

  methods : {
        dodajKateg : function() {
            this.$router.push('/add-category');
        },
        otvori(naziv){
            this.$router.push({name:'categoryName', params:{id:naziv}})
            this.$router.go()
    }
  },

  beforeCreate(){
      if (this.$session.exists()) {
      this.$http.post('http://localhost:9090/WebProj/userinfo', this.$session.get('idOne') ,{headers:this.headers}).then((response) => {
          if(response.body.uloga === "KUPAC"){
            this.kupac = true;
          } else if (response.body.uloga === "ADMINISTRATOR"){
            this.admin = true;
          } else if (response.body.uloga === "PRODAVAC"){
            this.prodavac = true;
          }


        })
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
    background-color: #e7e2ec;
    padding: 0px 20px;
    max-height: 550px;

}

.sideHeader{
   
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-decoration: none;
    color: #4c464e;
    position: fixed;
    background: #e7e2ec;
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

.katbtn{
    
    padding: 8px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #5e5561;
    font-size: 17px;
    background: #d9d3df;
     border: none;
     cursor:pointer;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    outline: none;
    position: fixed;
    margin-top: 35px

}

.katbtn:hover{
    background: #423d42;
    color: #c4bdc4;
}

.btndiv{
    margin: 90px 0 -58px 37px;
}

</style>