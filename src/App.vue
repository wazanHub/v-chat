<template>
  <div id="app">
    <div class="doc" ref="doc">
      <Main ref="main"></Main>
      <Bottom ref="bottom"></Bottom>
    </div>
  </div>
</template>

<script>
import Main from './components/main'
import Bottom from './components/bottom'

import axios from 'axios'
export default {
  name: 'App',
  data(){
    return{} 
  },
  components: {
    Main,
    Bottom
  },
  computed:{
    
  },
  methods:{

    frameChange(){
      this.frameInit()           
      this.scrollBottom()
      window.onresize=()=>{
        this.frameInit()           
        this.scrollBottom()
      }
    },

    //计算并渲染布局Main
    frameInit(){
      let main=this.$refs.main.$el//获取main dom
      let bottom=this.$refs.bottom.$el//获取main dom
      let mheight=window.innerHeight-bottom.offsetHeight//实时算出Main组件所占高度
      main.style.height=mheight+'px'
    },

    //执行dom.ul滑动到底部
    scrollBottom(){
      let main=this.$refs.main //获取Main组件
      let ulmain=main.$children[0] //获取ulmain组件
      let ul=ulmain.$el//获取ul组件的dom
      ul.scrollTop=ul.scrollHeight//滑动到内容撑起的最大高度
    }
    
  },
  created(){    
  },
  beforeMount(){
  },
  mounted(){
    this.frameChange()
  }
}
</script>


<style scoped>
/* 
style scoped
如果在每个组件里的style添加了scoped,该style里的样式就专属于该组件里的dom元素
在App.vue里的style加scoped，该样式只作用于写在App里的dom元素，不会作用于子组件dom元素
 参考链接：https://blog.csdn.net/qq_39043923/article/details/88687046
 */


html,body{height:100%}
.doc{width:7.5rem;height: 100%;margin:0 auto;}
/* #app ul{background: #000;} */
</style>
