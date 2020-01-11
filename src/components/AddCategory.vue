<template>
  <div class="containter">
      <h2>Dodaj novu kategoriju</h2>
      <form @submit.prevent="dodajNovu">
          
          <div class="novakat">
              <legend>Naziv:</legend>
            <input type="text" v-model="kategorija.naziv" class="input-ime" required :readonly="izmena">
            <div>
                <legend>Opis:</legend>
            <textarea
                id="textarea"
                type="text" class="input-opis"
                v-model="kategorija.opis"
                rows="7"
                max-rows="8"
                resize="none"
    ></textarea>
            </div>
          </div>
          <div class="dugmad">
              <input class="dugme1" type="submit" value="Dodaj">
              <button v-on:click.prevent="cancelInfo" class="dugme2">Odustani</button> 
          </div>
      </form>
      
  </div>
</template>

<script>


export default {

  data() {
    return {

        kategorija: {
            naziv: "",
            opis: ""
        },
        kupac: false,
        admin: false,
        prodavac: false,
        izmena: false,

      headers : {
        'Content-Type' : 'application/json'
      }

    }
  },

  methods : {

      dodajNovu : function() {
        if(!this.izmena){
        this.$http.post('http://localhost:9090/WebProj/addcategory', this.kategorija ,{headers:this.headers}).then(() => {
           alert('Kategorija je dodata!');
           this.$router.push('/admin-profile');
          }, (response) => {
            if(response.status == 400){
              alert('Kategorija sa ovim imenom vec postoji!');
           }
          })
        } else {
          this.$http.post('http://localhost:9090/WebProj/category/edit', this.kategorija ,{headers:this.headers}).then(() => {
            alert('Kategorija je izmenjena!');
            this.$router.push(`/category/${this.$route.params.id}`);
            })
        }
      },

        cancelInfo : function() {
            this.$router.push('/');
    }


  },

  beforeCreate(){
        if(!this.$session.exists()){
            this.$router.push('/');
        }

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
      }
  },

  created(){
    if(this.$route.name === "editCat"){
        this.$http.get(`http://localhost:9090/WebProj/categoryinfo/${this.$route.params.id}`).then(response =>{
          this.kategorija = response.body;
          this.izmena = true;
         // console.log(this.izmena);

      })
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

.input-ime{
    margin: 6px;
    padding: 7px;
    width: 430px;
    height: 15px;
    font-size: 15px;
    border: 1px solid #504850;
}

.input-opis{
    margin: 6px;
    padding: 7px;
    width: 430px;
    font-size: 15px;
    border: 1px solid #504850;
    font-family: Arial, Helvetica, sans-serif;
}



legend{
    padding: 16px 0px 5px 5px;
    text-align: left;
    color: #504850;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}



.dugme1{
    
    height: 36px;
    width: 108px;
    color: #d8d5cf;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border: none;
    background-color: #5e565e;
    font-size: 16px;
    margin: 5% 10% 5% 21%;
    cursor: pointer;

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
    cursor: pointer;
    


}

.dugme1:hover, .dugme2:hover {
  background-color:  #363236;
  color: #d8d5cf;
}

textarea{
  resize: none;
}


</style>