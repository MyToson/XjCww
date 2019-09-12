<template>
  <div class="index">
    454545
  </div>
</template>

<script>
  import {getUser} from "../http/api";
  export default {
    name: "index",
    mounted(){
      getUser().then((res) => {
        console.log(res)
      })
    }
  }
</script>

<style scoped lang="scss">

</style>