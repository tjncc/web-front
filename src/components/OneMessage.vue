<template>
    <div class="divPoruka">
        <div class="datum"><p>{{ this.poruka.dateAndTime }}</p></div>
        <div class="prviRed">
            <div class="levoPrvi"><p>Naslov: </p></div>
            <div class="desnoPrvi"><p>{{ this.poruka.naslov }}</p></div>
        </div>
        <div class="prviRed">
            <div class="levoPrvi"><p>Pošiljalac: </p></div>
            <div class="desnoPrvi"><p>{{ this.poruka.posiljalac }}</p></div>
        </div>

        <div class="prviRed" v-if="poruka.naziv">
            <div class="levoPrvi"><p>Oglas: </p></div>
            <div class="desnoPrvi"><p class="oglasKlik" v-on:click="otvori">{{ this.poruka.naziv }}</p></div>
        </div>

        <div class="prviRed">
            <div class="levoPrvi"><p>Sadržaj: </p></div>
            <div class="desnoPrvi"><p>{{ this.poruka.sadrzaj }}</p></div>

        </div>

    <div class="dugmad">
        <button class="dugmeOdg" v-if="!poslaoAdmin && !automatska" v-on:click="odgovori()">Odgovori</button>
        <button class="dugmeBrisi" v-on:click="obrisi()"><img class="brisiIcon" src="../assets/bin.svg"></button>
    </div>


    </div>


</template>

<script>
export default {

  data () {
      return {
          poruka: {},

        kupac: false,
        admin: false,
        prodavac: false,

        poslaoAdmin: false,
        automatska: false,
          
      }
  },

  methods : {

      odgovori : function() {
          this.$router.push({name:'response', params:{id:this.poruka.idPoruka}})
      },

      obrisi : function() {
          this.$http.post(`http://localhost:9090/WebProj/deletemessage/${this.$route.params.id}`,{headers:this.headers}).then((response) => {
              alert('Poruka je obrisana!');
              this.$router.push('/messages');
          })
      },

      otvori : function() {
          this.$router.push({name:'name', params:{id:this.poruka.naziv}})
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

            this.$http.get(`http://localhost:9090/WebProj/message/${this.$route.params.id}`,{headers:this.headers}).then((response) => {
                this.poruka = response.body;
                if(response.body.posiljalac === "admin"){
                    this.poslaoAdmin = true;
                }
                if(response.body.posiljalac === "Automatska poruka"){
                    this.automatska = true;
                }
            })
      } else {
          this.$router.push('/');
      }
  },


}
</script>

<style scoped>

.divPoruka{
    display: flex;
    flex-direction: column;
    margin: 8% 15% 10% 15%;
    background-color: rgb(245, 243, 247);
    padding: 2%;
}

.prviRed{
    display: flex;
    flex-direction: row;
}

.levoPrvi{
    padding: 2px 5px;
    margin: 0 10px;
    width: 11%;
      color: #6b626b;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.desnoPrvi{
    padding: 2px 5px;
    margin: 0 10px;
    width: 95%;
    color: #4e474e;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 16px;

}

.datum{
    margin-left: 82%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 14px;
}

.brisiIcon{
    width: 35px;
}

.dugmeOdg{
        color: #4e474e;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 19px;
    border: none;
    outline:none;
    background-color: #dfd9df;
    padding: 10px;
    cursor: pointer;
    box-shadow: 1px 1px 1px rgb(214, 212, 218);
}

.dugmeBrisi{
    background-color: transparent;
        border: none;
    outline:none;
    cursor: pointer;
    padding: 5px;
    float: right;
    box-shadow: 1px 1px 1px rgb(214, 212, 218);
}

.dugmeOdg:hover, .dugmeBrisi:hover {
    background-color: #ddd4dd;
}

.dugmad{
    margin-top: 3%;
    margin-bottom: -1%;
}

.oglasKlik{
    cursor: pointer;   
}

.oglasKlik:hover{
    color:black;
    
}

</style>