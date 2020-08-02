import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        dialogue: []
    },
    getters:{
        getAll: state => {
            return state;
        }
    },
    mutations:{
        createData:(state,data)=>{
            state.dialogue=data
            // console.log(state.dialogue)
        }
    },
    actions:{

    }
})
export default store
