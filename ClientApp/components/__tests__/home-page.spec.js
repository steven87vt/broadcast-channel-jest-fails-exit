import Vuex from 'vuex'
import VueRouter from 'vue-router'
import merge from 'lodash/merge'
// import BroadcastChannel from 'broadcast-channel'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import { createTestStore } from '../../../test-create'
import router from '../../router'
import HomePage from '../home-page'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

// const eventObject = {
//   $on: jest.fn(() => {
//     console.log("Event.$on triggered");
//     return Promise.resolve();
//   })
// };

function createWrapper(overrides) {
  const defaults = {
    localVue,
    router,
    store: createTestStore()
  }

  return shallowMount(HomePage, merge(defaults, overrides))
}

describe('login.vue', () => {
  beforeEach(async () => {
    /*
     *let result = await BroadcastChannel.clearNodeFolder()s
     *console.log('Login.vue - BeforeEach - node directories removed: ' + result)
     */
  })

  test('login matches snapshot test.', () => {
    const wrapper = createWrapper()
    expect(wrapper).toMatchSnapshot()
    wrapper.destroy()
  })
})
