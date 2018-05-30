// initial state
// shape: [{ id, quantity }]
const state = () => ({
    list: [],
})

// getters
const getters = {
    get: state => state.list
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
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}