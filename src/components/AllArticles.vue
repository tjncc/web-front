<template>
  <div class="mainPage">
  <div class="searchDiv">
    <input type="text" v-model="searchName" class="searchInput" placeholder="Pretraži..." />
  </div>
  <div class="sliderDiv">
    <label class="labelSlider">Min cena: </label>
    <input type="range" min="1" max="1000" value="0" v-model="minPrice" class="slider" id="myRange">
    <label class="labelSlider">{{minPrice}}</label>
  
  <div>
    <label class="labelSlider">Max cena: </label>
    <input type="range" min="1" max="1000" value="1000" v-model="maxPrice" class="slider" id="myRange">
    <label class="labelSlider">{{maxPrice}}</label>
  </div>
  </div>
    <label class="labelCity">Grad: </label>
    <select class="selectCity" v-model="selectedCity">
      <option></option>
      <option v-for="grad in gradovi" v-bind:key="grad">{{ grad }}</option>
    </select>

    <h2 class="oglasi">Aktuelni oglasi:</h2>
    <div class="svioglasi">
    <div class="oglas"  v-for="oglas in filteredArticles" v-bind:key="oglas.naziv" >
     
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
</template>

<script>


export default {

  data () {
    return {

      oglasi: [],
      searchName: '',
      minPrice: 0,
      maxPrice: 1000,
      gradovi: {},
      selectedCity: "",
       headers : {
        'Content-Type' : 'application/json'
      }
      

    }

  }, 

  methods: {
    otvori(naziv){
      this.$router.push({name:'name', params:{id:naziv}})
    }
  },

  created(){
    this.$http.get('http://localhost:9090/WebProj/articleinfo',{headers:this.headers}).then(response =>{
        this.oglasi = response.body;
        
    })

        this.$http.get('http://localhost:9090/WebProj/articles/cities',{headers:this.headers}).then(response =>{
        this.gradovi = response.body;
        
    })
  },

  computed : {
    filteredArticles(){
      return this.oglasi.filter((oglas) => {
        return (oglas.naziv.toLowerCase().match(this.searchName.toLowerCase()) || 
        oglas.prodavac.toLowerCase().match(this.searchName.toLowerCase())) && 
        (oglas.cena >= this.minPrice) && (oglas.cena <= this.maxPrice) && oglas.grad.toLowerCase().match(this.selectedCity.toLowerCase()); 
      })
    }
  }

}
</script>

<style scoped>

.mainPage{
  padding: 0 20px 10px 260px;
}

.oglasi{
  text-align: center;
  margin: 5px 0 14px 10px;
  padding: 8px;
  color: #7e747e;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: row;
}

.svioglasi{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: left;

}

.oglas{
  width: 215px;
  height: 215px;
  margin: 20px 0px 20px 20px;
  border: 3px solid #d0cad6;
  cursor: pointer;
}



.imgOglasa{
  width: auto;
  max-height: 165px;
  max-width: 210px;
  align-self: center;
  object-fit: contain;
  padding: 3px;

}

.gore{
  background-color: #d0cad6;
  max-height: 40px;
}


.cenaOglasa{
  float: right;
  color: #ac3636;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 7px;
  padding: 6px;

  
}

.nazivOglasa{
  width: 55%;
  height: 22px;
  color: #423d42;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 7px;
  overflow: hidden;
}

.nazivOglasa, .cenaOglasa{
   display: inline-block;

}




.naziv{
  color: #423d42;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 5%;

}


.searchDiv{
  margin: 110px 0 10px 0;
  padding: 10px;
  display: flex;
}

.searchInput{
  margin-top:20px;
  width:450px;
  height: 28px;
  padding: 5px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 17px;
  align-self: center;
  justify-content: center;
  outline: none;
  border: 1px solid black;
  margin-left: 22%;
  background-image: url('../assets/search.svg');
    background-repeat: no-repeat;
    background-size: 25px;
    background-position: 5px;
    text-indent: 30px;
}


.slider {
  -webkit-appearance: none;
  width: 30%;
  height: 6px;
  border-radius: 5px;  
  background: #d3d3d3;
  outline: none;


}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 15px;
  border-radius: 50%; 
  background: rgb(82, 76, 117);
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 12px;
  height: 13px;
  border-radius: 50%;
  background:  rgb(82, 76, 117);
  cursor: pointer;
}

.labelSlider{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 17px;
}

.sliderDiv{
    margin-left: 24%;
}

.selectCity{
  height: 30px;
  outline: none;
  margin-left: 5px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 17px;
  margin-top: 20px;

}

.labelCity{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 18px;
  margin-top: 30px;
  margin-left: 31%;
}


</style>