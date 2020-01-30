<template>
    <div class="containter">
      <h2>Kreiranje oglasa</h2>
      <form  @submit.prevent="addArticle">
        <div class="sve">
        <div class="podaci">
          <div class="slika">
            <legend class="slikaLegend">Slika oglasa:</legend>
            <div class="image-preview" >
                <img class="preview" v-if="oglas.slika.length > 0" :src="oglas.slika">
            </div>
            <input type="file" @change="onFileSelected" accept="image/*" class="photoInput" :required="!izmena" >
         <!--  <button v-on:click="$refs.photoInput.click()" class="dugmeSlika">Izaberite sliku</button> -->
          </div>

          <div class="sredina">
            <legend class="podaciLegend">Unesite podatke oglasa:</legend>
            <input type="text" class="input-naziv" placeholder="Naziv" v-model="oglas.naziv" required :readonly="izmena">
            <textarea  class="input-opis" placeholder="Opis" v-model="oglas.opis"></textarea>
            <input type="text" class="input-grad" placeholder="Grad" v-model="oglas.grad">
          </div>

          <div class="desno">
            <div class="cena">
            <input type="text" class="input-cena" pattern="[0-9]+" placeholder="Cena" v-model="oglas.cena" required>
            <legend class="euro">€</legend>
            </div>
            <legend class="datum">Označite datum isticanja oglasa:</legend>
            <input class="input-datum" type="date" v-model="oglas.datumIsticanja">

            <legend class="autor">Autor oglasa:</legend>
            <label class="ime">{{ this.oglas.prodavac }}</label>

          </div>
        </div>
                  <div class="dugmad">
              <input class="dugme1" type="submit" value="Objavi">
              <button class="dugme2" v-on:click="cancelInfo">Odustani</button> 
          </div>
        </div>
      </form>
      
  </div>
</template>

<script>


export default {

  data() {
    return {
      oglas: {
        naziv: "",
        cena: 0,
        opis: "",
        slika: "",
        datumIsticanja: "",
        grad: "",
        prodavac: ""
      },
      izmena: false,


    }
  },
  methods : {
    onFileSelected(event) {
      var input = event.target;

      if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.oglas.slika = e.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
        },

        addArticle : function(){
          if(!this.izmena){
            this.$http.post('http://localhost:9090/WebProj/addarticle', this.oglas ,{headers:this.headers}).then(() => {
           alert('Oglas je dodat!');
           this.$router.push('/seller-profile');
          }, (response) => {
            if(response.status == 400){
              alert('Oglas sa ovim imenom vec postoji!');
           }
          })
        } else {
          this.$http.post('http://localhost:9090/WebProj/article/edit', this.oglas ,{headers:this.headers}).then(() => {
            alert('Oglas je izmenjen!');
            this.$router.push(`/articleinfo/${this.$route.params.id}`);
            })

          
        }
        },

        
    cancelInfo : function() {
      this.$router.push('/seller-profile');
    }
    },

    beforeCreate(){
      if(!this.$session.exists()){
         this.$router.push('/');
      }
    },

    created(){

      this.$http.post('http://localhost:9090/WebProj/userinfo', this.$session.get('idOne') ,{headers:this.headers}).then((response) => {
        this.oglas.prodavac = response.body.korisnickoIme;
        if(response.body.uloga !== "PRODAVAC"){
          this.$router.push('/');
        }
      
      })

      if(this.$route.name === "edit"){
        this.$http.get(`http://localhost:9090/WebProj/articleinfo/${this.$route.params.id}`).then(response =>{
          this.oglas = response.body;
          this.izmena = true;

      })

      
    
    }
    }


  
}
</script>

<style scoped>

.containter{

    padding: 20px 20px;
    background-color: #e7e2ec;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-shadow: 0px 10px 17px rgba(0, 0, 0, 0.1);
}

.podaciLegend, .ime{
    padding: 16px 0px 5px 5px;
    text-align: left;
    color: #504850;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    margin-bottom: 15px;
}

.ime{
  font-size: 25px;
  margin-left: 2px;

}



.slikaLegend{
    padding: 16px 0px 15px 7px;
    text-align: left;
    color: #504850;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    margin-bottom: 15px;
}

.datum{
    text-align: left;
    color: #504850;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    margin: 30px 0 5px 5px;
}

.autor{
      text-align: left;
    color: #504850;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    margin: 90px 0 5px 5px;
}

h2{
    text-align: center;
    color: #504850;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.podaci{
  display: flex;
  flex-direction: row;
  align-content: center;
}

.slika{
    width: 260px;
    height: 360px;
    margin: 0 18px;
}

.sredina{
    width: 380px;
    margin: 0 18px;
}

.desno{
      width: 240px;
    margin: 0 18px;
}


.slikaOglasa{
  width: 100%;
  height: 100%;
  border: 1px solid black;
  
}

.preview{
  max-width: 206px;
  
  max-height: 300px;
  
}

.image-preview{
  width: 210px;
  height: auto;
  min-height: 210px;
  padding: 5px;
  border: 1px solid #a79fa7;
  margin: 5px 10px 10px 10px;
  box-shadow: 1px 1px 3px #5f585f;
  background-color: #f1eaf1;
  align-content: center;
}

.dugmeSlika{
    color: #dad5da;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border: none;
    outline: none;
    background-color: #5f585f;    
    font-size: 14px;
    height: 32px;
    width: 110px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    margin: 2px 10px;

}

.photoInput{
  margin-left: 10px;
}



.input-naziv, .input-grad{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 15px;
    margin: 6px;
    padding: 7px;
    width: 350px;
    height: 15px;
    border: 1px solid #504850;
}

.input-opis{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 15px;
    margin: 6px;
    padding: 7px;
    width: 350px;
    height: 166px;
    border: 1px solid #504850;
}

.input-datum{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 15px;
    margin-left: 6px;
    height: 25px;
    border: 1px solid #504850;

}

.cena{
  display: flex;
  flex-direction: row;
}

.input-cena{
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 15px;
    margin: 60px 0 0 5px;
    padding: 7px;
    width: 100px;
    height: 15px;
    border: 1px solid #504850;
}

.euro{
  margin: 62px 0 0 3px;
  font-size: 23px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color:#333033;
}

.dugmad{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  margin-left: 300px;
}

.dugme1{
    
    height: 40px;
    width: 130px;
    color: #d8d5cf;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border: none;
    background-color: #5e565e;
    font-size: 18px;
    margin: 3% 7% 0 6%;

}

.dugme2{

    height: 40px;
    width: 130px;
    color: #d8d5cf;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border: none;
    background-color: #5e565e;
    font-size: 18px;
    margin-top: 3%;
}

.dugme1:hover, .dugme2:hover, .dugmeSlika:hover {
  background-color:  #363236;
  color: #d8d5cf;
}

</style>