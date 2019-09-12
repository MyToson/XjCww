<template>
  <div class="hello-world">
    <h1>情书</h1>
    <slot name="head" :myMsg="msg"></slot>
    <slot name="lop"></slot>
  </div>
</template>

<script>
  export default {
    name: "hello-world",
    data(){
      return {
        msg:"作用域插槽"
      }
    }
  }
</script>

<style scoped>

</style>