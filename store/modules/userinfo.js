// initial state
// shape: [{ id, quantity }]
const state = () => ({
    info: null,
    openId: "",
    organizationUnitId: 0
})

// getters
const getters = {
    getUserInfo: state => state.info,
    openId: state => state.openId,
    organizationUnitId: state => state.organizationUnitId
}

// actions
const actions = {
    updateUserInfo({ commit }, info) {
        commit('setUserInfo', info);
    },
    updateOpenId({ commit }, openId) {
        commit('setOpenId', openId);
    },
    updateOrganizationUnitId({ commit }, organizationUnitId) {
        commit('setOrganizationUnitId', organizationUnitId);
    }
}

// mutations
const mutations = {
    setUserInfo(state, info) {
        state.info = info;
    },
    setOpenId(state, openId) {
        state.openId = openId;
    },
    setOrganizationUnitId(state, organizationUnitId) {
        state.organizationUnitId = organizationUnitId;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}