<template>
  <div class="containter">
      <h2>Registracija</h2>
      <form v-on:submit.prevent="register" >
          <div class="row">
            <input type="text" class="input-first" placeholder="Ime" v-model="user.ime" required>
            <input type="text" class="input-first" placeholder="Prezime" v-model="user.prezime" required>
          </div>
          <div class="row">
            <input type="text" class="input-first" placeholder="Grad" v-model="user.grad" required>
            <input type="tel" class="input-first" pattern="[0-9]+"  placeholder="Kontakt telefon" v-model="user.telefon" required>
          </div>
          <div class="profil">
              <legend>Korisnički profil:</legend>
            <input type="email" class="input-mail" placeholder="E-mail" v-model="user.email" required>
            <input type="text" class="input-ime" placeholder="Korisničko ime" v-model="user.korisnickoIme" required>
            <input type="password" class="input-pass" placeholder="Lozinka" v-model="user.lozinka" required>
            <a href="/login">Već imate profil?</a>

          </div>
          <div class="dugmad">
              <input class="dugme1" type="submit" value="Registruj se">
              <button v-on:click.prevent="cancelInfo" class="dugme2">Odustani</button> 
          </div>
      </form>
      
  </div>
</template>

<script>


export default {

  data() {
    return {
      user: {
        ime: "",
        prezime: "",
        grad: "",
        telefon: "",
        email: "",
        korisnickoIme: "",
        lozinka: ""
      },
      
      headers : {
      'Content-Type' : 'application/json'
  }
    }
  },

  

  methods : {
      register : function(){
        this.$http.post('http://localhost:9090/WebProj/register', this.user ,{headers:this.headers}).then(() => {
          alert('Uspesna registracija!');
          this.$router.push('/login');
        }, (response) => {
          if(response.status == 400){
            alert('Korisnik sa ovim imenom već postoji!');
          }
        })
    },

    cancelInfo : function() {
      this.$router.push('/');
    }
  },

    beforeCreate(){
    if (this.$session.exists()) {
       this.$router.push('/')
    }
  }
  
}
</script>

<style scoped>

h2{
    text-align: center;
    color: #504850;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

legend{
    padding: 16px 0px 5px 5px;
    text-align: left;
    color: #504850;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

a{
    
    padding: 5px 10px;
    color: #7e747e;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 90%;
    text-decoration: none;

}

a:hover{
    color: #201d20;
}

.containter{

    padding: 30px;
    background-color: #ece9e2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-shadow: 0px 10px 17px rgba(0, 0, 0, 0.1);
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
}

.dugmad{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
}

.profil{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 5px;
}



.input-first{
    margin: 6px;
    padding: 7px;
    width: 176px;
    height: 15px;
    font-size: 15px;
    border: 1px solid #504850;
}

.input-mail, .input-ime, .input-pass{
    margin: 6px;
    padding: 7px;
    width: 381px;
    height: 15px;
    font-size: 15px;
    border: 1px solid #504850;
}


.dugme1{
    
    height: 36px;
    width: 140px;
    color: #d8d5cf;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border: none;
    background-color: #5e565e;
    font-size: 16px;
    margin: 5% 11%;

}

.dugme2{
    
    height: 36px;
    width: 140px;
    color: #d8d5cf;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border: none;
    background-color: #5e565e;
    font-size: 16px;
    margin: 5% 0%;
    


}

.dugme1:hover, .dugme2:hover {
  background-color:  #363236;
  color: #d8d5cf;
}

</style>