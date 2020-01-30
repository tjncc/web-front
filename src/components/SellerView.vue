<template>
  <div class="container">
      <div class="levo">
      <div class="profil">
          <div class="imeKorisnika"> 
          <img class="usericon" src="../assets/user.svg">
            <label class="ime">{{ sellerInfo.korisnickoIme }} </label>
          </div>
        <div class="ocenaKorisnika">
          <img class="lajk" src="../assets/like.svg">
          <label class="brLajkova">{{ sellerInfo.brLajkova }}</label>
          <img class="dislajk" src="../assets/dislike.svg">
          <label class="brDislajkova">{{ sellerInfo.brDislajkova }}</label>
        </div>
      </div>
      
    <div v-if="this.$session.exists() && kupac && !prijavioVec" class="dodajNovi">
          <button class="dugmeDodaj" v-on:click="prijavi">Prijavi prodavca</button>          
      </div>
      <div class="ostaviRecDiv" v-if="kupioOdNjega">
        <h2 class="ostaviRec" >Oceni prodavca</h2>

        <div class="ostaviLajkDiv">
            <img class="lajkBtn" v-if="!lajkovaoProdavca" v-on:click="lajkujProdavca" src="../assets/like.svg">
            <img class="dislajkBtn" v-if="!lajkovaoProdavca" v-on:click="dislajkujProdavca" src="../assets/dislike.svg">
        </div>
          </div>






        <div v-if="kupioOdNjega" class="recenzijaForm">
            <form name="recenzijaF"  @submit.prevent="dodajNovuRecenziju">

            <div class="recDrugiDeo">
            <input type="text" class="naslovRecProd" v-model="recenzija.naziv" placeholder="Naslov recenzije" />
            <textarea cols="38" v-model="recenzija.sadrzaj" placeholder="Sadržaj recenzije" rows="8"/>
            </div>

             <div class="recTreciDeo">
                <legend class="sadrzajLegend">Opisi oglasa tačni:</legend>
                <div class="radioPrvi">
                <input type="radio" id="da" value="true" v-model="recenzija.tacanOglas">
                <label class="labelRadio" name="tacanOglas" for="da">Da</label>
                <input type="radio" id="ne" value="false" v-model="recenzija.tacanOglas">
                <label class="labelRadio" name="tacanOglas" for="ne">Ne</label>
            </div>
            </div>
            <legend class="sadrzajLegend">Poštuje dogovore:</legend>
            <div class="radioPrvi">
            <input type="radio" id="Da" value="true" v-model="recenzija.ispostovan">
            <label class="labelRadio" name="ispostovanOglas" for="Da">Da</label>
            <input type="radio" id="Ne" value="false" v-model="recenzija.ispostovan">
            <label class="labelRadio" name="ispostovanOglas" for="Ne">Ne</label>
        </div>
        <input class="btnRecenzije" type="submit" value="Dodaj">


            </form>
        </div>


        <h2 class="recenzijeNaslov">Recenzije prodavca</h2>
        <div class="recenzijePrikazProfilProd" v-for="rec in recenzijeProd" v-bind:key="rec.idRec">
         <p class="oglasRec">Recezent: {{ rec.recezent }}</p>
            <p class="nazivRec">{{ rec.naziv }}</p>           
            <p class="sadrzajRec">{{ rec.sadrzaj }}</p>

        <div class="radiosProdavac">
            <p v-if="rec.tacanOglas" class="prviRadioPregl"><img class="ikonicaTacan" src="../assets/correct.svg">Tačni oglasi</p>
            <p v-if="!rec.tacanOglas" class="prviRadioPregl"><img class="ikonicaTacan" src="../assets/wrong.svg">Tačni oglasi</p>
            <p v-if="rec.ispostovan" class="prviRadioPregl"><img class="ikonicaTacan" src="../assets/correct.svg">Poštuje dogovor</p>
            <p v-if="!rec.ispostovan" class="prviRadioPregl"><img class="ikonicaTacan" src="../assets/wrong.svg">Poštuje dogovor</p>
        </div>
        <div class="dugmici">
            <button v-if="kupioOdNjega" title="Izmeni recenziju"  class="btnBrisiRecPreg" v-on:click="izmeniRecenziju(rec.idRec)"><img class="manageIcons" src="../assets/edit.svg"></button>
            <button v-if="kupioOdNjega" title="Obriši recenziju"  class="btnBrisiRecPreg" v-on:click="obrisiRecenziju(rec.idRec)" ><img class="manageIcons" src="../assets/bin.svg"></button>
         </div>
        </div>
      </div>






    <div class="sredina">
        <h2 class="oglasiNaslov">Oglasi</h2>

    <div class="svioglasi">
      <div class="oglas" v-for="oglas in aktivniOglasi" v-bind:key="oglas.naziv">
     
      <div class="gore" v-on:click="otvori(oglas.naziv)">
        <h3 class="nazivOglasa"> {{ oglas.naziv }}</h3>
        <h4 class="cenaOglasa">{{ oglas.cena }}€</h4>
      </div>
      <div class="slika">
      <img class="imgOglasa" v-bind:src="`${oglas.slika}`" v-on:click="otvori(oglas.naziv)">
      </div>

    </div>
    </div>
    </div>

    <div class="desno">
        <h2 class="recenzijeNaslov">Recenzije</h2>
        <div class="recenzijePrikazProfil" v-for="rec in recenzije" v-bind:key="rec.idRec">
         <p class="oglasRec">Oglas: <a v-on:click="otvori(rec.oglas)" class="oglasNazivRec" >{{ rec.oglas }}</a></p>
         <p class="oglasRec">Recezent: {{ rec.recezent }}</p>
            <p class="nazivRec">{{ rec.naziv }}</p>           
            <p class="sadrzajRec">{{ rec.sadrzaj }}</p>

        <div class="radios">
            <p v-if="rec.tacanOglas" class="prviRadioPregl"><img class="ikonicaTacan" src="../assets/correct.svg">Tačan oglas</p>
            <p v-if="!rec.tacanOglas" class="prviRadioPregl"><img class="ikonicaTacan" src="../assets/wrong.svg">Tačan oglas</p>
            <p v-if="rec.ispostovan" class="prviRadioPregl"><img class="ikonicaTacan" src="../assets/correct.svg">Ispoštovan dogovor</p>
            <p v-if="!rec.ispostovan" class="prviRadioPregl"><img class="ikonicaTacan" src="../assets/wrong.svg">Ispoštovan dogovor</p>
        </div>
            <img class="imgRec" :src="rec.slika">

        </div>
    </div>
 
      

  </div>
