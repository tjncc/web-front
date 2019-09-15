<template>
  <div class="mainPage">
    <h2 class="oglasi">Top 10 oglasa:</h2>
    <div class="svioglasi">
    <div class="oglas" v-for="oglas in oglasi" v-bind:key="oglas.naziv" >
     
      <div class="gore" v-on:click="otvori(oglas.naziv)">
        <h3 class="nazivOglasa"> {{ oglas.naziv }}</h3>
        <h4 class="cenaOglasa">{{ oglas.cena }}€</h4>
      </div>
      <div class="slika">
      <img v-bind:src="`${oglas.slika}`" v-on:click="otvori(oglas.naziv)">
      </div>

    </div>
    </div>
    
  </div>
</template>

<script>


export default {

  data () {
    return {

      oglasi: {},

       headers : {
        'Content-Type' : 'application/json'
      }
      

    }

  }, 

  methods: {
    otvori(naziv){
      this.$router.push({name:'name', params:{id:naziv}})
    }
  },

  created(){
    this.$http.get('http://localhost:9090/WebProj/toparticleinfo',{headers:this.headers}).then(response =>{
        this.oglasi = response.body;
        
    })
  }
}
</script>

<style scoped>

.mainPage{
  padding: 0 20px 10px 260px;
}

.oglasi{
  text-align: center;
  margin: 20px 0 11px 10px;
  padding: 8px;
  color: #7e747e;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: row;
}

.svioglasi{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: left;

}

.oglas{
  width: 215px;
  height: 215px;
  margin: 20px 0px 20px 20px;
  border: 3px solid #dddddd;
  cursor: pointer;
  
}

img{
  width: auto;
  max-height: 165px;
  align-self: center;
  margin: auto;
  object-fit: contain;
  
  
  
}

.gore{
  background-color: #dddddd;
  max-height: 40px;
}


.cenaOglasa{
  float: right;
  color: #ac3636;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 7px;
  padding: 6px;

  
}

.nazivOglasa{
  width: 55%;
  height: 22px;
  color: #423d42;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 7px;
  overflow: hidden;
}

.nazivOglasa, .cenaOglasa{
   display: inline-block;

}




.naziv{
  color: #423d42;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 5%;

}
/*
.fav{
  
  background-image:url('../assets/heart.png');
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 35px;
  width: 35px;
  
}

.fav:focus {
    background-image:url('../assets/red.png');
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  outline: none;
}
*/



</style>