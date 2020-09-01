<template>
  <div class="personal-container">
    <h2>个人信息</h2>
    <div class="main-content">
      <div>
        <div class="label">用户名</div>
        <div class="content">
          {{ user.username }}
          <v-btn class="right-btn" @click="handleChangeName" depressed dark
            >修改</v-btn
          >
        </div>
      </div>
      <div>
        <div class="label">邮箱</div>
        <div class="content">{{ user.email }}</div>
      </div>
      <div>
        <div class="label">密码</div>
        <div class="content">
          建议你每三个月更换一次密码
          <v-btn class="right-btn" @click="handleChangePwd" depressed dark
            >修改</v-btn
          >
        </div>
      </div>
    </div>
    <v-dialog v-model="showChangePwdDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">修改密码</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              label="旧密码"
              placeholder="请输入旧密码"
              required
              type="password"
              v-model="oldPassword"
            ></v-text-field>
            <v-text-field
              label="新密码"
              placeholder="请输入新密码"
              required
              type="password"
              v-model="newPassword"
            ></v-text-field>
            <v-text-field
              label="确认密码"
              placeholder="请再次输入新密码"
              required
              type="password"
              v-model="confirmPassword"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            outlined
            @click="showChangePwdDialog = false"
            >取消</v-btn
          >
          <v-btn color="accent" @click="changePassword">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showChangeName" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">修改用户名</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              label="用户名"
              placeholder="请输入新的用户名"
              required
              v-model="newName"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" outlined @click="showChangeName = false"
            >取消</v-btn
          >
          <v-btn color="accent" @click="changeName">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { updateName, updatePassword } from "@/api/user/personal";
import { mapState } from "vuex";
export default {
  data() {
    return {
      showChangePwdDialog: false,
      showChangeName: false,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      newName: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    handleChangePwd() {
      // 初始化
      this.oldPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
      // 显示对话框
      this.showChangePwdDialog = true;
    },
    handleChangeName() {
      // 初始化
      this.newName = "";
      // 显示对话框
      this.showChangeName = true;
    },
    async changeName() {
      try {
        const res = await updateName({
          username: this.newName,
        });
        if (res.success === 1) {
          this.$message.success("修改用户名成功");
          this.$store.commit("setUser", res.user);
        } else {
          this.$message.error(res.info);
        }
      } catch (e) {
        this.$message.success("系统错误");
      } finally {
        this.showChangeName = false;
      }
    },
    async changePassword() {
      try {
        const formdata = new FormData();
        formdata.append("oldPassword", this.oldPassword);
        formdata.append("newPassword", this.newPassword);
        const res = await updatePassword(formdata);
        if (res.success === 1) {
          this.$message.success("密码修改成功");
        } else {
          this.$message.error(res.info);
        }
      } catch (e) {
        this.$message.error("系统错误");
      } finally {
        this.showChangePwdDialog = false;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.main-content
  margin-top 20px
  padding 20px
  min-width 700px
  background #ffffff
  > div
    position relative
    margin-bottom 22px
    line-height 40px
  .label
    position absolute
    width 70px
    text-align right
    color #606266
    font-size 14px
  .content
    margin-left 90px
    width 400px
    position relative
    padding-right 80px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    .right-btn
      position absolute
      right 0
</style>
