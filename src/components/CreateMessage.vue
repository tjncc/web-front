<template>
    <form name="createMsgModal" class="msgModal" @submit.prevent="posaljiPoruku">
      
      <div class="dropdown">
        <p class="primalac">Primalac: </p>
        <p v-if="odgovor" class="primalacOdg">{{ this.poruka.primalac }}</p>

        <select v-model="poruka.primalac" v-if="this.$session.exists() && kupac && !odgovor" class="selectItem" required>
          <option v-for="prodavac in prodavci" v-bind:key="prodavac.korisnickoIme">{{ prodavac.korisnickoIme }}</option>
        </select>

          <select v-model="poruka.primalac" v-if="this.$session.exists() && prodavac && !odgovor" class="selectItem" required>
          <option  v-for="adm in admini" v-bind:key="adm.korisnickoIme">{{ adm.korisnickoIme }}</option>
        </select>

        <select v-model="poruka.primalac" v-if="this.$session.exists() && admin" class="selectItem" required>
          <option  v-for="s in svi" v-bind:key="s.korisnickoIme">{{ s.korisnickoIme }}</option>
        </select>

      </div>

        <input v-model="poruka.naslov" type="text" class="tekstNaslov" placeholder="Naslov poruke" required/>
        <textarea v-model="poruka.sadrzaj" cols="100" rows="15" placeholder="Sadržaj poruke" required/>
        <input type="submit" class="posaljiBtn" value="Pošalji"/>
    </form>


</template>

<script>
export default {

  data () {
      return {

        poruka: {},

        kupac: false,
        admin: false,
        prodavac: false,

        odgovor: false,

        kupci: [],
        prodavci: [],
        admini: [],
        svi: []
          
      }
  },

  methods : {

    posaljiPoruku(){

        this.$http.post('http://localhost:9090/WebProj/sendmessage',this.poruka,{headers:this.headers}).then((response) => {
          alert('Poruka je poslata!');
          this.$router.push('/messages');
      })

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

          this.poruka.posiljalac = response.body.korisnickoIme;

        })
      } else {
        this.$router.push('/');
      }

      this.$http.get('http://localhost:9090/WebProj/allusers', this.$session.get('idOne') ,{headers:this.headers}).then((response) => {
         response.body.forEach(element => {
            if(element.uloga === "KUPAC"){
            this.kupci.push(element);
            this.svi.push(element);
          } else if (element.uloga === "PRODAVAC") {
            this.prodavci.push(element);
            this.svi.push(element);
          } else {
            this.admini.push(element);
          }

         });
         
        

      })

  },

  created(){
        if(this.$route.name === "response"){
        this.$http.get(`http://localhost:9090/WebProj/message/${this.$route.params.id}`).then(response =>{
          this.poruka.primalac = response.body.posiljalac;
          this.odgovor = true;
        })
        }

        if(this.$route.name === "articleMessage"){
        this.$http.get(`http://localhost:9090/WebProj/articleinfo/${this.$route.params.id}`).then(response =>{
          this.poruka.primalac = response.body.prodavac;
          this.poruka.naziv = response.body.naziv;
          this.odgovor = true; 

      })
  
  }

  }
}

</script>

<style scoped>

textarea{
    outline: none;
    resize: none;
    width: 100%;
    align-self: center;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 16px;
    padding: 6px;

}

.tekstNaslov{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 16px;
    padding: 6px;
    outline: none;
    width: 100%;
    align-self: center;
    margin: 2px 0 14px 0;
}

.msgModal{
    padding: 3%;
    align-content: center;
    display: flex;
    flex-direction: column;
    margin: 7.5% 20% 4% 20%;
    background-color: rgb(236, 235, 245);
    
}

.dropdown{
  display: inline-flex;
}

.selectItem{
  margin: -5px 0 0 5px;
  height: 30px;
  width: auto;
  padding: 4px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 16px;
    outline: none;

}

.primalac, .primalacOdg{
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 16px;
  color:rgb(73, 69, 82);
  margin-bottom: 25px;
  margin-top: 0px;
  margin-right: 10px;
}



.posaljiBtn{
  width: 15%;
  height: 35px;
     font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 18px;
  color:rgb(73, 69, 82);
  margin: 3% 0 -1% 85%;
  background-color: rgb(201, 195, 212);
  box-shadow: 2px 2px 2px rgb(203, 197, 212);
  border: none;
  cursor: pointer;
}

.posaljiBtn:hover{
  background-color: rgb(178, 173, 187);
}

</style>