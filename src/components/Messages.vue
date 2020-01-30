<template>
    <div class="glavni">
        <div class="porukeDiv">

            <div class="levo">
                <button class="novaPoruka" v-on:click="showNew"><img class="novaIcon" src="../assets/plus-icon.svg">Nova poruka</button>
            </div>
            <div class="desno">
                <h2 class="primljeneNaslov">Primljene poruke</h2>

            <div v-for="poruka in poruke" v-bind:key="poruka.idPoruka" v-on:click="otvori(poruka.idPoruka)" class="jednaPoruka">
               <div class="novaDiv">

                   <img v-if="!poruka.procitana" class="newIcon" src="../assets/newicon.svg">
                   <div>
                <p class="porukaPosiljalac"><img src="../assets/sender.svg" class="ikonicaPor"> {{ poruka.posiljalac }}</p> 
                <h3 class="porukaNaslov"><img src="../assets/comment.svg" class="ikonicaPor"> {{ poruka.naslov }}</h3>
                </div>
                </div>
                <div class="datumDiv">
                    
                 <p class="datum">{{ poruka.dateAndTime }}</p>
                 </div>
                
            </div>

            </div>


        </div>
    </div>
</template>

<script>

export default {

  data () {
      
      return {
          poruke: {},

        kupac: false,
        admin: false,
        prodavac: false,

        modalOpen: false,

        
          
      }
  },

  methods : {
      showNew(){
          this.$router.push('create/message');
      },

      otvori(idPoruka){
          this.$router.push({name:'msg', params:{id:idPoruka}})
          this.$router.go();
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
       


        this.$http.get(`http://localhost:9090/WebProj/messages/${response.body.korisnickoIme}`,{headers:this.headers}).then((response) => {
            this.poruke = response.body;
            console.log(response.body);

        })

      })
      } else {
          this.$router.push('/');
      }
  },


}
</script>

<style scoped>



.porukeDiv{
    display: flex;
    margin: 100px 120px 60px 90px;
}

.levo{
    width: 16%;
    height: 100%;
}

.desno{
    width: 70%;
    height: 100%;
    background-color: rgb(243, 243, 245);
    margin-left: 30px;
    margin-bottom: 10px;
}

.novaPoruka{
    background-color: rgb(180, 172, 190);
    outline: none;
    border: none;
    color: rgb(247, 246, 248);
    padding: 4px;
    font-size: 19px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    padding-bottom: 10px;
    padding-right: 9px;
    border-radius: 16px;
    cursor: pointer;
    box-shadow: 2px 2px 2px rgb(234, 232, 235);
    margin: 10% 0 10% 15%;

}

.novaPoruka:hover{
    background-color: rgb(141, 133, 151);

}

.novaIcon{
    width: 22px;
    margin: 6px 10px -4px 5px;
}

.primljeneNaslov{
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-align: center;
     color: rgb(110, 102, 116);
     font-size: 32px;

}

.jednaPoruka{
    margin: 5px 25px 20px 25px;
    padding: 2px 17px;
    background-color: rgb(249, 249, 250);
    cursor: pointer;
}

.jednaPoruka:hover{
    background-color: rgb(255, 255, 255);
}

.porukaPosiljalac{
        font-size: 18px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}


.porukaNaslov{

    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    margin-top: -2px;
    color:rgb(57, 55, 63);
}

.ikonicaPor{
    height: 24px;
    margin-right: 10px;
    margin-bottom: -8px;
}



.datum{
    float:right;
    margin-top: -80px;
    margin-left: 750px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 14px;
}

.newIcon{
    width: 50px;
    margin-right: 10px;

   
}

.novaDiv{
    display: inline-flex;
}

</style>