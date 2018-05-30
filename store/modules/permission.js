// initial state
// shape: [{ id, quantity }]
const state = () => ({
    list: ['showData'],
})

// getters
const getters = {
    get: state => state.list,
    contains: state => value => {
        return !!state.list.find(x => x === value);
    }
}

// actions
const actions = {
    update({ commit }, list) {
        commit('set', list);
    }
}

// mutations
const mutations = {
    set(state, list) {
        state.list = list;
    },
    add(state, value) {
        state.list.push(value);
    },
    delete(state, value) {
        let idx = state.list.indexOf(value);
        if (idx > -1) {
            state.list.splice(idx, 1)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}