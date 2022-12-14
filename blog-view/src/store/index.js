import Vue from 'vue'
import Vuex from 'vuex'
import actions from '@/store/actions'
import mutations from '@/store/mutations'
import state from '@/store/state'
import getters from '@/store/getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})

export default store