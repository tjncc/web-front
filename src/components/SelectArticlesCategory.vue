<template>
  <div class="mainPage">
      <router-view name="header"></router-view>
    <h2 class="oglasi">Aktuelni oglasi:</h2>
    <div class="svioglasi">
    <div class="oglas" v-for="oglas in oglasi" v-bind:key="oglas.naziv" >
     
      <div class="gore" v-on:click="otvori(oglas.naziv)">
        <h3 class="nazivOglasa"> {{ oglas.naziv }}</h3>
        <h4 class="cenaOglasa">{{ oglas.cena }}€</h4>
      </div>
      <div class="slika">
      <img class="imgOglasa" v-bind:src="`${oglas.slika}`" v-on:click="otvori(oglas.naziv)">
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
    this.$http.get('http://localhost:9090/WebProj/articleinfo',{headers:this.headers}).then(response =>{
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
  margin: 28px 0 14px 10px;
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
  border: 3px solid #d0cad6;
  cursor: pointer;
  
}



.imgOglasa{
  width: auto;
  max-height: 165px;
  max-width: 215px;
  align-self: center;
  margin: 4px;
  object-fit: contain;

}

.gore{
  background-color: #d0cad6;
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




</style>