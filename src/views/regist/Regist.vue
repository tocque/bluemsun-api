<template>
  <div class="login-wrapper">
    <div class="login-container">
      <!-- <div class="menu">
        <v-icon @click="minus">mdi-minus</v-icon
        ><v-icon @click="close">mdi-close</v-icon>
      </div> -->
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
        <v-text-field v-model="check" label="验证码"></v-text-field>
        <div class="get-check">
          <v-btn
            large
            :disabled="disabled"
            color="secondary"
            @click="handleGetCheck"
            >获取验证码{{ disabled ? "(" + time + ")" : "" }}</v-btn
          >
        </div>
      </div>
      <div class="mb-22">
        <v-btn block color="secondary" @click="handleRegist" large dark
          >注册</v-btn
        >
      </div>
      <div class="router">
        <v-btn text @click="handleToLogin">返回登录</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { emailCheck, regist } from "@/api/user/sign";
export default {
  data() {
    return {
      username: "",
      showpassword: false,
      email: "",
      password: "",
      disabled: false,
      confirmPwd: "",
      showConfirmPwd: false,
      loading: false,
      loader: null,
      check: "",
      time: 60,
      emailRules: [
        (v) => !!v || "邮箱不能为空",
        (v) => /.+@.+/.test(v) || "邮箱不合法",
      ],
      confirmPwdRules: [(v) => this.password === v || "两次密码不相同"],
      timer: null,
    };
  },
  watch: {
    time(val) {
      if (val <= 0) {
        this.disabled = false;
        this.timer = null;
      }
    },
  },
  methods: {
    handleToLogin() {
      window.ipcRenderer.send("openLogin");
      this.$router.push("/login");
    },
    minus() {
      window.ipcRenderer.send("minus");
    },
    close() {
      window.ipcRenderer.send("close");
    },
    handleRegist() {
      this.$message.success("注册成功");
      const formdata = new FormData();
      formdata.append("email", this.email);
      formdata.append("username", this.username);
      formdata.append("password", this.password);
      formdata.append("check", this.check);
      regist(formdata)
        .then((res) => {
          if (res.success === 1) {
            this.$message.success("注册成功");
          } else {
            this.$message.error(res.msg || "注册失败");
          }
        })
        .catch(() => {
          this.$message.error("系统错误");
        });
    },
    handleGetCheck() {
      if (!this.email || !/.+@.+/.test(this.email)) {
      } else {
        emailCheck({
          email: this.email,
          type: 1,
        })
          .then((res) => {
            if (res.success === 1) {
              this.disabled = true;
              this.time = 60;
              this.timer = setInterval(() => {
                this.time--;
              }, 1000);
            } else {
              this.$message.error(res.msg || "注册失败");
            }
          })
          .catch(() => {
            this.$message.error("系统错误");
          });
      }
    },
  },
};
</script>
<style lang="stylus">
html,body
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
