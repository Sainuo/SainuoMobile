// initial state
// shape: [{ id, quantity }]
const state = ()=>({
    info: null,
})

// getters
const getters = {
    getUserInfo: state => state.info
}

// actions
const actions = {
    updateUserInfo({ commit }, info) {
        commit('setUserInfo', info);
    }
}

// mutations
const mutations = {
    setUserInfo(state, info) {
        state.info = info;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}