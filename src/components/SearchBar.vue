<template>
  <div class="search">
      
      <input type="text" placeholder="Pretraži..." class="pretraga">
      <button><img src="../assets/search.svg"></button>
      

  </div>
</template>

<script>


export default {

  data() {
    return {

    }
  }
}
</script>

<style scoped>

div {
  display: flex;
  justify-content: center;
}

input[type=text] {
  
  padding: 6px;
  margin-top: 54px;
  margin-left: 80px;
  font-size: 17px;
  width: 450px;
  height: 20px;
  outline: none;
    border: 1px solid #635f64;
    border-right: 0;

  
  
}


.search {
  margin: 12px;
}

button {
    
    margin-top: 54px;
    width: 46px;
    height: 34px;
    cursor:pointer;
    padding-top: 5px;
    border: 1px solid #635f64;
    border-left: 0;
    background-color: #89848b;
    

    
}

img{
  height: 90%;
  width: auto;
}

</style>