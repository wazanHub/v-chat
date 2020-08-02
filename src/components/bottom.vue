<template>
    <div class="bottom" ref="bottom">
        <div class="points" v-show="!ask" ref="points">
            <Points></Points>
        </div>
        <div class="ask" v-show="ask" ref="ask" @click="change">向大家提问</div>
        <!-- 上层遮罩，控制只能点击一次 -->
        <div class="mask" v-show="mask"></div>
        <ul></ul>
    </div>
</template>

<script>
import Points from './point'
export default {
  name: 'bottom',
  data () {
    return {
      count:0,
      ask:true,
      //控制能否点击,初始为不可点击
      mask:true
    }
  },
  components:{
    Points
  },
  methods:{
    //点击'我要提问'
    change:function(event){
      let that=this
      that.ask=false
      // that.$parent.frameChange()
      that.$nextTick(() => {
        that.$parent.frameChange()
      });
    }

  },
  mounted(){
  }
}
</script>

<style>
.bottom{height: auto;background: #f0f1ef;position: relative;font-size:.2rem}
.bottom .mask{width: 100%;height: 100%;position: absolute;z-index: 100;background: #fff;opacity: .5;top:0}
.ask{height: .8rem;line-height: .8rem;text-align: center;box-sizing: border-box;border-top: 1px solid #e6e3e3;}
</style>


