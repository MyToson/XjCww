<template>
  <div class="index">
    <HelloWorld>
      <template slot="head" scope="prop">
        <div>一封信{{prop.myMsg}}</div>
      </template>
      <div slot="lop">jjj</div>
    </HelloWorld>
    <div v-for="(item,index) in list"
         class="image"
         :key="index">
      <img :src="item.img" alt="">
    </div>
  </div>
</template>

<script>
  import {getUser} from "../http/api";
  import HelloWorld from '../components/hello-world';
  export default {
    components:{
      HelloWorld
    },
    data(){
      return {
        list:[]
      }
    },
    mounted(){
      getUser().then((res) => {
        const {list} = this;
        list.push(...res.data)
      })
    }
  }
</script>

<style scoped lang="scss">
  .index{
    .image{
      margin-bottom: 20px;
    }
  }
</style>