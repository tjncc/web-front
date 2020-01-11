<template>
<div class="container">
    <div class="oglas">
      
      <div class="levo">
        <h1 class="naslov">{{ oglas.naziv }} </h1>
        <img class="slika" v-bind:src="`${oglas.slika}`" width="100%">
      </div>

    <div class="sredina">
      <label class="naslovOpis">Opis:</label>
      <label class="opis">{{ oglas.opis }}</label>
      <label class="naslovGrad">Grad:</label>
      <label class="grad">{{ oglas.grad }}</label>
      <label class="naslovStanje">Stanje oglasa:</label>
      <label class="stanje">{{ oglas.stanje }}</label>
      <label class="naslovStanje">Kategorije:</label>
      <ul class="stanje">
        <li v-for="kat in oglas.kategorije" v-bind:key="kat" v-on:click="otvori(kat)" class="viewCateg">{{kat}}</li>
      </ul>

    </div>

    <div class="desno">
      <div class="red">
      <img v-if="!dostavljen" class="like" src="../assets/like.svg">
      <img v-if="this.$session.exists() && dostavljen" v-on:click="likeOglas" class="likeDugme" src="../assets/like.svg">
      <label class="broj">{{ oglas.brLajkova }}</label>
      <img v-if="!dostavljen" class="like" src="../assets/dislike.svg">
      <img v-if="this.$session.exists() && dostavljen" v-on:click="dislikeOglas" class="dislikeDugme" src="../assets/dislike.svg">
      <label class="dolebroj">{{ oglas.brDislajkova }}</label>


      <img class="fav" v-on:click="favorite" v-if="this.$session.exists() && !omiljen && kupac"  src="../assets/heart.svg">
      <img class="fav" v-on:click="removeFav" v-if="this.$session.exists() && omiljen && kupac"  src="../assets/redheart.svg">

      </div>
      <div class="datumi">
        <label class="naslovD">Datum postavljanja: </label>
        <label class="datum">{{ oglas.datumPostavljanja }}</label>
                <label class="naslovD">Datum isticanja: </label>
        <label class="datum">{{ oglas.datumIsticanja }}</label>
        <label class="autor">Autor oglasa: </label>
        <label class="autorIme" v-on:click="prodavacPregled">{{ oglas.prodavac }}</label>
        </div>
        <button v-if="this.$session.exists() && !narucen && !dostavljen && kupac" class="dugme" v-on:click="order" >Poruči</button>
        <button v-if="this.$session.exists() && narucen && !dostavljen && kupac" class="dugme2" v-on:click="delivered" >Dostavljeno</button>
        <button v-if="this.$session.exists() && admin && !obrisan" class="dugme" v-on:click="edit" >Izmeni</button>
        <button v-if="this.$session.exists() && admin && !obrisan" class="dugmeObrisi" v-on:click="deleteArticle" >Obriši</button>
        <button v-if="this.$session.exists() && autor && !obrisan" class="dugme" v-on:click="edit" >Izmeni</button>
        <button v-if="this.$session.exists() && autor && !obrisan" class="dugmeObrisi" v-on:click="deleteArticle" >Obriši</button>
        <button v-if="this.$session.exists() && admin && !obrisan" class="dugmeObrisi" v-on:click="show" >Dodaj kategoriju</button>
    </div>
    </div>





    <modal name="categ" class="modalKat"
         :height="500"
         :width="270"
         @before-open="beforeOpen">
      <h2 class="naslovModal">Izaberite kategoriju: </h2>
       <div class="sideContent">
        <ul>
            <li v-for="kat in kategorije" v-bind:key="kat.naziv" v-on:click="dodaj(kat.naziv)">{{ kat.naziv }}</li>
        </ul>
        </div>
      
    </modal>
   





