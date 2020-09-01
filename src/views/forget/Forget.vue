<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="mb-22 title">
        <span>BLUEMSUN-API</span>
      </div>
      <div class="mb-22">
        <v-text-field
          v-model="email"
          label="邮箱"
          :autofocus="true"
          clearable
          :rules="emailRules"
        ></v-text-field>
      </div>
      <div class="mb-22">
        <v-text-field
          v-model="username"
          counter
          label="用户名"
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
      <div class="mb-22">
        <v-text-field
          v-model="confirmPwd"
          :append-icon="showConfirmPwd ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showConfirmPwd ? 'text' : 'password'"
          label="确认密码"
          :rules="confirmPwdRules"
          counter
          @click:append="showConfirmPwd = !showConfirmPwd"
        ></v-text-field>
      </div>
      <div class="mb-22 check">
        <v-text-field v-model="confirmPwd" label="验证码"></v-text-field>
        <div class="get-check">
          <v-btn large @click="handleGetCheck" color="secondary" dark
            >获取验证码</v-btn
          >
        </div>
      </div>
      <div class="mb-22">
        <v-btn block color="secondary" @click="handleRegist" large dark
          >注册</v-btn
        >
      </div>
      <div class="router">
        <router-link to="login">返回登录</router-link>
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
      email: "",
      password: "Password",
      confirmPwd: "",
      showConfirmPwd: false,
      loading: false,
      loader: null,
      emailRules: [
        (v) => !!v || "邮箱不能为空",
        (v) => /.+@.+/.test(v) || "邮箱不合法",
      ],
      confirmPwdRules: [(v) => this.password === v || "两次密码不相同"],
    };
  },
  methods: {
    handleRegist() {
      console.log("注册");
    },
    handleGetCheck() {
      if (!this.email || !/.+@.+/.test(this.email)) {
        console.log("邮箱不合法");
      } else {
        console.log("邮箱合法");
      }
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
        .router
          text-align center
          a
            color #3f2600
            text-decoration none
        .check
            display flex
            .get-check
                margin-left 20px
</style>
