<template>
  <div class="main">
    <Record></Record>
  </div>
</template>

<script>
import Record from './record'
import Test from './test'
export default {
  name: 'Main',
  data () {
    return {
      list:[]
    }
  },
  components:{
    Record,
    Test
  },
  computed:{
    // currentItem
  },
  updated(){
    // console.log(2121)
  },
  mounted(){
    // console.log(this.all)
  }
}
</script>








<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.main{background: #f0f1ef;}

</style>
