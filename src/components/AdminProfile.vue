<template>
  <div class="container">

      <h1>ADMIN</h1>
      <router-view name="side"></router-view> 
    
    <div class="mainPage">
    <h2 class="korisnici">Lista korisnika:</h2>
    <div class="svikorisnici">
    <div class="korisnik" v-for="user in users" v-bind:key="user.korisnickoIme" >
     
        <h2 class="nazivKorisnika" v-on:click="prodavacPregled(user.korisnickoIme)"> {{ user.korisnickoIme }}</h2>
        <h4 class="uloga" >{{ user.uloga }}</h4>
        <button class="promeniUlogu" v-on:click="promeniUlogu(user.korisnickoIme)">Promeni ulogu</button>

    </div>
    </div>
    
  </div>
  </div>    

</template>

<script>

export default {


  data() {
    return {
        users: [],
        kupac: false,
        prodavac: false,
        admin: false,


    headers : {
      'Content-Type' : 'application/json'
    }
    }
  },
  methods : {
      

      promeniUlogu(korisnickoIme){
          this.$http.post(`http://localhost:9090/WebProj/change-user/${korisnickoIme}`, {headers:this.headers}).then((response) => {
            this.$emit('changedView');
      })
     
      },

      prodavacPregled : function(kIme){
        this.$http.post(`http://localhost:9090/WebProj/sellerinfo/${kIme}` ,{headers:this.headers}).then((response) => {
           if (response.body.uloga === "PRODAVAC"){
            this.$router.push({name:'sellerName', params:{id:kIme}});
           }
      })
      },
    
    
  },

    beforeCreate(){
        this.$http.post('http://localhost:9090/WebProj/usersinfo', this.$session.get('idOne') ,{headers:this.headers}).then((response) => {
            response.body.forEach(element => {
                if(element.uloga !== "ADMINISTRATOR"){
                  this.users.push(element);
                }
            });

            });
        },

    created(){
    if (this.$session.exists()) {
      this.$http.post('http://localhost:9090/WebProj/userinfo', this.$session.get('idOne') ,{headers:this.headers}).then((response) => {
         
         if(response.body.uloga === "KUPAC"){
            this.kupac = true;
            this.$router.push('/');
          } else if (response.body.uloga === "ADMINISTRATOR"){
            this.admin = true;
          } else if (response.body.uloga === "PRODAVAC"){
            this.prodavac = true;
            this.$router.push('/');
          }

     
      })
    } else {
      this.$router.push('/');
    }
    }

  
    
}


</script>

<style scoped>

h1{
    margin-top: 80px;
        color: #4b464b;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.mainPage{
  padding: 0 20px 10px 260px;
}

.korisnici{
  text-align: center;
  padding: 8px;
  color: #5a545a;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: row;
}

.svikorisnici{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: left;

}

.korisnik{
  width: 215px;
  height: auto;
  margin: 20px 0px 20px 20px;
  border: 1px solid #dddddd;
  text-align: center;
  padding: 5px 0 12px 0;
  
}



.uloga{

  color: #8b8b8b;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 7px;
  padding: 6px;

  
}

.nazivKorisnika{

  color: #423d42;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 7px;
  word-break: break-all;
}

.promeniUlogu{
    color: #423d42;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 17px;
    background: #c8c1cf;
     border: none;
    padding: 5px;
    margin: 3%;
    cursor:pointer;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    outline: none;
  
}

.promeniUlogu:hover{
    background: #423d42;
    color: #c4bdc4;

}

</style>