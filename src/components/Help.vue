<template>
    <div>

    </div>


</template>

<script>
export default {

  data () {
      return {
          kategorije: {},

        kupac: false,
        admin: false,
        prodavac: false,
          
      }
  },

  methods : {

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


        })
      }
  },


}
</script>

<style scoped>
</style>