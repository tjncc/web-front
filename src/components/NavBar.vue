<template>
<header>
    <div>
        <router-link class="levo" to="/">Početna strana</router-link>
        <router-link class="levo" v-if="admin" to="/article-list">Svi oglasi</router-link>
        <router-link class="levo" v-if="!admin" to="/all-articles">Oglasi</router-link>
        <router-link class="levo" v-if="this.$session.exists() && kupac" to="/buyer-profile">Profil</router-link>
        <router-link class="levo" v-if="this.$session.exists() && admin" to="/admin-profile">Profil</router-link>
        <router-link class="levo" v-if="this.$session.exists() && prodavac" to="/seller-profile">Profil</router-link>
        
    <div class="dropdown">  
    <button class="profil"><img src="../assets/account.svg">
    </button>
        <div class="dropdown-content">
            <router-link v-if="!this.$session.exists()" class="desno" to="/login">Prijava</router-link>
            <router-link v-if="!this.$session.exists()" class="desno" to="/register">Registracija</router-link>
            <button v-if="this.$session.exists()" v-on:click.prevent="logout">Odjavi se</button>
        </div>   
      </div>

      <button class="poruka" v-if="this.$session.exists()" v-on:click="otvoriPoruke"><img class="imgPoruka" src="../assets/mail.svg"><h4 v-if="brNeprocitanih != 0" class="neprocitanePor">{{ this.brNeprocitanih }}</h4></button>
    </div>

</header>
</template>

<script>
export default {

  data () {
      return {
        uloga: "",

        kupac: false,
        admin: false,
        prodavac: false,

        poruke: {},
        brNeprocitanih: 0,

        headers : {
          'Content-Type' : 'application/json'
        }
      }
  },

  

  methods : {
    logout : function() {
      this.$http.post('http://localhost:9090/WebProj/logout', this.$session.get('idOne') ,{headers:this.headers}).then((response) => {
        this.$emit('logOut');
        this.$session.destroy();
        this.$router.push('/').catch(err => {});
       // console.log(response);
        
        }, () =>{
            alert('Neuspešna odjava!');
        })
    },

    otvoriPoruke : function() {
      this.$router.push('/messages');
    }
  },


  created(){
    if(this.$session.exists()){
    this.$http.post('http://localhost:9090/WebProj/userinfo', this.$session.get('idOne') ,{headers:this.headers}).then((response) => {
      console.log(response.body.uloga);
      this.uloga = response.body.uloga;

      if(this.uloga === "KUPAC"){
        this.kupac = true;
      } else if (response.body.uloga === "ADMINISTRATOR"){
        this.admin = true;
      } else if (response.body.uloga === "PRODAVAC"){
        this.prodavac = true;
      }


        this.$http.get(`http://localhost:9090/WebProj/messages/${response.body.korisnickoIme}`,{headers:this.headers}).then((response) => {
            this.poruke = response.body;
            response.body.forEach(element => {
              if(element.procitana === false){
                this.brNeprocitanih += 1;
              }
            });

        })
    })
      
  }

}

}

</script>

<style scoped>

header{

    position: fixed; 
    top: 0; 
    width: 100%; 
    background-color: #7b7286;
    padding: 0;
    margin: 0; 

}

.dropdown {
  float: right;
  overflow: hidden;
}


.profil{
    height: 50px;
    width: 50px;
    border: none;
    outline: none;
    padding: 23%;
    background-color: inherit;
    margin: 0;


}

img{
  width: 100%;
}

 .levo:hover .dropdown:hover, a:hover, .pretraga:hover, .profil:hover, .dropdown-content a:hover, button:hover {
    background-color: #403942;
}

.dropdown-content {
  display: none;
  flex-direction: column;
  right: 0px;
  background-color: #7b7286;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  position: absolute;
  z-index: 2;
}

.dropdown-content router-link {
  float: none;
  color: #ece9e2;
  padding: 12px 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-decoration: none;
  display: block;
  text-align: left;
}

.desno{
  float: none;
  color: #ece9e2;
  padding: 12px 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-decoration: none;
  display: block;
  text-align: left;

}

button{
  float: none;
  color: #ece9e2;
  padding: 12px 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  background-color: inherit;
  border: none;
  
}

.dropdown:hover .dropdown-content {
  display: block;
}

.levo{
  display: inline-block;
  color: #ece9e2;
  text-align: center;
  padding: 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-decoration: none;

}

.poruka{
  display: flex;
  float: right;
  height: 50px;
  width: 55px;
  outline: none;
  border: none;
}

.imgPoruka{
  width: 26px;
}

.neprocitanePor{
  background-color: rgb(211, 2, 2);
  margin: -6px 5px 0 -10px;
  padding: 3px 4px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  border-radius: 50%;
  
  
}

</style>