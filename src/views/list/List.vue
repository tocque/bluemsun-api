<template>
  <div id="group-list">
    <div class="head">
      <h2>组织列表</h2>
      <div class="search-input">
        <v-text-field
          v-model="search"
          placeholder="输入搜索内容"
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
      </div>
    </div>
    <div class="main-content">
      <div class="list-container">
        <input
          type="text"
          ref="copyInput"
          style="opacity: 0; position: absolute"
          v-model="copyText"
        />
        <template v-for="item in list">
          <div :key="item.groupId" class="group-item">
            <v-card max-width="344" @click="handleToItem(item.groupId, item.type)">
              <v-list-item>
                <v-list-item-title class="headline">{{
                  item.groupName
                }}</v-list-item-title>
                <div class="role">{{ getRole(item.type) }}</div>
              </v-list-item>
              <v-card-actions>
                <v-list-item
                  >邀请码：<span @click.stop="handleCopy(item.groupId)">{{
                    item.groupId
                  }}</span></v-list-item
                >
                <v-spacer></v-spacer>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-menu</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <template v-for="(v, index) in items">
                      <v-list-item
                        link
                        v-if="item.type <= v.type"
                        :key="index"
                        @click="handleOperate(v.type, item.groupId)"
                      >
                        <v-list-item-title>{{ v.title }}</v-list-item-title>
                      </v-list-item>
                    </template>
                  </v-list>
                </v-menu>
              </v-card-actions>
            </v-card>
          </div></template
        >
      </div>
      <div>
        <v-pagination
          v-model="page"
          :length="totalPages"
          :total-visible="6"
          @input="handleClick"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getGroupList,
  rename,
  deleteGroup,
  leaveGroup,
} from "@/api/user/group";
import { ipcRenderer } from 'electron';
export default {
  data() {
    return {
      items: [
        { title: "删除组", type: 0, id: 1 },
        { title: "重命名", type: 1, id: 2 },
        { title: "成员管理", type: 2, id: 3 },
        { title: "退出该组", type: 3, id: 4 },
      ],
      list: [],
      copyText: "",
      page: 1,
      totalPages: 0,
      search: "",
    };
  },
  mounted() {
    this.loadList();
  },
  activated() {},
  methods: {
    handleSearch() {
      this.loadList({ search: this.search });
    },
    handleClick(page) {
      this.loadList({ pageNum: this.page, search: this.search });
    },
    getRole(type) {
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
    loadList(config = {}) {
      const params = {
        pageNum: 1,
        pageSize: 12,
        search: "",
        ...config,
      };
      getGroupList(params)
        .then((res) => {
          if (res.success === 1) {
            this.list = res.groupList;
            this.totalPages = res.pages;
          } else {
            this.$message.error(res.info);
          }
        })
        .catch((e) => {
          this.$message.error("系统错误");
        });
    },
    handleOperate(index, groupId) {
      switch (index) {
        case 0:
          this.$confirm("确定删除该组织？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            deleteGroup({ groupId })
              .then((res) => {
                if (res.success === 1) {
                  this.$message.success("删除成功");
                  this.loadList();
                } else {
                  this.$message.error(res.info);
                }
              })
              .catch((e) => {
                this.$message.error("系统错误");
              });
          });
          break;
        case 1:
          this.$prompt("请输入新组织名称", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          }).then(({ value }) => {
            rename({
              name: value,
              groupId: groupId,
            })
              .then((res) => {
                if (res.success === 1) {
                  this.$message.success("修改成功");
                  this.loadList();
                } else {
                  this.$message.error(res.info);
                }
              })
              .catch((e) => {
                this.$message.error("系统错误");
              });
          });
          break;
        case 2:
          this.$router.push({
            path: "/project",
            query: {
              groupId,
            },
          });
          break;
        default:
          this.$confirm("确定退出该组织？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            leaveGroup({ groupId })
              .then((res) => {
                if (res.success === 1) {
                  this.$message.success("退出成功");
                  this.loadList();
                } else {
                  this.$message.error(res.info);
                }
              })
              .catch((e) => {
                this.$$message.error("系统错误");
              });
          });
          break;
      }
    },
    handleCopy(groupId) {
      this.copyText = groupId;
      this.$nextTick(() => {
        this.$refs.copyInput.select();
        document.execCommand("copy");
        this.$message.success("已复制到剪切板");
      });
    },
    handleToItem(id, type) {
      ipcRenderer.send("open-editor", { id, type })
    },
  },
};
</script>

<style lang="stylus" scoped>
.head
  display flex
  .search-input
    margin-left 20px
.main-content
    background #ffffff
    padding 20px
    margin-top 20px
.list-container
    display flex
    flex-wrap wrap
    .group-item
        margin 0 28px 20px 0
        width 260px
    .creator-name
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
    .role
        font-size 14px
        width 56px
</style>
