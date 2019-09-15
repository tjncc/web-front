<template>
    <div class="containter">
      <h2>Kreiranje oglasa</h2>
      <form  @submit.prevent="addArticle">
        <div class="podaci">
          <div class="slika">
            <h2>Slika</h2>
            <img class="slikaOglasa" v-bind:src="oglas.slika" >
          </div>

          <div class="sredina">
            <legend>Unesite podatke oglasa:</legend>
          </div>

          <div class="desno">
            <h2>Opis</h2>
          </div>
      <!--    <div class="oglas" >
              <legend>Unesite podatke oglasa:</legend>
              <div class="row">
            <input type="text" class="input-naziv" placeholder="Naziv" required>
            <input type="text" class="input-cena" pattern="[0-9]+" placeholder="Cena" required>
              </div>
          </div>
          <div class="dugmad">
              <input class="dugme1" type="submit" value="Objavi">
              <button class="dugme2">Odustani</button> 
          </div>
          -->
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
      }
    }
  }
}
</script>

<style scoped>

.containter{

    padding: 20px 25px;
    background-color: #ece9e2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-shadow: 0px 10px 17px rgba(0, 0, 0, 0.1);
}

legend{
    padding: 16px 0px 5px 5px;
    text-align: left;
    color: #504850;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
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

.slika, .sredina, .desno{
    width: 30%;
    border: 1px solid black;
    margin: 0 18px;
}

.slikaOglasa{
  width: 100%;
  height: 100%;
  border: 1px solid black;
}
/*

.row{
    display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
}

.input-naziv, .input-cena{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 15px;
    margin: 6px;
    padding: 7px;
    width: 200px;
    height: 15px;
    border: 1px solid #504850;
}

.dugmad{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  margin-left: 14%;
}

.dugme1{
    
    height: 36px;
    width: 130px;
    color: #d8d5cf;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    border: none;
    background-color: #5e565e;
    font-size: 16px;
    margin: 5% 6%;

}

.dugme2{

    height: 36px;
    width: 130px;
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
*/
</style>