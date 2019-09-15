<template>
  <div class="profilePage">
    
    <div class="container">
    <div class="profil">
        <img class="usericon" src="../assets/user.svg">
        <h1 class="imefont">{{ buyerInfo.korisnickoIme }}</h1>
        <div class="podaci">
        <div class="red">
            <img class="icon" src="../assets/imeprezime.svg">
            <label>{{ buyerInfo.ime}} {{ buyerInfo.prezime }}</label>
        </div>
        <div class="red">
            <img class="icon" src="../assets/placeholder.svg">
            <label>{{ buyerInfo.grad }}</label>
        </div>
        <div class="red">
           <img class="icon" src="../assets/call.svg">
            <label>{{ buyerInfo.telefon }}</label>
        </div>
        <div class="red">
           <img class="icon" src="../assets/mail.svg">
           <label>{{ buyerInfo.email }}</label>
        </div>       
      </div>    
    </div>
        <div class="poruceni">
          <h2 class="h2obican">Poručeni oglasi</h2>
          <div class="omiljeniPrikaz" v-for="poruceni in buyerInfo.poruceniProizvodi" v-bind:key="poruceni.naziv" >
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
        <div class="omiljeniPrikaz" v-for="dostavljeni in buyerInfo.dostavljeniProizvodi" v-bind:key="dostavljeni.naziv" >
            <div class="gore" v-on:click="otvori(dostavljeni.naziv)">
              <h3 class="nazivOglasa"> {{ dostavljeni.naziv }}</h3>
               <h4 class="cenaOglasa">{{ dostavljeni.cena }}€</h4>
            </div>
            <div >
              <img class="slika" v-bind:src="`${dostavljeni.slika}`" v-on:click="otvori(dostavljeni.naziv)">
            </div>

        </div>            

    </div>
        <div class="omiljeni">
            <h2 class="h2obican">Omiljeni oglasi</h2>
        <div class="omiljeniPrikaz" v-for="omiljeni in buyerInfo.omiljeniOglasi" v-bind:key="omiljeni.naziv" >
            <div class="gore" v-on:click="otvori(omiljeni.naziv)">
              <h3 class="nazivOglasa"> {{ omiljeni.naziv }}</h3>
               <h4 class="cenaOglasa">{{ omiljeni.cena }}€</h4>
            </div>
            <div >
              <img class="slika" v-bind:src="`${omiljeni.slika}`" v-on:click="otvori(omiljeni.naziv)">
            </div>

        </div>

    </div>
   
  </div>
  </div>
</template>

<script>


export default {

  data() {
    return {
        buyerInfo: {
            ime: "",
            prezime: "",
            grad: "",
            telefon: "",
            email: "",
            korisnickoIme: "",
            omiljeniOglasi: [],
            poruceniProizvodi: {},
            dostavljeniProizvodi: {}

        },

        

        headers: {
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
        this.$http.post('http://localhost:9090/WebProj/userinfo', this.$session.get('idOne') ,{headers:this.headers}).then((response) => {
          this.buyerInfo.korisnickoIme = response.body.korisnickoIme;
          this.buyerInfo.ime = response.body.ime;
          this.buyerInfo.prezime = response.body.prezime;
          this.buyerInfo.grad = response.body.grad;
          this.buyerInfo.telefon = response.body.telefon;
          this.buyerInfo.email = response.body.email;
          
        }, (response) => {
            if (response.status === 400){
                alert('Neuspesno ucitavanje podataka');
            }
        }),

        this.$http.post(`http://localhost:9090/WebProj/user/view-article/omiljeni`, this.$session.get('idOne') ,{headers:this.headers}).then((response) => {
          response.body.forEach(element => {
            if(element.stanje === "AKTIVAN"){
              this.buyerInfo.omiljeniOglasi = response.body;
            }
          });
          

        })

        this.$http.post(`http://localhost:9090/WebProj/user/view-article/poruceni`, this.$session.get('idOne') ,{headers:this.headers}).then((response) => {
          response.body.forEach(element => {
            if(element.stanje !== "OBRISAN"){
              this.buyerInfo.poruceniProizvodi = response.body;
            }
          });
        })

         this.$http.post(`http://localhost:9090/WebProj/user/view-article/dostavljeni`, this.$session.get('idOne') ,{headers:this.headers}).then((response) => {
          response.body.forEach(element => {
            if(element.stanje !== "OBRISAN"){
              this.buyerInfo.dostavljeniProizvodi = response.body;
            }
          });

        })


    }

}
</script>

<style scoped>

.profilePage{
  padding: 0 20px 10px 20px;
}

.imefont{
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      text-align: center;
  margin-top: 5%;
  color: #474347;

}

.h2obican{
  text-align: center;
  margin-top: 5%;
  color: #474347;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: left;
  margin-top: 100px;

}

.profil{
    width: 16%;
    height: 80%;
    margin: 20px 60px 20px 20px;
  background-color: beige;
  align-content: center;
  padding: 0 10px 14px 10px;
    display: flex;
  flex-direction: column;


    
}

 .omiljeni, .poruceni, .dostavljeni{
  width: 23%;
  min-width: 310px;
  height: auto;
  margin: 20px 0px 20px 20px;
  border-left: 2px solid rgb(221, 209, 193);
  
 }


label{
     color: #3f3d41;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    padding: 10% 0 0 15%;
}


.podaci{
    display: flex;
    flex-direction: column;
    object-fit: contain;
    word-break: break-word;
}

.red{
    display: flex;
    flex-direction: row;    
}

.usericon{
    width: 20%;
    

}

.icon{
    padding: 5%;
    width: 12%;

}

.omiljeniPrikaz{
  width: 250px;
  height: 250px;
  margin: 20px 0px 20px 55px;
  border: 3px solid rgb(214, 214, 207);
  cursor: pointer;
  
}



.gore{
  background-color: rgb(214, 214, 207);
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



</style>