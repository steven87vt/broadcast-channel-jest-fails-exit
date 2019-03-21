import Vuex from 'vuex'
import VueRouter from 'vue-router'
import merge from 'lodash/merge'
import BroadcastChannel from 'broadcast-channel'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import { createTestStore } from '../../../test-create'
import router from '../../router'
import HomePage from '../home-page'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

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
     let result = await BroadcastChannel.clearNodeFolder()
  })

  test('login matches snapshot test.', async (done) => {
    const wrapper = createWrapper()
    const closeMethodSpy = jest.spyOn(wrapper.vm.authChannel, 'close')

    expect(wrapper).toMatchSnapshot()
    wrapper.destroy()

    await new Promise((resolve) => {
      setTimeout(resolve, 500)
    }).then(() => {
      expect(closeMethodSpy).toHaveBeenCalled()
      done()
    })
  })
})
