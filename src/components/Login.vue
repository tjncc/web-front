<template>
  <div class="containter">
      <h2>Prijava</h2>
      <form @submit.prevent="submitInfo">
          
          <div class="profil">
              <legend>Unesite vaše podatke:</legend>
            <input type="text" class="input-ime" placeholder="Korisničko ime" v-model="user.korisnickoIme" required>
            <input type="password" class="input-pass" placeholder="Lozinka" v-model="user.lozinka" required>
            <a href="/register">Nemate profil?</a>
          </div>
          <div class="dugmad">
              <input class="dugme1" type="submit" value="Prijavi se">
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
        korisnickoIme: "",
        lozinka: "",
      },
      headers : {
        'Content-Type' : 'application/json'
      }

    }
  },

  

  methods : {
    submitInfo : function(){
      this.$http.post('http://localhost:9090/WebProj/login', this.user, {headers:this.headers}).then((response) =>{
        if(response.ok){
          alert('Uspešno ste prijavljeni na profil!');
          this.$session.start(); 
          this.$session.set('idOne', response.bodyText);
          this.$http.headers.common['Authorization'] = 'Bearer ' + response.bodyText;
          this.$router.push('/');
          this.$emit('loggedIn');
        }
      }, (response) => {
        if(response.status == 400){
          alert('Korisničko ime ili lozinka nisu ispravni.')
        }
      });
    },

    cancelInfo : function() {
      this.$router.push('/');
    }
  },

  beforeCreate(){
    if(this.$session.exists()){
      this.$router.push('/');
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

    padding: 20px 25px;
    background-color: #e7e2ec;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-shadow: 0px 10px 17px rgba(0, 0, 0, 0.1);
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



.input-ime, .input-pass{
    margin: 6px;
    padding: 7px;
    width: 230px;
    height: 15px;
    font-size: 15px;
    border: 1px solid #504850;
}


.dugme1{
    
    height: 36px;
    width: 108px;
    color: #d8d5cf;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border: none;
    background-color: #5e565e;
    font-size: 16px;
    margin: 5% 6%;

}

.dugme2{

    height: 36px;
    width: 108px;
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