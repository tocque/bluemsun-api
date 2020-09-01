<template>
  <div class="member-container">
    <div class="main-content">
      <div class="title">
        <span class="text">成员管理</span
        ><v-btn text><v-icon dark>mdi-plus</v-icon>邀请成员</v-btn>
        <span>
          <v-text-field
            v-model="search"
            placeholder="搜索组织成员"
            outlined
            rounded
            single-line
            dense
            solo
            hide-details
            append-icon="mdi-magnify"
            @click:append="handleSearch"
            @keydown.enter.native="handleSearch"
          ></v-text-field>
        </span>
      </div>
      <div class="member-list">
        <div class="member-item" v-for="item in memberList" :key="item.userId">
          <v-card class="member-card" width="240">
            <v-list-item
              ><div class="username">
                <v-list-item-title class="headline">{{
                  item.username
                }}</v-list-item-title>
              </div>
              <v-btn class="detach" @click="handleDetach(item.userId)" icon
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </v-list-item>
            <v-card-actions>
              <div class="ml-2">
                <div class="role">{{ getRoleName(item.type) }}</div>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-menu-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item link>
                      <v-list-item-title
                        @click="handleUpdateRole(item.userId, 1)"
                        >管理员</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item link>
                      <v-list-item-title
                        @click="handleUpdateRole(item.userId, 2)"
                        >贡献者</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item link>
                      <v-list-item-title
                        @click="handleUpdateRole(item.userId, 3)"
                        >成员</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-card-actions>
          </v-card>
        </div>
      </div>
      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="6"
        @input="handleChangePage"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { showMember, manageMember, deleteMember } from "@/api/user/group";
export default {
  data() {
    return {
      memberList: [
        {
          username: "李白",
          userId: 1233,
          type: 1,
          email: "123123",
        },
        {
          username: "李白",
          userId: 12323,
          type: 2,
          email: "123123",
        },
        {
          username: "李白李白李白李白李白李白李白",
          userId: 123,
          type: 3,
          email: "123123",
        },
      ],
      page: 1,
      totalPages: 10,
      search: "",
    };
  },
  mounted() {
    this.getMemberList();
  },
  methods: {
    handleSearch() {
      this.getMemberList({ search: this.search });
    },
    handleChangePage() {
      this.getMemberList({ pageNum: this.page });
    },
    async getMemberList(config) {
      const params = {
        pageNum: 1,
        pageSize: 1,
        search: "",
        groupId: this.$route.query.groupId,
        ...config,
      };
      try {
        const res = await showMember(params);
        if (res.success === 1) {
          this.memberList = res.memberList;
          this.totalPages = res.pages;
        } else {
          this.$message.error(res.info);
        }
      } catch (e) {
        this.$message.error("系统错误");
      }
    },
    getRoleName(type) {
      if (type === 0) {
        return "拥有者";
      } else if (type === 1) {
        return "管理员";
      } else if (type === 2) {
        return "贡献者";
      } else if (type === 3) {
        return "成员";
      }
    },
    handleDetach(userId) {
      this.$confirm("确认要移除该用户？", "提醒").then(async () => {
        const groupId = this.$route.query.groupId;
        try {
          const res = await deleteMember({
            groupId,
            userId,
          });
          if (res.success === 1) {
            this.getMemberList();
          } else {
            this.$message.error(res.info);
          }
        } catch (e) {
          this.$message.error("系统错误");
        }
      });
    },
    async handleUpdateRole(userId, type) {
      const groupId = this.$route.query.groupId;
      try {
        const res = await manageMember({
          groupId,
          userId,
          type,
        });
        if (res.success === 1) {
          this.getMemberList();
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
.member-container
  background-color #f5f7f9
  height 100%
  .main-content
    width 800px
    background #ffffff
    margin 0 auto
    height 100%
    .title
      display flex
      padding 0 20px
      align-items center
      line-height 80px
      .text
        margin-right 40px
    .member-list
      padding 0 10px
      display flex
      flex-wrap wrap
      .member-item
        padding 0 10px
        margin-bottom 20px
        .username
          width  180px
        .detach
          display none
        &:hover
          .detach
            display block
        .role
          width 60px
          display inline-block
</style>