<div class="recenzije">
  <h2 class="naslovRecenzije">Recenzije kupaca:</h2>

  <form name="recenzijaForm" v-if="kupio" @submit.prevent="dodajNovuRecenziju">
    <h2 class="dodajRecNaslov">Dodaj recenziju</h2>
    <div class="celaForma">
    <div class="recSve">

      <div class="recPrviDeo">
         <legend class="slikaLegend">Slika:</legend>
          <div class="image-preview">
            <img class="preview"  v-if="recenzija.slika.length > 0" :src="recenzija.slika">
          </div>
          <input type="file" @change="onFileSelected" accept="image/*" class="photoInput" >
      </div>

      <div class="recDrugiDeo">
        <legend class="sadrzajLegend" >Naslov recenzije:</legend>
        <input type="text" v-model="recenzija.naziv" class="recNaslov" />
        <legend class="sadrzajLegend">Opis recenzije:</legend>
        <textarea cols="40" v-model="recenzija.sadrzaj" rows="6"/>
      </div>

      <div class="recTreciDeo">
        <legend class="sadrzajLegend">Da li je opis oglasa tačan:</legend>
        <div class="radioPrvi">
        <input type="radio" id="da" value="true" v-model="recenzija.tacanOglas">
        <label class="labelRadio" name="tacanOglas" for="da">Da</label>
        <input type="radio" id="ne" value="false" v-model="recenzija.tacanOglas">
        <label class="labelRadio" name="tacanOglas" for="ne">Ne</label>
      </div>

        <legend class="sadrzajLegend">Da li je opis dogovor ispoštovan:</legend>
        <div class="radioPrvi">
        <input type="radio" id="Da" value="true" v-model="recenzija.ispostovan">
        <label class="labelRadio" name="ispostovanOglas" for="Da">Da</label>
        <input type="radio" id="Ne" value="false" v-model="recenzija.ispostovan">
        <label class="labelRadio" name="ispostovanOglas" for="Ne">Ne</label>
      </div>
      </div>
    </div>
    <input class="btnRecenzije" type="submit" value="Dodaj">
    </div>
  </form> 





<h1>RECENZIJEEE</h1>
  <div class="recPregled" v-for="rec in recenzije" v-bind:key="rec.naziv" >
     
      <div class="gore">
        <h3 class="naslovRecPregl"> {{ rec.naziv }}</h3>
        <h4 class="textRecPregl">{{ rec.sadrzaj }}</h4>
      </div>
      <div class="slika">
      <img class="imgRecPregl" v-bind:src="`${rec.slika}`">
      </div>

    </div>




</div>






</div>
</template>

<script>


export default {

  data () {
    return {
      oglas: {},

      omiljen: false,
      narucen: false,
      dostavljen: false,
      obrisan: false,

      kupac: false,
      kupio: false,
      admin: false,
      prodavac: false,
      autor: false,

      kategorije: {},
      oglasModal: {},
      recenzije: {},

      recenzija:{
        recezent: "",
        oglas: "",
        slika: "",
        tacanOglas: true,
        ispostovan: true,
      },
      //kategorijeModal: {},



        headers : {
          'Content-Type' : 'application/json'
          
        },

        textHeaders : {
          'Content-Type' : 'text/plain'
          
        }
      

    }

  },


  methods: {
    favorite : function(){
      this.$http.post(`http://localhost:9090/WebProj/user/fav/${this.$route.params.id}`, this.$session.get('idOne'), {headers:this.headers}).then(() =>{
        this.omiljen = true;
      })
    },

    removeFav : function(){
      this.$http.post(`http://localhost:9090/WebProj/user/fav-remove/${this.$route.params.id}`, this.$session.get('idOne'), {headers:this.headers}).then(() =>{
        this.omiljen = false;
      })
    },

    order : function(){
      this.$http.post(`http://localhost:9090/WebProj/user/order/${this.$route.params.id}`, this.$session.get('idOne'), {headers:this.headers}).then(() =>{
      this.narucen = true; 
      this.$emit('changedView');   
    })
     },

      delivered : function(){
      this.$http.post(`http://localhost:9090/WebProj/user/delivered/${this.$route.params.id}`, this.$session.get('idOne'), {headers:this.headers}).then(() =>{
      this.dostavljen = true; 
      this.$emit('changedView'); 
    })
    
    },
      likeOglas : function(){
      this.$http.post(`http://localhost:9090/WebProj/article/like/${this.$route.params.id}`,{headers:this.headers}).then(() =>{
      this.$emit('changedView');
      
    
    })

      },

      dislikeOglas : function(){
      this.$http.post(`http://localhost:9090/WebProj/article/dislike/${this.$route.params.id}`,{headers:this.headers}).then(() =>{
      this.$emit('changedView');
    
    })
      },

      deleteArticle : function(){
        this.$http.post(`http://localhost:9090/WebProj/article/delete/${this.$route.params.id}`, this.$session.get('idOne'),{headers:this.headers}).then(() =>{
          this.obrisan = true;
          this.$emit('changedView');
          
        })
      },

      edit : function(){
          this.$router.push({name:'edit', params:{id:this.oglas.naziv}})
      },

      prodavacPregled : function(){
        this.$router.push({name:'sellerName', params:{id:this.oglas.prodavac}});
      },

      beforeOpen (event) {
        console.log(event.params.foo);
        this.oglasModal = event.params.foo.naziv;
 
      },

      show() {
        this.$modal.show('categ', { foo: this.oglas })
      },
       hide () {
        this.$modal.hide('categ');
      },

      dodaj(naziv){
        this.$http.post(`http://localhost:9090/WebProj/article/category/${naziv}`, this.oglasModal, {textHeaders:this.textHeaders}).then(response =>{
          console.log(this.oglasModal)
          alert('Oglas je uspesno dodat u kategoriju!')
          this.$router.go()
        }, (response) => {
            if(response.status == 400){
              alert('Oglas se vec nalazi u ovoj kategoriji!');
           }
          })
      },

          otvori(naziv){
            this.$router.push({name:'categoryName', params:{id:naziv}})
            //this.$router.go()
    },

    onFileSelected(event) {
      var input = event.target;

      if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.recenzija.slika = e.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
        },

        dodajNovuRecenziju : function() {
           this.$http.post('http://localhost:9090/WebProj/addreview', this.recenzija, {headers:this.headers}).then(response =>{
          //console.log(this.recenzija)
          alert('Recenzija je uspesno objavljena!')
          this.$router.go()
        }, (response) => {
            if(response.status == 400){
              alert('Doslo je do greska pri objavljivanju recenzije!');
           }
          })

        }


    },

  



  beforeCreate(){

    this.$http.get(`http://localhost:9090/WebProj/articleinfo/${this.$route.params.id}`).then(response =>{
        this.oglas = response.body;
        this.recenzija.oglas = response.body.naziv;

        if(this.oglas.stanje === "OBRISAN"){
          this.obrisan = true;
          this.omiljen = false;
          this.narucen = false;
          this.dostavljen = false;
        }
        if (this.$session.exists()) {
      this.$http.post('http://localhost:9090/WebProj/userinfo', this.$session.get('idOne') ,{headers:this.headers}).then((response) => {

        response.body.omiljeniOglasi.forEach(element => {
          if(element === this.$route.params.id){
            this.omiljen = true;

          }
        });

        response.body.poruceniProizvodi.forEach(element => {
          if(element === this.$route.params.id){
            this.narucen = true;          

          }                  

        });

        response.body.dostavljeniProizvodi.forEach(element => {
          if(element === this.$route.params.id){
            this.dostavljen = true;
            this.recenzija.recezent = response.body.korisnickoIme;

          }                  

        });

          if(response.body.uloga === "KUPAC"){
            this.kupac = true;
            if(this.oglas.stanje === "DOSTAVLJEN"){
              this.kupio = true;
            }
          } else if (response.body.uloga === "ADMINISTRATOR"){
            this.admin = true;
          } else if (response.body.uloga === "PRODAVAC"){
            this.prodavac = true;
            if((response.body.korisnickoIme === this.oglas.prodavac) && (this.oglas.stanje === "AKTUELAN")){
              this.autor = true;
              
          }
          }


        })


    }
    })

  },

  created(){
      
      this.$http.get('http://localhost:9090/WebProj/categoryinfo').then(response => {
          
          this.kategorije = response.body;
      }),

      this.$http.get(`http://localhost:9090/WebProj/reviews/${this.$route.params.id}`).then(response => {
          this.recenzije = response.body;
          console.log(response.body)
      })


  }

}


