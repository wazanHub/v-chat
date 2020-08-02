<template>
    <ul ref="ulmain">
            <div class="start">
                <p class="nowTime">{{ fnowTime }}</p>
                <p>"雷军"邀请你加入了群聊，群聊参与人还有：王翔，林斌，刘德，洪锋，王川，周受资，张峰，卢伟冰，Manu，颜克胜，崔宝秋，尚进，何勇，常程......</p>
            </div>
            <li class="clearfix animated" :class="item.class" v-for="(item,index) in currentRecords" ref="child" :key="index">
                <div class="pic"><img :src=item.pic></div>
                <div class="txt">
                    <div class="name">{{item.name}}</div>
                    <div class="des">
                        <!-- indexOf里面要传的是字符串 ,不支持正则表达式 -->
                        <p v-if="(/\.(jpg|png)$/).test(item.des)"><img :src=item.des /></p>
                        <p v-else>{{item.des}}</p>
                    </div>
                </div>
            </li>
    
    </ul>
</template>

<script>
import axios from 'axios'
export default {
    name:'Record',
    // props: ['info'],
    data () {
        return {
            all:[],
            currentRecords: [],
        }
    },

    computed: {
    // 计算属性的 getter
    fnowTime: () => {
        let time=new Date()
        let y=time.getFullYear()
        let m=time.getMonth()+1
        let d=time.getDate()
        let h=time.getHours()
        let min=time.getMinutes()
        let s=(time.getSeconds()+100).toString().slice(1)
      return m+'月'+d+'日 '+h+':'+min+':'+s
    }
  },
    methods:{
        createData(){
            let that=this;

            new Promise(function(resolve,reject){
                axios.get('mdata1/mdata1').then(data=>{
                resolve(data)
                }).catch(err=>{
                reject(err)
                })

            }).then(function(data){
                that.$store.commit('createData',data.data.getData.data.data) //触发vuex store里的createData方法
            }).catch(err=>{
                console.log(err);
            }).then(function(){
                that.all=that.$store.state.dialogue //获取data里的所有聊天记录到all
                that.currentRecords=that.all[0].list //存入第一段自动加载的对白到变量currentRecords
            }).catch(err=>{
                console.log(err)
            }).then(function(){
                //定时输出每条聊天记录
                let i=0
                let timer=setInterval(()=>{
                    if(i===that.$refs.child.length){
                        clearInterval(timer);
                        that.$parent.$parent.$children[1].mask=false 
                        return;
                    }
                    that.$refs.child[i].style.display="block" //影藏Bottom设置个最上层的遮罩，可以点击了Bottom问题点
                    i++;

                    that.$parent.$parent.scrollBottom() //每加载一条内容，执行聊天区滑动到底部
                },1500)

                
            }).catch(err=>{
                console.log(err)
            })

        },

        //绑定在Bottom每个问题点的事件
        loadCurrent(idx){
            // 点击Bottom问题点加载对应的一段对白
            let that=this
            let cidx=that.currentRecords.length; //关键：记录上一段currentRecords里的对白的长度存入cidx
            new Promise(function(resolve,reject){
                that.currentRecords=that.currentRecords.concat(that.all[idx].list);
                resolve()
             }).then(function(){
                 let i=cidx; //从上一段对白的最后一条内容后，开始加载最新的对白
                 that.$parent.$parent.$children[1].mask=true //在Bottom设置个最上层的遮罩，防止在加载对白的过程中点击了Bottom问题点
                let timer=setInterval(()=>{
                if(i===that.$refs.child.length){
                    clearInterval(timer);
                    that.$parent.$parent.$children[1].mask=false 
                    return;
                }
                that.$refs.child[i].style.display="block"
                i++;
                that.$parent.$parent.scrollBottom()
            },1500)
             }).catch(err=>{
                 console.log(err)
             })

            


        }
        
    },
    created(){
    },
    mounted(){
        this.createData()
    }
}
</script>

<style>
.main ul{height: 100%;overflow-y: scroll;scroll-behavior: smooth}

.start p{padding:.1rem .5rem .2rem;font-size: .26rem;text-align: center;color:#aaa;line-height: .5rem;}
.start .nowTime{padding-top: .5rem;}



.lfloat{float: left;text-align: left;}
.rfloat{float: right;text-align: right;}
.main li{width: 100%;box-sizing: border-box;padding:.1rem;margin-bottom: .1rem;display: none;}
.lfloat .pic{width: .6rem;height: .6rem;float: left;margin-right: .3rem;}
.lfloat .txt{float: left;line-height: 1.5;font-size: .26rem;max-width: 5.2rem;}

.lfloat .txt .name{font-size: .16rem;margin-bottom: .05rem;}
.lfloat .txt .des{box-sizing: border-box;padding: .15rem;background: #fff;border-radius: .1rem;text-align: justify;position: relative;}
.rfloat .des::before{ display: block;border-width: .10rem;border-style: solid;border-color: transparent transparent transparent #12ef42;position: absolute;right:-.2rem;top:.25rem;content: '';}
.lfloat .des::before{ display: block;border-width: .1rem;border-style: solid;border-color: transparent #fff transparent transparent;position: absolute;left:-.2rem;top:.25rem;content: '';}

.rfloat .pic{width: .6rem;height: .6rem;float: right;margin-left: .3rem;}
.rfloat .txt{float: right;line-height: 1.5;font-size: .26rem;max-width: 5rem;}
.rfloat .txt .name{font-size: .16rem;margin-bottom: .05rem;}
.rfloat .txt .des{box-sizing: border-box;padding: .15rem;background:#12ef42;border-radius: .1rem;text-align: justify;position: relative;}
.clearfix {*zoom: 1}
.clearfix:after {
  content: "\20";
  clear: both;
  height: 0;
  display: block;
  overflow: hidden;
}
</style>