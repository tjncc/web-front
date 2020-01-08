<template>
  <div class="container">
      <div class="levo">
      <div class="profil">
          <div class="imeKorisnika"> 
          <img class="usericon" src="../assets/user.svg">
            <label class="ime">{{ sellerInfo.korisnickoIme }} </label>
          </div>
        <div class="ocenaKorisnika">
          <img class="lajk" src="../assets/like.svg">
          <label class="brLajkova">{{ sellerInfo.brLajkova }}</label>
          <img class="dislajk" src="../assets/dislike.svg">
          <label class="brDislajkova">{{ sellerInfo.brDislajkova }}</label>
        </div>
      </div>
      
    <div class="dodajNovi">
          <label class="tekstNovi">Dodaj novi oglas</label>
          <button class="dugmeDodaj" v-on:click="dodajOglas"><img class="dodajSlika" src="../assets/add.svg"></button>
      </div>
      </div>

    <div class="sredina">
        <h2 class="oglasiNaslov">Moji oglasi</h2>
        <label class="stanjeOglasa">Stanje oglasa:</label>
        <select class="combo" @change="selectChange()">
            <option>Aktivan</option>
            <option >U realizaciji</option>
            <option>Dostavljen</option>
        </select>
    <div class="svioglasi">
      <div class="oglas" v-for="oglas in oglasiPrikaz" v-bind:key="oglas.naziv">
     
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
 
    <div class="desno">
        <h2 class="recenzijeNaslov">Recenzije</h2>
    </div>
      

  </div>
</template>

<script>


export default {

  data() {
    return {
        sellerInfo: {
            korisnickoIme: "",
            uloga: "",
            brLajkova: 0,
            brDislajkova: 0
        },
        izabranoStanje: "Aktivan",
        aktivniOglasi: [],
        realizacijaOglasi: [],
        dostavljeniOglasi: [],
        oglasiPrikaz: [],
    }
  },

    methods : {
        dodajOglas : function() {
            this.$router.push('/add-article');
        },

        otvori(naziv) {
            this.$router.push({name:'name', params:{id:naziv}})
        },

        selectChange(){
            console.log(event);
            switch(event.target.value) {

            case "Aktivan":
                this.oglasiPrikaz = this.aktivniOglasi;
            break;
            case "U realizaciji":
                    this.oglasiPrikaz = this.realizacijaOglasi;
            break;
            case "Dostavljen": 
                    this.oglasiPrikaz = this.dostavljeniOglasi;
            }
        }
        
    },

    created(){
        this.$http.post('http://localhost:9090/WebProj/userinfo', this.$session.get('idOne') ,{headers:this.headers}).then((response) => {
          this.sellerInfo.korisnickoIme = response.body.korisnickoIme;
          this.sellerInfo.uloga = response.body.uloga;

        }, (response) => {
            if (response.status === 400){
                alert('Neuspesno ucitavanje podataka');
            }
        }),

         this.$http.get('http://localhost:9090/WebProj/articleinfo' ,{headers:this.headers}).then((response) => {
            
             response.body.forEach(element => {
                 if(element.prodavac === this.sellerInfo.korisnickoIme){
                    this.aktivniOglasi.push(element);
                 }
             });
             this.oglasiPrikaz = this.aktivniOglasi;
             
        })

        this.$http.get('http://localhost:9090/WebProj/article-list-admin/poruceni' ,{headers:this.headers}).then((response) => {
            
             response.body.forEach(element => {
                 if(element.prodavac === this.sellerInfo.korisnickoIme){
                    this.realizacijaOglasi.push(element);
                 }
             });
             
        })

        this.$http.get('http://localhost:9090/WebProj/article-list-admin/dostavljeni' ,{headers:this.headers}).then((response) => {
            
             response.body.forEach(element => {
                 if(element.prodavac === this.sellerInfo.korisnickoIme){
                    this.dostavljeniOglasi.push(element);
                 }
             });
             
        })
        }
    
    

}
</script>

<style scoped>

.container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.sredina, .desno{
    width: 29%;
    height: auto;
    margin: 80px 0 10px 30px;
    padding: 6px;
    text-align: center;
    display: flex;
    flex-direction: column;
    object-fit: contain;
   
}

.sredina{
    margin-left: 60px;
}

.levo{
    width: 21%;
    height: auto;
    margin: 85px 0 0 30px;
    padding: 10px;

}

.profil{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-bottom: 20px;
    border-bottom: 1px solid #89848b;
}

.imeKorisnika{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.ime{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 30px;
    margin: 10px 0 0 10px;
    color: #353236;

}

.ocenaKorisnika{
    margin-top: 30px;
}


.lajk{
    margin-left: 20px;
}

.dislajk{
    margin-left: 8px;
}

.lajk, .dislajk{
    width: 8%;
    height: auto;
}

.brLajkova, .brDislajkova{
    margin: 21px 10px 0 5px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 20px;
}

.brLajkova{
    color: #098336;
}

.brDislajkova{
    color: #ae0404;
}

.usericon{
    width: 15%;
    height: auto;
}


.dodajNovi{
    width: 50%;
    height: auto;
    background: #655b6e;
    margin-top: 80px;
    margin-left: 22.5%;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 14px 6px 10px 6px ;
}

.tekstNovi{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 17px;
    padding-bottom: 10px;
    color:#eeeeee;
}

.dugmeDodaj{
    background: #655b6e;
    border: none;
    outline: none;
    padding-top: 10px;
    cursor: pointer;
}

.dodajSlika{
    width: 26%;
    height: auto;
}

.oglasiNaslov, .recenzijeNaslov{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #555057;
}

.stanjeOglasa{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #555057;
    font-size: 17px;
}

.combo{
    width: 36%;
    height: auto;
    padding: 3px;
    outline: none;
    border: 1px solid #dbdbdb;
    background: #ebebeb;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #555057;
    font-size: 14px;
    margin: 1% 0 0 32%;
}

.svioglasi{
    display: flex;
    flex-direction: column;
    
    margin-top: 15px;
}

.oglas{
  width: 215px;
  height: 215px;
  margin-top: 5%;
  border: 3px solid #d0cad6;
  cursor: pointer;
  align-self: center;
  
}

.imgOglasa{
  width: auto;
  max-height: 165px;
  max-width: 215px;
  align-self: center;
  margin: 4px;
  object-fit: contain;
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
  margin: 4px;
  padding: 6px;

  
}

.nazivOglasa{
  width: 55%;
  height: 22px;
  color: #423d42;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 7px;
  overflow: hidden;
  text-align: left;
}

.nazivOglasa, .cenaOglasa{
   display: inline-block;

}




</style>