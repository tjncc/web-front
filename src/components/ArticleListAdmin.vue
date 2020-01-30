<template>
    <div class="container">

        <div class="dostupni">
            <h2 class="h2obican">Dostupni oglasi</h2>
        <div class="dostupniPrikaz" v-for="dostupni in dostupniOglasi" v-bind:key="dostupni.naziv" >
            <div class="gore" v-on:click="otvori(dostupni.naziv)">
              <h3 class="nazivOglasa"> {{ dostupni.naziv }}</h3>
               <h4 class="cenaOglasa">{{ dostupni.cena }}€</h4>
            </div>
            <div >
              <img class="slika" v-bind:src="`${dostupni.slika}`" v-on:click="otvori(dostupni.naziv)">
            </div>

        </div>

    </div>

    <div class="poruceni">
          <h2 class="h2obican">Oglasi u realizaciji</h2>
          <div class="dostupniPrikaz" v-for="poruceni in poruceniOglasi" v-bind:key="poruceni.naziv" >
            <div class="gore" v-on:click="otvori(poruceni.naziv)">
              <h3 class="nazivOglasa"> {{ poruceni.naziv }}</h3>
               <h4 class="cenaOglasa">{{ poruceni.cena }}€</h4>
            </div>
            <div >
              <img class="slika" v-bind:src="`${poruceni.slika}`" v-on:click="otvori(poruceni.naziv)">
            </div>

        </div>
    </div>

    <div class="dostavljeni">
            <h2 class="h2obican">Dostavljeni oglasi</h2>
        <div class="dostupniPrikaz" v-for="dostavljeni in dostavljeniOglasi" v-bind:key="dostavljeni.naziv" >
            <div class="gore" v-on:click="otvori(dostavljeni.naziv)">
              <h3 class="nazivOglasa"> {{ dostavljeni.naziv }}</h3>
               <h4 class="cenaOglasa">{{ dostavljeni.cena }}€</h4>
            </div>
            <div >
              <img class="slika" v-bind:src="`${dostavljeni.slika}`" v-on:click="otvori(dostavljeni.naziv)">
            </div>
        </div>            
        </div>

    </div>

</template>

<script>


export default {

  data () {
    return {

      dostupniOglasi: {},
      poruceniOglasi: {},
      dostavljeniOglasi: {},

      

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
    
    
    beforeCreate(){
        if (!this.$session.exists()) {
            this.$router.push('/');
        }
    },

  created(){
      /*
    this.$http.get('http://localhost:9090/WebProj/articleinfo',{headers:this.headers}).then(response =>{
        this.oglasi = response.body;
        
    })
    */
    this.$http.get(`http://localhost:9090/WebProj/articleinfo`,{headers:this.headers}).then(response =>{
        this.dostupniOglasi = response.body;
    })

    this.$http.get(`http://localhost:9090/WebProj/article-list-admin/poruceni`,{headers:this.headers}).then(response =>{
        this.poruceniOglasi = response.body;
    })

    this.$http.get(`http://localhost:9090/WebProj/article-list-admin/dostavljeni`,{headers:this.headers}).then(response =>{
        this.dostavljeniOglasi = response.body;
    })
  }
}
</script>

<style scoped>

.container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    margin: 80px 0 0 10px;
    
}

.h2obican{
  text-align: center;
  margin-top: 5%;
  color: #474347;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

 .dostupni, .poruceni, .dostavljeni{
  width: 27%;
  min-width: 310px;
  height: auto;
  margin: 20px 30px 20px 30px;
  
  
 }

.poruceni, .dostavljeni{
    border-left: 2px solid rgb(221, 209, 193);
}

 label{
     color: #3f3d41;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    padding: 10% 0 0 15%;
}


.dostupniPrikaz{
  height: 250px;
  width: 250px;
  margin: 30px 0px 20px 80px;
  border: 3px solid #d0cad6;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  
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

.slika{
  width: auto;
  max-height: 203px;
  max-width: 240px;
  align-self: center;
  margin: auto;
  object-fit: contain;
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


</style>