</script>

<style scoped>

.container{
  padding: 80px 20px 10px 20px;
}

.oglas{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: left;
}

.levo, .sredina, .desno{
  width: 30%;
  height: auto;
  /*border: 1px solid black; */
}

.sredina{
  border-left: 1px solid #7e747e;
  border-right: 1px solid #7e747e;
}

.levo{
  display: flex;
  flex-direction: column;
  align-content: left;
  margin: 15px;

}

.naslov{
    color: #7e747e;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: left;
    padding: 0px 10px 30px 10px;

}

.slika{
    object-fit: contain;
    max-width: 330px;
    max-height: 330px;
    width: auto;
    padding: 10px;
    align-self: center;

    
}

.sredina{
    display: flex;
  flex-direction: column;
  align-content: left;
  margin: 15px 15px 15px 0px;
  padding: 30px 20px 10px 20px;

}

.naslovOpis{
    color: #292629;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 20px;
}

.opis{
    color: #3b3b3b;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 15px;  
    padding: 6px 0 20px 0;
   /* border-bottom: 1px solid #7e747e; */
}

.naslovGrad, .naslovStanje, .autor{
    color: #292629;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 20px;
    padding-top: 20px;
}

.grad{
    color: #3b3b3b;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 15px;  
    padding: 6px 0 20px 0;
   /* border-bottom: 1px solid #7e747e; */
}

.stanje{
    color: #3b3b3b;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 15px;  
    padding: 6px 0 20px 0;
}

.desno{
    display: flex;
  flex-direction: column;
  align-content: left;
  margin: 15px 15px 15px 0px;
  padding: 30px 10px 10px 10px;

}

.red{
      display: flex;
  flex-direction: row;
  align-content: left;
}

.like{
  width: 30px;
  height: auto;
  
}

.likeDugme, .dislikeDugme{

  width: 30px;
  height: auto;
  cursor: pointer;
  

}

