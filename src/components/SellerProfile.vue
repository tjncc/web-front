<template>
  <div class="container">
      <div class="levo">
      <div class="profil">
          <img class="usericon" src="../assets/user.svg">
            <label class="ime">{{ sellerInfo.korisnickoIme }} </label>

          <img class="lajk" src="../assets/like.svg">
          <label class="brLajkova">{{ sellerInfo.brLajkova }}</label>
          <img class="dislajk" src="../assets/dislike.svg">
          <label class="brDislajkova">{{ sellerInfo.brDislajkova }}</label>
      </div>
      
    <div class="dodajNovi">
          <label class="tekstNovi">Dodaj novi oglas</label>
          <button class="dugmeDodaj" v-on:click="dodajOglas"><img src="../assets/add.svg"></button>
      </div>
      </div>

    <div class="sredina">
        <h2 class="oglasiNaslov">Moji oglasi</h2>
        <label class="stanjeOglasa">Stanje oglasa:</label>
        <select class="combo">
            <option>Aktivan</option>
            <option>U realizaciji</option>
            <option>Dostavljen</option>
        </select>

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
        }
    }
  },

    methods : {
        dodajOglas : function() {
            this.$router.push('/add-article');
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
    border: 1px solid black;
    margin: 80px 0 0 30px;
    padding: 6px;
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
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
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: 20px;
    border-bottom: 1px solid #89848b;
}

.ime{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 30px;
    margin: 10px 0 0 10px;
    color: #353236;

}

.lajk{
    margin-left: 73px;
}

.dislajk{
    margin-left: 10px;
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
    background: #89848b;
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
    background: #89848b;
    border: none;
    outline: none;
    padding-top: 10px;
    cursor: pointer;
}

img{
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
    width: 30%;
    height: auto;
    padding: 3px;
    outline: none;
    border: 1px solid #dbdbdb;
    background: #ebebeb;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #555057;
    font-size: 14px;
    margin: 1% 0 0 35%;
}




</style>