<template>
    <div>
        <ul class="pul">
            <li v-for="(item,index) in pdata1" ref="li" @click="loadInfo(index)" :key="index" :style="{background:item.bg}">{{item.name}}</li>
        </ul>
        <ul class="pul">
            <li v-for="(item,index) in pdata2" ref="li" @click="loadInfo(index+4)" :key="index" :style="{background:item.bg}">{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'Points',
    data () {
        return{
            pdata1:[
                {name:'问题1',bg:'#e27a69'},
                {name:'问题2',bg:'#ba7cc7'},
                {name:'问题3',bg:'#7abb91'},
                {name:'问题4',bg:'#8092ce'},
            ],
            pdata2:[
                {name:'问题5',bg:'#5f97be'},
                {name:'问题6',bg:'#df6363'},
                {name:'问题7',bg:'#e28c52'},
                {name:'问题8',bg:'#987777'},
            ]
        }
    },
    methods:{
        //点击问题点
        loadInfo:function(e){
            console.log(e)
            let that=this
            that.$parent.ask=true
            that.$parent.$parent.frameChange()//点击要重新算出节点的高度，并且渲染
            that.$parent.$nextTick(() => {
                that.$parent.$parent.frameChange()
            });

            this.$parent.$parent.$children[0].$children[0].loadCurrent(e)
        }
    }
}
</script>

<style scoped>
.pul{height: .72rem;}
.pul{width: 100%;display:flex;justify-content: space-between;}
.pul li{margin: .08rem .06rem 0;width: 1rem;height: .58rem;line-height: .58rem;flex: 1;text-align: center;color:#fff;font-size: .26rem;}
/* ul{background: pink;} */


</style>

