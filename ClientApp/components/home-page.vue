<template>
  <div class="text-center">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-3">Welcome to A Test Site</h1>
        <div v-if="getUserName">
          <h3>Welcome Back {{getUserName}}</h3>
        </div>
      </div>
    </div>
    <p></p>
    <div class="form-group">
      <label>
        What is your name?
        <input
          @change="updateUser"
          class="form-control text-center"
          type="text"
          placeholder="Enter Your Name Here..."
        >
      </label>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import clone from "lodash/clone";
import BroadcastChannel from "broadcast-channel";

export default {
  data() {
    return {
      authChannel: null,
      userName: null
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    getUserName() {
      if (!this.user || !this.user.name) {
        return null;
      }

      return this.user.name;
    }
  },
  methods: {
    ...mapActions({ setUser: "setUser" }),

    updateUser(event) {
      let user = this.user ? clone(this.user) : {};
      user.name = event.target.value;

      this.setUser(user);
    },
    junk() {
      console.log("junk method executed");
    }
  },
  created() {
    const authChannelOptions = {
      webWorkerSupport: true
    };

    this.authChannel = new BroadcastChannel("auth", authChannelOptions);

    // this.authChannel.onmessage = function (e) {
    // if (e.data.cmd === 'logout') {
    //  console.log('broadcast channel logout event)
    // }
    // if (e.data.cmd === 'refresh') {
    //   console.log('broadcast channel refresh event)
    // }
    //}
  }
};
</script>

<style>
</style>