</template>

<script>


export default {

  data() {
    return {
        sellerInfo: {
            korisnickoIme: "",
            uloga: "",

        },
        izabranoStanje: "Aktivan",
        aktivniOglasi: [],
        dostavljeniOglasi: [],
        recenzije: {},
        recenzijeProd: {},
        prijavljenProdavac: false,
        prijavioVec: false,

        ulogovan: {},
        kupac: false,
        admin: false,
        prodavac: false,
        kupioOdNjega: false,
        lajkovaoProdavca: false,

         recenzija:{
        recezent: "",
        oglas: "",
        slika: "",
        tacanOglas: true,
        ispostovan: true,
      },
      izmenaRecenzije: false,

    }
  },

    methods : {


        otvori(naziv) {
            this.$router.push({name:'name', params:{id:naziv}})
        },

        prijavi() {
            if(this.prijavljenProdavac === false){
                this.$http.post(`http://localhost:9090/WebProj/userreport/${this.$route.params.id}`,this.$session.get('idOne'), {headers:this.headers}).then((response) => {
                    alert('Prodavac je prijavljen!');
                    this.prijavljenProdavac = true;
                    this.$router.go();
                }, (response) => {
            if(response.status == 400){
              alert('Već ste prijavili ovog prodavca!');
           }
            }) 
        }
        },

         lajkujProdavca() {

                this.$http.post(`http://localhost:9090/WebProj/user/like/${this.$route.params.id}`, this.$session.get('idOne'),{headers:this.headers}).then((response) => {
                    //this.lajkovaoProdavca = true;
                    this.$router.go();
            }) 
         
         },

        dislajkujProdavca() {

                this.$http.post(`http://localhost:9090/WebProj/user/dislike/${this.$route.params.id}`,this.$session.get('idOne'), {headers:this.headers}).then((response) => {
                    //console.log(this.$route.params.id)
                    this.$router.go();
            })
        },
        
         dodajNovuRecenziju : function() {
          if(!this.izmenaRecenzije){
           this.$http.post('http://localhost:9090/WebProj/addreview', this.recenzija, {headers:this.headers}).then(response =>{
          console.log(this.recenzija)
          alert('Recenzija je uspesno objavljena!')
          this.$router.go()
        }, (response) => {
            if(response.status == 400){
              alert('Doslo je do greska pri objavljivanju recenzije!');
           }
          })
          } else {
            this.$http.post(`http://localhost:9090/WebProj/review/edit`, this.recenzija ,{headers:this.headers}).then(() => {
            alert('Recenzija je izmenjena!');
            this.izmenaRecenzije = false,
            this.$router.go();
            })
          }

        },

        izmeniRecenziju(idRec) {
          this.$http.get(`http://localhost:9090/WebProj/reviewinfo/${idRec}`).then((response) => {
            this.recenzija = response.body;
            this.izmenaRecenzije = true
            //this.$router.go()
          })
      },

      obrisiRecenziju(idRec) {
        this.$http.post(`http://localhost:9090/WebProj/review/delete/${idRec}` ,{headers:this.headers}).then(() => {
          alert('Recenzija je obrisana!');
          this.$router.go()
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
          this.ulogovan = response.body;
          this.recenzija.recezent = response.body.korisnickoIme;
          //console.log(this.ulogovan);
            })

        }
    },

    created(){
        this.$http.post(`http://localhost:9090/WebProj/sellerinfo/${this.$route.params.id}` ,{headers:this.headers}).then((response) => {
          this.sellerInfo = response.body;
          this.recenzija.oglas = "RECENZIJAPRODAVCA";
          this.recenzija.prodavac = response.body.korisnickoIme;
          
          response.body.prijavili.forEach(element => {
               if(element === this.ulogovan.korisnickoIme){
                   this.prijavioVec = true;
               }
          });

          response.body.lajkovali.forEach(element => {
              if(element === this.ulogovan.korisnickoIme){
                  this.lajkovaoProdavca = true;
              }
          });
           

        this.$http.get(`http://localhost:9090/WebProj/reviews-seller/${response.body.korisnickoIme}`).then((response) => {
                        this.recenzije = response.body;
                        

             this.$http.get(`http://localhost:9090/WebProj/reviews-seller-his/${this.sellerInfo.korisnickoIme}`).then((response) => {
                        this.recenzijeProd = response.body;            

                });
                
           
        this.$http.get('http://localhost:9090/WebProj/articleinfo' ,{headers:this.headers}).then((response) => {
            
             response.body.forEach(element => {
                 if(element.prodavac === this.sellerInfo.korisnickoIme){
                    this.aktivniOglasi.push(element);
                 }
             })
            })
        })
        })
             
/*
        this.$http.get('http://localhost:9090/WebProj/article-list-admin/poruceni' ,{headers:this.headers}).then((response) => {
            
             response.body.forEach(element => {
                 if(element.prodavac === this.sellerInfo.korisnickoIme){
                    this.realizacijaOglasi.push(element);
                 }
             });
             
        })

        this.$http.get('http://localhost:9090/WebProj/article-list-admin/dostavljeni' ,{headers:this.headers}).then((response) => {
            
             response.body.forEach(element => {
                 if(element.prodavac === this.sellerInfo.korisnickoIme){
                    this.dostavljeniOglasi.push(element);
                    if(element.kupac === this.ulogovan.korisnickoIme){
                     this.kupioOdNjega = true;
                 }
                 }
                 
             });
 
             console.log(this.dostavljeniOglasi);
             console.log(this.kupioOdNjega);
             
        })
        */
        
    }
          

}

