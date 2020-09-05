<template>
  <div class="login-wrapper">
    <div class="login-container">
      <!-- <div class="menu">
        <v-icon @click="minus">mdi-minus</v-icon
        ><v-icon @click="close">mdi-close</v-icon>
      </div> -->
      <div class="mb-22 title">
        <span v-if="!error">BLUEMSUN-API</span>
        <v-alert v-model="error" dismissible dense type="error">
          请输入邮箱和密码
        </v-alert>
      </div>
      <div class="mb-22">
        <v-text-field
          v-model="username"
          counter
          label="邮箱"
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
        <v-btn block color="secondary" @click="handleLogin" large dark
          >登录</v-btn
        >
      </div>
      <div class="router">
        <v-btn @click="handleToRegist" text>立即注册</v-btn>
        <v-btn text>找回密码</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user/sign";
export default {
  data() {
    return {
      username: "2544967914@qq.com",
      showpassword: false,
      password: "123123",
      loading: false,
      loader: null,
      error: false,
    };
  },
  methods: {
    handleToRegist() {
      window.ipcRenderer.send("openRegist");
      this.$router.push("regist");
    },
    minus() {
      window.ipcRenderer.send("minus");
    },
    close() {
      window.ipcRenderer.send("close");
    },
    handleLogin() {
      this.error = false;
      if (
        this.username === null ||
        this.password === null ||
        this.username === "" ||
        this.password === ""
      ) {
        this.error = true;
      } else {
        const formdata = new FormData();
        formdata.append("username", this.username);
        formdata.append("password", this.password);
        login(formdata).then((res) => {
          if (res.success === 1) {
            this.$store.commit("login", res);
            window.ipcRenderer.send("loginSuccess");
            this.$router.replace("/list");
          } else {
            this.$message.error(res.info || "登录失败");
          }
        });
      }
    },
  },
};
</script>
<style lang="stylus">
body,html
  overflow hidden
</style>
<style lang="stylus" scoped>
.login-wrapper
    position absolute
    left 0
    right 0
    bottom 0
    top 0
    background-color #f9fcff
    overflow hidden
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
        .menu
          position absolute
          right 4px
          top 4px
          i
            cursor pointer
        .title
            text-align center
            font-size 38px
            font-weight 600
            color #424242
            height 22px
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
            &:first-child
              margin-right 8px
</style>
