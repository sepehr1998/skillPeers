<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar :background-color="sidebarBackground" short-title="SkillPeers" title="SkillPeers">
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Edit Profile',
            icon: 'ni ni-single-02 text-blue',
            path: '/profile',
          }"
        />

        <!--<sidebar-item-->
        <!--:link="{-->
        <!--name: 'Management',-->
        <!--icon: 'ni ni-ui-04 text-orange',-->
        <!--path: '/management',-->
        <!--}"-->
        <!--/>-->
        <!--<sidebar-item-->
        <!--:link="{-->
        <!--name: 'Friends',-->
        <!--icon: 'ni ni-pin-3  text-yellow',-->
        <!--path: '/friends',-->
        <!--}"-->
        <!--/>-->
        <!--<sidebar-item-->
        <!--:link="{-->
        <!--name: 'projects',-->
        <!--icon: 'ni ni-app text-info',-->
        <!--path: '/projects',-->
        <!--}"-->
        <!--/>-->
        <sidebar-item
          :link="{
            name: 'Change Password',
            icon: 'ni  ni-key-25 text-red',
            path: '/security',
          }"
        />
        <sidebar-item
          :link="{
            name: 'messages',
            icon: 'ni  ni-chat-round text-info',
            path: '/messages',
          }"
          :badge="messagesCount"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./components/DashboardNavbar";
import ContentFooter from "./components/ContentFooter";
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
      messagesCount: 0,
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
  mounted() {
    let params = {};
    params.receiverId = this.$store.getters.user.id;
    params.read = false;


    console.log("count params",params);

    this.$store
      .dispatch("message/countMessages", params)
      .then((res) => {
        this.messagesCount = res;
        console.log("messages count", res);
      })
      .catch((err) => {
        console.warn("failed to get messages count", err);
      });
  },
};
</script>
<style lang="scss" scoped>
::v-deep .dropdown-menu {
  right: 0;
  left: auto;
  top: 55px;
}
</style>
