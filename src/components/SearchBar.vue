<template>
  <div class="search">
      
      <input type="text" className="searchInput" placeholder="Pretraži..." class="pretraga">
      <button className="searchBtn"><img className="searchImg" src="../assets/search.svg"></button>
      

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



.searchInput {
  
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
  display: flex;
  justify-content: center;
}

.searchBtn {
    
    margin-top: 54px;
    width: 46px;
    height: 34px;
    cursor:pointer;
    padding-top: 5px;
    border: 1px solid #635f64;
    border-left: 0;
    background-color: #89848b;
    

    
}

.searchImg{
  height: 90%;
  width: auto;
}

</style>