<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="mb-22 title">
        <span>BLUEMSUN-API</span>
      </div>
      <div class="mb-22">
        <v-text-field
          v-model="username"
          counter
          label="账号"
          :autofocus="true"
          clearable
        ></v-text-field>
      </div>
      <div class="mb-22">
        <v-text-field
          v-model="password"
          :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showpassword ? 'text' : 'password'"
          label="密码"
          counter
          @click:append="showpassword = !showpassword"
        ></v-text-field>
      </div>
      <div class="mb-2">
        <v-btn block color="secondary" @click="handleLogin" large dark
          >登录</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      showpassword: false,
      password: "Password",
      loading: false,
      loader: null,
    };
  },
  methods: {
    handleLogin() {
      console.log("登录");
    },
  },
};
</script>

<style lang="stylus" scoped>
.login-wrapper
    position absolute
    left 0
    right 0
    bottom 0
    top 0
    background-color #f9fcff
    .login-container
        position absolute
        width 500px
        left 50%
        top 50%
        transform translate(-50%, -50%)
        background #ffffff
        box-shadow 0 1px 3px rgba(19,26,92,.06), 0 6px 30px rgba(19,26,92,.12);
        border-radius 4px;
        padding 50px
        box-sizing border-box
        .title
            text-align center
            font-size 38px
            font-weight 600
            color #424242
            padding-bottom 12px
        .mb-22
            margin-bottom 22px
        & >>> input:-internal-autofill-previewed,
        & >>> input:-internal-autofill-selected
                transition: background-color 5000s ease-in-out 0s !important;
</style>
