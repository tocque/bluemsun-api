<template>
  <div class="info-container">
    <h2>消息列表</h2>
    <div class="main-content">
      <v-timeline align-top :dense="false">
        <v-timeline-item v-for="item in updateList" :key="item.id" fill-dot>
          <v-card color="primary" dark>
            <v-card-title class="title"
              >组织名称：{{ item.groupName }}</v-card-title
            >
            <v-card-text class="white text--primary">
              <p style="font-size: 18px; line-height: 60px; margin-bottom: 0">
                <span style="color: red; font-weight: bold">{{
                  item.username
                }}</span
                >在<span style="color: red; font-weight: bold">{{
                  item.updateTime | formdate
                }}</span
                >更新了接口文档
              </p>
              <v-btn
                small
                @click="handleMerge(item.groupId)"
                color="primary"
                class="mx-0"
                outlined
              >
                同步文档
              </v-btn>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
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
import { showList } from "@/api/info";
export default {
  data() {
    return {
      updateList: [],
      totalPages: 10,
      page: 1,
    };
  },
  mounted() {
    this.getList({ pageNum: 1, pageSize: 5 });
  },
  filters: {
    formdate(timestamp) {
      const date = new Date(timestamp);
      let year = date.getFullYear();
      let mon = date.getMonth() + 1;
      mon = mon < 10 ? "0" + mon : mon;
      let day = date.getDate();
      day = day < 10 ? "0" + day : day;
      let hou = date.getHours();
      hou = hou < 10 ? "0" + hou : hou;
      let min = date.getMinutes();
      min = min < 10 ? "0" + min : min;
      let sec = date.getSeconds();
      sec = sec < 10 ? "0" + sec : sec;
      return `${year}-${mon}-${day} ${hou}:${min}:${sec}`;
    },
  },
  methods: {
    handleMerge(groupId) {
      window.ipcRenderer.send("mergeDoc", groupId);
    },
    async getList(params) {
      const res = await showList(params);
      if (res.success === 1) {
        this.updateList = res.notifyList;
        this.totalPages = res.pages;
      } else {
        this.$message.error(res.info || "获取失败");
      }
    },
    handleClick() {
      this.getList({ pageNum: this.page, pageSize: 5 });
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
</style>