.broj{
    color: #3b3b3b;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 18px;  
    margin: 8px 13px 0 2px;
}

.dolebroj{
    color: #3b3b3b;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-size: 18px;  
    margin: 8px 0px 0px 4px;
}

.fav{
  width: 30px;
  height: auto;
  float: right;
  margin-left: 180px;
  cursor: pointer;
}

.datumi{
  display: flex;
  flex-direction: column;
  margin-top: 30px;

}

.naslovD{
      color: #3b3b3b;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-size: 14px;  
    padding-top: 7px;

}

.datum{
      color: #3b3b3b;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-size: 15px;  
      /*  border-bottom: 1px solid #7e747e;*/
        padding: 2px 0 12px 2px;
}



.autorIme{
      color: #3b3b3b;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-size: 18px; 
    cursor: pointer;
    margin-top: 2px; 
}

.autorIme:hover{
  color: #757575;
}

.dugme{
    background-color: #6c6377;
    color:#e9e0e9;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-size: 18px;  
    border: none;
    width: 170px;
    height: 37px;
    margin: 50px 0 0 90px;
    cursor:pointer;
    box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.1);


}

.dugme2{
    background-color: #e9e0e9;
    color:#696469;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-size: 18px;  
    border: none;
    width: 170px;
    height: 37px;
    margin: 50px 0 0 90px;
    cursor:pointer;
    box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.1);


}


.dugmeObrisi{
    background-color: #7b7286;
    color:#e9e0e9;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-size: 18px;  
    border: none;
    width: 170px;
    height: 37px;
    margin: 10px 0 0 90px;
    cursor:pointer;
    box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.1);


}

.dugme:hover, .dugmeObrisi:hover{
      background-color: #3b393b;
}

.dugme2:hover{
    background-color: #d8cfe2;
}

.sideContent{
    overflow-y: auto;
    max-height: 430px;
}

ul{
    padding: 10px 0 0 8px;
    
}

li{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #4c464e;
    list-style: none;
    padding: 7px;
    
    
    
}

.naslovModal{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #4c464e;
    margin: 10px;
}

li:hover {
    color: #b6b3b3;
    cursor: pointer;
}


.viewCateg{
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #4c464e;
    display: inline;
    text-overflow: clip;
    padding: 5px;
    margin: 3px; 

    background-color: #f1edf5;
}

.stanje{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.recenzije{
  margin-top: 40px;
  /* border: 1px solid black; */

  height: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.naslovRecenzije{
    color: #7e747e;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: left;
    margin-left: 15px;

}


.dodajRecNaslov{
  color: #928c92;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 10px 0 30px 45px;
}


.btnRecenzije{
  color: #3d383d;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 18px;
  height: 40px;
  width: 74px;
  float: right;
  margin: 0 30px 10px 0;
  outline: none;
  border:none;
  background-color:#cec7db;
  cursor: pointer;
  box-shadow: 2px 3px 3px rgb(214, 209, 221);

}

.btnRecenzije:hover{
  background-color:#b6b0c2;
}

.preview{
  max-width: 156px;
  max-height: 165px;
  
}

.image-preview{
  width: 160px;
  height: auto;
  min-height: 160px;
  padding: 5px;
  border: 1px solid #a79fa7;
  margin: 5px 10px 10px 45px;
  box-shadow: 1px 1px 3px #8f868f;
  background-color: #faf9fa;
  align-content: center;
}

.photoInput{
  margin: 0 0 40px 45px;
}

.slikaLegend{
    
    text-align: left;
    color: #504850;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    margin-bottom: 15px;
    margin-left: 45px;
   
}

.sadrzajLegend{
  text-align: left;
    color: #504850;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    margin-bottom: 10px;
}


.dugmeRec{
  margin: 10px 0 0 -10px;
}

form{
  border: 1px solid rgb(186, 184, 190);
  padding: 9px;
  box-shadow: 3px 3px 3px rgb(205, 201, 207);
  margin: 1% 13% 10% 5%;

}

.recNaslov{
  width: 90%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
  padding: 5px;
  outline: none;
  margin: 0 0 20px 0;
}

textarea{
  resize: none;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
  outline: none;
  padding: 7px;
  width: 90%;
}

.labelRadio{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
  color: #504850;
  
}

.radioPrvi{
  margin-bottom: 40px;
}

.recSve{
  display: flex;
  flex-direction: row;
}

.recPrviDeo{
  width: 30%;
    display: flex;
  flex-direction: column;
}

.recDrugiDeo{
  width: 50%;
    display: flex;
  flex-direction:  column;
  margin-left: -60px;
}

.recTreciDeo{
  width: 20%;
    display: flex;
  flex-direction: column;
  margin-top: 25px;
}

.recPregled{
  margin: 200px 10px 10px 10px;
}


</style>