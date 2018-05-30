// initial state
// shape: [{ id, quantity }]
const state = ()=>({
    crf: null,
})

// getters
const getters = {
    getCrfInfo: state => state.crf
}

// actions
const actions = {
    updateCrfInfo({ commit }, crf) {
        commit('setCrfInfo', crf);
    }
}

// mutations
const mutations = {
    setCrfInfo(state, crf) {
        state.crf = crf;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}