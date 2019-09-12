<template>
  <div class="index">
    <HelloWorld>
      <template slot="head" scope="prop">
        <div>一封信{{prop.myMsg}}</div>
      </template>
      <div slot="lop">成都小酒馆</div>
    </HelloWorld>
    <div v-for="(item,index) in list"
         class="image"
         :key="index">
      <img :src="item.img" alt="">
    </div>
  </div>
</template>

<script>
  import Test from '../mixins/test';
  import {getUser} from "../http/api";
  import HelloWorld from '../components/hello-world';
  export default {
    mixins:[
      Test
    ],
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
        console.log(res.data);
        const {list} = this;
        list.push(...res.data)
      });
      this.look();
    }
  }
</script>

<style scoped lang="scss">
  .index{
    text-align: center;
    .image{
      margin-bottom: 20px;
    }
  }
</style>