</script>

<style scoped>

.container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.sredina{
    width: 29%;
    height: auto;
    margin: 80px 0 10px 30px;
    padding: 6px;
    text-align: center;
    display: flex;
    flex-direction: column;
    object-fit: contain;
   
}

.sredina{
    margin-left: 60px;
}

.levo{
    width: 21%;
    height: auto;
    margin: 85px 0 0 30px;
    padding: 10px;

}

.profil{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-bottom: 20px;
    border-bottom: 1px solid #89848b;
}

.imeKorisnika{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.ime{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 30px;
    margin: 10px 0 0 10px;
    color: #353236;

}

.ocenaKorisnika{
    margin-top: 30px;
}


.lajk{
    margin-left: 20px;
}

.dislajk{
    margin-left: 8px;
}

.lajk, .dislajk{
    width: 8%;
    height: auto;
}

.lajkBtn, .dislajkBtn{
    width: 12%;
    height: auto;
    margin: 3px 5px 5px 30px;
    cursor: pointer;
    padding-bottom: 5px;
    border-bottom: 3px solid transparent;
}

.lajkBtn:hover{

    padding-bottom: 5px;
    border-bottom: 3px solid #098336;
}

.dislajkBtn:hover{
    padding-bottom: 5px;
    border-bottom: 3px solid #830909;

}

.brLajkova, .brDislajkova{
    margin: 21px 10px 0 5px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 20px;
}

.brLajkova{
    color: #098336;
}

.brDislajkova{
    color: #ae0404;
}

.usericon{
    width: 15%;
    height: auto;
}


.dodajNovi{
    width: 50%;
    height: auto;
    background: #847a88;
    margin-top: 40px;
    margin-left: 22.5%;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 14px 6px 10px 6px ;
}

.tekstNovi{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 17px;
    padding-bottom: 10px;
    color:#eeeeee;
}

.dugmeDodaj{
    background: #847a88;
    border: none;
    outline: none;
    padding: 5px;
    cursor: pointer;
     font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 17px;
    color: #eeeeee;
 
}

.dugmeDodaj:hover{
    color: #cacaca;
}


.oglasiNaslov, .recenzijeNaslov{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #555057;
}

.stanjeOglasa{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #555057;
    font-size: 17px;
}



.svioglasi{
    display: flex;
    flex-direction: column;
    
    margin-top: 15px;
}

.oglas{
  width: 215px;
  height: 215px;
  margin-top: 5%;
  border: 3px solid #d0cad6;
  cursor: pointer;
  align-self: center;
  
}

.imgOglasa{
  width: auto;
  max-height: 165px;
  max-width: 210px;
  align-self: center;
  margin: 4px;
  object-fit: contain;
  cursor: pointer;
  
}

.gore{
  background-color: #d0cad6;
  max-height: 40px;
}


.cenaOglasa{
  float: right;
  color: #ac3636;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 4px;
  padding: 6px;

  
}

.nazivOglasa{
  width: 55%;
  height: 22px;
  color: #423d42;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 7px;
  overflow: hidden;
  text-align: left;
}

.nazivOglasa, .cenaOglasa{
   display: inline-block;

}

.desno{
    width: 30%;
    text-align: center;
    display: flex;
    flex-direction: column;
    object-fit: contain;
     margin: 80px 10px 10px 30px;
    padding: 6px;
}

.recenzijePrikazProfil{
    background-color: #f8f5fa;
    margin: 13px 5px;
    padding: 6px 12px;
    border-radius: 6px;
    box-shadow: 2px 2px 2px #e1dfe2;
}

.recenzijePrikazProfilProd{
    background-color: #f8f5fa;
    margin: 13px 5px;
    padding: 6px 12px;
    border-radius: 6px;
    box-shadow: 2px 2px 2px #e1dfe2;
        text-align: center;
    display: flex;
    flex-direction: column;
    object-fit: contain;
}

.oglasNazivRec{
    color: #423d42;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 19px;
  cursor: pointer;
  padding: 3px;
  background-color: #e5e4e6;
    border-radius: 5px;
}

.oglasNazivRec:hover{
    color: #000000;
    background-color: #e2dee4;

}

.oglasRec{
     color: #423d42;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 17px;
  margin-bottom: -5px;
  text-align: left;
}

.nazivRec{
color: #423d42;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 19px;
}

.sadrzajRec{
    color: #423d42;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 15px;
}

.imgRec{
    width: auto;
    max-width: 80px;
    max-height: 70px;
    object-fit: contain;
}

.prviRadioPregl{
    color: #423d42;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 15px;
}

.ikonicaTacan{
    max-width: 16px;
    margin-right: 5px;
    margin-left: 20px;
}

.radios{
    display: flex;
    margin-left: 15%;
}

.ostaviRec{
    color: #5a4d5a;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 24px;
}

.ostaviRecDiv{
    margin: 30px 0 0 65px;
}

.dugmeDodajRec{
    background: #8f8294;
    border: none;
    outline: none;
    padding: 15px;
    cursor: pointer;
     font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 17px;
    color: #eeeeee;
    margin: 20px 0 0 15px;
}

.dugmeDodajRec:hover{
    color: #cacaca;
}

.ostaviLajkDiv{
    margin-left: 13px;
}

.recenzijaForm{
    background-color: #fbfafc;
    box-shadow: 2px 2px 2px rgb(228, 226, 229);
    padding: 10px;
    margin: 20px 0 20px 0;
    height: auto;
}

.recDrugiDeo{
    margin: 5px;
}

textarea{
    resize: none;
     font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 15px;
    padding: 3px;
     width: 98.5%;
     outline: none;
}

.naslovRecProd{
    width: 98%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 15px;
    padding: 3px;
    outline: none;
    margin-bottom: 10px;

}

.radioPrvi, .sadrzajLegend{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 15px;

}

.sadrzajLegend{
    padding-top: 5px;
}

.btnRecenzije{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 17px;
    padding: 6px;
    background-color: #e1dee6;
    border: none;
    outline: none;
    cursor: pointer;
    box-shadow: 2px 2px 2px rgb(224, 223, 238);
    margin: -5px 0px 0px 80%;
}

.btnRecenzije:hover{
    background-color: #cfcbd6;
}

.radiosProdavac{
    margin-bottom: -10px;
    margin-left: -15px;
}

.btnBrisiRecPreg{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border: none;
    background: white;
    padding: 3px;
    width: 30px;
    margin-top: 5px;
    margin-right: 9px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    cursor:pointer;
}

.btnBrisiRecPreg:hover{
    color: #ddd8dd;
    background: #d9d5e0;
}

.manageIcons{
    width: 22px;
}

.dugmici{
    margin-left: 70%;
}

</style>