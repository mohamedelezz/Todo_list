const todoModule = {
    state: {
        todo: [], 
    },
    getters: { // getters are used to get current value of state
        todo: (state) => {
            return state.todo;
        }
    },
    actions: { // actions are used to change mutable state
        setTodo: (context, todo) => {
            context.commit('setToken', todo);
        }
    },
    mutations: { // mutations are used to change state and are called by commit
        setTodo(state, todo) {
            state.todo = todo;
        }
    },
}

export default todoModule;