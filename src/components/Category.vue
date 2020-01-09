<template>
    <div class="kategorijaContainter">
        <button v-if="this.$session.exists() && admin"  v-on:click="obrisiKategoriju" class="btnBrisi">Obrisi</button>
        <button v-if="this.$session.exists() && admin"  v-on:click="izmeniKategoriju" class="btnBrisi">Izmeni</button>
        <h1>{{kategorija.naziv}}</h1>
        <p class="opisKat">{{kategorija.opis}}</p>
       <!-- <button v-if="this.$session.exists() && admin"  v-on:click="dodajOglase" class="btnDodajOglase">Dodaj oglase</button> -->

        <div class="oglasiKategorije">
          
          <div class="omiljeniPrikaz" v-for="oglas in oglasi" v-bind:key="oglas.naziv" >
            <div class="gore" v-on:click="otvori(oglas.naziv)">
              <h3 class="nazivOglasa"> {{ oglas.naziv }}</h3>
               <h4 class="cenaOglasa">{{ oglas.cena }}€</h4>
            </div>
            <div >
              <img class="slika" v-bind:src="`${oglas.slika}`" v-on:click="otvori(oglas.naziv)">
            </div>

        </div>

    </div>
    </div>
</template>

<script>
export default {

  data () {
      return {
          kategorija: {
              naziv: "",
              opis: ""
          },
          oglasi: {},

        kupac: false,
        admin: false,
        prodavac: false,

        
        headers : {
          'Content-Type' : 'application/json'
          
        },

        textHeaders : {
          'Content-Type' : 'text/plain'
          
        }
      
          
      }
  },

  methods : {
      obrisiKategoriju : function() {
        this.$http.post(`http://localhost:9090/WebProj/category/delete/${this.$route.params.id}`, {headers:this.headers}).then(() =>{
         alert('Uspesno obrisana kategorija!')
         this.$router.push('/admin-profile')
         this.$router.go()
      })
      },

      izmeniKategoriju : function() {
          this.$router.push({name:'editCat', params:{id:this.kategorija.naziv}})
      },

      dodajOglase : function() {
          this.$router.push('/add-category-articles')
      },
      
      otvori(naziv){
        this.$router.push({name:'name', params:{id:naziv}})
    }

  },

  beforeCreate(){

    this.$http.get(`http://localhost:9090/WebProj/categoryinfo/${this.$route.params.id}`).then(response =>{
        this.kategorija = response.body;

       
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
       })
  
  },
  
  created(){
    this.$http.get(`http://localhost:9090/WebProj/category/articles/${this.$route.params.id}`).then(response =>{
      console.log(this.kategorija.naziv)
      this.oglasi = response.body;
    })
  }


}
</script>

<style scoped>

.kategorijaContainter{
    
    padding-top: 3.5%;
}

h1{

  color: #584a5f;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.opisKat{
    color: #584a5f;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    margin: 5px 65px 5px 260px;
}

.btnBrisi{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border: none;
    background: #423d42;
    color: #e7dde7;
    font-size: 16px;
    padding: 10px;
    float: right;
    margin-top: -35px;
    margin-right: 30px;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.1);
    cursor:pointer;
}

.btnBrisi:hover{
    color: #ddd8dd;
    background: #736f79;
}

.btnDodajOglase{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border: none;
    margin: 1% 0 2% 46%;
    font-size: 20px;
    padding: 10px;
    cursor:pointer;
    background: #cfc7e4;
    color: #4d4263;
}

.btnDodajOglase:hover{
    background: #b7afcf;
    color: #423955;
}

.omiljeniPrikaz{
  width: 250px;
  height: 250px;
  margin: 20px 0px 20px 55px;
  border: 3px solid #d0cad6;
  cursor: pointer;
  
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

.oglasiKategorije{
  margin-left: 206px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

</style>