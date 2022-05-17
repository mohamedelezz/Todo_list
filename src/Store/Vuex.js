import Vue from "vue";
import Vuex from "vuex";
import todoModule from "./TodoStore";

Vue.use(Vuex);



const store = new Vuex.Store({
    state: {
        token: null, 
    },
    getters: { // getters are used to get current value of state
        token: (state) => {
            return state.token;
        }
    },
    actions: { // actions are used to change mutable state
        setToken: (context, token) => {
            context.commit('setToken', token);
        }
    },
    mutations: { // mutations are used to change state and are called by commit
        setToken(state, token) {
            state.token = token;
        }
    },
    modules: {
        todoModule,
    }

})

export default store;