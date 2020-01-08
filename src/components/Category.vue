<template>
    <div class="kategorijaContainter">
        <button v-if="this.$session.exists() && admin"  v-on:click="obrisiKategoriju" class="btnBrisi">Obrisi</button>
        <button v-if="this.$session.exists() && admin"  v-on:click="izmeniKategoriju" class="btnBrisi">Izmeni</button>
        <h1>{{kategorija.naziv}}</h1>
        <p class="opisKat">{{kategorija.opis}}</p>


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

        kupac: false,
        admin: false,
        prodavac: false,
          
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
    color: #c4bdc4;
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

</style>