<template
  ><div class="main">
    <div class="left-menu">
      <v-navigation-drawer
        :color="color"
        :mini-variant="miniVariant"
        fixed
        width="200"
        :permanent="permanent"
        dark
      >
        <v-list dense nav class="py-0">
          <v-list-item two-line :class="miniVariant && 'px-0'">
            <v-list-item-content>
              <v-list-item-title>{{ user.username }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item-group v-model="index">
            <v-list-item v-for="item in items" :key="item.title" link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <template>
          <div class="pa-2">
            <v-btn block @click="handleCreateOrganization">新建组织</v-btn>
          </div>
          <div class="pa-2">
            <v-btn block @click="handleJoinOrganization">加入组织</v-btn>
          </div></template
        >
        <template v-slot:append>
          <div class="pa-2">
            <v-btn @click="handleLogout" block>退出登录</v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </div>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">新建组织</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            项目名称
            <v-text-field
              type="text"
              v-model="name"
              counter
              clearable
              required
              @keydown.native.enter="handleConfirmCreate"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" outlined @click="dialog = false"
            >取消</v-btn
          >
          <v-btn
            :disabled="disabled"
            color="accent"
            @click="handleConfirmCreate"
            >确认</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="joinDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">加入组织</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            组织号
            <v-text-field
              type="text"
              v-model="groupId"
              counter
              clearable
              required
              @keydown.native.enter="handleJoin"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" outlined @click="joinDialog = false"
            >取消</v-btn
          >
          <v-btn color="accent" @click="handleJoin">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <main class="right-main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { createGroup, joinGroup } from "@/api/user/group";
import { logout } from "@/api/user/sign";
import { mapState } from "vuex";
export default {
  data() {
    return {
      index: 0,
      items: [
        { title: "组织列表", icon: "mdi-view-dashboard" },
        { title: "个人中心", icon: "mdi-help-box" },
      ],
      color: "primary",
      miniVariant: false,
      permanent: true,
      dialog: false,
      name: "",
      groupId: "",
      joinDialog: false,
    };
  },
  mounted() {
    console.log(this.$route);
    this.index = parseInt(this.$route.query.index);
  },
  computed: {
    disabled() {
      return !this.name;
    },
    ...mapState(["user"]),
  },
  watch: {
    index(newval) {
      switch (newval) {
        case 0:
          this.$router.push({
            name: "List",
            query: {
              index: 0,
            },
          });
          break;
        case 1:
          this.$router.push({
            name: "Personal",
            query: {
              index: 1,
            },
          });
          break;
        default:
          break;
      }
    },
  },
  methods: {
    handleCreateOrganization() {
      this.name = "";
      this.dialog = true;
    },
    handleJoinOrganization() {
      this.groupId = "";
      this.joinDialog = true;
    },
    async handleJoin() {
      try {
        const res = await joinGroup({
          groupId: this.groupId,
        });
        if (res.success === 1) {
          this.$message.success("加入成功");
          if (this.$route.name === "List") {
            this.$children.forEach((v) => {
              if (v.$el.id === "group-list") {
                v.loadList();
              }
            });
          }
        } else {
          this.$message.error(res.info);
        }
      } catch (e) {
        this.$message.error("");
      } finally {
        this.joinDialog = false;
      }
    },
    async handleConfirmCreate() {
      try {
        const res = await createGroup({
          name: this.name,
        });
        if (res.success === 1) {
          this.$message.success("创建成功");
          if (this.$route.name === "List") {
            this.$children.forEach((v) => {
              if (v.$el.id === "group-list") {
                v.loadList();
              }
            });
          }
        } else {
          this.$message.error(res.info);
        }
      } catch (e) {
        this.$message.error("");
      } finally {
        this.dialog = false;
        console.log(this);
      }
    },
    async handleLogout() {
      try {
        const res = await logout();
        if (res.success === 1) {
          this.$message.success("退出成功");
          this.$router.push("/login");
          this.$store.state.token = "";
        } else {
          this.$message.error(res.info);
        }
      } catch (e) {
        this.$message.error("系统错误");
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.main
  height 100%
  main
    margin-left 200px
    background-color #f5f7f9
    padding 50px
    box-sizing border-box
    height 100%
</style>
